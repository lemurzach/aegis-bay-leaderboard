import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HeroStatusBadge } from "@/components/badges";

export const dynamic = "force-dynamic";

const rankStyles = [
  "border-yellow-400 bg-yellow-400/10 text-yellow-300",
  "border-zinc-300/60 bg-zinc-300/10 text-zinc-200",
  "border-orange-500/70 bg-orange-500/10 text-orange-300",
];

export default async function HeroesPage() {
  const heroes = await prisma.hero.findMany({ orderBy: { rank: "asc" } });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl text-white">
          Hero <span className="text-red-600">Leaderboard</span>
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Official rankings of Aegis Bay&apos;s licensed pro heroes, updated by
          the Public Safety Commission.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {heroes.map((hero) => (
          <Link
            key={hero.id}
            href={`/heroes/${hero.id}`}
            className="hero-card group flex gap-4 border border-zinc-800 bg-zinc-900/60 p-4 transition hover:border-red-600/70 hover:bg-zinc-900"
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 font-display text-lg ${
                rankStyles[hero.rank - 1] ??
                "border-zinc-700 bg-zinc-800/40 text-zinc-300"
              }`}
            >
              {hero.rank}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h2 className="truncate font-display text-lg text-white group-hover:text-red-500">
                  {hero.heroName}
                </h2>
                <HeroStatusBadge status={hero.status} />
              </div>
              <p className="text-sm text-zinc-500">{hero.name}</p>
              <p className="mt-1 text-sm text-zinc-400">
                Quirk: <span className="text-zinc-200">{hero.quirk}</span>
              </p>
              {hero.agency && (
                <p className="mt-1 truncate text-xs font-bold uppercase tracking-wide text-red-500/80">
                  {hero.agency}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {heroes.length === 0 && (
        <p className="rounded-xl border border-dashed border-zinc-800 p-10 text-center text-zinc-500">
          No heroes have been registered yet. Check back soon.
        </p>
      )}
    </div>
  );
}
