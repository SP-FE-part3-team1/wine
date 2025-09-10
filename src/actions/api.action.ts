"use server";

import { cookies } from "next/headers";

// refreshToken api 호출 함수
export async function setNewAccessToken() {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const newAccessToken = data.accessToken;

      (await cookies()).set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: Boolean(process.env.NEXT_PUBLIC_SECURE),
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60,
      });
      return newAccessToken;
    }
  } catch (error) {
    console.error("리프레시 토큰 발급 실패:", error);
    return null;
  }
}

//인증이 필요한 fetch api는 이걸 쓰면 됩니다!
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const headers = {
    ...options.headers,
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    const newAccessToken = await setNewAccessToken();

    if (newAccessToken) {
      const newHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, { ...options, headers: newHeaders });
    }
  }

  return response;
}

//클라이언트에서 사용할 수 있는 api호출 함수
export async function fetchWithAuthforClient(
  url: string,
  options: RequestInit = {}
) {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const headers = {
    ...options.headers,
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    const newAccessToken = await setNewAccessToken();

    if (newAccessToken) {
      const newHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, { ...options, headers: newHeaders });
    }
  }

  return JSON.parse(JSON.stringify(response));
}

/**
 * 예시자료입니다.
 * 인증이 필요한 api요청의 경우
 * 이런식으로 활용해서 사용하시면 됩니다.
 */
export async function getUser() {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  return data;
}
