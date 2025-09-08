export async function loginUser(userData: { email: string; password: string }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/signIn`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      }
    );

    if (!res.ok) {
      const errorText = await res.json();
      console.error(errorText.message);
      throw new Error(errorText.message || "알 수 없는 오류");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("데이터 가져오기 중 오류 발생:", error);
    throw error;
  }
}
