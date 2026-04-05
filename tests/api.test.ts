import { describe, test, expect } from "vitest";
import { createUser, fetchUser } from "../src/api";

describe("fetchUser", () => {
  test("fetch user correctly", async () => {
    const user = await fetchUser(1);
    expect(user.name).toBe("Janusz");
  });

  test("fetch user with provided id", async () => {
    const user = await fetchUser(3);
    expect(user.id).toBe(3);
  });

  test.each([0, -1])("throws when user id is invalid (id %s)", async (id) => {
    await expect(fetchUser(id)).rejects.toThrow(/Invalid ID/);
  });
});

describe("createUser", () => {
  test("creates user successfully", async () => {
    const user = await createUser({ name: "Marek" });
    expect(user).toMatchObject({ success: true, user: { name: "Marek" } });
  });

  test("creates user with provided role", async () => {
    const user = await createUser({ name: "Marek", role: "Designer" });
    expect(user.user.role).toBe("Designer");
  });

  test('creates user with default "Developer" role', async () => {
    const user = await createUser({ name: "Marek" });
    expect(user.user.role).toBe("Developer");
  });

  test.each([undefined, null, ""])(
    "throws when user name is invalid (name %s)",
    async (name) => {
      await expect(
        createUser({ name: name as unknown as string }),
      ).rejects.toThrow(/Name is required/);
    },
  );
});
