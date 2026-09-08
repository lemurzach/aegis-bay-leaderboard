import Link from "next/link";
import { NavTabs } from "./nav-tabs";
import { AuthStatus } from "./auth-status";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="hero-stripe h-1.5 w-full" />
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-5">
          <Link href="/" className="group">
            <p className="font-display text-2xl leading-none text-red-600">
              AEGIS BAY
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white">
              Hero Registry
            </p>
          </Link>
          <div className="flex items-center gap-6">
            <NavTabs />
            <AuthStatus />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        {children}
      </main>
      <footer className="border-t border-zinc-800 bg-zinc-950 py-6 text-center text-xs uppercase tracking-wide text-zinc-600">
        Aegis Bay Hero Public Safety Commission
      </footer>
    </div>
  );
}
