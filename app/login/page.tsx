"use client";
import { useRouter } from "next/navigation";
import { useTurtle } from "@/lib/store";
import Img from "@/components/Img";

export default function LoginPage() {
  const router = useRouter();
  const login = useTurtle((s) => s.login);

  function go() {
    login();
    router.push("/home");
  }

  return (
    <div style={{
      width: "100dvw",
      height: "100dvh",
      background: "var(--blue-200, #B2D8D8)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "80px 32px 60px",
    }}>
      {/* 거북이 일러스트 + 타이틀 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Img
          src="/splash_icon1.png"
          alt="거북이"
          style={{ width: 180, height: 180, objectFit: "contain" }}
        />
        <Img
          src="/splash2.png"
          alt="거북아"
          style={{ width: "70%", maxWidth: 280, display: "block" }}
        />
      </div>

      {/* 소셜 로그인 버튼 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
        {/* 카카오 */}
        <button
          onClick={go}
          style={{
            width: "100%", padding: "16px 20px",
            borderRadius: 999, border: "none", cursor: "pointer",
            background: "#FEE500", color: "#191600",
            fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <span style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "#3B1D1D", color: "#FEE500",
            display: "grid", placeItems: "center",
            fontSize: 14, fontWeight: 900, flexShrink: 0,
          }}>
            K
          </span>
          <span style={{ flex: 1, textAlign: "center" }}>카카오로 시작하기</span>
        </button>

        {/* 구글 */}
        <button
          onClick={go}
          style={{
            width: "100%", padding: "16px 20px",
            borderRadius: 999, border: "1.5px solid #dadce0", cursor: "pointer",
            background: "#fff", color: "#1f1f1f",
            fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <span style={{
            width: 32, height: 32, flexShrink: 0,
            display: "grid", placeItems: "center",
          }}>
            <i className="fa-brands fa-google" style={{ fontSize: 20, color: "#4285F4" }} />
          </span>
          <span style={{ flex: 1, textAlign: "center" }}>Google로 시작하기</span>
        </button>

        {/* 애플 */}
        <button
          onClick={go}
          style={{
            width: "100%", padding: "16px 20px",
            borderRadius: 999, border: "none", cursor: "pointer",
            background: "#111", color: "#fff",
            fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <span style={{
            width: 32, height: 32, flexShrink: 0,
            display: "grid", placeItems: "center",
          }}>
            <i className="fa-brands fa-apple" style={{ fontSize: 22 }} />
          </span>
          <span style={{ flex: 1, textAlign: "center" }}>Apple로 시작하기</span>
        </button>
      </div>
    </div>
  );
}
