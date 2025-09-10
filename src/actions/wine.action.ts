"use server";

import { components } from '@/types/types';
import { fetchWithAuth } from './api.action';

type CreateWineBody = components['schemas']['CreateWineBody'];
type UpdateWineBody = components['schemas']['UpdateWineBody'];
type WineDetailType = components['schemas']['WineDetailType'];
type Wine = components['schemas']['Wine'];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || 'https://winereview-api.vercel.app/17-1';

// 와인 생성
export async function createWine(data: CreateWineBody): Promise<Wine> {
  const response = await fetchWithAuth(`${API_BASE_URL}/wines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorDetails;
    try {
      errorDetails = await response.json();
    } catch {
      errorDetails = await response.text();
    }
    throw new Error(`와인 생성 실패: ${response.status} ${response.statusText} - ${JSON.stringify(errorDetails)}`);
  }

  return response.json();
}

// 와인 수정
export async function updateWine(id: string, data: UpdateWineBody): Promise<Wine> {
  const response = await fetchWithAuth(`${API_BASE_URL}/wines/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`와인 수정 실패: ${response.status} - ${error}`);
  }

  return response.json();
}

// 와인 조회
export async function getWine(id: string): Promise<WineDetailType> {
  const response = await fetchWithAuth(`${API_BASE_URL}/wines/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`와인 조회 실패: ${response.status} - ${error}`);
  }

  return response.json();
}

// 와인 삭제
export async function deleteWine(id: string): Promise<void> {
  const response = await fetchWithAuth(`${API_BASE_URL}/wines/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`와인 삭제 실패: ${response.status} - ${error}`);
  }
}

// API 연결 테스트 (인증 없이)
export async function testApiConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/wines?limit=10`, {
      method: 'GET',
    });
    
    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      message: response.ok ? 'API 연결 성공' : `API 연결 실패: ${response.status} ${response.statusText}`,
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      statusText: 'Network Error',
      message: `네트워크 오류: ${error}`,
    };
  }
}

// 인증 확인용 API 테스트
export async function testAuthenticatedEndpoint() {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return {
        success: true,
        message: '인증된 API 호출 성공',
        data: userData,
      };
    } else {
      let errorDetails;
      try {
        errorDetails = await response.json();
      } catch {
        errorDetails = await response.text();
      }
      return {
        success: false,
        message: `인증 실패: ${response.status} ${response.statusText}`,
        data: { error: errorDetails, url: `${API_BASE_URL}/users/me` }
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `API 호출 오류: ${error}`,
      data: { url: `${API_BASE_URL}/users/me` }
    };
  }
}