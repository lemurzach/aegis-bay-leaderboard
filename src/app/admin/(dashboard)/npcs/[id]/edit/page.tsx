import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NpcForm } from "../../npc-form";
import { updateNpc } from "../../actions";

export default async function EditNpcPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const npc = await prisma.npc.findUnique({ where: { id: Number(id) } });

  if (!npc) notFound();

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-white">Edit {npc.name}</h2>
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <NpcForm npc={npc} action={updateNpc.bind(null, npc.id)} />
      </div>
    </div>
  );
}
