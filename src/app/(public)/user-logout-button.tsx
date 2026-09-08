"use client";

import { startTransition } from "react";
import { logoutUser } from "./actions";

export function UserLogoutButton() {
  return (
    <button
      type="button"
      onClick={() => startTransition(() => logoutUser())}
      className="text-zinc-400 transition hover:text-red-400"
    >
      Log out
    </button>
  );
}
