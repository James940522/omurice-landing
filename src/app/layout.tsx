import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘은 오므라이스 - 국내 1위 오므라이스 프랜차이즈",
  description: "1년만에 가맹점 100호점 돌파! 월매출 1억 5천 실제 달성. 성공적인 창업을 함께하는 오늘은 오므라이스",
  keywords: "오므라이스, 프랜차이즈, 창업, 배달음식, 맛집, 오늘은오므라이스",
  openGraph: {
    title: "오늘은 오므라이스 - 국내 1위 오므라이스 프랜차이즈",
    description: "1년만에 가맹점 100호점 돌파! 월매출 1억 5천 실제 달성",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
