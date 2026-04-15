// src/priceService.ts

export function getDiscount(price: number): number {
  return price > 100 ? 0.1 : 0;
}

export function calculateFinalPrice(
  price: number,
  discountFunction = getDiscount,
): number {
  const discount = discountFunction(price);
  return price - price * discount;
}
