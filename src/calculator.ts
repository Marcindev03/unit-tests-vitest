// src/calculator.ts

// Zewnętrzna zależność — np. logger
export function log(message: string): void {
  console.log(message);
}

export function calculatorAdd(a: number, b: number): number {
  log(`Adding ${a} + ${b}`);
  return a + b;
}
