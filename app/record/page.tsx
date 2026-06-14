"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import GeobugaLogo from "@/components/art/GeobugaLogo";
import Icon from "@/components/Icon";
import StretchCalendar from "@/components/StretchCalendar";
import { useTurtle } from "@/lib/store";
import { BADGES } from "@/lib/seed";
import Img from "@/components/Img";

export default function RecordPage() {
  const { history, badges, dayIndex } = useTurtle();
  const [showAll, setShowAll] = useState(false);

  const todayDate = `2026-06-${String(7 + (dayIndex - 7)).padStart(2, "0")}`;
  const earnedBadges = BADGES.filter((b) => badges.includes(b.id));
  const visibleBadges = showAll ? BADGES : BADGES.slice(0, 4);

  return (
    <AppShell brand={<GeobugaLogo className="brand-logo" />} showMenu>
      {/* 타이틀 배너 */}
      <Img
        src="/d_title.png"
        alt="나 이런 거북이야!"
        style={{ width: "100%", display: "block" }}
      />

      {/* 거북이 상태 카드 — D_condition.svg */}
      <Img
        src="/d-condition.svg"
        alt="거북이 상태"
        style={{ width: "100%", display: "block", borderRadius: "var(--radius-md)" }}
      />

      {/* 스트레칭 달력 */}
      <div className="section-title">스트레칭 달력</div>
      <StretchCalendar records={history} todayDate={todayDate} />

      {/* 배지 */}
      <div className="row-between" style={{ marginBottom: -6 }}>
        <div className="section-title" style={{ margin: 0 }}>뱃지</div>
        <span style={{ fontSize: "var(--text-sm)", color: "var(--coral-500)", fontWeight: "var(--fw-medium)" }}>
          {earnedBadges.length}개 수집
        </span>
      </div>
      <div style={{ boxShadow: "var(--outline)", borderRadius: "var(--radius-md)", padding: "18px 18px 12px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {visibleBadges.map((b) => {
            const owned = badges.includes(b.id);
            return (
              <div className="g-badge-wrap" key={b.id} title={b.desc}>
                <div className={`g-badge${owned ? "" : " g-badge--empty"}`}>
                  {owned && <Icon name={b.icon} />}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--coral-500)", fontSize: 16 }}
            onClick={() => setShowAll((v) => !v)}
            aria-label={showAll ? "접기" : "더보기"}
          >
            <i className={`fa-solid fa-chevron-${showAll ? "up" : "down"}`} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
