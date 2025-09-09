"use client";

import Link from "next/link";
import style from "./Nav.module.css";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout.action";

const Nav = ({
  path,
  image,
  isLoggedIn,
}: {
  path: string;
  image: string | undefined | null;
  isLoggedIn: boolean;
}) => {
  const router = useRouter();
  return (
    <div className={style.container}>
      {isLoggedIn ? (
        <DropdownMenu
          items={[
            { label: "마이페이지", onClick: () => router.push("/myprofile") },
            { label: "로그아웃", onClick: () => logout() },
          ]}
          size="M"
        >
          <div
            className={style.profile_image_container}
            style={{
              backgroundImage: image
                ? `"url('${image}')"`
                : "url('/assets/images/icon/profile.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </DropdownMenu>
      ) : (
        <Link className={style.login} href={"/login"}>
          로그인
        </Link>
      )}
      {path === "/" && !isLoggedIn && (
        <Link className={style.signup} href={"/signup"}>
          회원가입
        </Link>
      )}
    </div>
  );
};

export default Nav;
