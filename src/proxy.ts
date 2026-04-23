import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_KEY = "token";
const LOGIN_PATH = "/login";
const ADMIN_PATH = "/";

function withNoStoreHeaders(response: NextResponse) {
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, private",
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value?.trim();
  const hasToken = Boolean(token);
  const { pathname } = request.nextUrl;

  if (pathname === ADMIN_PATH && !hasToken) {
    return withNoStoreHeaders(
      NextResponse.redirect(new URL(LOGIN_PATH, request.url)),
    );
  }

  if (pathname === LOGIN_PATH && hasToken) {
    return withNoStoreHeaders(
      NextResponse.redirect(new URL(ADMIN_PATH, request.url)),
    );
  }

  return withNoStoreHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/", "/login"],
};
