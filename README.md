# Turtle 🐢 — 자세 교정 PWA (프로토타입)

거북목 → 바른 자세, **거북이에서 사람으로** 성장시키는 초저관여 자세교정 앱.
상위 폴더의 **거북아(Geobuga) 디자인 시스템**(코랄 #e97451 · 파우더블루 #b0e0e6)을 그대로 가져와 구현했습니다.

> **No API 프로토타입** — 서버·DB·푸시·자세센서 모두 미구현. 모든 데이터는 목업 + `localStorage`(Zustand persist)로 시뮬레이션합니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000  → /home 으로 진입
npm run build && npm start   # 프로덕션
```

## 스택

| 레이어 | 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) · TypeScript |
| 상태 | Zustand + persist → `localStorage` (`turtle-proto`) |
| 애니메이션 | Framer Motion (거북이→사람 모핑, 알림 슬라이드) |
| 스타일 | 거북아 디자인 토큰 + `.g-*` 컴포넌트 (`app/globals.css`) |
| 폰트·아이콘 | Pretendard · Font Awesome 6 (CDN) |
| PWA | `app/manifest.ts` + safe-area viewport |

## 화면 ↔ 라우트 (설계문서 IA 매핑)

| IA | 화면 | 라우트 |
|---|---|---|
| A1 | 로그인 | `/login` |
| A2/A3 | 회원가입 / 권한설정 | `/signup` |
| C | 홈 | `/home` |
| (C-진행) | 오늘의 스트레칭 | `/stretch` |
| D | 기록 · 레이밍거북이야 | `/record` |
| E | 추가운동 | `/challenge` |
| F | 리워드 상점 | `/store` |
| B1 | 회원정보(유형) | `/settings/profile` |
| B2 | 테마 | `/settings/theme` |
| B3 | 상황별 알림 | `/settings/alerts` |
| A_3_a | 알림 서비스 | `NotificationCard` 오버레이 + 데모 트리거 |

## 발표용 데모 장치

- **DevPanel** (우하단 🧪 버튼): 하루 넘기기 · 오늘 스트레칭 완료 · 포인트/자세시간 추가 · 보호권 사용 · 알림 띄우기 · 상태 초기화. 실제 시간을 기다리지 않고 게이미피케이션 루프 전체를 즉석 시연.
- **알림 오버레이**: 10초 무반응 시 자동 닫힘(미반응 기록), CTA로 실행 시 +포인트 — 설계문서 규칙 그대로.

## 핵심 규칙 구현 위치

- 포인트 적립 4종 · 연속일 보호권(3일마다 +1, 최대 2) · 캐릭터 단계 → `lib/store.ts`
- 데이터 명세(타입) → `lib/types.ts` · 목업 → `lib/seed.ts`

## 자산 교체 TODO

- `public/icons/icon.svg` → 실제 거북이 마스코트 PNG(192/512)
- `.logo-slot` 자리 → 손글씨 워드마크 / 마스코트 일러스트
