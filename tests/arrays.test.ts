import { test, expect, describe } from "vitest";
import { chunk, sum, unique } from "../src/arrays";

// REVIEW: Import z vitest — często sortuje się alfabetycznie (describe, expect, test) albo jak w dokumentacji;
// to kosmetyka, ale w zespole warto ustalić jedną konwencję (eslint-plugin-import).

describe("sum", () => {
  test("adds every element of array", () => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  test("returns 0 when array is empty", () => {
    expect(sum([])).toBe(0);
  });

  test("handles negative numbers", () => {
    expect(sum([1, -2, -3])).toBe(-4);
  });

  // REVIEW: Słusznie toBeCloseTo — suma floatów w JS nie zawsze === "matematycznej" sumie (IEEE 754).
  test("handles floating points numbers", () => {
    expect(sum([0.1, 0.3])).toBeCloseTo(0.4);
  });

  test("returns the element itself for single element array", () => {
    expect(sum([2])).toBe(2);
  });
});

describe("unique", () => {
  // REVIEW: Set zachowuje kolejność "pierwszego wystąpienia" dla prymitywów — to jest gwarantowane w ES6+.
  // Dla obiektów w tablicy unikalność jest po referencji; jeśli kiedyś unique będzie po polu id, testy trzeba rozszerzyć.

  test("returns array of unique elements", () => {
    expect(unique([1, 1, 2])).toEqual([1, 2]);
  });

  test("doesn't merge strings and numbers", () => {
    expect(unique([1, "1", 2])).toEqual([1, "1", 2]);
  });

  test("returns empty array for empty input", () => {
    expect(unique([])).toEqual([]);
  });

  test("returns same array when all elements are unique", () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test("returns single element array", () => {
    expect(unique([1])).toEqual([1]);
  });
});

describe("chunk", () => {
  test("returns array of chunks", () => {
    const data = [1, 2, 3, 1, 2, 3, 1, 2, 3];

    expect(chunk(data, 3)).toEqual([
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ]);
  });

  // test.each(tabela)(szablonNazwy, fn) — jedna logika asercji, wiele wierszy danych. %s w tytule = pierwszy argument z wiersza.
  test.each([[0], [-1]])(
    "throws when chunk size is invalid (size %s)",
    (size) => {
      expect(() => chunk([1, 2, 3], size)).toThrow(
        new Error("Chunk size must be greater than 0"),
      );
    },
  );

  test("returns empty array when argument array is empty", () => {
    expect(chunk([], 1)).toEqual([]);
  });

  test("returns one chunk when size is greater than array itself", () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  test("last chunk contains remaining elements", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("throws when chunk size is not a number", () => {
    // REVIEW: Dobry test obrony w runtime — TS na poziomie typów zwykle nie dopuści "abc", ale bundler/konsumenci JS mogą.
    expect(() => chunk([1, 2, 3], "abc" as unknown as number)).toThrow(
      new TypeError("Expected a number"),
    );
  });
});
