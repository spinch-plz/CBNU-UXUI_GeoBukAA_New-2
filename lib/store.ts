/* ============================================================
   Turtle — 전역 상태 (Zustand + persist → localStorage)
   No API: 모든 데이터는 여기서 시뮬레이션.
   새로고침해도 상태 유지 → 발표 도중 깜빡 방지.
   ============================================================ */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShopItem, TurtleStage, TurtleState, UserType } from "./types";
import { SEED, seedHistory } from "./seed";

const PROTECT_MAX = 2;

/** 연속일수 → 캐릭터 단계 (설계문서: 진행↑ 거북이→사람) */
function stageFromStreak(streak: number, doneWeight: number): TurtleStage {
  const score = streak + doneWeight;
  if (score >= 14) return "human";
  if (score >= 8) return "half";
  if (score >= 3) return "waking";
  return "turtle";
}

/** 유형별 알림 주기 기본값 (B1) */
const TYPE_DEFAULT_FREQ: Record<UserType, number> = {
  default: 3,
  saver: 2,
  intense: 5,
};

export const useTurtle = create<TurtleState>()(
  persist(
    (set, get) => ({
      /* 진행 지표 */
      streak: SEED.streak,
      point: SEED.point,
      protectTicket: SEED.protectTicket,
      postureMinutes: SEED.postureMinutes,
      alertCount: SEED.alertCount,
      alertReacted: SEED.alertReacted,
      dayIndex: SEED.dayIndex,
      doneToday: SEED.doneToday,

      /* 컬렉션 */
      badges: ["first", "day7"],
      ownedItems: [],
      history: seedHistory(),
      points: [],

      /* 설정 */
      userType: "default",
      theme: "light",
      alertMode: "auto",
      alertFrequency: SEED.alertFrequency,
      appNotiEnabled: true,
      loggedIn: false,

      /* 파생 */
      stage: () => stageFromStreak(get().streak, get().doneToday ? 1 : 0),

      /* 액션 */
      completeStretch: () => {
        const s = get();
        if (s.doneToday) return;
        const nextStreak = s.streak + 1;
        // 3일 연속마다 보호권 1개 지급 (최대 2)
        const earnedTicket =
          nextStreak % 3 === 0 && s.protectTicket < PROTECT_MAX ? 1 : 0;
        // 연속일수 보너스: 길수록 +
        const bonus = Math.min(20, Math.floor(nextStreak / 3) * 5);
        set({
          doneToday: true,
          streak: nextStreak,
          point: s.point + 10 + bonus,
          protectTicket: s.protectTicket + earnedTicket,
          badges:
            nextStreak >= 100 && !s.badges.includes("day100")
              ? [...s.badges, "day100"]
              : s.badges,
          points: [
            ...s.points,
            { reason: "stretch", amount: 10, day: s.dayIndex },
            ...(bonus > 0
              ? [{ reason: "streakBonus" as const, amount: bonus, day: s.dayIndex }]
              : []),
          ],
        });
      },

      reactToAlert: (viaNotification) => {
        const s = get();
        const reward = viaNotification ? 5 : 0;
        set({
          alertReacted: s.alertReacted + 1,
          point: s.point + reward,
          points: viaNotification
            ? [...s.points, { reason: "alertOpen", amount: reward, day: s.dayIndex }]
            : s.points,
        });
      },

      buyItem: (item: ShopItem) => {
        const s = get();
        if (s.point < item.price || s.ownedItems.includes(item.id)) return false;
        const protectInc = item.kind === "protect" ? 1 : 0;
        set({
          point: s.point - item.price,
          ownedItems:
            item.kind === "protect" ? s.ownedItems : [...s.ownedItems, item.id],
          protectTicket: Math.min(PROTECT_MAX, s.protectTicket + protectInc),
        });
        return true;
      },

      useProtectTicket: () => {
        const s = get();
        if (s.protectTicket <= 0) return false;
        set({ protectTicket: s.protectTicket - 1 });
        return true;
      },

      setUserType: (t) =>
        set({ userType: t, alertFrequency: TYPE_DEFAULT_FREQ[t] }),
      setTheme: (t) => set({ theme: t }),
      setAlertMode: (m) => set({ alertMode: m }),
      setAlertFrequency: (n) => set({ alertFrequency: Math.max(1, Math.min(5, n)) }),
      setAppNoti: (on) => set({ appNotiEnabled: on }),
      login: () => set({ loggedIn: true }),
      logout: () => set({ loggedIn: false }),

      /* 데모용 (DevPanel) */
      addPoint: (n) => set((s) => ({ point: s.point + n })),
      addPostureMinutes: (n) =>
        set((s) => ({ postureMinutes: Math.max(0, s.postureMinutes + n) })),
      nextDay: () => {
        const s = get();
        // 오늘 완료 못 했으면 보호권으로 방어, 없으면 연속 끊김
        let streak = s.streak;
        let protectTicket = s.protectTicket;
        let protectedDay = false;
        if (!s.doneToday) {
          if (protectTicket > 0) {
            protectTicket -= 1;
            protectedDay = true;
          } else {
            streak = 0;
          }
        }
        set({
          dayIndex: s.dayIndex + 1,
          streak,
          protectTicket,
          doneToday: false,
          postureMinutes: 0,
          alertCount: 0,
          alertReacted: 0,
          history: [
            ...s.history,
            {
              date: `2026-06-${String(7 + (s.dayIndex - SEED.dayIndex) + 1).padStart(2, "0")}`,
              done: s.doneToday,
              protectedDay,
            },
          ],
        });
      },

      resetState: () =>
        set({
          streak: SEED.streak,
          point: SEED.point,
          protectTicket: SEED.protectTicket,
          postureMinutes: SEED.postureMinutes,
          alertCount: SEED.alertCount,
          alertReacted: SEED.alertReacted,
          dayIndex: SEED.dayIndex,
          doneToday: false,
          badges: ["first", "day7"],
          ownedItems: [],
          history: seedHistory(),
          points: [],
        }),
    }),
    { name: "turtle-proto" }
  )
);

export { stageFromStreak };
