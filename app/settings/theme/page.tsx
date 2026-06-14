"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import GeobugaLogo from "@/components/art/GeobugaLogo";

const THEMES = [
  { id: "coral", colors: ["#E97451", "#B0E0E6"] },
  { id: "blue",  colors: ["#4A90D9", "#F5F0E8"] },
  { id: "teal",  colors: ["#2A8C6E", "#F5F0E8"] },
];

export default function ThemePage() {
  const [selected, setSelected] = useState("coral");

  return (
    <AppShell brand={<GeobugaLogo className="brand-logo" />} showMenu>
      <img src="/b2_title.png" alt="테마 변경" style={{ width: "100%", display: "block" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {THEMES.map((t) => {
          const active = selected === t.id;
          return (
            <div key={t.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* 체크박스 행 */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  onClick={() => setSelected(t.id)}
                  style={{
                    width: 20, height: 20, borderRadius: 4,
                    border: "2px solid var(--coral-500)",
                    background: active ? "var(--coral-500)" : "transparent",
                    cursor: "pointer", display: "grid", placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {active && <span style={{ color: "white", fontSize: 13, lineHeight: 1 }}>✓</span>}
                </div>
                {active && (
                  <span style={{
                    fontSize: "var(--text-sm)", color: "var(--coral-500)",
                    fontWeight: "var(--fw-medium)",
                  }}>
                    현재 선택됨
                  </span>
                )}
              </div>

              {/* 테마 스와치 (대각선 분할) */}
              <div
                onClick={() => setSelected(t.id)}
                style={{
                  height: 80, borderRadius: "var(--radius-md)", cursor: "pointer",
                  background: `linear-gradient(135deg, ${t.colors[0]} 50%, ${t.colors[1]} 50%)`,
                  boxShadow: active ? "var(--outline)" : "var(--outline-thin)",
                }}
              />
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
