"use client";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import { useTurtle } from "@/lib/store";
import type { AlertMode } from "@/lib/types";

/** B3. 상황별 알림 설정 — 방해금지/게이밍/휴식·이동/자동, 알림 주기 스텝퍼. */
const MODES: { id: AlertMode; name: string; icon: string; desc: string }[] = [
  { id: "auto", name: "자동", icon: "wand-magic-sparkles", desc: "상황을 추정해 알아서" },
  { id: "focus", name: "방해 금지", icon: "moon", desc: "알림을 보류" },
  { id: "gaming", name: "게이밍", icon: "gamepad", desc: "게임 중엔 최소화" },
  { id: "rest", name: "휴식·이동", icon: "person-walking", desc: "가볍게 자주" },
];

export default function AlertsPage() {
  const { alertMode, setAlertMode, alertFrequency, setAlertFrequency, appNotiEnabled, setAppNoti } =
    useTurtle();

  return (
    <AppShell title="설정" subtitle="상황별 알림" back hideNav>
      {/* 전체 토글 */}
      <div className="card row-between">
        <div>
          <div style={{ fontWeight: 700, color: "var(--coral-500)" }}>앱 알림</div>
          <div className="muted" style={{ fontSize: "var(--text-xs)" }}>
            끄면 모든 자세 알림이 멈춰요
          </div>
        </div>
        <button
          aria-pressed={appNotiEnabled}
          onClick={() => setAppNoti(!appNotiEnabled)}
          style={{
            width: 52,
            height: 30,
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            background: appNotiEnabled ? "var(--coral-500)" : "var(--gray-300)",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 3,
              left: appNotiEnabled ? 25 : 3,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#fff",
              transition: "left var(--dur) var(--ease)",
            }}
          />
        </button>
      </div>

      <div className="section-title">상황 모드</div>
      <div className="grid-2">
        {MODES.map((m) => {
          const active = alertMode === m.id;
          return (
            <button
              key={m.id}
              className="card"
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                opacity: appNotiEnabled ? 1 : 0.5,
                boxShadow: active ? "var(--outline)" : "var(--outline-thin)",
                background: active ? "var(--coral-100)" : "transparent",
              }}
              disabled={!appNotiEnabled}
              onClick={() => setAlertMode(m.id)}
            >
              <div className="row-between">
                <div className="s-icon" style={{ width: 36, height: 36, borderRadius: 999, background: "var(--coral-500)", color: "var(--blue-200)", display: "grid", placeItems: "center" }}>
                  <Icon name={m.icon} />
                </div>
                {active && <Icon name="check" />}
              </div>
              <div style={{ fontWeight: 700, color: "var(--coral-500)" }}>{m.name}</div>
              <div className="muted" style={{ fontSize: "var(--text-2xs)" }}>
                {m.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* 알림 주기 스텝퍼 1~5 */}
      <div className="section-title">하루 알림 주기</div>
      <div className="g-stepper" style={{ maxWidth: "100%", opacity: appNotiEnabled ? 1 : 0.5 }}>
        <div className="track">
          <i style={{ width: `${(alertFrequency / 5) * 100}%` }} />
        </div>
        <div className="dots">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`dot${n === alertFrequency ? " on" : ""}`}
              disabled={!appNotiEnabled}
              onClick={() => setAlertFrequency(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="muted" style={{ fontSize: "var(--text-xs)", textAlign: "center" }}>
        낮을수록 방해를 적게, 높을수록 더 자주 알려줘요
      </div>
    </AppShell>
  );
}
