import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteNpcButton } from "./delete-npc-button";

export default async function AdminNpcsPage() {
  const npcs = await prisma.npc.findMany({
    orderBy: [{ important: "desc" }, { name: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-white">NPCs</h2>
        <Link
          href="/admin/npcs/new"
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
        >
          + Add NPC
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/80 text-zinc-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Important</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {npcs.map((npc) => (
              <tr key={npc.id} className="bg-zinc-950/40">
                <td className="px-4 py-3 font-bold text-white">{npc.name}</td>
                <td className="px-4 py-3 text-zinc-300">{npc.role}</td>
                <td className="px-4 py-3 text-zinc-300">
                  {npc.important ? (
                    <span className="text-yellow-400">★ Yes</span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/npcs/${npc.id}/edit`}
                      className="rounded-md border border-zinc-700 px-3 py-1.5 text-zinc-300 transition hover:border-red-500 hover:text-red-400"
                    >
                      Edit
                    </Link>
                    <DeleteNpcButton id={npc.id} name={npc.name} />
                  </div>
                </td>
              </tr>
            ))}
            {npcs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  No NPCs yet. Add your first one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
