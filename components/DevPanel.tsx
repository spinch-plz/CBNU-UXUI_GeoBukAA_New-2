"use client";
import { useState } from "react";
import { useTurtle } from "@/lib/store";
import Icon from "./Icon";

/**
 * 데모용 컨트롤 패널 — 발표 시 거북이→사람 변화, 포인트 적립,
 * 연속일 증가를 즉석에서 보여주는 숨김 패널.
 * 실제 시간을 기다리지 않고 게이미피케이션 루프 전체를 시연.
 */
export default function DevPanel({
  onTriggerNoti,
}: {
  onTriggerNoti: () => void;
}) {
  const [open, setOpen] = useState(false);
  const s = useTurtle();

  return (
    <>
      <button
        className="dev-fab"
        aria-label="데모 패널"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="flask" />
      </button>
      {open && (
        <div className="dev-sheet">
          <h4>🐢 Dev Panel · 발표용 데모</h4>
          <div className="dev-grid">
            <button onClick={() => s.completeStretch()}>오늘 스트레칭 완료</button>
            <button onClick={() => s.nextDay()}>하루 넘기기</button>
            <button onClick={() => s.addPoint(500)}>포인트 +500</button>
            <button onClick={() => s.addPostureMinutes(30)}>자세시간 +30분</button>
            <button onClick={() => s.useProtectTicket()}>보호권 사용</button>
            <button onClick={onTriggerNoti}>알림 띄우기</button>
            <button onClick={() => s.resetState()} style={{ gridColumn: "span 2" }}>
              상태 초기화
            </button>
          </div>
          <div className="dev-readout">
            DAY+{s.dayIndex} · streak {s.streak} · point {s.point.toLocaleString()} ·
            protect {s.protectTicket} · posture {s.postureMinutes}m · stage{" "}
            {s.stage()} · done {String(s.doneToday)}
          </div>
        </div>
      )}
    </>
  );
}
