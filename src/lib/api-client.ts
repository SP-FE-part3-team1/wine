'use client';

import { components } from '../types/types';

// API 스키마에 맞는 타입들
type WineType = components['schemas']['WineType'];
type CreateWineBody = components['schemas']['CreateWineBody'];
type UpdateWineBody = components['schemas']['UpdateWineBody'];
type CreateReviewBody = components['schemas']['CreateReviewBody'];
type UpdateReviewBody = components['schemas']['UpdateReviewBody'];
type WineDetailType = components['schemas']['WineDetailType'];
type ReviewDetailType = components['schemas']['ReviewDetailType'];

// 팀 ID 상수
const TEAM_ID = '17-1';

// Base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || 'https://winereview-api.vercel.app';

// 클라이언트에서 사용할 API 함수들 (쿠키 기반 인증)
class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}/${TEAM_ID}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include' // 쿠키 포함하여 요청
    });

    if (!response.ok) {
      if (response.status === 401) {
        // 인증 실패 시 로그인 페이지로 리다이렉트
        window.location.href = '/login';
        throw new Error('Authentication failed - redirecting to login');
      }
      
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // JSON 파싱 실패 시 기본 메시지 사용
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // 와인 관련 API
  async createWine(data: CreateWineBody): Promise<components['schemas']['Wine']> {
    return this.request('/wines', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateWine(id: string, data: UpdateWineBody): Promise<components['schemas']['Wine']> {
    return this.request(`/wines/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async getWine(id: string): Promise<WineDetailType> {
    return this.request(`/wines/${id}`);
  }

  async deleteWine(id: string): Promise<void> {
    return this.request(`/wines/${id}`, {
      method: 'DELETE'
    });
  }

  // 리뷰 관련 API
  async createReview(data: CreateReviewBody): Promise<ReviewDetailType> {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateReview(id: string, data: UpdateReviewBody): Promise<ReviewDetailType> {
    return this.request(`/reviews/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async getReview(id: string): Promise<ReviewDetailType> {
    return this.request(`/reviews/${id}`);
  }

  async deleteReview(id: string): Promise<void> {
    return this.request(`/reviews/${id}`, {
      method: 'DELETE'
    });
  }

  // 사용자 관련 API
  async getMe(): Promise<components['schemas']['User'] & { email: string }> {
    return this.request('/users/me');
  }

  // 인증 상태 확인 (클라이언트용)
  async checkAuth(): Promise<boolean> {
    try {
      await this.getMe();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const apiClient = new ApiClient();