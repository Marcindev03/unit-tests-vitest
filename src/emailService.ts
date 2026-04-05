import type { User } from "./api";
import { getUser } from "./userService";

type SendWelcomeEmailResult = {
  sent: boolean;
  to: string;
};

type UserWithEmail = User & { email?: string };

export async function sendWelcomeEmail(
  userId: number,
): Promise<SendWelcomeEmailResult> {
  const user = (await getUser(userId)) as UserWithEmail;

  if (!user.email) throw new Error("User has no email");

  console.log(`Sending email to ${user.email}`);

  return { sent: true, to: user.email };
}
