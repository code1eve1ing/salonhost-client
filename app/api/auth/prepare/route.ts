import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/auth/prepare
 * Body: { subdomain, ...sections }
 *
 * Server route handlers can't read the client's Zustand/localStorage state,
 * so the client calls this just before redirecting to /api/auth/google.
 * It stashes the onboarding draft in a short-lived cookie that the OAuth
 * callback reads to build the final user record.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set("onboarding_draft", encodeURIComponent(JSON.stringify(body)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes - just long enough for the OAuth round trip
    path: "/",
  });

  return response;
}
