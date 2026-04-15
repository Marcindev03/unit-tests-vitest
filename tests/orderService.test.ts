import { afterEach, describe, expect, test, vi } from "vitest";

vi.mock("../src/userService", () => ({
  getUser: vi.fn(),
}));

import { getUser } from "../src/userService";
import type { User } from "../src/api";
import { createOrder } from "../src/orderService";

const mockUser: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  role: "admin",
};

const mockActiveUser: User = { ...mockUser, isActive: true };
const mockInactiveUser: User = { ...mockUser, isActive: false };

afterEach(() => {
  vi.clearAllMocks();
});

describe("orderService", () => {
  test("returns order for active user", async () => {
    vi.mocked(getUser).mockResolvedValue(mockActiveUser);

    expect(await createOrder(1, 100)).toMatchObject({
      userId: 1,
      amount: 100,
      status: "created",
    });
  });

  test("throw an error for inactive user", async () => {
    vi.mocked(getUser).mockResolvedValue(mockInactiveUser);

    await expect(createOrder(1, 100)).rejects.toThrow(/User is not active/);
  });

  test("calls getUser with correct userId", async () => {
    vi.mocked(getUser).mockResolvedValue(mockActiveUser);

    await createOrder(1, 100);

    expect(vi.mocked(getUser)).toHaveBeenCalledWith(1);
  });
});
