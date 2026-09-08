import { prisma } from "@/lib/prisma";
import { DeleteUserButton } from "./delete-user-button";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { heroNotes: true, villainNotes: true, npcNotes: true },
      },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-white">Users</h2>
        <p className="text-sm text-zinc-500">
          {users.length} account{users.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/80 text-zinc-400">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {users.map((user) => (
              <tr key={user.id} className="bg-zinc-950/40">
                <td className="px-4 py-3 font-bold text-white">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  {user.createdAt.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  {user._count.heroNotes +
                    user._count.villainNotes +
                    user._count.npcNotes}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <DeleteUserButton id={user.id} email={user.email} />
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  No one has signed up yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
