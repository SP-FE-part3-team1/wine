import { NextRequest, NextResponse } from "next/server";

// 인증이 필요한 보호된 라우트 목록
const protectedRoutes = ["/myprofile", "/wines"];

// 인증이 없는 상태에서는 접근가능한 라우트 목록
const authRoutes = ["/login", "/signup", "/login/oauth/kakao"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const isProtectedRoutes = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoutes) {
    if (!refreshToken || !accessToken) {
      const loginPage = new URL("/login", request.url);

      return NextResponse.redirect(loginPage);
    }
  }

  if (authRoutes.includes(pathname)) {
    if (refreshToken && accessToken) {
      const rootPage = new URL("/", request.url);
      return NextResponse.redirect(rootPage);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/signup", "/wines/:path*", "/myprofile/:path*"],
};
