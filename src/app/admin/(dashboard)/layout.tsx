import Link from "next/link";
import { verifyAdmin } from "@/lib/dal";
import { LogoutButton } from "@/app/admin/logout-button";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifyAdmin();

  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="hero-stripe h-1.5 w-full" />
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-red-500">
              Aegis Bay
            </p>
            <h1 className="font-display text-xl text-white">Command Center</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide">
            <Link
              href="/admin/heroes"
              className="text-zinc-300 transition hover:text-red-500"
            >
              Heroes
            </Link>
            <Link
              href="/admin/npcs"
              className="text-zinc-300 transition hover:text-red-500"
            >
              NPCs
            </Link>
            <Link
              href="/admin/villains"
              className="text-zinc-300 transition hover:text-red-500"
            >
              Bounties &amp; Villains
            </Link>
            <Link
              href="/"
              className="text-zinc-300 transition hover:text-red-500"
            >
              View site
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
