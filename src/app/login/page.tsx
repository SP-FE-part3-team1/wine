"use client";

import Image from "next/image";
import style from "./page.module.css";
import CustomInput from "@/components/Input/CustomInput";
import SocialLogin from "@/components/SocialLogin/SocialLogin";
import Link from "next/link";
import { useLoginOrSignupInputValue } from "@/hooks/login-signup-hook";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/actions/login.action";
import { useRouter } from "next/navigation";

const Page = () => {
  const [input, handleInputChange] = useLoginOrSignupInputValue();
  const [state, formAction, isPending] = useActionState(loginAction, null);
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
        <div className={style.form_container}>
          <form className={style.form} action={formAction} noValidate={true}>
            <div className={style.form_input_container}>
              <CustomInput
                id="email"
                name="email"
                type="email"
                placeholder="이메일 입력"
                labelText="이메일"
                error={state?.isError.email}
                errorText={state?.errors.email}
                value={input.email}
                handleChange={handleInputChange}
              />
              <div className={style.pwd_container}>
                <CustomInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호 입력"
                  labelText="비밀번호"
                  error={state?.isError.password}
                  errorText={state?.errors.password}
                  value={input.password}
                  handleChange={handleInputChange}
                />
                <div>
                  <span className={style.span}>비밀번호를 잊으셨나요?</span>
                </div>
              </div>
            </div>
            <div className={style.btn_move_signup_container}>
              <div className={style.btn_container}>
                <button className={style.login_btn}>
                  {isPending ? "확인중" : "로그인"}
                </button>
                <SocialLogin
                  logoSrc="/assets/images/icon/google.svg"
                  size="fill"
                >
                  Google로 시작하기
                </SocialLogin>
                <SocialLogin
                  logoSrc="/assets/images/icon/kakao.svg"
                  size="fill"
                >
                  kakao로 시작하기
                </SocialLogin>
              </div>
              <div className={style.move_signup_container}>
                <span>계정이 없으신가요?</span>
                <span>
                  <Link href={"/signup"} className={style.do_signup}>
                    회원가입하기
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
