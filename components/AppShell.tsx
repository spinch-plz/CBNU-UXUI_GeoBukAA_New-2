"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "./BottomNav";
import DevPanel from "./DevPanel";
import NotificationCard from "./NotificationCard";
import Icon from "./Icon";
import type { NotiCard } from "@/lib/types";
import { NOTI_CARDS, NUDGE_CARDS } from "@/lib/seed";
import { useTurtle } from "@/lib/store";

/**
 * 공용 앱 셸 — 헤더 + 스크롤 화면 + 하단 탭바 + (데모) DevPanel + 알림 오버레이.
 * 모바일 프레임(max 480) 안에서 모든 화면이 동작.
 */
export default function AppShell({
  title,
  subtitle,
  brand,
  showMenu = false,
  back = false,
  hideNav = false,
  children,
}: {
  title?: string;
  subtitle?: string;
  brand?: React.ReactNode;
  showMenu?: boolean;
  back?: boolean;
  hideNav?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const doneToday = useTurtle((s) => s.doneToday);
  const [noti, setNoti] = useState<NotiCard | null>(null);

  const triggerNoti = useCallback(() => {
    // 미진행 시 재촉 알림 풀을 섞어서 노출 (A_3_a)
    const pool = doneToday ? NOTI_CARDS : [...NOTI_CARDS, ...NUDGE_CARDS];
    const pick = pool[Math.floor((Date.now() / 1000) % pool.length)];
    setNoti(pick);
  }, [doneToday]);

  return (
    <div className="app-shell">
      {(title || brand || showMenu || back) && (
        <header className="app-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {back && (
              <button
                className="icon-btn"
                aria-label="뒤로"
                onClick={() => router.back()}
              >
                <Icon name="chevron-left" />
              </button>
            )}
            {brand ? (
              brand
            ) : (
              <div>
                {title && <div className="app-title">{title}</div>}
                {subtitle && <div className="app-sub">{subtitle}</div>}
              </div>
            )}
          </div>
          {showMenu && (
            <button
              className="icon-btn"
              aria-label="메뉴"
              onClick={() => router.push("/settings/profile")}
            >
              <Icon name="bars" />
            </button>
          )}
        </header>
      )}

      <main className="screen">{children}</main>

      {!hideNav && <BottomNav />}

      <DevPanel onTriggerNoti={triggerNoti} />
      <NotificationCard card={noti} onClose={() => setNoti(null)} />
    </div>
  );
}
