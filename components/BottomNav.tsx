"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "./Icon";

/** 하단 탭바 (6A~6D) — 알약형, active 시 코랄 확장 */
const TABS = [
  { href: "/home", icon: "house", label: "홈" },
  { href: "/record", icon: "chart-simple", label: "기록" },
  { href: "/challenge", icon: "dumbbell", label: "추가운동" },
  { href: "/store", icon: "store", label: "상점" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="bottom-dock">
      <div className="g-tabbar" role="tablist">
        {TABS.map((t) => {
          const active = pathname.startsWith(t.href);
          return (
            <button
              key={t.href}
              className={active ? "active" : ""}
              aria-label={t.label}
              aria-selected={active}
              onClick={() => router.push(t.href)}
            >
              <Icon name={t.icon} />
            </button>
          );
        })}
      </div>
      {/* prefetch links (no visual) */}
      <div hidden>
        {TABS.map((t) => (
          <Link key={t.href} href={t.href} prefetch />
        ))}
      </div>
    </nav>
  );
}
