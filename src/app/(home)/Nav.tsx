import Link from "next/link";
import style from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={style.container}>
      <Link className={style.login} href={"/login"}>
        로그인
      </Link>
      <Link className={style.signup} href={"/signup"}>
        회원가입
      </Link>
    </div>
  );
};

export default Nav;
