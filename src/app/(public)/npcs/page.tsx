import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NpcsPage() {
  const npcs = await prisma.npc.findMany({
    orderBy: [{ important: "desc" }, { name: "asc" }],
  });

  const importantNpcs = npcs.filter((npc) => npc.important);
  const otherNpcs = npcs.filter((npc) => !npc.important);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl text-white">
          Notable <span className="text-red-600">NPCs</span>
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Other figures around Aegis Bay — unranked heroes, allies, and
          civilians worth knowing about.
        </p>
      </div>

      {importantNpcs.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-yellow-400">
            ★ Important NPCs
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {importantNpcs.map((npc) => (
              <Link
                key={npc.id}
                href={`/npcs/${npc.id}`}
                className="hero-card group flex flex-col gap-2 border-2 border-yellow-400/60 bg-zinc-900/60 p-4 transition hover:border-yellow-400 hover:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="truncate font-display text-lg text-white group-hover:text-yellow-300">
                    {npc.name}
                  </h3>
                  <span className="text-yellow-400">★</span>
                </div>
                <p className="text-sm font-bold uppercase tracking-wide text-red-500/80">
                  {npc.role}
                </p>
                {npc.quirk && (
                  <p className="text-sm text-zinc-400">
                    Quirk: <span className="text-zinc-200">{npc.quirk}</span>
                  </p>
                )}
                {npc.location && (
                  <p className="text-xs text-zinc-500">{npc.location}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        {importantNpcs.length > 0 && (
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
            Other NPCs
          </h2>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {otherNpcs.map((npc) => (
            <Link
              key={npc.id}
              href={`/npcs/${npc.id}`}
              className="group flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition hover:border-red-600/70 hover:bg-zinc-900"
            >
              <h3 className="truncate font-display text-lg text-white group-hover:text-red-500">
                {npc.name}
              </h3>
              <p className="text-sm font-bold uppercase tracking-wide text-red-500/80">
                {npc.role}
              </p>
              {npc.quirk && (
                <p className="text-sm text-zinc-400">
                  Quirk: <span className="text-zinc-200">{npc.quirk}</span>
                </p>
              )}
              {npc.location && (
                <p className="text-xs text-zinc-500">{npc.location}</p>
              )}
            </Link>
          ))}
        </div>
      </div>

      {npcs.length === 0 && (
        <p className="rounded-xl border border-dashed border-zinc-800 p-10 text-center text-zinc-500">
          No NPCs have been added yet.
        </p>
      )}
    </div>
  );
}
