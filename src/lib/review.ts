'use client';
import { fetchWithAuth } from '@/actions/api.action';


// '좋아요 추가' 서버 액션


export async function likeReviewAction(reviewId: number) {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/reviews/${reviewId}/like`, {
      method: 'POST', // 👈 메소드를 'POST'로 지정
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });

    if (response.ok) {
      console.log('좋아요 추가 성공!');
      // UI 업데이트 로직 (예: 하트 아이콘을 채움)
    } else {
      // 서버에서 200번대 응답이 아닌 경우
      throw new Error('이미 좋아요를 눌렀거나, 서버에 문제가 발생했습니다.');
    }

  } catch (error) {
    console.error('좋아요 추가 실패:', error);
  }
}



// '좋아요 취소' 서버 액션
export async function unlikeReviewAction(reviewId: number) {
    try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/reviews/${reviewId}/like`, {
      method: 'DELETE', // 👈 메소드를 'POST'로 지정
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });

    if (response.ok) {
      console.log('좋아요 취소 성공!');
      // UI 업데이트 로직 (예: 하트 아이콘을 채움)
    } else {
      // 서버에서 200번대 응답이 아닌 경우
      throw new Error('이미 좋아요를 눌렀거나, 서버에 문제가 발생했습니다.');
    }

  } catch (error) {
    console.error('좋아요 취소 실패:', error);
  }
}
