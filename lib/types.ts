/* ============================================================
   Turtle — 타입 = 명세 (specification)
   설계문서의 데이터/규칙을 코드 타입으로 옮긴다.
   ============================================================ */

/** 캐릭터 성장 단계: 거북이 → 사람 (D2 거북이→사람 UI) */
export type TurtleStage =
  | "turtle" // 거북목
  | "waking" // 막 펴기 시작
  | "half" // 절반쯤 사람
  | "human"; // 바른 자세 사람

/** 오늘의 스트레칭 진행 상태 (C3 아이콘 규칙) */
export type StretchStatus =
  | "done" // 진행 완료 → 부서진 불꽃
  | "pending" // 진행 전 → 회색 불꽃
  | "missed"; // 아예 진행하지 않음 → 거북이

/** 설정 > 사용자 유형 (B1) — 유형에 따라 알림·강도 기본값이 달라짐 */
export type UserType = "default" | "saver" | "intense";

/** 상황별 알림 모드 (B3) */
export type AlertMode = "focus" | "gaming" | "rest" | "auto";

/** 테마 (B2) */
export type Theme = "light" | "dark";

/** 포인트 적립 사유 (설계문서 5장 규칙) */
export type PointReason =
  | "stretch" // ① 오늘의 스트레칭 완료
  | "streakBonus" // ② 연속일수 보너스
  | "alertOpen" // ③ 알림 통한 앱 실행
  | "challenge"; // ④ 챌린지 성공

export interface PointEntry {
  reason: PointReason;
  amount: number;
  /** 'DAY+n' 표기를 위한 누적 일 인덱스 */
  day: number;
}

/** 알림 카드 정의 (A_3_a) */
export interface NotiCard {
  id: string;
  message: string;
  cta: string;
  /** 미진행 시 추가 노출되는 재촉 알림인지 */
  nudge?: boolean;
}

/** 달력의 하루 기록 (D3 스트레칭 달력) */
export interface DayRecord {
  /** YYYY-MM-DD */
  date: string;
  done: boolean;
  /** 보호권으로 건너뛴 날 */
  protectedDay?: boolean;
}

/** 배지 (D2/D4) */
export interface Badge {
  id: string;
  name: string;
  icon: string; // FontAwesome solid 이름 (fa-solid fa-<icon>)
  desc: string;
}

/** 상점 아이템 (F1) */
export interface ShopItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  kind: "decor" | "helper" | "protect";
  owned?: boolean;
}

/** 앱 전역 상태 (Zustand store) */
export interface TurtleState {
  /* 진행 지표 */
  streak: number; // 연속 스트레칭 일수
  point: number; // 보유 포인트
  protectTicket: number; // 연속일 보호권 (최대 2)
  postureMinutes: number; // 오늘 자세 유지 시간(분)
  alertCount: number; // 오늘 띄운 알림 수
  alertReacted: number; // 반응한 알림 수
  dayIndex: number; // DAY+N 의 N
  doneToday: boolean; // 오늘 스트레칭 완료 여부

  /* 컬렉션 */
  badges: string[]; // 획득한 배지 id
  ownedItems: string[]; // 보유한 상점 아이템 id
  history: DayRecord[]; // 달력 기록
  points: PointEntry[]; // 포인트 적립 로그

  /* 설정 */
  userType: UserType;
  theme: Theme;
  alertMode: AlertMode;
  alertFrequency: number; // 1~5 (스텝퍼)
  appNotiEnabled: boolean;
  loggedIn: boolean;

  /* 파생 */
  stage: () => TurtleStage;

  /* 액션 */
  completeStretch: () => void;
  reactToAlert: (viaNotification: boolean) => void;
  buyItem: (item: ShopItem) => boolean;
  useProtectTicket: () => boolean;
  setUserType: (t: UserType) => void;
  setTheme: (t: Theme) => void;
  setAlertMode: (m: AlertMode) => void;
  setAlertFrequency: (n: number) => void;
  setAppNoti: (on: boolean) => void;
  login: () => void;
  logout: () => void;

  /* 데모용 */
  addPoint: (n: number) => void;
  addPostureMinutes: (n: number) => void;
  nextDay: () => void;
  resetState: () => void;
}
