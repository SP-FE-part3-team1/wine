export async function loginUser(userData: { email: string; password: string }) {
  const res = await fetch("http://localhost:3000/api/login", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(userData),
  });

  return res;
}
