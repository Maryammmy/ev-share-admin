import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // بنجيب الـ Token
  const token = req.cookies.get("token")?.value;

  // هل المستخدم في صفحة اللوجين؟
  const isLoginPage = pathname === "/login";

  // 1. لو معاه Token وبيحاول يفتح صفحة اللوجين -> وديه علطول على الهوم
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. لو معندوش Token ومش في صفحة اللوجين -> اجبره يروح للوجين
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // أي حالة تانية (زي إنه معاه Token وفي الهوم) سيبه يكمل عادي
  return NextResponse.next();
}

// الماتشر هنا مهم جداً عشان ميعملش Redirect لملفات الـ CSS أو الصور
export const config = {
  matcher: [
    /*
     * الماتشر ده بيشغل الميدل وير على كل المسارات ما عدا:
     * 1. api (إكسكيوت الـ API calls)
     * 2. _next (ملفات نكست الداخلية)
     * 3. الملفات اللي فيها نقطة زي .png, .jpg, .svg (الصور)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
