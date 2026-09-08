import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteVillainButton } from "./delete-villain-button";

export default async function AdminVillainsPage() {
  const villains = await prisma.villain.findMany({
    orderBy: { bounty: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-white">
          Bounties &amp; Villains
        </h2>
        <Link
          href="/admin/villains/new"
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
        >
          + Add villain
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/80 text-zinc-400">
            <tr>
              <th className="px-4 py-3">Bounty</th>
              <th className="px-4 py-3">Villain</th>
              <th className="px-4 py-3">Danger</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {villains.map((villain) => (
              <tr key={villain.id} className="bg-zinc-950/40">
                <td className="px-4 py-3 font-display text-yellow-400">
                  ${villain.bounty.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold text-white">{villain.alias}</div>
                  <div className="text-xs text-zinc-500">{villain.name}</div>
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  {villain.dangerLevel}
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  {villain.status === "AT_LARGE" ? "At large" : "Captured"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/villains/${villain.id}/edit`}
                      className="rounded-md border border-zinc-700 px-3 py-1.5 text-zinc-300 transition hover:border-red-500 hover:text-red-400"
                    >
                      Edit
                    </Link>
                    <DeleteVillainButton id={villain.id} name={villain.alias} />
                  </div>
                </td>
              </tr>
            ))}
            {villains.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  No villains yet. Add your first bounty above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
