import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_KEY = "token";
const LOGIN_PATH = "/login";
const admin_PATH = "/";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value;
  const { pathname } = request.nextUrl;

  if (pathname === admin_PATH && !token) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (pathname === LOGIN_PATH && token) {
    return NextResponse.redirect(new URL(admin_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
