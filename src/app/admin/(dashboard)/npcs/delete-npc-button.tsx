"use client";

import { startTransition } from "react";
import { deleteNpc } from "./actions";

export function DeleteNpcButton({ id, name }: { id: number; name: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm(`Remove ${name} from the NPC directory?`)) {
          startTransition(() => deleteNpc(id));
        }
      }}
      className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-red-500 hover:text-red-400"
    >
      Delete
    </button>
  );
}
