import { describe, test, expect, afterEach, vi } from "vitest";
import * as userService from "../src/userService";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("userService", () => {
  describe("getUser", () => {
    test("fetch user successfully", async () => {
      const user = await userService.getUser(1);
      expect(user.name).toBe("Janusz");
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/1");
    });
  });
});
