"use client";
import { motion } from "framer-motion";
import type { TurtleStage } from "@/lib/types";
import Icon from "./Icon";

/** 거북이 → 사람 모핑 아바타 (D2). 자산 들어오면 .face 안을 교체. */
const STAGE: Record<TurtleStage, { icon: string; label: string; tilt: number }> = {
  turtle: { icon: "shoe-prints", label: "거북목 거북이", tilt: -18 },
  waking: { icon: "person-walking", label: "기지개 켜는 중", tilt: -8 },
  half: { icon: "child", label: "절반쯤 사람", tilt: -2 },
  human: { icon: "person", label: "바른 자세 사람!", tilt: 0 },
};

export default function TurtleAvatar({
  stage,
  size = 132,
}: {
  stage: TurtleStage;
  size?: number;
}) {
  const s = STAGE[stage];
  return (
    <div className="turtle-avatar">
      <motion.div
        className="face"
        style={{ width: size, height: size, fontSize: size * 0.45 }}
        key={stage}
        initial={{ rotate: s.tilt - 6, scale: 0.9 }}
        animate={{ rotate: s.tilt, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        <Icon name={s.icon} />
      </motion.div>
      <div className="stage-label">{s.label}</div>
    </div>
  );
}
