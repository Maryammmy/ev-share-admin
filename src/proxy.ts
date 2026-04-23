import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // بنجيب التوكن مباشرة من الطلب
  const token = req.cookies.get("token")?.value;

  const isLoginPage = pathname.startsWith("/login");

  // لو معاه توكن وبيحاول يدخل لوجين، ابعته للهوم فوراً
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // لو مش معاه توكن ومش في صفحة اللوجين، ابعته للوجين
  if (!token && !isLoginPage) {
    const url = new URL("/login", req.url);
    // السطر ده مهم عشان ميحصلش كاش للـ redirect
    return NextResponse.redirect(url);
  }

  // غير كدا سيبه يكمل
  return NextResponse.next();
}

export const config = {
  // شيلنا الـ regex المعقد وحطينا ماتشر صريح
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
