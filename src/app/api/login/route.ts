import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/signIn`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();

      const res = NextResponse.json(
        { message: "로그인 성공!", accessToken, refreshToken },
        { status: 200 }
      );

      return res;
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "로그인 실패" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Route Handler 오류:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
