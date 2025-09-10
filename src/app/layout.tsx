import localFont from "next/font/local";
import "./globals.css";
import "./reset.css";
import ClientLayout from "./ClientLayout";
import { hasToken } from "@/actions/hasToken.action";
import Script from "next/script";
import { ModalProvider } from "@/components/Modal";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await hasToken();

  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        <ModalProvider>
        <ClientLayout isLoggedIn={isLoggedIn}>{children}</ClientLayout>
        <div className="modal-root"></div>
        </ModalProvider>
      </body>
      <Script
        src={`https://t1.kakaocdn.net/kakao_js_sdk/${process.env.NEXT_PUBLIC_KAKAO_SDK_VERSION}/kakao.min.js`}
        integrity={process.env.NEXT_PUBLIC_KAKAO_INTEGRITY}
        crossOrigin="anonymous"
      />
    </html>
  );
}
