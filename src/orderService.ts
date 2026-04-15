// src/orderService.ts

import { getUser } from "./userService";

export async function createOrder(userId: number, amount: number) {
  const user = await getUser(userId);

  if (!user.isActive) {
    throw new Error("User is not active");
  }

  return {
    userId,
    amount,
    status: "created",
  };
}
