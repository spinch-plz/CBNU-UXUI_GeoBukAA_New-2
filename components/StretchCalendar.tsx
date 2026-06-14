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

  const year = 2026;
  const month = 6;
  const first = new Date(year, month - 1, 1).getDay();
  const total = new Date(year, month, 0).getDate();
  const allCells: (number | null)[] = [
    ...Array(first).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  // 오늘 기준 2주(14칸)만 표시
  const todayDay = parseInt(todayDate.split("-")[2]);
  const todayIdx = first + todayDay - 1;
  const todayRow = Math.floor(todayIdx / 7);
  const startRow = Math.max(0, todayRow - 1);
  const cells = allCells.slice(startRow * 7, (startRow + 2) * 7);
  while (cells.length < 14) cells.push(null);

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
        {wds.map((w, i) => (
          <div className="wd" key={i}>
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
