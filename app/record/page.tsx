"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import TurtleAvatar from "@/components/TurtleAvatar";
import StretchCalendar from "@/components/StretchCalendar";
import { useTurtle } from "@/lib/store";
import { BADGES } from "@/lib/seed";

/** D. 기록 — "레이밍거북이야". 거북이→사람 변화 · 달력 · 배지. */
export default function RecordPage() {
  const { streak, history, badges, alertReacted, point, dayIndex } = useTurtle();
  const stage = useTurtle((s) => s.stage());
  const [showAll, setShowAll] = useState(false);

  const doneCount = history.filter((h) => h.done).length + (useTurtle.getState().doneToday ? 1 : 0);
  const todayDate = `2026-06-${String(7 + (dayIndex - 7)).padStart(2, "0")}`;
  const earnedBadges = BADGES.filter((b) => badges.includes(b.id));
  const visibleBadges = showAll ? BADGES : BADGES.slice(0, 4);

  return (
    <AppShell title="기록" subtitle="레이밍거북이야 🐢">
      {/* 2. 거북이 → 사람 UI */}
      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <TurtleAvatar stage={stage} />
        <div className="g-progress" style={{ width: "100%" }}>
          <i
            style={{
              width: `${{ turtle: 15, waking: 45, half: 72, human: 100 }[stage]}%`,
            }}
          />
        </div>
        <div className="muted" style={{ fontSize: "var(--text-xs)", textAlign: "center" }}>
          연속 {streak}일 · 진행할수록 거북이가 사람으로 변해요. 빠지면 다시 거북이!
        </div>
      </div>

      {/* 누적 요약 */}
      <div className="grid-2">
        <div className="g-stat">
          <div className="s-top">
            <div className="s-icon"><Icon name="fire" /></div>
            <div className="s-label">진행한 날</div>
          </div>
          <div className="s-value">{doneCount} <small>일</small></div>
        </div>
        <div className="g-stat">
          <div className="s-top">
            <div className="s-icon"><Icon name="bell" /></div>
            <div className="s-label">반응한 알림</div>
          </div>
          <div className="s-value">{alertReacted} <small>회</small></div>
        </div>
      </div>

      {/* 3. 스트레칭 달력 */}
      <div className="section-title">스트레칭 달력</div>
      <StretchCalendar records={history} todayDate={todayDate} />

      {/* 4. 배지 */}
      <div className="row-between">
        <div className="section-title">획득한 배지 · {earnedBadges.length}</div>
        <button className="chip" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "접기" : "더보기"} <Icon name="chevron-right" />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {visibleBadges.map((b) => {
          const owned = badges.includes(b.id);
          return (
            <div className="g-badge-wrap" key={b.id} title={b.desc}>
              <div className={`g-badge${owned ? "" : " g-badge--empty"}`}>
                {owned && <Icon name={b.icon} />}
              </div>
              <span>{owned ? b.name : "미획득"}</span>
            </div>
          );
        })}
      </div>

      <div className="g-points" style={{ alignSelf: "center", marginTop: 6 }}>
        <span className="coin" /> {point.toLocaleString()} P 보유
      </div>
    </AppShell>
  );
}
