import { afterEach, describe, expect, test, vi } from "vitest";
import { login } from "../src/authService";
import * as logger from "../src/logger";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("authService", () => {
  test("returns true for correct data", () => {
    expect(login("user", "password")).toBe(true);
  });

  test("returns false for empty login", () => {
    expect(login("", "password")).toBe(false);
  });

  test("returns false for empty password", () => {
    expect(login("login", "")).toBe(false);
  });

  test("returns false for empty login and password", () => {
    expect(login("", "")).toBe(false);
  });

  test("calls log for success login with correct message", () => {
    const logSpy = vi.spyOn(logger, "log");

    login("user1", "password");

    expect(logSpy).toHaveBeenCalledWith("User user1 logged in");
  });

  test("calls log for error login with correct message", () => {
    const logSpy = vi.spyOn(logger, "log");

    login("", "");

    expect(logSpy).toHaveBeenCalledWith("Login failed: missing credentials");
  });
});
