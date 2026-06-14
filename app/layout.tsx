import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeSync from "@/components/ThemeSync";

export const metadata: Metadata = {
  title: "Turtle — 자세 교정",
  description: "이중 관심 자세교정 · 거북이에서 사람으로",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Turtle" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // 노치 영역까지 → env(safe-area-inset-*) 활성화
  themeColor: "#e97451",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        {/* 디스플레이(손글씨) — 'DAY+N' 등 디자인 손글씨 문구 근사 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap"
        />
      </head>
      <body>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
