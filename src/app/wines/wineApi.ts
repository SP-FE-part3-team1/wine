import type { components } from "@/types/types";
type WineListType = components["schemas"]["WineListType"];

const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * 전체 와인 목록 조회
 */
export async function getAllWines(limit = 9999): Promise<WineListType[]> {
  const response = await fetch(`${BASE_URL}/wines?limit=${limit}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch wine list.", await response.text());
    return [];
  }

  const data = await response.json();
  return data.list ?? [];
}

/**
 * 추천 와인 목록 조회
 */
export async function getRecommendedWines(
  limit = 9999
): Promise<WineListType[]> {
  const response = await fetch(`${BASE_URL}/wines/recommended?limit=${limit}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch recommended wines.", await response.text());
    return [];
  }

  return response.json();
}
