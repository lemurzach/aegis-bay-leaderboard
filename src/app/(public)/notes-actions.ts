"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/user-dal";
import { prisma } from "@/lib/prisma";
import { noteSchema } from "@/lib/validation";

export type NoteState = { error?: string; success?: boolean } | undefined;

export async function saveHeroNote(
  heroId: number,
  _prevState: NoteState,
  formData: FormData
): Promise<NoteState> {
  const user = await requireUser();

  const parsed = noteSchema.safeParse({ content: formData.get("content") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.heroNote.upsert({
    where: { userId_heroId: { userId: user.id, heroId } },
    create: { userId: user.id, heroId, content: parsed.data.content },
    update: { content: parsed.data.content },
  });

  revalidatePath(`/heroes/${heroId}`);
  return { success: true };
}

export async function saveVillainNote(
  villainId: number,
  _prevState: NoteState,
  formData: FormData
): Promise<NoteState> {
  const user = await requireUser();

  const parsed = noteSchema.safeParse({ content: formData.get("content") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.villainNote.upsert({
    where: { userId_villainId: { userId: user.id, villainId } },
    create: { userId: user.id, villainId, content: parsed.data.content },
    update: { content: parsed.data.content },
  });

  revalidatePath(`/villains/${villainId}`);
  return { success: true };
}
