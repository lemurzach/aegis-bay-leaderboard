import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decryptUserSession, getUserSessionCookie } from "@/lib/user-session";
import { prisma } from "@/lib/prisma";

export const getCurrentUser = cache(async () => {
  const cookie = await getUserSessionCookie();
  const session = await decryptUserSession(cookie);
  if (!session?.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true },
  });

  return user;
});

export const requireUser = cache(async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
});
