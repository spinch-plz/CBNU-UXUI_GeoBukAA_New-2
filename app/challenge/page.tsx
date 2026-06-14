"use client";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import GeobugaLogo from "@/components/art/GeobugaLogo";
import Icon from "@/components/Icon";
import Img from "@/components/Img";

const CATEGORIES = [
  { id: "neck", name: "거북이 탈출", icon: "brain", count: 12 },
  { id: "back", name: "허리 아프세요?", icon: "bone", count: 8 },
  { id: "shoulder", name: "말린 어깨 펴기", icon: "child", count: 15 },
  { id: "core", name: "코어를 단단히!", icon: "dna", count: 10 },
];

export default function ChallengePage() {
  const router = useRouter();

  return (
    <AppShell brand={<GeobugaLogo className="brand-logo" />} showMenu>
      <Img src="/e_title.png" alt="더 하시게요?" style={{ width: "100%", display: "block" }} />

      <div
        className="g-banner"
        role="button"
        onClick={() => router.push("/stretch")}
        style={{ cursor: "pointer" }}
      >
        <div className="b-watermark"><Icon name="dumbbell" /></div>
        <div className="b-title">
          오늘의 스트레칭을<br />진행하세요!
        </div>
        <button className="g-play" aria-label="시작">
          <Icon name="play" />
        </button>
      </div>

      <div
        className="g-banner"
        role="button"
        onClick={() => router.push("/stretch")}
        style={{ cursor: "pointer" }}
      >
        <div className="b-watermark"><Icon name="fire" /></div>
        <div className="b-title">
          오늘의 챌린지부터<br />하시려구요?
        </div>
        <button className="g-play" aria-label="시작">
          <Icon name="play" />
        </button>
      </div>

      <div className="section-title">부위별 스트레칭</div>
      <div className="grid-2">
        {CATEGORIES.map((c) => (
          <div
            className="g-card"
            key={c.id}
            style={{ cursor: "pointer", padding: "20px 16px 16px" }}
          >
            <div className="g-tile" style={{ marginBottom: 12 }}>
              <Icon name={c.icon} />
            </div>
            <div style={{ fontWeight: "var(--fw-bold)", color: "var(--coral-500)", marginBottom: 4 }}>
              {c.name}
            </div>
            <div className="muted" style={{ fontSize: "var(--text-sm)" }}>
              {c.count}개 스트레칭
            </div>
          </div>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          background: "none",
          border: "none",
          boxShadow: "var(--outline)",
          borderRadius: "var(--radius-full)",
          padding: "14px",
          cursor: "pointer",
          color: "var(--coral-500)",
          fontWeight: "var(--fw-medium)",
          fontSize: "var(--text-sm)",
        }}
      >
        더보기 &gt;
      </button>
    </AppShell>
  );
}
