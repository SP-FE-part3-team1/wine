"use server";

import { loginUser } from "@/lib/login-api";
import { validateEmail } from "@/utils/validate-login-signup";
import { cookies } from "next/headers";

export async function loginAction(
  _: unknown,
  formData: FormData
): Promise<
  | {
      status: boolean;
      fetchErrorText: string;
      isError: {
        email: boolean;
        password: boolean;
      };
      errors: {
        [key: string]: string;
      };
    }
  | undefined
> {
  const errors: {
    [key: string]: string;
  } = {};

  const isError = {
    email: false,
    password: false,
  };

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email) {
    errors.email = "이메일은 필수 입력입니다.";
    isError.email = true;
  } else if (!validateEmail(email)) {
    errors.email = "이메일 형식으로 작성해 주세요.";
    isError.email = true;
  }

  if (!password) {
    errors.password = "비밀번호는 필수 입력입니다.";
    isError.password = true;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: false,
      fetchErrorText: "",
      isError,
      errors,
    };
  }

  try {
    if (email && password) {
      const responseData = await loginUser({ email, password });

      if (!responseData) {
        throw new Error(responseData.message || "로그인실패");
      }
      const { accessToken, refreshToken } = responseData;
      (await cookies()).set("accessToken", accessToken, {
        httpOnly: true,
        secure: Boolean(process.env.NEXT_PUBLIC_SECURE),
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60,
      });

      (await cookies()).set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: Boolean(process.env.NEXT_PUBLIC_SECURE),
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      return {
        status: true,
        fetchErrorText: "",
        isError: {
          email: false,
          password: false,
        },
        errors: {},
      };
    }
  } catch (err) {
    return {
      status: false,
      fetchErrorText: `${err}`,
      isError,
      errors,
    };
  }
}
