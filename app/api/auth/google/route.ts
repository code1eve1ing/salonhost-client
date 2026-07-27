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
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { success: false, message: "Google OAuth is not configured" },
      { status: 500 }
    );
  }

  const searchParams = req.nextUrl.searchParams;

  const action = searchParams.get("action") ?? "login";
  const subdomain = searchParams.get("subdomain");
  const template = searchParams.get("template");

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

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 10,
    path: "/",
  };

  response.cookies.set("oauth_state", state, cookieOptions);

  // Store action
  response.cookies.set("oauth_action", action, cookieOptions);

  // Store signup-specific info
  if (action === "signup") {
    if (subdomain) {
      response.cookies.set("oauth_subdomain", subdomain, cookieOptions);
    }

    if (template) {
      response.cookies.set("oauth_template", template, cookieOptions);
    }
  }

  return response;
}
