// src/authService.ts
import { log } from "./logger";

export function login(username: string, password: string): boolean {
  if (!username || !password) {
    log("Login failed: missing credentials");
    return false;
  }

  log(`User ${username} logged in`);
  return true;
}
