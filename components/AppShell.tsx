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

const NAV_ITEMS = [
  { label: "추구미 변경", href: "/settings/profile" },
  { label: "테마 변경", href: "/settings/theme" },
  { label: "상황별 알림 설정", href: "/settings/alerts" },
];

export default function AppShell({
  title, subtitle, brand, showMenu = false, back = false, hideNav = false, children,
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
  const { doneToday, logout } = useTurtle();
  const [noti, setNoti] = useState<NotiCard | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const triggerNoti = useCallback(() => {
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
              <button className="icon-btn" aria-label="뒤로" onClick={() => router.back()}>
                <Icon name="chevron-left" />
              </button>
            )}
            {brand ? brand : (
              <div>
                {title && <div className="app-title">{title}</div>}
                {subtitle && <div className="app-sub">{subtitle}</div>}
              </div>
            )}
          </div>
          {showMenu && (
            <button className="icon-btn" aria-label="메뉴" onClick={() => setMenuOpen(true)}>
              <Icon name="bars" />
            </button>
          )}
        </header>
      )}

      <main className="screen">{children}</main>

      {!hideNav && <BottomNav />}

      {/* 배경 오버레이 */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.18)",
            zIndex: 199,
          }}
        />
      )}

      {/* 슬라이드 메뉴 패널 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "72%",
          maxWidth: 340,
          height: "100dvh",
          background: "var(--color-bg)",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          padding: "48px 28px 52px",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden={!menuOpen}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="닫기"
          style={{
            alignSelf: "flex-end", background: "none", border: "none",
            cursor: "pointer", color: "var(--coral-500)", fontSize: 22,
          }}
        >
          <Icon name="xmark" />
        </button>

        <nav style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 32, marginTop: 40 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => { router.push(item.href); setMenuOpen(false); }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "var(--coral-500)", fontSize: "var(--text-xl)",
                fontWeight: "var(--fw-bold)",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => { logout(); router.push("/login"); setMenuOpen(false); }}
          style={{
            marginTop: "auto", alignSelf: "flex-end",
            background: "none", border: "none", cursor: "pointer",
            color: "var(--coral-500)", fontSize: "var(--text-base)",
            fontWeight: "var(--fw-medium)",
          }}
        >
          로그아웃
        </button>
      </div>

      <DevPanel onTriggerNoti={triggerNoti} />
      <NotificationCard card={noti} onClose={() => setNoti(null)} />
    </div>
  );
}
