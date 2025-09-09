"use server";

import { fetchWithAuth } from "@/actions/api.action";

const BASE = process.env.NEXT_PUBLIC_API_SERVER_URL!; // 예: https://winereview-api.vercel.app/17-1

// 안전한 URL 조인
function joinUrl(base: string, ...parts: (string | number)[]) {
  const cleaned = [base.replace(/\/+$/, ""), ...parts.map(String)].map((s) =>
    s.replace(/^\/+|\/+$/g, "")
  );
  return cleaned.join("/");
}

/** ---------- 타입 ---------- */
type WineItem = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  userId: number;
  recentReview?: unknown;
};

type WineListResponse = {
  list: WineItem[];
  totalCount?: number;
  nextCursor?: number | null;
};

export type MyWineCardData = {
  id: string;
  title: string;
  region: string;
  price: number;
  imageSrc: string;
};

type GetResult = {
  items: MyWineCardData[];
  nextCursor: number | null;
};

/** ---------- 유틸 ---------- */
// GET: 불필요한 Content-Type 넣지 않기
async function tryGet<T = unknown>(
  url: string
): Promise<{ ok: boolean; status: number; data?: T }> {
  const res = await fetchWithAuth(url, { method: "GET" });
  const ok = res.ok;
  const status = res.status;
  const data = ok ? ((await res.json()) as T) : undefined;
  return { ok, status, data };
}

async function getMeId(): Promise<number | null> {
  const r = await tryGet<{ id?: number }>(joinUrl(BASE, "users", "me"));
  if (!r.ok) return null;
  return typeof r.data?.id === "number" ? r.data.id : null;
}

/** ---------- 메인 ---------- */
/** cursor 기반 페이지네이션을 지원하도록 시그니처를 확장했습니다.
 *  - 처음 호출: getMyWinesForCard()  또는 getMyWinesForCard(undefined, 20)
 *  - 다음 페이지: getMyWinesForCard(nextCursorFromPrev, 20)
 */
export async function getMyWinesForCard(
  cursor?: number | null,
  limit = 20
): Promise<MyWineCardData[]> {
  // 1) 정식 경로: /users/me/wines?limit=... [&cursor=...]
  {
    const base = joinUrl(BASE, "users", "me", "wines");
    const u = new URL(base);
    u.searchParams.set("limit", String(limit));
    if (cursor != null) u.searchParams.set("cursor", String(cursor));

    const r = await tryGet<WineListResponse>(u.toString());
    if (r.ok && r.data && Array.isArray(r.data.list)) {
      return r.data.list.map((w) => ({
        id: String(w.id),
        title: w.name,
        region: w.region,
        price: w.price,
        imageSrc: w.image || "/assets/images/placeholder-wine.png",
      }));
    }
  }

  // 2) 폴백: /wines?userId=내ID&limit=... [&cursor=...]
  {
    const myId = await getMeId();
    if (myId != null) {
      const base = joinUrl(BASE, "wines");
      const u = new URL(base);
      u.searchParams.set("userId", String(myId));
      u.searchParams.set("limit", String(limit));
      if (cursor != null) u.searchParams.set("cursor", String(cursor));

      const r = await tryGet<WineListResponse>(u.toString());
      if (r.ok && r.data && Array.isArray(r.data.list)) {
        return r.data.list.map((w) => ({
          id: String(w.id),
          title: w.name,
          region: w.region,
          price: w.price,
          imageSrc: w.image || "/assets/images/placeholder-wine.png",
        }));
      }
    }
  }

  // 모두 실패하면 0건으로
  return [];
}
