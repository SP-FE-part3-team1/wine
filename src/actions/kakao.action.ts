"use server";

import { components } from "@/types/types";
import { cookies } from "next/headers";

export async function registerOauthApp({
  appKey,
  provider,
}: components["schemas"]["UpsertOauthAppRequestBody"]) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/oauthApps`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          appSecret: "",
          appKey,
          provider,
        }),
      }
    );
    if (!response.ok) {
      const errorText = await response.json();
      console.error(errorText.message);
      throw new Error(errorText.message || "알 수 없는 오류");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("데이터 가져오는 중 오류 발생:", error);
    throw error;
  }
}

export async function signInWithKakao({
  redirectUri,
  token,
}: components["schemas"]["SignInWithOauthRequestBody"]) {
  try {
    const { provider } = await registerOauthApp({
      appKey: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
      provider: "KAKAO",
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/signIn/${provider}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          state: "",
          redirectUri,
          token,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.json();
      console.error(errorText.message);
      throw new Error(errorText.message || "알 수 없는 오류");
    }

    const data = await response.json();

    (await cookies()).set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60,
    });

    (await cookies()).set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return data;
  } catch (error) {
    console.error("데이터 가져오는 중 오류 발생:", error);
    throw error;
  }
}
