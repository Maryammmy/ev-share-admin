import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname.startsWith("/login");

  // لو في توكن وهو رايح للـ login
  if (token && isLoginPage) {
    const response = NextResponse.redirect(new URL("/", req.url));
    // السطر ده بيمنع المتصفح إنه يكيش الـ "Login page" كحالة افتراضية
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }

  // لو مفيش توكن ومش في الـ login
  if (!token && !isLoginPage) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
