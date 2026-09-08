"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <div className="hero-card border border-zinc-800 bg-zinc-900/70 p-8 shadow-xl">
        <p className="text-xs font-bold uppercase tracking-widest text-red-500">
          Aegis Bay
        </p>
        <h1 className="font-display text-2xl text-white">Command Center</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Admin access only. Enter your password to manage heroes and
          villains.
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-bold uppercase tracking-wide text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-400">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-red-600 px-4 py-2 font-bold uppercase tracking-wide text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
