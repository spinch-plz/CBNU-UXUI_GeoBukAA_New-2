"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import { useTurtle } from "@/lib/store";
import { STRETCHES } from "@/lib/seed";

/** C-진행. 오늘의 스트레칭 진행 (타이머). 완료 시 포인트 지급 → 결과 화면. */
export default function StretchPage() {
  const router = useRouter();
  const completeStretch = useTurtle((s) => s.completeStretch);
  const doneToday = useTurtle((s) => s.doneToday);
  const point = useTurtle((s) => s.point);

  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(STRETCHES[0].min); // 데모: 분→초로 짧게
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const beforePoint = useRef(point);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = STRETCHES[step];
  const isLast = step === STRETCHES.length - 1;

  useEffect(() => {
    if (!running || finished) return;
    timer.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          if (isLast) {
            finish();
          } else {
            setStep((p) => p + 1);
            setSeconds(STRETCHES[step + 1].min);
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, finished, step]);

  function finish() {
    if (timer.current) clearInterval(timer.current);
    beforePoint.current = useTurtle.getState().point;
    if (!doneToday) completeStretch();
    setFinished(true);
  }

  if (finished) {
    const earned = useTurtle.getState().point - beforePoint.current;
    return (
      <AppShell hideNav>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            paddingTop: 40,
          }}
        >
          <motion.div
            className="g-badge"
            style={{ width: 120, height: 120, fontSize: 52 }}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <Icon name="fire" />
          </motion.div>
          <div style={{ textAlign: "center" }}>
            <div className="app-title">오늘의 스트레칭 완료!</div>
            <div className="muted">거북이가 한 뼘 더 사람이 됐어요</div>
          </div>
          <div className="g-points" style={{ fontSize: 28 }}>
            <span className="coin" />+{earned > 0 ? earned : 10}
          </div>
          <div className="stack" style={{ width: "100%", maxWidth: 320 }}>
            <button
              className="g-btn g-btn--primary g-btn--block"
              onClick={() => router.push("/record")}
            >
              기록 보러 가기
            </button>
            <button
              className="g-btn g-btn--outline g-btn--block"
              onClick={() => router.push("/challenge")}
            >
              추가 운동 하기
            </button>
            <button
              className="g-btn g-btn--outline g-btn--block"
              onClick={() => router.push("/home")}
            >
              홈으로
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  const pct = Math.round(((current.min - seconds) / current.min) * 100);

  return (
    <AppShell title="오늘의 스트레칭" back hideNav>
      <div className="muted" style={{ textAlign: "center" }}>
        {step + 1} / {STRETCHES.length} 단계
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          marginTop: 12,
        }}
      >
        <motion.div
          key={step}
          className="g-tile g-tile--lg"
          style={{ width: 140, height: 140, fontSize: 60 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Icon name={current.icon} />
        </motion.div>
        <div className="app-title">{current.name}</div>
        <div className="hero-num" style={{ fontSize: 56, color: "var(--coral-500)", fontWeight: 700 }}>
          {seconds}
        </div>
        <div style={{ width: "100%", maxWidth: 320 }} className="g-progress">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="stack" style={{ marginTop: 28 }}>
        <div className="row" style={{ justifyContent: "center" }}>
          <button className="g-play" onClick={() => setRunning((r) => !r)} aria-label="일시정지">
            <Icon name={running ? "pause" : "play"} />
          </button>
        </div>
        <button className="g-btn g-btn--outline g-btn--block" onClick={finish}>
          바로 완료하기
        </button>
      </div>
    </AppShell>
  );
}
