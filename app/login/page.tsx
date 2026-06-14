"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useTurtle } from "@/lib/store";

/** A1. 로그인 — SNS 로그인은 목업 버튼, 누르면 /home 으로 라우팅. */
export default function LoginPage() {
  const router = useRouter();
  const login = useTurtle((s) => s.login);

  function go() {
    login();
    router.push("/home");
  }

  const sns = [
    { name: "카카오톡", icon: "comment", bg: "#FEE500", fg: "#191600" },
    { name: "구글", icon: "google", bg: "#fff", fg: "#1f1f1f" },
    { name: "애플", icon: "apple", bg: "#111", fg: "#fff" },
  ];

  return (
    <div className="app-shell">
      <main
        className="screen"
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 26,
          paddingBottom: 40,
        }}
      >
        <div className="logo-slot" style={{ width: 200, height: 120 }}>
          <span className="ph-label">거북아 워드마크</span>
        </div>
        <div>
          <div className="app-title" style={{ fontSize: 30 }}>
            거북아
          </div>
          <div className="muted">거북이에서 사람으로, 바른 자세 습관</div>
        </div>

        <div className="stack" style={{ width: "100%", maxWidth: 320 }}>
          {sns.map((s) => (
            <button
              key={s.name}
              className="g-btn g-btn--block"
              style={{ background: s.bg, color: s.fg, boxShadow: "var(--outline-thin)" }}
              onClick={go}
            >
              <Icon name={s.icon} /> {s.name}으로 시작하기
            </button>
          ))}
          <button className="g-btn g-btn--outline g-btn--block" onClick={go}>
            자동 로그인 (기존 사용자)
          </button>
        </div>

        <Link href="/signup" className="muted" style={{ fontSize: "var(--text-sm)" }}>
          처음이신가요? <b style={{ color: "var(--coral-500)" }}>회원가입</b>
        </Link>
      </main>
    </div>
  );
}
