import Link from "next/link";
import { Container, SectionHeading } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { patterns } from "@/content/patterns";
import { lldModules } from "@/content/lld";
import { osChapters } from "@/content/os";
import { networkingChapters } from "@/content/networking";
import { Bookmark } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Bookmarks — DSA Visual" };

interface BookmarkRow {
  id: string;
  topicId: string;
  track: string;
  createdAt: Date;
}

function lookupTitle(track: string, topicId: string): { title: string; href: string } | undefined {
  if (track === "dsa") {
    const parts = topicId.split(":");
    if (parts.length === 3) {
      const [, patternSlug, topicSlug] = parts;
      const p = patterns.find((x) => x.slug === patternSlug);
      const t = p?.topics.find((x) => x.slug === topicSlug);
      if (t && p) {
        return { title: t.title, href: `/patterns/${p.slug}/${t.slug}` };
      }
    }
  }
  if (track === "lld") {
    for (const m of lldModules) {
      const l = m.lessons.find((x) => x.slug === topicId);
      if (l) return { title: l.title, href: `/lld/${m.slug}#${l.slug}` };
    }
  }
  if (track === "os") {
    const c = osChapters.find((x) => x.slug === topicId);
    if (c) return { title: c.title, href: `/operating-systems/${c.slug}` };
  }
  if (track === "networking") {
    const c = networkingChapters.find((x) => x.slug === topicId);
    if (c) return { title: c.title, href: `/computer-networks/${c.slug}` };
  }
  return undefined;
}

export default async function BookmarksPage() {
  const user = await requireUser();
  const rows = (await prisma.bookmark.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })) as BookmarkRow[];

  const grouped: Record<string, BookmarkRow[]> = {};
  for (const r of rows) {
    (grouped[r.track] ??= []).push(r);
  }

  const trackLabels: Record<string, string> = {
    dsa: "DSA",
    lld: "LLD",
    os: "Operating Systems",
    networking: "Computer Networks",
  };

  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="Bookmarks"
        title="Your saved topics"
        subtitle="Everything you've bookmarked, grouped by track."
      />

      {rows.length === 0 ? (
        <Card className="text-center py-12 text-muted">
          You haven't bookmarked anything yet. Open any topic and tap{" "}
          <span className="text-ink">Save</span>.
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.keys(trackLabels).map((track) => {
            const items = grouped[track];
            if (!items || items.length === 0) return null;
            return (
              <section key={track}>
                <div className="flex items-center gap-2 mb-3">
                  <Chip>{trackLabels[track]}</Chip>
                  <span className="text-xs text-muted">
                    {items.length} saved
                  </span>
                </div>
                <Card className="bg-elev border-line divide-y divide-line p-0">
                  <ul>
                    {items.map((b) => {
                      const lookup = lookupTitle(b.track, b.topicId);
                      return (
                        <li key={b.id} className="px-4 py-3 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-ink truncate">
                              {lookup?.title ?? b.topicId}
                            </div>
                            <div className="text-xs text-muted truncate">{b.topicId}</div>
                          </div>
                          {lookup ? (
                            <Link
                              href={lookup.href}
                              className="text-xs text-accent hover:underline whitespace-nowrap"
                            >
                              Open →
                            </Link>
                          ) : (
                            <Bookmark className="w-4 h-4 text-muted shrink-0" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </section>
            );
          })}
        </div>
      )}
    </Container>
  );
}