"use client";

import { useActionState } from "react";
import type { Npc } from "@prisma/client";
import type { NpcFormState } from "./actions";

export function NpcForm({
  npc,
  action,
}: {
  npc?: Npc;
  action: (state: NpcFormState, formData: FormData) => Promise<NpcFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <label className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2">
        <input
          type="checkbox"
          name="important"
          defaultChecked={npc?.important ?? false}
          className="h-4 w-4 accent-red-600"
        />
        <span className="text-sm font-bold uppercase tracking-wide text-zinc-300">
          Important NPC (featured at the top)
        </span>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Name">
          <input
            name="name"
            required
            defaultValue={npc?.name}
            className={inputClass}
          />
        </Field>
        <Field label="Role">
          <input
            name="role"
            required
            defaultValue={npc?.role}
            placeholder="e.g. Harbor District Shopkeeper"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Location (optional)">
        <input
          name="location"
          defaultValue={npc?.location ?? ""}
          className={inputClass}
        />
      </Field>

      <Field label="Image URL (optional)">
        <input
          name="imageUrl"
          defaultValue={npc?.imageUrl ?? ""}
          placeholder="https://…"
          className={inputClass}
        />
      </Field>

      <Field label="Quirk name (optional)">
        <input
          name="quirk"
          defaultValue={npc?.quirk ?? ""}
          className={inputClass}
        />
      </Field>

      <Field label="Quirk description (optional)">
        <textarea
          name="quirkDescription"
          rows={3}
          defaultValue={npc?.quirkDescription ?? ""}
          className={inputClass}
        />
      </Field>

      <Field label="Bio">
        <textarea
          name="bio"
          required
          rows={5}
          defaultValue={npc?.bio}
          className={inputClass}
        />
      </Field>

      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-red-600 px-5 py-2 font-bold uppercase tracking-wide text-white transition hover:bg-red-500 disabled:opacity-60"
      >
        {pending ? "Saving…" : npc ? "Save changes" : "Add NPC"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-bold uppercase tracking-wide text-zinc-300">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500";
