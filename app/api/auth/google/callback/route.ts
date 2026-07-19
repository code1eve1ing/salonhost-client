import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
}

interface GoogleUserInfo {
  sub: string; // stable Google user id
  email: string;
  name: string;
  picture: string;
  email_verified: boolean;
}

/**
 * GET /api/auth/google/callback
 * Handles Google's redirect after consent: exchanges the code for tokens,
 * fetches the user's profile, then calls the Node backend to create/fetch
 * the user record (merging in any onboarding draft passed via the state
 * round-trip is not done here for security — the client re-submits the
 * draft from its Zustand store once redirected back with a token).
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const errorParam = searchParams.get("error");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const storedState = req.cookies.get("oauth_state")?.value;

  if (errorParam) {
    return NextResponse.redirect(`${appUrl}/onboarding?error=oauth_denied`);
  }

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(`${appUrl}/onboarding?error=invalid_state`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000/api/v1";

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.redirect(`${appUrl}/onboarding?error=oauth_not_configured`);
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      throw new Error(`Token exchange failed: ${tokenRes.status}`);
    }

    const tokens: GoogleTokenResponse = await tokenRes.json();

    // 2. Fetch the user's profile
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!profileRes.ok) {
      throw new Error(`Profile fetch failed: ${profileRes.status}`);
    }

    const profile: GoogleUserInfo = await profileRes.json();


    // 3. Create (or fetch existing) user in the Node backend
    const createRes = await fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        googleId: profile.sub,
        email: profile.email,
        name: profile.name,
        avatar: profile.picture,
      }),
    });

    const createData = await createRes.json();

    if (!createRes.ok || !createData.success) {
      const reason = encodeURIComponent(createData.message || "signup_failed");
      return NextResponse.redirect(`${appUrl}/onboarding?error=${reason}`);
    }

    // 5. Hand off to the client: redirect to a small bridge page that reads
    //    the token from the URL fragment... but fragments aren't sent to
    //    servers, so instead we pass it as a one-time query param over HTTPS
    //    and the client immediately stores it in Zustand/localStorage then
    //    scrubs the URL. (In production, prefer an HttpOnly session cookie.)
    const response = NextResponse.redirect(
      `${appUrl}/auth/complete?token=${encodeURIComponent(createData.token)}`
    );
    response.cookies.delete("oauth_state");
    response.cookies.delete("onboarding_draft");
    return response;
  } catch (err) {
    console.error("[oauth callback] error:", err);
    return NextResponse.redirect(`${appUrl}/onboarding?error=oauth_failed`);
  }
}
