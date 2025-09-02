const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;

// 모든 와인 목록을 가져오는 함수
export async function getAllWines() {
  const res = await fetch(`${BASE_URL}/wines`); 
  if (!res.ok) {
    throw new Error('Failed to fetch wines');
  }
  return res.json();
}

// 특정 ID의 와인 상세 정보를 가져오는 함수
export async function getWineDetail(id: string) {
  // 예시: GET /{teamId}/{wineId}
  // API 명세에 따라 팀 ID 같은 추가 정보가 필요할 수 있습니다.
  // 여기서는 '17-1'을 팀 ID로 가정하고 경로를 구성했습니다.
  const res = await fetch(`${BASE_URL}/17-1/wines/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch wine detail');
  }
  return res.json();
}