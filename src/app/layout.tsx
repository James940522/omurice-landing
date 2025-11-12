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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&family=Jua&family=Nanum+Pen+Script&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
