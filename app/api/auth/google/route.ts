import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

/**
 * GET /api/auth/google
 * Redirects the user to Google's OAuth consent screen.
 *
 * Note: Next.js App Router route handlers don't run inside Express, so
 * Passport's middleware-based strategy doesn't attach cleanly here. This
 * implements the same Authorization Code flow Passport's GoogleStrategy
 * uses under the hood, without the Express-specific plumbing.
 */
export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI; // e.g. http://localhost:3000/api/auth/google/callback

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { success: false, message: "Google OAuth is not configured" },
      { status: 500 }
    );
  }

  // CSRF protection: random state, verified in the callback via a signed cookie.
  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    prompt: "select_account",
    state,
  });

  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );

  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  return response;
}
