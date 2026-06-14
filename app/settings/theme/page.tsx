"use client";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import { useTurtle } from "@/lib/store";
import type { Theme } from "@/lib/types";

/** B2. 테마 설정 — 라이트 / 다크. */
export default function ThemePage() {
  const { theme, setTheme } = useTurtle();

  const options: { id: Theme; name: string; icon: string }[] = [
    { id: "light", name: "라이트", icon: "sun" },
    { id: "dark", name: "다크", icon: "moon" },
  ];

  return (
    <AppShell title="설정" subtitle="테마" back hideNav>
      <div className="section-title">화면 테마</div>
      <div className="grid-2">
        {options.map((o) => {
          const active = theme === o.id;
          return (
            <button
              key={o.id}
              className="card"
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: 24,
                boxShadow: active ? "var(--outline)" : "var(--outline-thin)",
                background: active ? "var(--coral-100)" : "transparent",
              }}
              onClick={() => setTheme(o.id)}
            >
              <div className="g-tile g-tile--lg">
                <Icon name={o.icon} />
              </div>
              <div style={{ fontWeight: 700, color: "var(--coral-500)" }}>{o.name}</div>
              {active && (
                <span className="chip chip--fill">
                  <Icon name="check" /> 적용됨
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="muted" style={{ fontSize: "var(--text-xs)", textAlign: "center" }}>
        선택 즉시 앱 전체에 반영돼요
      </div>
    </AppShell>
  );
}
