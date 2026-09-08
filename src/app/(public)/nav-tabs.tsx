"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Heroes" },
  { href: "/villains", label: "Bounties & Villains" },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide">
      {TABS.map((tab) => {
        const active =
          tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              active
                ? "border-b-2 border-red-600 px-4 py-2 text-white"
                : "border-b-2 border-transparent px-4 py-2 text-zinc-400 transition hover:text-red-400"
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
