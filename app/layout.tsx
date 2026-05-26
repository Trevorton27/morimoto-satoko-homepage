import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "森本さとこ | 徳島市議会議員",
  description:
    "徳島市議会議員 森本さとこ の公式サイト。「すべては子どもたちのために」を信念に、子育て・教育・地域の安心に取り組んでいます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
