"use client";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return <button onClick={() => router.replace("/")}>홈으로 돌아가기</button>;
};

export default NotFound;
