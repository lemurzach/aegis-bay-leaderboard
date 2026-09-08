import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { HeroStatusBadge } from "@/components/badges";

export default async function HeroDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hero = await prisma.hero.findUnique({ where: { id: Number(id) } });

  if (!hero) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/"
        className="text-sm font-bold uppercase tracking-wide text-zinc-400 transition hover:text-red-500"
      >
        ← Back to leaderboard
      </Link>

      <div className="hero-card mt-4 flex flex-col gap-6 border border-zinc-800 bg-zinc-900/60 p-6 sm:flex-row">
        {hero.imageUrl ? (
          <Image
            src={hero.imageUrl}
            alt={hero.heroName}
            width={160}
            height={160}
            className="h-40 w-40 shrink-0 rounded-xl object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border-4 border-red-600 bg-zinc-950 font-display text-4xl text-yellow-400">
            {hero.rank}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-yellow-400 bg-yellow-400/10 px-3 py-1 font-display text-sm text-yellow-300">
              Rank #{hero.rank}
            </span>
            <HeroStatusBadge status={hero.status} />
          </div>
          <h1 className="mt-3 font-display text-4xl text-white">
            {hero.heroName}
          </h1>
          <p className="text-zinc-500">{hero.name}</p>

          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">
              Quirk
            </h2>
            <p className="font-semibold text-zinc-100">{hero.quirk}</p>
            <p className="mt-1 text-zinc-400">{hero.quirkDescription}</p>
          </div>
        </div>
      </div>

      {hero.agency && (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">
            Agency
          </h2>
          <p className="mt-2 leading-relaxed text-zinc-300">{hero.agency}</p>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">
          Biography
        </h2>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-zinc-300">
          {hero.bio}
        </p>
      </div>
    </div>
  );
}
