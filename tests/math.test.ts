import { test, expect } from "vitest";
import { add, divide, multiply, subtract } from "../src/math";

test("add function should return the sum of two numbers", () => {
  expect(add(1, 2)).toBe(3);
});

test("add function should handle addition with zero", () => {
  expect(add(1, 0)).toBe(1);
});

test("add function should handle negative numbers", () => {
  expect(add(1, -2)).toBe(-1);
});

test("add function should handle floating-point numbers", () => {
  expect(add(1.2, 1.4)).toBeCloseTo(2.6, 5);
});

test("substract function should return the difference of two numbers", () => {
  expect(subtract(3, 2)).toBe(1);
});

test("substract function should return a negative number", () => {
  expect(subtract(2, 6)).toBe(-4);
});

test("substract function should handle two negative numbers", () => {
  expect(subtract(-2, -2)).toBe(0);
});

test("multiply function should return the product of two numbers", () => {
  expect(multiply(2, 2)).toBe(4);
});

test("multiply by 0 returns 0", () => {
  expect(multiply(5, 0)).toBe(0);
});

test("divide function should return the quotient of two numbers", () => {
  expect(divide(4, 2)).toBe(2);
});

test("divide function should throw an error when dividing by 0", () => {
  expect(() => divide(2, 0)).toThrow(/Cannot divide/);
});

test("divide returns fractional results", () => {
  expect(divide(5, 2)).toBe(2.5);
});
