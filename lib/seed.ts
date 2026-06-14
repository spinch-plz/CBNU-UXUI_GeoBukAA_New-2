/* ============================================================
   Turtle — 목업(seed) 데이터
   API가 없으므로 초기 화면이 비어 보이지 않게 표준 더미값 제공.
   ============================================================ */
import type { Badge, DayRecord, NotiCard, ShopItem } from "./types";

/** 초기 진행 상태 (설계문서 예시값) */
export const SEED = {
  streak: 7,
  point: 23750,
  protectTicket: 1,
  postureMinutes: 252, // 4.2시간
  alertCount: 6,
  alertReacted: 5,
  dayIndex: 7,
  doneToday: false,
  alertFrequency: 3,
};

/** 알림 카드 — 기본형 (A_3_a) */
export const NOTI_CARDS: NotiCard[] = [
  { id: "n1", message: "거북이가 친구하재요!", cta: "오늘의 스트레칭 하러 가기" },
  { id: "n2", message: "거북이가 되고 싶으세요?", cta: "사람 되러 가기" },
  { id: "n3", message: "플리퍼라잉", cta: "허리 곧게 펴러 가기" },
];

/** 알림 카드 — 미진행 시 추가 재촉 */
export const NUDGE_CARDS: NotiCard[] = [
  { id: "g1", message: "스트레칭의 시간!!", cta: "오늘의 스트레칭 하러 가기", nudge: true },
  { id: "g2", message: "포기란 없다", cta: "DAY+n 을 지키러 가기", nudge: true },
];

/** 부위별 스트레칭 (홈 진행 / 챌린지) */
export const STRETCHES = [
  { id: "neck", name: "거북목 탈출", icon: "brain", min: 3 },
  { id: "back", name: "허리 곧게", icon: "bone", min: 4 },
  { id: "shoulder", name: "어깨 열기", icon: "child", min: 3 },
  { id: "core", name: "코어 깨우기", icon: "dna", min: 5 },
];

/** 배지 (D2/D4) */
export const BADGES: Badge[] = [
  { id: "first", name: "첫 걸음", icon: "shoe-prints", desc: "거북이가 친구하잤고 하겠다!" },
  { id: "day7", name: "일주일", icon: "fire", desc: "스트레칭 7일 달성!" },
  { id: "day100", name: "백일", icon: "crown", desc: "스트레칭 100일 달성!" },
  { id: "morning", name: "아침형", icon: "sun", desc: "아침에 스트레칭 5회" },
  { id: "human", name: "이젠 사람?", icon: "child", desc: "거북이에서 사람으로!" },
  { id: "water", name: "수분왕", icon: "droplet", desc: "꾸준함의 증표" },
];

/** 상점 아이템 (F1) */
export const SHOP_ITEMS: ShopItem[] = [
  { id: "hat", name: "카우보이 모자", icon: "hat-cowboy", price: 1200, kind: "decor" },
  { id: "glasses", name: "동그란 안경", icon: "glasses", price: 900, kind: "decor" },
  { id: "spa", name: "스파 세트", icon: "spa", price: 1500, kind: "decor" },
  { id: "helper", name: "스트레칭 도우미", icon: "dumbbell", price: 2000, kind: "helper" },
  { id: "flask", name: "활력 물약", icon: "flask", price: 800, kind: "helper" },
  { id: "protect", name: "연속일 보호권", icon: "shield-halved", price: 2500, kind: "protect" },
];

/** 초기 달력 기록 — 이번 달 일부를 채워둠 */
export function seedHistory(): DayRecord[] {
  // 표준 더미: 최근 며칠 기록 (요일 무관, 데모용)
  const days = ["01", "02", "04", "05", "06", "07"];
  return days.map((d) => ({ date: `2026-06-${d}`, done: true }));
}
