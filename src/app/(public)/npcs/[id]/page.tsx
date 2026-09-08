import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PrivateNote } from "@/components/private-note";
import { getCurrentUser } from "@/lib/user-dal";
import { saveNpcNote } from "@/app/(public)/notes-actions";

export default async function NpcDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const npcId = Number(id);
  const npc = await prisma.npc.findUnique({ where: { id: npcId } });

  if (!npc) notFound();

  const user = await getCurrentUser();
  const existingNote = user
    ? await prisma.npcNote.findUnique({
        where: { userId_npcId: { userId: user.id, npcId } },
      })
    : null;

  return (
    <div className="max-w-3xl">
      <Link
        href="/npcs"
        className="text-sm font-bold uppercase tracking-wide text-zinc-400 transition hover:text-red-500"
      >
        ← Back to NPCs
      </Link>

      <div
        className={`mt-4 flex flex-col gap-6 border bg-zinc-900/60 p-6 sm:flex-row ${
          npc.important
            ? "hero-card border-2 border-yellow-400/60"
            : "rounded-xl border-zinc-800"
        }`}
      >
        {npc.imageUrl ? (
          <Image
            src={npc.imageUrl}
            alt={npc.name}
            width={160}
            height={160}
            className="h-40 w-40 shrink-0 rounded-xl object-cover"
            unoptimized
          />
        ) : (
          <div
            className={`flex h-40 w-40 shrink-0 items-center justify-center rounded-full border-4 bg-zinc-950 font-display text-4xl ${
              npc.important
                ? "border-yellow-400 text-yellow-400"
                : "border-zinc-700 text-zinc-500"
            }`}
          >
            {npc.important ? "★" : npc.name.charAt(0)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            {npc.important && (
              <span className="rounded-full border border-yellow-400 bg-yellow-400/10 px-3 py-1 font-display text-sm text-yellow-300">
                ★ Important NPC
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-4xl text-white">{npc.name}</h1>
          <p className="text-sm font-bold uppercase tracking-wide text-red-500/80">
            {npc.role}
          </p>
          {npc.location && (
            <p className="mt-1 text-sm text-zinc-400">{npc.location}</p>
          )}

          {npc.quirk && (
            <div className="mt-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">
                Quirk
              </h2>
              <p className="font-semibold text-zinc-100">{npc.quirk}</p>
              {npc.quirkDescription && (
                <p className="mt-1 text-zinc-400">{npc.quirkDescription}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">
          Biography
        </h2>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-zinc-300">
          {npc.bio}
        </p>
      </div>

      {user ? (
        <PrivateNote
          initialContent={existingNote?.content ?? ""}
          action={saveNpcNote.bind(null, npc.id)}
        />
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-500">
          <Link href="/login" className="font-bold text-red-500 hover:text-red-400">
            Log in
          </Link>{" "}
          to leave a private note about this NPC.
        </div>
      )}
    </div>
  );
}
