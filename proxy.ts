import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  // Remove port
  const hostname = host.split(":")[0];

  let subdomain: string | null = null;

  if (hostname.endsWith(".localhost")) {
    // salon.localhost
    const parts = hostname.split(".");
    if (parts.length > 1) {
      subdomain = parts[0];
    }
  } else {
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