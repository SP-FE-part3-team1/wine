import { fetchWithAuthforClient } from '@/actions/api.action';

// '좋아요 추가' 서버 액션
export async function likeReview(reviewId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/reviews/${reviewId}/like`;
  return fetchWithAuthforClient(url, { method: 'POST' });
}

// '좋아요 취소' 서버 액션
export async function unlikeReview(reviewId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/reviews/${reviewId}/like`;
  return fetchWithAuthforClient(url, { method: 'DELETE' });
}
