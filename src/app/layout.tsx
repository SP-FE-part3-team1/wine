"use client";

import localFont from "next/font/local";
import "./globals.css";
import "./reset.css";
import style from "./layout.module.css";
import { usePathname } from "next/navigation";

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
          {children}
        </div>
        <div className="modal-root"></div>
      </body>
    </html>
  );
}
