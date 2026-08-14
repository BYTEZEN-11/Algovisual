import { patterns } from "@/content/patterns";
import { lldModules } from "@/content/lld";
import { osChapters } from "@/content/os";
import { networkingChapters } from "@/content/networking";

export interface SearchEntry {
  id: string;
  title: string;
  subtitle?: string;
  track: "dsa" | "lld" | "os" | "networking";
  href: string;
}

export const searchIndex: SearchEntry[] = [
  ...patterns.flatMap((p) =>
    p.topics.map((t) => ({
      id: `dsa:${p.slug}:${t.slug}`,
      title: t.title,
      subtitle: p.title,
      track: "dsa" as const,
      href: `/patterns/${p.slug}/${t.slug}`,
    })),
  ),
  ...patterns.map((p) => ({
    id: `dsa-pattern:${p.slug}`,
    title: p.title,
    subtitle: "Pattern",
    track: "dsa" as const,
    href: `/patterns/${p.slug}`,
  })),
  ...lldModules.flatMap((m) =>
    m.lessons.map((l) => ({
      id: `lld:${m.slug}:${l.slug}`,
      title: l.title,
      subtitle: m.title,
      track: "lld" as const,
      href: `/lld/${m.slug}#${l.slug}`,
    })),
  ),
  ...osChapters.map((c) => ({
    id: `os:${c.slug}`,
    title: c.title,
    subtitle: "Operating Systems",
    track: "os" as const,
    href: `/chapter/os/${c.slug}`,
  })),
  ...networkingChapters.map((c) => ({
    id: `networking:${c.slug}`,
    title: c.title,
    subtitle: "Computer Networks",
    track: "networking" as const,
    href: `/chapter/networking/${c.slug}`,
  })),
];

export function fuzzyMatch(query: string, entry: SearchEntry): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = entry.title.toLowerCase();
  const s = (entry.subtitle ?? "").toLowerCase();

  if (t.startsWith(q)) return 1000;
  if (t.includes(q)) return 100 + (t.indexOf(q) === 0 ? 50 : 0);
  if (s.includes(q)) return 50;

  let ti = 0;
  for (const ch of q) {
    const idx = t.indexOf(ch, ti);
    if (idx === -1) return 0;
    ti = idx + 1;
  }
  return 10;
}

export function searchEntries(query: string, limit = 8): SearchEntry[] {
  if (!query.trim()) return [];
  const scored = searchIndex
    .map((e) => ({ e, s: fuzzyMatch(query, e) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit);
  return scored.map((x) => x.e);
}