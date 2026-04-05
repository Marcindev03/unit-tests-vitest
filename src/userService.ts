import type { User } from "./api";

export async function httpGet<T = unknown>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return response.json() as Promise<T>;
}

export async function getUser(id: number): Promise<User> {
  const user = await httpGet<User>(`https://api.example.com/users/${id}`);
  return user;
}

export async function getUserName(id: number): Promise<string> {
  const user = await getUser(id);
  return user.name;
}
