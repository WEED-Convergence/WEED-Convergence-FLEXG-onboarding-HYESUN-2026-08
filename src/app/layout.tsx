import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "플렉스지 판매자 온보딩 프로세스",
  description: "플렉스지(쇼핑몰 호스팅사) 판매자 온보딩 10단계 프로세스 안내",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
