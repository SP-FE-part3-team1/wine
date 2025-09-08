"use client";

import Image from "next/image";
import style from "./page.module.css";
import CustomInput from "@/components/Input/CustomInput";
import Link from "next/link";
import { useLoginOrSignupInputValue } from "@/hooks/login-signup-hook";
import { useActionState, useEffect } from "react";
import { signupAction } from "@/actions/signup.action";
import { useRouter } from "next/navigation";

const Page = () => {
  const [input, handleInputChange] = useLoginOrSignupInputValue();
  const [state, formAction, isPending] = useActionState(signupAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.status) {
      router.replace("/");
    } else if (state?.fetchErrorText) {
      alert(state.fetchErrorText);
    }
  }, [state, router]);

  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.image_container}>
          <Image
            src={"/assets/images/logo/black_log_lg.svg"}
            width={104}
            height={30}
            alt="wine logo"
          />
        </div>
        <form className={style.form} action={formAction} noValidate={true}>
          <div className={style.form_input_container}>
            <CustomInput
              id="email"
              name="email"
              type="email"
              placeholder="whyne@email.com"
              labelText="이메일"
              error={state?.isError.email}
              errorText={state?.errors.email}
              value={input.email}
              handleChange={handleInputChange}
            />
            <CustomInput
              id="nickname"
              name="nickname"
              type="text"
              placeholder="whyne"
              labelText="닉네임"
              error={state?.isError.nickname}
              errorText={state?.errors.nickname}
              value={input.nickname}
              handleChange={handleInputChange}
            />
            <CustomInput
              id="password"
              name="password"
              type="password"
              placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
              labelText="비밀번호"
              error={state?.isError.password}
              errorText={state?.errors.password}
              value={input.password}
              handleChange={handleInputChange}
            />
            <CustomInput
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              placeholder="비밀번호 확인"
              labelText="비밀번호 확인"
              error={state?.isError.passwordConfirmation}
              errorText={state?.errors.passwordConfirmation}
              value={input.passwordConfirmation}
              handleChange={handleInputChange}
            />
          </div>
          <button className={style.button} type="submit" disabled={isPending}>
            {isPending ? "확인중" : "가입하기"}
          </button>
        </form>
        <div className={style.move_login_container}>
          <span>계정이 이미 있으신가요?</span>
          <span>
            <Link href={"/login"} className={style.do_login}>
              로그인하기
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
