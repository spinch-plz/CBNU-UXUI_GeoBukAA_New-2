"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ICONS = [
  "/splash_icon1.png",
  "/splash_icon2.png",
  "/splash_icon3.png",
  "/splash_icon4.png",
  "/splash_icon5.png",
];

export default function SplashPage() {
  const router = useRouter();
  const [iconIdx, setIconIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    ICONS.forEach((_, i) => {
      if (i > 0) {
        timers.push(setTimeout(() => setIconIdx(i), i * 600));
      }
    });

    timers.push(setTimeout(() => setFading(true), ICONS.length * 600));
    timers.push(setTimeout(() => router.replace("/home"), ICONS.length * 600 + 300));

    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <div style={{
      width: "100dvw",
      height: "100dvh",
      background: "var(--blue-200, #B2D8D8)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      opacity: fading ? 0 : 1,
      transition: "opacity 300ms ease",
    }}>
      <img
        src="/splash1.png"
        alt="나 게북이 아니다"
        style={{ width: "55%", maxWidth: 240, display: "block" }}
      />
      <img
        src={ICONS[iconIdx]}
        alt="거북이"
        style={{ width: "48%", maxWidth: 200, display: "block" }}
      />
      <img
        src="/splash2.png"
        alt="거북아"
        style={{ width: "68%", maxWidth: 300, display: "block" }}
      />
    </div>
  );
}
