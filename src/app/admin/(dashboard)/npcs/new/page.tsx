import { NpcForm } from "../npc-form";
import { createNpc } from "../actions";

export default function NewNpcPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-white">Add an NPC</h2>
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <NpcForm action={createNpc} />
      </div>
    </div>
  );
}
