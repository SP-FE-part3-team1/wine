export async function getAllWines() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;
  console.log("BASE_URL:", BASE_URL);

  const response = await fetch(`${BASE_URL}/wines?limit=20`, {
    cache: "no-store",
  });
  if (!response.ok) {
    console.error("Failed to fetch wine list.", await response.text());
    return [];
  }

  const data = await response.json();
  return data.list ?? [];
}
