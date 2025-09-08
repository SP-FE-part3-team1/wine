"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Nav from "./Nav";
import style from "./layout.module.css";
import { components } from "@/types/types";
import { getUser } from "@/actions/api.action";

const ClientLayout = ({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const [user, setUser] = useState<components["schemas"]["User"]>();

  const handleUser = async () => {
    const data = await getUser();
    setUser(data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleUser();
    }
  }, [isLoggedIn]);

  return (
    <div
      className={
        pathname === "/login" || pathname === "/signup" ? "" : style.body
      }
    >
      {!(pathname === "/login" || pathname === "/signup") && (
        <div className={style.header}>
          <Header
            rightBox={
              <Nav
                path={pathname}
                image={user?.image}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default ClientLayout;
