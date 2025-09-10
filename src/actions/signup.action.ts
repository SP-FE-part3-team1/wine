"use server";

import { registerUser } from "@/lib/signup-api";
import { validateEmail, validatePassword } from "@/utils/validate-login-signup";
import { cookies } from "next/headers";

export async function signupAction(
  _: unknown,
  formData: FormData
): Promise<
  | {
      status: boolean;
      fetchErrorText: string;
      isError: {
        email: boolean;
        password: boolean;
        nickname: boolean;
        passwordConfirmation: boolean;
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
    nickname: false,
    passwordConfirmation: false,
  };

  const email = formData.get("email")?.toString();
  const nickname = formData.get("nickname")?.toString();
  const password = formData.get("password")?.toString();
  const passwordConfirmation = formData.get("passwordConfirmation")?.toString();

  if (!email) {
    errors.email = "이메일은 필수입력입니다.";
    isError.email = true;
  } else if (!validateEmail(email)) {
    errors.email = "이메일 형식으로 작성해 주세요.";
    isError.email = true;
  }

  if (!nickname) {
    errors.nickname = "닉네임은 필수입력입니다.";
    isError.nickname = true;
  } else if (nickname.length > 20) {
    errors.nickname = "닉네임은 최대 20자까지 가능합니다.";
    isError.nickname = true;
  }

  if (!password) {
    errors.password = "비밀번호는 필수입력입니다.";
    isError.password = true;
  } else if (password.length < 8) {
    errors.password = "비밀번호는 최소 8자 이상입니다.";
    isError.password = true;
  } else if (!validatePassword(password)) {
    errors.password =
      "비밀번호는 숫자,영문,특수문자(!@#$%^&*)만으로 가능합니다.";
    isError.password = true;
  }

  if (!passwordConfirmation) {
    errors.passwordConfirmation = "비밀번호 확인을 입력해주세요.";
    isError.passwordConfirmation = true;
  } else if (password !== passwordConfirmation) {
    errors.passwordConfirmation = "비밀번호가 일치하지 않습니다.";
    isError.passwordConfirmation = true;
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
    if (email && nickname && password && passwordConfirmation) {
      const responseData = await registerUser({
        email,
        nickname,
        password,
        passwordConfirmation,
      });

      if (!responseData) {
        throw new Error(responseData.message || "회원가입실패");
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
          nickname: false,
          passwordConfirmation: false,
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
