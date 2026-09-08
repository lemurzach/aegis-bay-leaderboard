"use client";

import { useActionState } from "react";
import type { NoteState } from "@/app/(public)/notes-actions";

export function PrivateNote({
  initialContent,
  action,
}: {
  initialContent: string;
  action: (state: NoteState, formData: FormData) => Promise<NoteState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">
        Your Private Notes
      </h2>
      <p className="mt-1 text-xs text-zinc-500">
        Only visible to you — no one else can see this.
      </p>

      <form action={formAction} className="mt-3 space-y-3">
        <textarea
          name="content"
          rows={4}
          defaultValue={initialContent}
          placeholder="Jot down anything you want to remember…"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
        />

        {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-red-600 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save note"}
          </button>
          {state?.success && (
            <span className="text-sm text-emerald-400">Saved</span>
          )}
        </div>
      </form>
    </div>
  );
}
