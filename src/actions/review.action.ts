"use server";

import { components } from '@/types/types';
import { fetchWithAuth } from './api.action';

type CreateReviewBody = components['schemas']['CreateReviewBody'];
type UpdateReviewBody = components['schemas']['UpdateReviewBody'];
type ReviewDetailType = components['schemas']['ReviewDetailType'];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || 'https://winereview-api.vercel.app/17-1';

// 리뷰 생성
export async function createReview(data: CreateReviewBody): Promise<ReviewDetailType> {
  const response = await fetchWithAuth(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`리뷰 생성 실패: ${response.status} - ${error}`);
  }

  return response.json();
}

// 리뷰 수정
export async function updateReview(id: string, data: UpdateReviewBody): Promise<ReviewDetailType> {
  const response = await fetchWithAuth(`${API_BASE_URL}/reviews/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`리뷰 수정 실패: ${response.status} - ${error}`);
  }

  return response.json();
}

// 리뷰 조회
export async function getReview(id: string): Promise<ReviewDetailType> {
  const response = await fetchWithAuth(`${API_BASE_URL}/reviews/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`리뷰 조회 실패: ${response.status} - ${error}`);
  }

  return response.json();
}

// 리뷰 삭제
export async function deleteReview(id: string): Promise<void> {
  const response = await fetchWithAuth(`${API_BASE_URL}/reviews/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`리뷰 삭제 실패: ${response.status} - ${error}`);
  }
}