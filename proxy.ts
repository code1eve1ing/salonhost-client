import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  let subdomain: string | null = null;

  const appHost = new URL(process.env.APP_URL!).hostname;

  if (hostname.endsWith(".localhost")) {
    // salon.localhost
    const parts = hostname.split(".");
    if (parts.length > 1) {
      subdomain = parts[0];
    }
  } else if (hostname.endsWith(".vercel.app")) {
    // x-salon-client-v1.vercel.app
    // salon-x-salon-client-v1.vercel.app

    if (hostname !== appHost && hostname.endsWith(appHost)) {
      subdomain = hostname.slice(0, -(appHost.length + 1));
    }
  } else {
    // Custom domain
    // salon.example.com
    const parts = hostname.split(".");
    if (parts.length > 2) {
      subdomain = parts[0];
    }
  }

  const headers = new Headers(request.headers);

  if (subdomain) {
    headers.set("x-subdomain", subdomain);
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};