"use client";
import type { DayRecord } from "@/lib/types";

/** D3. 스트레칭 달력 — 기록한 날 링, 오늘 채움, 보호권 날은 점선 느낌(muted). */
export default function StretchCalendar({
  records,
  todayDate,
}: {
  records: DayRecord[];
  todayDate: string; // YYYY-MM-DD
}) {
  const doneSet = new Map(records.map((r) => [r.date, r]));
  const wds = ["S", "M", "T", "W", "T", "F", "S"];

  // 2026년 6월 고정 그리드 (데모)
  const year = 2026;
  const month = 6;
  const first = new Date(year, month - 1, 1).getDay();
  const total = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(first).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  return (
    <div className="g-cal" style={{ maxWidth: "100%" }}>
      <div className="cal-head">
        <div className="cal-nav">
          <button aria-label="이전 달">
            <i className="fa-solid fa-chevron-left" />
          </button>
        </div>
        <div className="cal-title">2026년 6월</div>
        <div className="cal-nav">
          <button aria-label="다음 달">
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>
      <div className="cal-grid">
        {wds.map((w) => (
          <div className="wd" key={w}>
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div className="day muted" key={`e${i}`} />;
          const date = `${year}-06-${String(d).padStart(2, "0")}`;
          const rec = doneSet.get(date);
          let cls = "day";
          if (date === todayDate) cls += " today";
          else if (rec?.done) cls += " ring";
          else if (rec?.protectedDay) cls += " muted";
          return (
            <div className={cls} key={date}>
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}
