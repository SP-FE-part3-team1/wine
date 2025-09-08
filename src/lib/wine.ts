import { fetchWithAuth } from "../actions/api.action";

/* 와인 상세 정보를 가져오는 함수 */
export async function getWine(wineId: number | string): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/wines/${wineId}`;

  try {
    const response = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`와인(ID: ${wineId}) 정보를 가져오는 데 실패했습니다:`, error);
    return null; 
  }
}