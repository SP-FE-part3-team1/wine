import Button from "@/components/Button/Button";
import Image from "next/image";
import font from "@/app/fonts.module.css";

const ButtonTest = () => {
  return (
    <div>
      <h1 style={{ margin: "2rem 6rem", fontWeight: "700" }}>!사용 예시!</h1>

      <div style={{ display: "flex", gap: "1.2rem", margin: "1rem 6rem" }}>
        <Button
          variant="primary"
          radius={100}
          className={font["text-md-semibold"]}
          style={{ width: "27.9rem", height: "5rem" }}
        >
          와인 보러가기
        </Button>
      </div>

      <div style={{ display: "flex", gap: "1.2rem", margin: "1rem 6rem" }}>
        <Button
          variant="primary"
          radius={12}
          className={font["text-md-semibold"]}
          style={{ width: "30.3rem", height: "4.8rem" }}
        >
          가입하기
        </Button>

        <Button
          variant="primary"
          radius={12}
          className={font["text-md-semibold"]}
          style={{ width: "30.3rem", height: "4.8rem" }}
        >
          로그인
        </Button>
      </div>

      <div style={{ display: "flex", gap: "1.2rem", margin: "1rem 6rem" }}>
        <Button
          variant="secondary"
          radius={12}
          className={font["text-lg-semibold"]}
          style={{ width: "9.6rem", height: "5.4rem" }}
        >
          취소
        </Button>
        <Button
          variant="primary"
          radius={12}
          className={font["text-lg-semibold"]}
          style={{ width: "22.3rem", height: "5.4rem" }}
        >
          와인 등록하기
        </Button>
      </div>

      <div style={{ display: "flex", gap: "1.2rem", margin: "1rem 6rem" }}>
        <Button
          variant="ghost"
          radius={12}
          className={font["text-lg-semibold"]}
          style={{ width: "15.6rem", height: "5rem" }}
        >
          취소
        </Button>
        <Button
          variant="primary"
          radius={12}
          className={font["text-lg-semibold"]}
          style={{ width: "15.6rem", height: "5rem" }}
        >
          삭제하기
        </Button>
      </div>

      <div style={{ display: "flex", gap: "1.2rem", margin: "1rem 6rem" }}>
        <h1>SVG 그대로 사용</h1>
        <Button
          variant="icon"
          ariaLabel="닫기"
          radius={16}
          style={{ width: "6rem", height: "6rem" }}
        >
          <Image
            src="/assets/images/icon/close.svg"
            alt=""
            width={20} // 여기만 px 유지 가능 (Next/Image 필수 prop)
            height={20}
          />
        </Button>
      </div>

      <div style={{ display: "flex", gap: "1.2rem", margin: "1rem 6rem" }}>
        <h1>색상 변경</h1>
        <Button
          variant="icon"
          ariaLabel="닫기"
          radius={16}
          style={{ width: "6rem", height: "6rem", color: "#6a43db" }}
        >
          <svg
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.9998 13.3998L7.0998 18.2998C6.91647 18.4831 6.68314 18.5748 6.3998 18.5748C6.11647 18.5748 5.88314 18.4831 5.6998 18.2998C5.51647 18.1165 5.4248 17.8831 5.4248 17.5998C5.4248 17.3165 5.51647 17.0831 5.6998 16.8998L10.5998 11.9998L5.6998 7.0998C5.51647 6.91647 5.4248 6.68314 5.4248 6.3998C5.4248 6.11647 5.51647 5.88314 5.6998 5.6998C5.88314 5.51647 6.11647 5.4248 6.3998 5.4248C6.68314 5.4248 6.91647 5.51647 7.0998 5.6998L11.9998 10.5998L16.8998 5.6998C17.0831 5.51647 17.3165 5.4248 17.5998 5.4248C17.8831 5.4248 18.1165 5.51647 18.2998 5.6998C18.4831 5.88314 18.5748 6.11647 18.5748 6.3998C18.5748 6.68314 18.4831 6.91647 18.2998 7.0998L13.3998 11.9998L18.2998 16.8998C18.4831 17.0831 18.5748 17.3165 18.5748 17.5998C18.5748 17.8831 18.4831 18.1165 18.2998 18.2998C18.1165 18.4831 17.8831 18.5748 17.5998 18.5748C17.3165 18.5748 17.0831 18.4831 16.8998 18.2998L11.9998 13.3998Z" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ButtonTest;
