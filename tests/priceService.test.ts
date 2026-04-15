import { describe, expect, test, vi } from "vitest";
import { calculateFinalPrice } from "../src/priceService";

describe("calculateFinalPrice", () => {
  test("returns correct price without discount", () => {
    expect(calculateFinalPrice(50)).toBe(50);
  });

  test("applies 10% discount when price is over 100", () => {
    expect(calculateFinalPrice(300)).toBe(270);
  });

  test("applies custom discount function", () => {
    const mockDiscount = vi.fn().mockReturnValue(0.5);

    expect(calculateFinalPrice(200, mockDiscount)).toBe(100);
  });

  test("calls discount function with correct price", () => {
    const mockDiscount = vi.fn().mockReturnValue(0);

    calculateFinalPrice(100, mockDiscount);

    expect(mockDiscount).toHaveBeenCalledWith(100);
  });
});
