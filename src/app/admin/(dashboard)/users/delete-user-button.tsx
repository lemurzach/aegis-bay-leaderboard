"use client";

import { startTransition } from "react";
import { deleteUser } from "./actions";

export function DeleteUserButton({ id, email }: { id: number; email: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (
          confirm(
            `Remove the account for ${email}? This also deletes all of their private notes.`
          )
        ) {
          startTransition(() => deleteUser(id));
        }
      }}
      className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-red-500 hover:text-red-400"
    >
      Delete
    </button>
  );
}
