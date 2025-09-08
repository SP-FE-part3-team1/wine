import localFont from "next/font/local";
import "./globals.css";
import "./reset.css";
import ClientLayout from "./ClientLayout";
import { hasToken } from "@/actions/hasToken.action";

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
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        <ClientLayout isLoggedIn={isLoggedIn}>{children}</ClientLayout>
        <div className="modal-root"></div>
      </body>
    </html>
  );
}
