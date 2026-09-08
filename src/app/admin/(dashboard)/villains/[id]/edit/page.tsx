import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VillainForm } from "../../villain-form";
import { updateVillain } from "../../actions";

export default async function EditVillainPage({
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
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-white">
        Edit {villain.alias}
      </h2>
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <VillainForm
          villain={villain}
          action={updateVillain.bind(null, villain.id)}
        />
      </div>
    </div>
  );
}
