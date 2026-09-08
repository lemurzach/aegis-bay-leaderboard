import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DangerBadge, VillainStatusBadge } from "@/components/badges";

export default async function VillainDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const villain = await prisma.villain.findUnique({
    where: { id: Number(id) },
  });

  if (!villain) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/villains"
        className="text-sm font-bold uppercase tracking-wide text-zinc-400 transition hover:text-red-500"
      >
        ← Back to bounty board
      </Link>

      <div className="hero-card-alt mt-4 flex flex-col gap-6 border border-zinc-800 bg-zinc-900/60 p-6 sm:flex-row">
        {villain.imageUrl ? (
          <Image
            src={villain.imageUrl}
            alt={villain.alias}
            width={160}
            height={160}
            className="h-40 w-40 shrink-0 rounded-xl object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-40 w-40 shrink-0 items-center justify-center border-4 border-red-600 bg-zinc-950 font-display text-xl text-red-500">
            WANTED
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-yellow-400 bg-yellow-400/10 px-3 py-1 font-display text-sm text-yellow-300">
              ${villain.bounty.toLocaleString()} bounty
            </span>
            <VillainStatusBadge status={villain.status} />
            <DangerBadge level={villain.dangerLevel} />
          </div>
          <h1 className="mt-3 font-display text-4xl text-white">
            {villain.alias}
          </h1>
          <p className="text-zinc-500">{villain.name}</p>
          {villain.lastKnownLocation && (
            <p className="mt-1 text-sm text-zinc-400">
              Last known location: {villain.lastKnownLocation}
            </p>
          )}

          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">
              Quirk
            </h2>
            <p className="font-semibold text-zinc-100">{villain.quirk}</p>
            <p className="mt-1 text-zinc-400">{villain.quirkDescription}</p>
          </div>
        </div>
      </div>

      {villain.organization && (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">
            Organization
          </h2>
          <p className="mt-2 leading-relaxed text-zinc-300">
            {villain.organization}
          </p>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">
          Case file
        </h2>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-zinc-300">
          {villain.bio}
        </p>
      </div>
    </div>
  );
}
