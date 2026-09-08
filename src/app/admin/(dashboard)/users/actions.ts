"use server";

import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";

export async function deleteUser(id: number) {
  await verifyAdmin();

  await prisma.user.delete({ where: { id } });

  revalidatePath("/admin/users");
}
