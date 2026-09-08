import type { DangerLevel, HeroStatus, VillainStatus } from "@prisma/client";

const badgeBase =
  "inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide";

const heroStatusStyles: Record<HeroStatus, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  RETIRED: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  MISSING: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

const heroStatusLabels: Record<HeroStatus, string> = {
  ACTIVE: "Active",
  RETIRED: "Retired",
  MISSING: "Missing",
};

export function HeroStatusBadge({ status }: { status: HeroStatus }) {
  return (
    <span className={`${badgeBase} ${heroStatusStyles[status]}`}>
      {heroStatusLabels[status]}
    </span>
  );
}

const villainStatusStyles: Record<VillainStatus, string> = {
  AT_LARGE: "bg-red-600/20 text-red-400 border-red-600/40",
  CAPTURED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const villainStatusLabels: Record<VillainStatus, string> = {
  AT_LARGE: "At large",
  CAPTURED: "Captured",
};

export function VillainStatusBadge({ status }: { status: VillainStatus }) {
  return (
    <span className={`${badgeBase} ${villainStatusStyles[status]}`}>
      {villainStatusLabels[status]}
    </span>
  );
}

const dangerStyles: Record<DangerLevel, string> = {
  LOW: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  MODERATE: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  HIGH: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  EXTREME: "bg-red-600/20 text-red-400 border-red-600/40",
};

const dangerLabels: Record<DangerLevel, string> = {
  LOW: "Low danger",
  MODERATE: "Moderate danger",
  HIGH: "High danger",
  EXTREME: "Extreme danger",
};

export function DangerBadge({ level }: { level: DangerLevel }) {
  return (
    <span className={`${badgeBase} ${dangerStyles[level]}`}>
      {dangerLabels[level]}
    </span>
  );
}
