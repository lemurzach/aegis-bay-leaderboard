import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { HeroForm } from "../../hero-form";
import { updateHero } from "../../actions";

export default async function EditHeroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hero = await prisma.hero.findUnique({ where: { id: Number(id) } });

  if (!hero) notFound();

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-white">
        Edit {hero.heroName}
      </h2>
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <HeroForm hero={hero} action={updateHero.bind(null, hero.id)} />
      </div>
    </div>
  );
}
