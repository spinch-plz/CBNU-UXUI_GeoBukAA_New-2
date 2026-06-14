"use client";
import { useEffect } from "react";
import { useTurtle } from "@/lib/store";

/** store.theme → <html data-theme> 동기화 (B2 테마 설정) */
export default function ThemeSync() {
  const theme = useTurtle((s) => s.theme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return null;
}
