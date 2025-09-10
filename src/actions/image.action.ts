"use server";

import { fetchWithAuth } from "./api.action";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_SERVER_URL ||
  "https://winereview-api.vercel.app/17-1";

/**
 * 이미지 업로드 Action
 * @param formData - 'image' 키를 포함하는 FormData 객체
 * @returns 업로드된 이미지의 URL
 */
export async function uploadImage(
  formData: FormData
): Promise<{ url: string }> {
  const response = await fetchWithAuth(`${API_BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}
