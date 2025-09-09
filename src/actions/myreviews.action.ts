"use server";

import { fetchWithAuth } from "@/actions/api.action";

const BASE = process.env.NEXT_PUBLIC_API_SERVER_URL!; // 예: https://winereview-api.vercel.app/17-1

// 슬래시 안전 조인
function joinUrl(
  base: string,
  ...parts: (string | number | null | undefined)[]
) {
  const cleaned = [
    base.replace(/\/+$/, ""),
    ...parts.filter(Boolean).map(String),
  ].map((s) => s.replace(/^\/+|\/+$/g, ""));
  return cleaned.join("/");
}

/** ---------- 타입 ---------- */
export type Review = {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: { id: number; nickname: string; image: string | null };
  isLiked?: Record<string, unknown>;
};

export type ReviewCardData = Review & {
  wineName?: string;
  wine?: {
    id: number;
    name?: string;
    region?: string;
    image?: string;
    price?: number;
    avgRating?: number;
    type?: string;
  } | null;
};

type ReviewWithWine = Review & {
  wine?: {
    id: number;
    name?: string;
    region?: string;
    image?: string;
    price?: number;
    avgRating?: number;
    type?: string;
  } | null;
  wineId?: number | null;
};

type ListEnvelope<T> =
  | { list: T[]; totalCount?: number; nextCursor?: number | null }
  | { data: T[] }
  | T[];

/** ---------- 타입가드/정규화 (any 금지) ---------- */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function hasArrayProp<T>(
  v: unknown,
  key: "list" | "data"
): v is { [K in typeof key]: T[] } {
  return isRecord(v) && Array.isArray(v[key]);
}
function normalizeList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (hasArrayProp<T>(payload, "list")) return (payload as { list: T[] }).list;
  if (hasArrayProp<T>(payload, "data")) return (payload as { data: T[] }).data;
  return [];
}

/** ---------- fetch 유틸 ---------- */
// GET: 불필요한 Content-Type 헤더 넣지 않기
async function tryGet<T = unknown>(
  url: string
): Promise<{ ok: boolean; status: number; data?: T }> {
  const res = await fetchWithAuth(url, { method: "GET" });
  const ok = res.ok;
  const status = res.status;
  const data = ok ? ((await res.json()) as T) : undefined;
  return { ok, status, data };
}

// /users/me 로 내 id 얻기
async function getMeId(): Promise<number | null> {
  const r = await tryGet<{ id?: number }>(joinUrl(BASE, "users", "me"));
  if (!r.ok) return null;
  return typeof r.data?.id === "number" ? r.data.id : null;
}

/** ---------- 메인: 리뷰 목록 + 와인 이름 보강 ---------- */
/** 서버가 limit를 요구하므로 limit를 기본으로 붙입니다.
 *  1) /reviews?userId=내ID&limit=20  (응답에 wine 포함 기대)
 *  2) 실패 시 /users/me/reviews?limit=20  (상세 조회로 wine.name 보강)
 */
export async function getMyReviewsForCard(
  limit = 20
): Promise<ReviewCardData[]> {
  // 1) 우선: /reviews?userId=내ID&limit=...
  try {
    const myId = await getMeId();
    if (myId != null) {
      const baseSearch = joinUrl(BASE, "reviews");
      const u = new URL(baseSearch);
      u.searchParams.set("userId", String(myId));
      u.searchParams.set("limit", String(limit));

      const r = await tryGet<ListEnvelope<ReviewWithWine>>(u.toString());
      if (r.ok && r.data) {
        const list = normalizeList<ReviewWithWine>(r.data);
        if (list.length) {
          // 응답에 이미 wine 포함 → 바로 매핑
          return list.map((rv) => ({
            ...rv,
            wineName: rv?.wine?.name,
          }));
        }
      }
    }
  } catch {
    // 무시하고 폴백 진행
  }

  // 2) 폴백: /users/me/reviews?limit=...  (목록엔 wine 없음 → 상세로 보강)
  {
    const base = joinUrl(BASE, "users", "me", "reviews");
    const u = new URL(base);
    u.searchParams.set("limit", String(limit));

    const r = await tryGet<ListEnvelope<Review>>(u.toString());
    if (!r.ok || !r.data) return [];

    const list = normalizeList<Review>(r.data);
    if (!list.length) return [];

    // 각 리뷰 상세(/reviews/{id})에서 wine.name 보강 (실패해도 목록은 노출)
    const withWine = await Promise.all(
      list.map(async (rv) => {
        const detail = await tryGet<ReviewWithWine>(
          joinUrl(BASE, "reviews", rv.id)
        );
        if (detail.ok && detail.data) {
          return { ...rv, wineName: detail.data?.wine?.name };
        }
        return { ...rv, wineName: undefined };
      })
    );

    return withWine;
  }
}
