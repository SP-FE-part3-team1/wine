import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

//와인 목록 데이터 fetch
export async function getAllWines() {
  const response = await fetch(`${BASE_URL}/wines`);

  if (!response.ok) {
    console.error('Failed to fetch wine list for static generation.');
    return [];
  }

  return response.json();
}

// 와인 상세 데이터 fetch
export async function getWineDetail(id: string) {
  const response = await fetch(`${BASE_URL}/wines/${id}`);
  if (!response.ok) {
    notFound(); // 상품이 없을 경우
    return null;
  }

  return response.json();
}
