export async function registerUser(userData: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}) {
  const response = await fetch("http://localhost:3000/api/signup", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });

  return response;
}
