"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import GeobugaLogo from "@/components/art/GeobugaLogo";
import Img from "@/components/Img";

// 고정된 캐릭터별 수치 (스테이터스에 따른 추구미)
const CHARACTERS = [
  { id: "posture", name: "바른자세 지킴이", img: "/b1_status_1.png", alertFreq: 3, intensity: 4 },
  { id: "super",   name: "슈퍼 거북이",     img: "/b1_status_2.png", alertFreq: 1, intensity: 1 },
];

// 인터랙티브 스텝퍼 (스테이터스 섹션용)
function Stepper({
  label, value, onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - 1) / 4) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: "var(--text-sm)", color: "var(--coral-500)", fontWeight: "var(--fw-medium)" }}>
        {label}
      </div>
      <div className="g-progress">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            style={{
              width: 30, height: 30, borderRadius: "50%",
              border: "2px solid var(--coral-500)",
              background: n === value ? "var(--coral-500)" : "transparent",
              color: n === value ? "var(--blue-200)" : "var(--coral-500)",
              cursor: "pointer", fontSize: "var(--text-sm)",
              fontWeight: "var(--fw-bold)", display: "grid", placeItems: "center",
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

// 고정 표시용 스텝퍼 (스테이터스에 따른 추구미 섹션용 — 클릭 불가)
function StepperFixed({ label, value }: { label: string; value: number }) {
  const pct = ((value - 1) / 4) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: "var(--text-sm)", color: "var(--coral-500)", fontWeight: "var(--fw-medium)" }}>
        {label}
      </div>
      <div className="g-progress">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            style={{
              width: 30, height: 30, borderRadius: "50%",
              border: "2px solid var(--coral-500)",
              background: n === value ? "var(--coral-500)" : "transparent",
              color: n === value ? "var(--blue-200)" : "var(--coral-500)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--fw-bold)", display: "grid", placeItems: "center",
            }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [alertFreq, setAlertFreq] = useState(3);
  const [intensity, setIntensity] = useState(4);

  const heroImg =
    alertFreq === 1 && intensity === 1 ? "/b1_hero_2.png" : "/b1_hero_1.png";

  return (
    <AppShell brand={<GeobugaLogo className="brand-logo" />} showMenu>
      <Img src="/b1_title.png" alt="추구미 변경" style={{ width: "100%", display: "block" }} />

      {/* 현재 추구미 히어로 */}
      <Img src={heroImg} alt="나의 추구미" style={{ width: "100%", display: "block", borderRadius: "var(--radius-md)" }} />

      {/* 스테이터스 — 인터랙티브 */}
      <div className="section-title">스테이터스</div>
      <div className="g-card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Stepper label="하루 알림 주기" value={alertFreq} onChange={setAlertFreq} />
        <Stepper label="오늘의 스트레칭 강도" value={intensity} onChange={setIntensity} />
      </div>

      {/* 스테이터스에 따른 추구미 — 고정값 */}
      <div className="section-title">스테이터스에 따른 추구미</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CHARACTERS.map((c) => (
          <div key={c.id} className="g-card" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <Img
              src={c.img}
              alt={c.name}
              style={{ width: 100, height: 100, objectFit: "contain", flexShrink: 0 }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
              <StepperFixed label="하루 알림 주기" value={c.alertFreq} />
              <StepperFixed label="오늘의 스트레칭 강도" value={c.intensity} />
            </div>
          </div>
        ))}
      </div>

      <button style={{
        width: "100%", background: "none", border: "none",
        boxShadow: "var(--outline)", borderRadius: "var(--radius-full)",
        padding: "14px", cursor: "pointer",
        color: "var(--coral-500)", fontWeight: "var(--fw-medium)", fontSize: "var(--text-sm)",
      }}>
        더보기 &gt;
      </button>
    </AppShell>
  );
}
