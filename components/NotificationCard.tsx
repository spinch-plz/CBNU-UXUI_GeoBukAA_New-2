"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { NotiCard } from "@/lib/types";
import { useTurtle } from "@/lib/store";
import Icon from "./Icon";

/**
 * 알림 서비스 (A_3_a) — 앱 미사용 중 알림 오버레이.
 * 규칙:
 *  - 반응 없으면 10초 뒤 자동 닫힘 → C_5B 에 "미반응" 기록
 *  - 알림 통해 앱 실행(CTA) → 추가 포인트 적립
 *  - 닫기 → 미반응 처리
 */
export default function NotificationCard({
  card,
  onClose,
}: {
  card: NotiCard | null;
  onClose: (reacted: boolean) => void;
}) {
  const router = useRouter();
  const reactToAlert = useTurtle((s) => s.reactToAlert);

  useEffect(() => {
    if (!card) return;
    const t = setTimeout(() => {
      reactToAlert(false); // 무반응 → 자동 닫힘
      onClose(false);
    }, 10000);
    return () => clearTimeout(t);
  }, [card, reactToAlert, onClose]);

  return (
    <AnimatePresence>
      {card && (
        <div className="noti-overlay">
          <motion.div
            className="noti-card"
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <div className="noti-top">
              <div className="noti-app">
                <Icon name="shoe-prints" style={{ transform: "rotate(-90deg)" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "var(--coral-300)", fontWeight: 600 }}>
                  Turtle · 지금
                </div>
                <div className="noti-msg">{card.message}</div>
              </div>
              <button
                className="icon-btn"
                style={{ width: 30, height: 30, fontSize: 13 }}
                aria-label="닫기"
                onClick={() => {
                  reactToAlert(false);
                  onClose(false);
                }}
              >
                <Icon name="xmark" />
              </button>
            </div>
            <button
              className="g-btn g-btn--primary g-btn--block"
              onClick={() => {
                reactToAlert(true); // 알림 통한 실행 → +포인트
                onClose(true);
                router.push("/stretch");
              }}
            >
              {card.cta}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
