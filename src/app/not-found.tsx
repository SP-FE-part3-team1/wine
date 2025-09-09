"use client";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <Button
        style={{
          padding: "12px 16px",
          borderRadius: "8px",
        }}
        onClick={() => router.replace("/")}
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound;
