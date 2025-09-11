"use client";

import { useEffect, useState } from "react";

const UNITS = [
  ["year", 31_536_000_000],
  ["month", 2_592_000_000],
  ["day", 86_400_000],
  ["hour", 3_600_000],
  ["minute", 60_000],
  ["second", 1_000],
] as const;

function formatTimeAgo(iso: string, now: number) {
  const diff = now - new Date(iso).getTime();
  const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });
  for (const [unit, ms] of UNITS) {
    const n = Math.floor(diff / ms);
    if (n >= 1) return rtf.format(-n, unit as Intl.RelativeTimeFormatUnit);
  }
  return "방금 전";
}

/** 클라이언트에서만 상대시간을 계산/갱신 */
export function useTimeAgo(iso: string) {
  const [text, setText] = useState<string>(""); // 초기엔 빈 문자열로 두면 SSR과 불일치 없음

  useEffect(() => {
    const update = () => setText(formatTimeAgo(iso, Date.now()));
    update();
    const id = setInterval(update, 60_000); // 1분마다 갱신
    return () => clearInterval(id);
  }, [iso]);

  return text;
}
