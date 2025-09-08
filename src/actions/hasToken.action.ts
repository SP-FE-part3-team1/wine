"use server";

import { cookies } from "next/headers";

export async function hasToken() {
  const token = (await cookies()).get("accessToken")?.value;

  return !!token;
}
