import { HeroForm } from "../hero-form";
import { createHero } from "../actions";

export default function NewHeroPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-white">Add a hero</h2>
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <HeroForm action={createHero} />
      </div>
    </div>
  );
}
