"use client";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import { useTurtle } from "@/lib/store";
import type { UserType } from "@/lib/types";

/** B1. 회원정보(사용자 유형) 변경 — 유형에 따라 알림·강도 기본값이 바뀜. */
const TYPES: { id: UserType; name: string; icon: string; desc: string }[] = [
  { id: "default", name: "바른자세 지킴이", icon: "child", desc: "표준 알림 · 표준 강도" },
  { id: "saver", name: "여유 거북이", icon: "shoe-prints", desc: "방해 최소 · 부드러운 강도" },
  { id: "intense", name: "열정 거북이", icon: "fire", desc: "잦은 알림 · 높은 강도" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { userType, setUserType, logout, loggedIn } = useTurtle();

  const menu = [
    { label: "테마 설정", icon: "moon", href: "/settings/theme" },
    { label: "상황별 알림 설정", icon: "bell", href: "/settings/alerts" },
  ];

  return (
    <AppShell title="설정" subtitle="회원정보" back hideNav>
      <div className="section-title">내 유형</div>
      <div className="stack">
        {TYPES.map((t) => {
          const active = userType === t.id;
          return (
            <button
              key={t.id}
              className="card row-between"
              style={{
                cursor: "pointer",
                boxShadow: active ? "var(--outline)" : "var(--outline-thin)",
                background: active ? "var(--coral-100)" : "transparent",
                textAlign: "left",
              }}
              onClick={() => setUserType(t.id)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="g-tile" style={{ width: 48, height: 48, fontSize: 20 }}>
                  <Icon name={t.icon} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--coral-500)" }}>{t.name}</div>
                  <div className="muted" style={{ fontSize: "var(--text-xs)" }}>
                    {t.desc}
                  </div>
                </div>
              </div>
              {active && <Icon name="check" />}
            </button>
          );
        })}
      </div>

      <div className="section-title">다른 설정</div>
      <div className="stack">
        {menu.map((m) => (
          <button
            key={m.href}
            className="card row-between"
            style={{ cursor: "pointer", textAlign: "left" }}
            onClick={() => router.push(m.href)}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--coral-500)", fontWeight: 600 }}>
              <Icon name={m.icon} /> {m.label}
            </span>
            <Icon name="chevron-right" />
          </button>
        ))}
      </div>

      <button
        className="g-btn g-btn--outline g-btn--block"
        style={{ marginTop: 8 }}
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        {loggedIn ? "로그아웃" : "로그인 화면으로"}
      </button>
    </AppShell>
  );
}
