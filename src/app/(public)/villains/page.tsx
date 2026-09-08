import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DangerBadge, VillainStatusBadge } from "@/components/badges";

export const dynamic = "force-dynamic";

export default async function VillainsPage() {
  const villains = await prisma.villain.findMany({
    orderBy: { bounty: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl text-white">
          Bounties &amp; <span className="text-red-600">Villains</span>
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Active bounties issued by the Aegis Bay Public Safety Commission.
          Report sightings to your local hero agency — do not engage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {villains.map((villain) => (
          <Link
            key={villain.id}
            href={`/villains/${villain.id}`}
            className="hero-card-alt group flex flex-col gap-3 border border-zinc-800 bg-zinc-900/60 p-4 transition hover:border-red-600/70 hover:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg text-white group-hover:text-red-500">
                  {villain.alias}
                </h2>
                <p className="text-sm text-zinc-500">{villain.name}</p>
              </div>
              <VillainStatusBadge status={villain.status} />
            </div>

            <p className="font-display text-xl text-yellow-400">
              ${villain.bounty.toLocaleString()}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <DangerBadge level={villain.dangerLevel} />
              {villain.lastKnownLocation && (
                <span className="text-xs text-zinc-500">
                  Last seen: {villain.lastKnownLocation}
                </span>
              )}
            </div>

            {villain.organization && (
              <p className="text-xs font-bold uppercase tracking-wide text-red-500/80">
                {villain.organization}
              </p>
            )}

            <p className="text-sm text-zinc-400">
              Quirk: <span className="text-zinc-200">{villain.quirk}</span>
            </p>
          </Link>
        ))}
      </div>

      {villains.length === 0 && (
        <p className="rounded-xl border border-dashed border-zinc-800 p-10 text-center text-zinc-500">
          No active bounties right now.
        </p>
      )}
    </div>
  );
}
