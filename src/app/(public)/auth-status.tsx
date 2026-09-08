import Link from "next/link";
import { getCurrentUser } from "@/lib/user-dal";
import { UserLogoutButton } from "./user-logout-button";

export async function AuthStatus() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
        <Link href="/login" className="text-zinc-400 transition hover:text-red-400">
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-md bg-red-600 px-3 py-1.5 text-white transition hover:bg-red-500"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="hidden truncate text-zinc-500 sm:inline">
        {user.email}
      </span>
      <UserLogoutButton />
    </div>
  );
}
