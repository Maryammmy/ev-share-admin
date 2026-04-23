import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Dashboard guard
  if (pathname.startsWith("/")) {
    const token = req.cookies.get("token")?.value;
    const isLogin = pathname === "/login" || pathname.startsWith("/login/");

    // 1) لو معاه token: امنعي /dashboard/login
    if (token && isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // 2) لو مش معاه token: امنعي أي dashboard route غير login
    if (!token && !isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // يسمح بالوصول: (token موجود لأي dashboard) أو (login بدون token)
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
