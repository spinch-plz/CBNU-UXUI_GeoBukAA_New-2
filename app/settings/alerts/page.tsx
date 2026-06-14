"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import GeobugaLogo from "@/components/art/GeobugaLogo";

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      aria-pressed={value}
      style={{
        width: 52, height: 30, borderRadius: 999, border: "none",
        background: value ? "var(--coral-500)" : "var(--coral-200, #f0c4b4)",
        position: "relative", cursor: "pointer", flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <span style={{
        position: "absolute", top: 3,
        left: value ? 25 : 3,
        width: 24, height: 24, borderRadius: "50%",
        background: "#fff",
        transition: "left 0.2s",
        display: "block",
      }} />
    </button>
  );
}

const MODES = [
  {
    id: "dnd",
    icon: "/b3_icon_DND.svg",
    name: "방해금지모드",
    desc: "활성화 시 모든 알림이 울리지 않습니다.",
  },
  {
    id: "move",
    icon: "/b3_icon_walk.svg",
    name: "이동모드",
    desc: "스마트폰을 보며 이동하는 상황을 위한 모드입니다.\n화면이 바닥을 향해 일정 각도 이상\n오랫동안 기울어져 있으면,\n햅틱 피드백을 통해 고개를 들게 유도합니다.",
  },
  {
    id: "rest",
    icon: "/b3_icon_rast.svg",
    name: "휴식모드",
    desc: "누워서 스마트폰을 사용하는 상황을 위한 모드입니다.\n기기가 수평으로 누워있을 때,\n휴식 상태로 인지하여 알림을 일시 정지합니다.",
  },
];

export default function AlertsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    dnd: false, move: false, rest: false,
  });

  function toggle(id: string, v: boolean) {
    setToggles((prev) => ({ ...prev, [id]: v }));
  }

  return (
    <AppShell brand={<GeobugaLogo className="brand-logo" />} showMenu>
      <img src="/b3_title.png" alt="상황별 알림 설정" style={{ width: "100%", display: "block" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {MODES.map((m) => (
          <div key={m.id} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <img src={m.icon} alt={m.name} style={{ width: 24, height: 24, objectFit: "contain" }} />
                <span style={{
                  fontWeight: "var(--fw-bold)", color: "var(--coral-500)",
                  fontSize: "var(--text-base)",
                }}>
                  {m.name}
                </span>
              </div>
              <div style={{ fontSize: "var(--text-sm)", lineHeight: 1.65, whiteSpace: "pre-line", color: "#E97451" }}>
                {m.desc}
              </div>
            </div>
            <Toggle value={toggles[m.id]} onChange={(v) => toggle(m.id, v)} />
          </div>
        ))}
      </div>
    </AppShell>
  );
}
