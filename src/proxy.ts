import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token).catch(() => null);

  if (pathname === "/admin/login") {
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
