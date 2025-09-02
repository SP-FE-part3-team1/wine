import Button from "@/components/Button/Button";
import style from "./page.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <div className={style.container}>
      <div className={style.banner}></div>
      <div className={style.card_container}>
        <div className={style.card_1}></div>
        <div className={style.card_2}></div>
        <div className={style.card_3}></div>
      </div>
      <div className={style.btn_container}>
        <Link href={"/wines"}>
          <Button className={style.btn}>와인 보러가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
