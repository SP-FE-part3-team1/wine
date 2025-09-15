"use server";

import { fetchWithAuth } from "@/actions/api.action";
import { uploadImage } from "@/actions/image.action";
import { headers } from "next/headers";

const BASE = process.env.NEXT_PUBLIC_API_SERVER_URL!;

export type MyProfile = {
  id: number;
  nickname: string;
  image: string | null;
};

export type PatchState = {
  ok: boolean;
  message?: string;
  nickname?: string;
  image?: string | null;
};

/** GET /users/me */
export async function getMyProfileAction(): Promise<MyProfile> {
  const res = await fetchWithAuth(`${BASE}/users/me`, { method: "GET" });
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

/**
 * 기본 프로필 이미지의 "절대 URL"을 생성
 * - 서버 검증 정규식 '^https?://.+' 를 통과해야 하므로 반드시 절대 URL 사용
 */
async function getDefaultAvatarUrl(): Promise<string> {
  const h = await headers(); // ← 일부 타입에서 Promise 이므로 await 필수
  const proto =
    h.get("x-forwarded-proto") ||
    (process.env.NODE_ENV === "development" ? "http" : "https");
  const host =
    h.get("x-forwarded-host") ||
    h.get("host") ||
    (process.env.NODE_ENV === "development" ? "localhost:3000" : "");

  const origin =
    host && proto
      ? `${proto}://${host}`
      : process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com";

  // 프로젝트의 기본 이미지 경로에 맞춰 조정
  return `${origin}/assets/images/profile/profile.png`;
}

/**
 * PATCH /users/me
 * - 닉네임만 변경: JSON PATCH { nickname }
 * - 이미지 업로드: uploadImage → 반환된 절대 URL을 JSON PATCH { image }
 * - 기본이미지로 변경: removeImage=1 이면 image를 기본 이미지 절대 URL로 설정
 * - 닉네임 + 이미지 동시 변경도 지원
 */
export async function patchMyProfileAction(
  _prev: PatchState,
  formData: FormData
): Promise<PatchState> {
  const rawNickname = formData.get("nickname");
  const file = formData.get("image");
  const removeImage = formData.get("removeImage") === "1";

  const nickname = typeof rawNickname === "string" ? rawNickname.trim() : "";
  const hasNickname = !!nickname;
  const hasFile = file instanceof File && file.size > 0;

  if (!hasNickname && !hasFile && !removeImage) {
    return { ok: false, message: "변경된 항목이 없습니다." };
  }

  // 이미지 URL(변경 없는 경우 undefined → PATCH 본문에 포함 안 함)
  let imageUrl: string | undefined;

  // 기본 이미지로 리셋
  if (removeImage) {
    imageUrl = await getDefaultAvatarUrl();
  }

  // 파일 업로드가 있으면 업로드 결과가 최우선
  if (hasFile) {
    const f = file as File;
    const allowed = new Set(["image/jpeg", "image/png"]);
    if (!allowed.has(f.type)) {
      return { ok: false, message: "JPEG/PNG 이미지만 업로드할 수 있어요." };
    }
    const fd = new FormData();
    fd.append("image", f);
    const uploaded = await uploadImage(fd);
    if (!uploaded?.url) {
      return { ok: false, message: "이미지 업로드에 실패했어요." };
    }
    imageUrl = uploaded.url; // 반드시 절대 URL이어야 함
  }

  const body: Record<string, unknown> = {};
  if (hasNickname) body.nickname = nickname;
  if (typeof imageUrl !== "undefined") body.image = imageUrl;

  const res = await fetchWithAuth(`${BASE}/users/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let extra = "";
    try {
      extra = " - " + (await res.text()).slice(0, 200);
    } catch {}
    return { ok: false, message: `프로필 저장 실패 (${res.status})${extra}` };
  }

  const updated = await res.json().catch(() => ({}));
  return {
    ok: true,
    nickname: updated?.nickname ?? (hasNickname ? nickname : undefined),
    image:
      updated?.image ??
      (typeof imageUrl !== "undefined" ? imageUrl : undefined),
  };
}
