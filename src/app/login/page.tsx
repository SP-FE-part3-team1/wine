"use client";

import Image from "next/image";
import style from "./page.module.css";
import CustomInput from "@/components/Input/CustomInput";
import Button from "@/components/Button/Button";
import SocialLogin from "@/components/SocialLogin/SocialLogin";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

const Page = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin((prevLogin) => ({
      ...prevLogin,
      [e.target.name]: e.target.value,
    }));
  };

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
          <form className={style.form}>
            <div className={style.form_input_container}>
              <CustomInput
                id="email"
                name="email"
                type="email"
                placeholder="이메일 입력"
                labelText="이메일"
                error={false}
                errorText=""
                value={login.email}
                handleChange={handleChange}
              />
              <div className={style.pwd_container}>
                <CustomInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호 입력"
                  labelText="비밀번호"
                  error={false}
                  errorText=""
                  value={login.password}
                  handleChange={handleChange}
                />
                <div>
                  <span className={style.span}>비밀번호를 잊으셨나요?</span>
                </div>
              </div>
            </div>
            <div className={style.btn_move_signup_container}>
              <div className={style.btn_container}>
                <Button className={style.login_btn}>로그인</Button>
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
