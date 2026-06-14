"use client";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import GeobugaLogo from "@/components/art/GeobugaLogo";
import TurtleFlame from "@/components/art/TurtleFlame";
import { useTurtle } from "@/lib/store";

/** C. 홈 (메인) — 연속 스트레칭 · 오늘의 스트레칭 진입 · 하루기록 */
export default function HomePage() {
  const router = useRouter();
  const {
    streak,
    dayIndex,
    doneToday,
    postureMinutes,
    alertCount,
    alertReacted,
  } = useTurtle();

  const hours = (postureMinutes / 60).toFixed(1);
  const postPct = Math.min(100, Math.round((postureMinutes / 480) * 100));
  const reactPct = alertCount ? Math.round((alertReacted / alertCount) * 100) : 0;

  return (
    <AppShell brand={<GeobugaLogo className="brand-logo" />} showMenu>
      {/* 3. 오늘의 스트레칭 DAY+N — 연속일수 hero (디자인 C: 일러스트 + DAY+N만) */}
      <div className="g-card--hero">
        <TurtleFlame className="hero-illust" />
        <div className="hero-num">DAY + {streak}</div>
      </div>

      {/* 4. 오늘의 스트레칭 진행 탭 (banner + play → /stretch) */}
      <div
        className="g-banner"
        role="button"
        onClick={() => (doneToday ? router.push("/challenge") : router.push("/stretch"))}
        style={{ cursor: "pointer" }}
      >
        <div className="b-watermark">
          <Icon name="dumbbell" />
        </div>
        <div className="b-title">
          {doneToday ? (
            <>
              오늘 운동 끝!
              <br />
              추가 운동 하시려구요?
            </>
          ) : (
            <>
              오늘의 스트레칭을
              <br />
              진행하세요!
            </>
          )}
        </div>
        <button className="g-play" aria-label="시작">
          <Icon name="play" />
        </button>
      </div>

      {/* 5. 하루기록 */}
      <div className="section-title">하루기록</div>
      <div className="grid-2">
        <div className="g-stat">
          <div className="s-top">
            <div className="s-icon">
              <Icon name="chair" />
            </div>
            <div className="s-label">자세 유지</div>
          </div>
          <div className="s-value">
            {hours} <small>시간</small>
          </div>
          <div className="g-progress">
            <i style={{ width: `${postPct}%` }} />
          </div>
        </div>

        <div className="g-stat">
          <div className="s-top">
            <div className="s-icon">
              <Icon name="bell" />
            </div>
            <div className="s-label">알림에 반응</div>
          </div>
          <div className="s-value">
            {alertReacted}/{alertCount} <small>하루</small>
          </div>
          <div className="g-progress">
            <i style={{ width: `${reactPct}%` }} />
          </div>
        </div>
      </div>

      <div className="muted" style={{ fontSize: "var(--text-xs)", textAlign: "center" }}>
        DAY+{dayIndex} · 화면이 켜져 있고 폰이 60~90°로 세워진 시간이 자세 유지로 집계돼요
      </div>
    </AppShell>
  );
}
