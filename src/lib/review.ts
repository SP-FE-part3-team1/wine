'use client';
import { fetchWithAuth } from '@/actions/api.action';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;


// '좋아요 추가' 서버 액션
export async function likeReviewAction(reviewId: number) {
  const url = `${API_BASE_URL}/reviews/${reviewId}/like`;
  return fetchWithAuth(url, { method: 'POST' });
}

// '좋아요 취소' 서버 액션
export async function unlikeReviewAction(reviewId: number) {
  const url = `${API_BASE_URL}/reviews/${reviewId}/like`;
  return fetchWithAuth(url, { method: 'DELETE' });
}
