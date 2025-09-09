"use server";

import { fetchWithAuth } from "@/actions/api.action";
const BASE = process.env.NEXT_PUBLIC_API_SERVER_URL!;

export type MyProfile = {
  id: number;
  nickname: string;
  image: string | null;
};

/**
 * 프로필 가져오기
 * - 먼저 /users/me 로 내 정보(팀ID 포함) 조회
 * - 스웨거 기준: GET /{teamId}/users/me 로 프로필 사용 가능하지만
 *   /users/me 응답에 닉네임/이미지가 이미 들어오므로 그 값을 그대로 사용
 */
export async function getMyProfileAction(): Promise<MyProfile> {
  const res = await fetchWithAuth(`${BASE}/users/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`프로필 불러오기 실패 (/users/me ${res.status})`);
  }
  const me = await res.json();

  return {
    id: me.id,
    nickname: me.nickname,
    image: me.image ?? null,
  };
}
