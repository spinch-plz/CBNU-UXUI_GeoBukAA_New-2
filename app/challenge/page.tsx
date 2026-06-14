"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import { useTurtle } from "@/lib/store";
import { STRETCHES } from "@/lib/seed";

/** E. 추가운동 — "오늘 더 하실게요?". 오늘 분량 외 추가 가이드, 성공 시 포인트. */
export default function ChallengePage() {
  const router = useRouter();
  const addPoint = useTurtle((s) => s.addPoint);
  const [doneIds, setDoneIds] = useState<string[]>([]);

  function complete(id: string, reward: number) {
    if (doneIds.includes(id)) return;
    setDoneIds((d) => [...d, id]);
    addPoint(reward);
  }

  const challenges = STRETCHES.map((s, i) => ({
    ...s,
    reward: 15 + i * 5,
  }));

  return (
    <AppShell title="추가 운동" subtitle="오늘 더 하실게요?">
      <div className="g-banner">
        <div className="b-watermark"><Icon name="fire" /></div>
        <div className="b-title">
          오늘의 스트레칭보다
          <br />한 걸음 더!
        </div>
        <button className="g-play" aria-label="시작" onClick={() => router.push("/stretch")}>
          <Icon name="play" />
        </button>
      </div>

      <div className="section-title">추가 챌린지</div>
      <div className="stack">
        {challenges.map((c) => {
          const done = doneIds.includes(c.id);
          return (
            <div
              className="card"
              key={c.id}
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <div className="g-tile">
                <Icon name={c.icon} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "var(--coral-500)" }}>{c.name}</div>
                <div className="g-points" style={{ fontSize: "var(--text-sm)" }}>
                  <span className="coin" style={{ width: 18, height: 12 }} />+{c.reward}
                </div>
              </div>
              <button
                className={`g-btn ${done ? "g-btn--outline" : "g-btn--primary"}`}
                style={{ padding: "10px 18px", fontSize: 14 }}
                disabled={done}
                onClick={() => complete(c.id, c.reward)}
              >
                {done ? "완료" : "도전"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="muted" style={{ fontSize: "var(--text-xs)", textAlign: "center" }}>
        추가 운동을 많이 할수록 거북이가 더 빠르게 사람으로 변해요
      </div>
    </AppShell>
  );
}
