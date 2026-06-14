"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import { useTurtle } from "@/lib/store";

/** A2 회원가입 / A3 권한설정 — SNS 가입(목업) + 알림·SNS 동의 토글. */
export default function SignupPage() {
  const router = useRouter();
  const login = useTurtle((s) => s.login);
  const setAppNoti = useTurtle((s) => s.setAppNoti);
  const [appNoti, setAppNotiLocal] = useState(true);
  const [snsAgree, setSnsAgree] = useState(true);

  function Toggle({
    on,
    onClick,
    label,
    desc,
  }: {
    on: boolean;
    onClick: () => void;
    label: string;
    desc: string;
  }) {
    return (
      <div className="card row-between">
        <div>
          <div style={{ fontWeight: 700, color: "var(--coral-500)" }}>{label}</div>
          <div className="muted" style={{ fontSize: "var(--text-xs)" }}>
            {desc}
          </div>
        </div>
        <button
          aria-pressed={on}
          onClick={onClick}
          style={{
            width: 52,
            height: 30,
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            background: on ? "var(--coral-500)" : "var(--gray-300)",
            position: "relative",
            transition: "background var(--dur)",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 3,
              left: on ? 25 : 3,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#fff",
              transition: "left var(--dur) var(--ease)",
            }}
          />
        </button>
      </div>
    );
  }

  function finish() {
    setAppNoti(appNoti);
    login();
    router.push("/home");
  }

  return (
    <AppShell title="회원가입" back hideNav>
      <div className="logo-slot" style={{ height: 96 }}>
        <span className="ph-label">거북이 마스코트</span>
      </div>

      <div className="section-title">SNS로 가입</div>
      <div className="stack">
        {[
          { name: "카카오톡", icon: "comment" },
          { name: "구글", icon: "google" },
          { name: "애플", icon: "apple" },
        ].map((s) => (
          <button key={s.name} className="g-btn g-btn--outline g-btn--block">
            <Icon name={s.icon} /> {s.name}으로 가입
          </button>
        ))}
      </div>

      <div className="section-title" style={{ marginTop: 8 }}>
        권한 설정
      </div>
      <Toggle
        on={appNoti}
        onClick={() => setAppNotiLocal((v) => !v)}
        label="앱 알림 동의"
        desc="거북이가 스트레칭 시간을 알려줘요"
      />
      <Toggle
        on={snsAgree}
        onClick={() => setSnsAgree((v) => !v)}
        label="SNS 로그인 동의"
        desc="다음 접속부터 자동 로그인"
      />

      <button className="g-btn g-btn--primary g-btn--block" onClick={finish}>
        시작하기
      </button>
    </AppShell>
  );
}
