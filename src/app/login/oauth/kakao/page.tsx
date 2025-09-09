"use client";

import { signInWithKakao } from "@/actions/kakao.action";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import style from "./page.module.css";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleOauth = async (token: string) => {
    const data = await signInWithKakao({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      token,
    });
  };

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      handleOauth(code).then(() => router.replace("/"));
    }
  }, [searchParams, router]);
  return <div className={style.kakao_login}>카카오 로그인 처리중...</div>;
};

export default Page;
