export function sum(arr: number[]): number {
  return arr.reduce((acc: number, val: number) => acc + val, 0);
}

export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function chunk<T>(arr: T[], size: number): T[][] {
  if (typeof size !== "number") throw new TypeError("Expected a number");
  if (size <= 0) throw new Error("Chunk size must be greater than 0");
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
