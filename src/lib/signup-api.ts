export async function registerUser(userData: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/signUp`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorText = await response.json();
      console.error(errorText.message);
      throw new Error(errorText.message || "알 수 없는 오류");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("데이터 가져오기 중 오류 발생:", error);
    throw error;
  }
}
