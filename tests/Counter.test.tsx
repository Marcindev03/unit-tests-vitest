import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../src/components/Counter";

const setup = () => {
  const user = userEvent.setup();
  const utils = render(<Counter />);

  const button = (name: RegExp) => screen.getByRole("button", { name });

  const incrementButton = () => button(/increment/i);
  const decrementButton = () => button(/decrement/i);

  return {
    user,
    ...utils,
    // TODO: click and fire object properties
    increment: () => user.click(incrementButton()),
    incrementSync: () => fireEvent.click(incrementButton()),
    decrement: () => user.click(decrementButton()),
    decrementSync: () => fireEvent.click(decrementButton()),
    reset: () => user.click(button(/reset/i)),
    count: () => screen.getByRole("status"),
  };
};

describe("Counter", () => {
  it("renders 0 initially", () => {
    const { count } = setup();

    expect(count()).toHaveTextContent(/^Count:\s*0$/);
  });

  it.each([
    {
      clicks: 1,
      expected: 1,
    },
    {
      clicks: 3,
      expected: 3,
    },
    {
      clicks: 5,
      expected: 5,
    },
  ])(
    "increments to $expected after $clicks clicks",
    async ({ clicks, expected }) => {
      const { increment, count } = setup();

      for (let i = 0; i < clicks; i++) await increment();

      expect(count()).toHaveTextContent(new RegExp(`^Count:\\s*${expected}$`));
    },
  );

  it.each([
    {
      clicks: 1,
      expected: -1,
    },
    {
      clicks: 3,
      expected: -3,
    },
    {
      clicks: 5,
      expected: -5,
    },
  ])(
    "decrements to $expected after $clicks clicks",
    async ({ expected, clicks }) => {
      const { decrement, count } = setup();

      for (let i = 0; i < clicks; i++) await decrement();

      expect(count()).toHaveTextContent(new RegExp(`^Count:\\s*${expected}$`));
    },
  );

  it("handles mixed interactions (+ + + - -)", async () => {
    const { increment, decrement, count } = setup();

    await increment();
    await increment();
    await increment();

    await decrement();
    await decrement();

    expect(count()).toHaveTextContent(/^Count:\s*1$/);
  });

  it("reset count to 0 after mutations", async () => {
    const { increment, decrement, reset, count } = setup();

    await increment();
    await increment();
    await increment();
    await decrement();
    await decrement();

    await reset();

    expect(count()).toHaveTextContent(/^Count:\s*0$/);
  });

  it("batches rapid increments correctly (no stale closure)", () => {
    const { incrementSync, count } = setup();

    for (let i = 0; i < 20; i++) incrementSync();

    expect(count()).toHaveTextContent(/^Count:\s*20$/);
  });

  it("stays consistent under rapid mixed clicks", () => {
    const { incrementSync, decrementSync, count } = setup();

    for (let i = 0; i < 50; i++) incrementSync();
    for (let i = 0; i < 30; i++) decrementSync();

    expect(count()).toHaveTextContent(/^Count:\s*20$/);
  });

  describe("a11y", () => {
    it("exposes all buttons with accessible name", () => {
      setup();

      const buttons = screen.getAllByRole("button");

      expect(buttons).toHaveLength(3);
      expect(buttons.map((b) => b.textContent)).toEqual(
        expect.arrayContaining(["Increment", "Decrement", "Reset"]),
      );
    });

    it("exposes the counter as a live region", () => {
      const { count } = setup();

      expect(count()).toHaveAttribute("role", "status");
      expect(count()).toHaveTextContent(/^Count:\s*0$/);
    });

    it("has a predictable tab order", async () => {
      const { user } = setup();

      await user.tab();
      expect(screen.getByRole("button", { name: /increment/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole("button", { name: /decrement/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole("button", { name: /reset/i })).toHaveFocus();
    });

    it("activates button with both Enter and Space", async () => {
      const { user, count } = setup();

      await user.tab();
      await user.keyboard("{Enter}");
      expect(count()).toHaveTextContent(/^Count:\s*1$/);

      await user.keyboard(" ");
      expect(count()).toHaveTextContent(/^Count:\s*2$/);
    });
  });
});
