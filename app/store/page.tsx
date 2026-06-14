"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import Icon from "@/components/Icon";
import { useTurtle } from "@/lib/store";
import { SHOP_ITEMS } from "@/lib/seed";
import type { ShopItem } from "@/lib/types";

/** F. 상점 — "발을 만듭니다". 포인트로 꾸미기/도우미/보호권 구매. */
export default function StorePage() {
  const { point, ownedItems, protectTicket, buyItem } = useTurtle();
  const [tab, setTab] = useState<"decor" | "helper">("decor");
  const [toast, setToast] = useState<string | null>(null);

  const list = SHOP_ITEMS.filter((i) =>
    tab === "decor" ? i.kind === "decor" : i.kind !== "decor"
  );

  function handleBuy(item: ShopItem) {
    const ok = buyItem(item);
    setToast(
      ok
        ? `${item.name} 구매 완료!`
        : ownedItems.includes(item.id)
        ? "이미 보유 중이에요"
        : "포인트가 부족해요"
    );
    setTimeout(() => setToast(null), 1600);
  }

  return (
    <AppShell title="상점" subtitle="발을 만듭니다">
      {/* 보유 포인트 + 보호권 */}
      <div className="card row-between">
        <div className="g-points">
          <span className="coin" />
          {point.toLocaleString()}
        </div>
        <div className="chip">
          <Icon name="shield-halved" /> 보호권 {protectTicket}/2
        </div>
      </div>

      {/* 세그먼트: 꾸밈요소 / 도우미 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="g-segment">
          <button
            className={tab === "decor" ? "active" : ""}
            onClick={() => setTab("decor")}
          >
            <Icon name="spa" /> 거북이 꾸밈
          </button>
          <button
            className={tab === "helper" ? "active" : ""}
            onClick={() => setTab("helper")}
          >
            <Icon name="dumbbell" /> 도우미
          </button>
        </div>
      </div>

      {/* 아이템 그리드 */}
      <div className="grid-2">
        {list.map((item) => {
          const owned = ownedItems.includes(item.id);
          const affordable = point >= item.price;
          return (
            <div
              className="card"
              key={item.id}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
            >
              <div className="g-tile g-tile--lg">
                <Icon name={item.icon} />
              </div>
              <div style={{ fontWeight: 700, color: "var(--coral-500)", textAlign: "center" }}>
                {item.name}
              </div>
              <div className="g-points" style={{ fontSize: "var(--text-base)" }}>
                <span className="coin" style={{ width: 20, height: 13 }} />
                {item.price.toLocaleString()}
              </div>
              <button
                className={`g-btn ${owned || !affordable ? "g-btn--outline" : "g-btn--primary"} g-btn--block`}
                style={{ padding: "10px", fontSize: 14 }}
                disabled={owned}
                onClick={() => handleBuy(item)}
              >
                {owned
                  ? "보유중"
                  : item.kind === "protect"
                  ? "보호권 구매"
                  : affordable
                  ? "구매"
                  : "포인트 부족"}
              </button>
            </div>
          );
        })}
      </div>

      {toast && (
        <div
          className="chip chip--fill"
          style={{
            position: "fixed",
            bottom: 110,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            padding: "10px 18px",
          }}
        >
          {toast}
        </div>
      )}
    </AppShell>
  );
}
