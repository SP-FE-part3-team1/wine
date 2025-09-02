"use client";

import localFont from "next/font/local";
import "./globals.css";
import "./reset.css";
import style from "./layout.module.css";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Nav from "./Nav";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        <div
          className={
            pathname === "/login" || pathname === "/signup" ? "" : style.body
          }
        >
          {!(pathname === "/login" || pathname === "/signup") && (
            <div className={style.header}>
              <Header rightBox={<Nav path={pathname} />} />
            </div>
          )}
          {children}
        </div>
        <div className="modal-root"></div>
      </body>
    </html>
  );
}
