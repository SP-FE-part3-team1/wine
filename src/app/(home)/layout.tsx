import Header from "@/components/Header/Header";
import { ReactNode } from "react";
import style from "./layout.module.css";
import Nav from "./Nav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={style.header}>
        <Header rightBox={<Nav />} />
      </div>
      {children}
    </>
  );
};

export default Layout;
