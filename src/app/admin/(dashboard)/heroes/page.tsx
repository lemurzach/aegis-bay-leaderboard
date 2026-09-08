import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteHeroButton } from "./delete-hero-button";

export default async function AdminHeroesPage() {
  const heroes = await prisma.hero.findMany({ orderBy: { rank: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-white">Heroes</h2>
        <Link
          href="/admin/heroes/new"
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
        >
          + Add hero
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/80 text-zinc-400">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Hero</th>
              <th className="px-4 py-3">Quirk</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {heroes.map((hero) => (
              <tr key={hero.id} className="bg-zinc-950/40">
                <td className="px-4 py-3 font-display text-yellow-400">
                  {hero.rank}
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold text-white">{hero.heroName}</div>
                  <div className="text-xs text-zinc-500">{hero.name}</div>
                </td>
                <td className="px-4 py-3 text-zinc-300">{hero.quirk}</td>
                <td className="px-4 py-3 text-zinc-300">{hero.status}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/heroes/${hero.id}/edit`}
                      className="rounded-md border border-zinc-700 px-3 py-1.5 text-zinc-300 transition hover:border-red-500 hover:text-red-400"
                    >
                      Edit
                    </Link>
                    <DeleteHeroButton id={hero.id} name={hero.heroName} />
                  </div>
                </td>
              </tr>
            ))}
            {heroes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  No heroes yet. Add your first one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
