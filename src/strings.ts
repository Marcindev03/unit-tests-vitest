export function capitalize(str: string): string {
  if (typeof str !== "string") throw new TypeError("Expected a string");
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

export function countWords(str: string): number {
  if (!str.trim()) return 0;
  return str.trim().split(/\s+/).length;
}
