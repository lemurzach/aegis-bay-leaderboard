"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { npcSchema } from "@/lib/validation";

export type NpcFormState = { error?: string } | undefined;

function parseNpcForm(formData: FormData) {
  const parsed = npcSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    quirk: formData.get("quirk"),
    quirkDescription: formData.get("quirkDescription"),
    bio: formData.get("bio"),
    imageUrl: formData.get("imageUrl"),
    location: formData.get("location"),
  });

  if (!parsed.success) return parsed;

  return {
    ...parsed,
    data: { ...parsed.data, important: formData.get("important") === "on" },
  };
}

export async function createNpc(
  _prevState: NpcFormState,
  formData: FormData
): Promise<NpcFormState> {
  await verifyAdmin();

  const parsed = parseNpcForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.npc.create({ data: parsed.data });

  revalidatePath("/npcs");
  revalidatePath("/admin/npcs");
  redirect("/admin/npcs");
}

export async function updateNpc(
  id: number,
  _prevState: NpcFormState,
  formData: FormData
): Promise<NpcFormState> {
  await verifyAdmin();

  const parsed = parseNpcForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.npc.update({ where: { id }, data: parsed.data });

  revalidatePath("/npcs");
  revalidatePath("/admin/npcs");
  redirect("/admin/npcs");
}

export async function deleteNpc(id: number) {
  await verifyAdmin();

  await prisma.npc.delete({ where: { id } });

  revalidatePath("/npcs");
  revalidatePath("/admin/npcs");
}
