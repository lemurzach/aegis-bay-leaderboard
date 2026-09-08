"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createUserSession } from "@/lib/user-session";
import { signupSchema } from "@/lib/validation";

export type SignupState = { error?: string } | undefined;

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { email, password } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 12);

  let userId: number;
  try {
    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { id: true },
    });
    userId = user.id;
  } catch {
    return { error: "An account with that email already exists." };
  }

  await createUserSession(userId);
  redirect("/");
}
