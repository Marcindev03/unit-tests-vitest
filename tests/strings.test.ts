import { test, describe, expect } from "vitest";

import { capitalize, countWords, isPalindrome } from "../src/strings";

// REVIEW: @ts-ignore przy testach "złego typu" jest popularne, ale:
// - ukrywa inne błędy w tej samej linii,
// - lepsze czasem: expect(() => capitalize(null as unknown as string)) albo osobny plik .test-d.ts.
// Testujesz zachowanie runtime (TypeScript i tak nie chroni w JS po kompilacji) — wartość testu jest OK.

describe("capitalize", () => {
  test("returns first letter uppercase", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("throws an error when argument is not string", () => {
    // REVIEW: toThrow(new TypeError("...")) sprawdza typ i message — dobrze przy jawnych TypeError w produkcji.
    // Gdy zmienisz klasę błędu, test padnie (to plus: kontrakt API).
    expect(() => capitalize(123 as unknown as string)).toThrow(
      new TypeError("Expected a string"),
    );
  });

  test("throws when argument is null", () => {
    expect(() => capitalize(null as unknown as string)).toThrow(
      new TypeError("Expected a string"),
    );
  });

  test("throws when argument is undefined", () => {
    expect(() => capitalize(undefined as unknown as string)).toThrow(
      new TypeError("Expected a string"),
    );
  });

  test("lowercases the rest of the string", () => {
    expect(capitalize("hELLO")).toBe("Hello");
  });

  test("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });

  test("handles single character", () => {
    expect(capitalize("a")).toBe("A");
  });
});

describe("isPalindrome", () => {
  test("returns true for single word palindrome", () => {
    expect(isPalindrome("ala")).toBe(true);
  });

  test("returns true for multiple words palindrome", () => {
    expect(isPalindrome("kamil ślimak")).toBe(true);
  });

  test("returns false for not palindrome word", () => {
    expect(isPalindrome("apple")).toBe(false);
  });

  test("returns true for palindrome with special characters", () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  // REVIEW: Wdrożenie isPalindrome robi toLowerCase() przed porównaniem — zachowanie jest case-INsensitive.
  // Stara nazwa "is case sensitive" była myląca (sugerowała odwrotność). Test poprawny, nazwa dopasowana do kodu.
  test("ignores letter case (normalizes before check)", () => {
    expect(isPalindrome("Ala")).toBe(true);
  });

  test("returns true for empty string", () => {
    expect(isPalindrome("")).toBe(true);
  });

  test("returns true for single character", () => {
    expect(isPalindrome("a")).toBe(true);
  });
});

describe("countWords", () => {
  // REVIEW: Dobry zestaw brzegów (puste, same spacje, wielokrotne spacje). Tab/NBSP są osobno niżej.

  test("returns number of words", () => {
    expect(countWords("ala ma kota")).toBe(3);
  });

  test("returns 1 for one word", () => {
    expect(countWords("ala")).toBe(1);
  });

  test("returns 0 for empty string", () => {
    expect(countWords("")).toBe(0);
  });

  test("returns 0 for blank string", () => {
    expect(countWords("   ")).toBe(0);
  });

  test("handles multiple spaces between words", () => {
    expect(countWords("ala ma     kota")).toBe(3);
  });

  test("handles leading and trailing spaces", () => {
    expect(countWords(" ala ma kota ")).toBe(3);
  });

  test("handles tab characters as word separators", () => {
    expect(countWords("ala\tma\tkota")).toBe(3);
  });

  test("handles non-breaking space (U+00A0) as word separator", () => {
    expect(countWords("ala\u00A0ma\u00A0kota")).toBe(3);
  });
});
