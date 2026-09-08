import { VillainForm } from "../villain-form";
import { createVillain } from "../actions";

export default function NewVillainPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-white">Add a villain</h2>
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <VillainForm action={createVillain} />
      </div>
    </div>
  );
}
