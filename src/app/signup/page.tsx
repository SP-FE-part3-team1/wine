"use client";

import Image from "next/image";
import style from "./page.module.css";
import CustomInput from "@/components/Input/CustomInput";
import Button from "@/components/Button/Button";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

const Page = () => {
  const [signup, setSignup] = useState({
    email: "",
    nickname: "",
    password: "",
    password_check: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignup((prevSignup) => ({
      ...prevSignup,
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
        <form className={style.form}>
          <div className={style.form_input_container}>
            <CustomInput
              id="email"
              name="email"
              type="email"
              placeholder="whyne@email.com"
              labelText="이메일"
              error={false}
              errorText=""
              value={signup.email}
              handleChange={handleChange}
            />
            <CustomInput
              id="nickname"
              name="nickname"
              type="text"
              placeholder="whyne"
              labelText="닉네임"
              error={false}
              errorText=""
              value={signup.nickname}
              handleChange={handleChange}
            />
            <CustomInput
              id="password"
              name="password"
              type="password"
              placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
              labelText="비밀번호"
              error={false}
              errorText=""
              value={signup.password}
              handleChange={handleChange}
            />
            <CustomInput
              id="password_check"
              name="password_check"
              type="password"
              placeholder="비밀번호 확인"
              labelText="비밀번호 확인"
              error={false}
              errorText=""
              value={signup.password_check}
              handleChange={handleChange}
            />
          </div>
          <Button className={style.button}>가입하기</Button>
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
