"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import GeobugaLogo from "@/components/art/GeobugaLogo";
import Icon from "@/components/Icon";
import { useTurtle } from "@/lib/store";

const DECOR_ITEMS = [
  { id: "hat",     name: "멋쟁이 모자",     desc: "모자 하나 쓰실라우?",         icon: "hat-cowboy" },
  { id: "shell",   name: "윤기나는 등껍질", desc: "내꿈마련의 꿈",               icon: "shield" },
  { id: "shoes",   name: "힙하다 신발",     desc: "당당하게 걷기",               icon: "shoe-prints" },
  { id: "glasses", name: "지적인 안경",     desc: "느좋눈이로 변신",             icon: "glasses" },
];

const HELPER_ITEMS = [
  { id: "protect", name: "연속일수 보호 방패",  desc: "연속 스트레칭 일수를 보호하세요!",            icon: "shield-halved" },
  { id: "double",  name: "포인트 200% 물약",    desc: "30분동안 스트레칭 후 얻는 포인트가 두 배!",    icon: "flask" },
  { id: "box",     name: "랜덤 포인트 박스",    desc: "인생은 한번! 1~5000P 랜덤박스",              icon: "box" },
  { id: "ticket",  name: "랜덤 꾸밈요소 티켓", desc: "하루동안 사용 가능한 거북이 꾸밈요소를 랜덤으로!", icon: "ticket" },
];

export default function StorePage() {
  const { point } = useTurtle();
  const [tab, setTab] = useState<"decor" | "helper">("decor");
  const [toast, setToast] = useState<string | null>(null);

  const items = tab === "decor" ? DECOR_ITEMS : HELPER_ITEMS;

  function handleBuy(name: string) {
    setToast(`${name} 구매 완료!`);
    setTimeout(() => setToast(null), 1600);
  }

  return (
    <AppShell brand={<GeobugaLogo className="brand-logo" />} showMenu>
      {/* 타이틀 */}
      <img src="/f_title.png" alt="받아 마땅합니다" style={{ width: "100%", display: "block" }} />

      {/* 보유 포인트 */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6 }}>
        <span className="coin" />
        <span style={{ fontWeight: "var(--fw-bold)", color: "var(--coral-500)", fontSize: "var(--text-lg)" }}>
          {point.toLocaleString()}
        </span>
      </div>

      {/* 추천 배너 */}
      <div className="g-card" style={{
        background: "var(--coral-500)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: "24px 20px",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "var(--radius-md)",
          background: "rgba(255,255,255,0.2)",
          display: "grid", placeItems: "center",
          fontSize: 28, color: "var(--blue-200)",
        }}>
          <Icon name="question" />
        </div>
        <div style={{ color: "var(--blue-200)", fontWeight: "var(--fw-bold)", fontSize: "var(--text-base)", textAlign: "center" }}>
          랜덤 포인트 박스 30% 할인
        </div>
      </div>

      {/* 탭 */}
      <div style={{ display: "flex", boxShadow: "var(--outline)", borderRadius: "var(--radius-sm)", padding: 4, gap: 4 }}>
        <button
          onClick={() => setTab("decor")}
          style={{
            flex: 1, border: "none", cursor: "pointer", padding: "10px 8px",
            borderRadius: "var(--radius-xs)", fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-medium)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            background: tab === "decor" ? "var(--coral-500)" : "transparent",
            color: tab === "decor" ? "var(--blue-200)" : "var(--coral-500)",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          <Icon name="star" /> 거북이 꾸밈요소
        </button>
        <button
          onClick={() => setTab("helper")}
          style={{
            flex: 1, border: "none", cursor: "pointer", padding: "10px 8px",
            borderRadius: "var(--radius-xs)", fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-medium)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            background: tab === "helper" ? "var(--coral-500)" : "transparent",
            color: tab === "helper" ? "var(--blue-200)" : "var(--coral-500)",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          <Icon name="dumbbell" /> 스트레칭 도우미
        </button>
      </div>

      {/* 섹션 제목 */}
      <div className="section-title">
        {tab === "decor" ? "거북이 꾸밈요소" : "스트레칭 도우미"}
      </div>

      {/* 아이템 그리드 */}
      <div className="grid-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="g-card"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "20px 16px 16px", cursor: "pointer" }}
            onClick={() => handleBuy(item.name)}
          >
            <div className="g-tile g-tile--lg">
              <Icon name={item.icon} />
            </div>
            <div style={{ fontWeight: "var(--fw-bold)", color: "var(--coral-500)", textAlign: "center", fontSize: "var(--text-sm)" }}>
              {item.name}
            </div>
            <div className="muted" style={{ fontSize: "var(--text-xs)", textAlign: "center", lineHeight: 1.4 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 */}
      <button style={{
        width: "100%", background: "none", border: "none",
        boxShadow: "var(--outline)", borderRadius: "var(--radius-full)",
        padding: "14px", cursor: "pointer",
        color: "var(--coral-500)", fontWeight: "var(--fw-medium)", fontSize: "var(--text-sm)",
      }}>
        더보기 &gt;
      </button>

      {toast && (
        <div className="chip chip--fill" style={{
          position: "fixed", bottom: 110, left: "50%",
          transform: "translateX(-50%)", zIndex: 50, padding: "10px 18px",
        }}>
          {toast}
        </div>
      )}
    </AppShell>
  );
}
