import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { StatusBadge } from "@/components/content/StatusBadge";
import { ArrowLeft, BookOpen, Layers, Tag } from "lucide-react";
import { getAllChapterSlugs, getChapterBySlug } from "@/lib/content/loader";
import type { Track } from "@/types/content";

export function generateStaticParams() {
  return getAllChapterSlugs();
}

export const dynamicParams = false;

const TRACK_LABEL: Record<string, string> = {
  os: "Operating Systems",
  networking: "Computer Networks",
};

export function generateMetadata({
  params,
}: {
  params: { track: string; slug: string };
}) {
  const c = getChapterBySlug(params.track as Track, params.slug);
  return {
    title: c ? `${c.title} — DSA Visual` : "Chapter — DSA Visual",
  };
}

export default function ChapterPage({
  params,
}: {
  params: { track: string; slug: string };
}) {
  const track = params.track as Track;
  if (track !== "os" && track !== "networking") notFound();
  const chapter = getChapterBySlug(track, params.slug);
  if (!chapter) notFound();

  return (
    <Container className="py-12 max-w-3xl">
      <Link
        href={`/${track === "os" ? "operating-systems" : "computer-networks"}`}
        className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink mb-6"
      >
        <ArrowLeft className="w-3 h-3" /> All {TRACK_LABEL[track]} chapters
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-1">
            {TRACK_LABEL[track]} · Chapter
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">
            {chapter.title}
          </h1>
          <p className="mt-2 text-muted max-w-2xl">{chapter.summary}</p>
        </div>
        <StatusBadge status={chapter.status} />
      </div>

      <Card className="bg-elev border-line mb-6">
        <p className="text-base text-ink/90 leading-relaxed whitespace-pre-line">
          {chapter.body}
        </p>
      </Card>

      {chapter.keyTerms && chapter.keyTerms.length > 0 && (
        <Card className="bg-elev border-line mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted">
              <Tag className="w-3 h-3" /> Key terms
            </span>
            {chapter.keyTerms.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </Card>
      )}

      {chapter.subTopics && chapter.subTopics.length > 0 && (
        <Card className="bg-elev border-line mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-accent" />
            <h2 className="text-base font-semibold text-ink">
              Sub-topics in this chapter
            </h2>
            <span className="text-xs text-muted">
              ({chapter.subTopics.length})
            </span>
          </div>
          <ul className="space-y-2">
            {chapter.subTopics.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/chapter/${track}/${chapter.slug}/${s.slug}`}
                  className="group flex items-start gap-3 rounded-md border border-transparent bg-elev2/40 px-3 py-2.5 transition hover:border-accent/30 hover:bg-elev2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-ink">
                        {s.title}
                      </span>
                      {s.duration && (
                        <span className="text-[10px] uppercase tracking-wider text-muted">
                          {s.duration}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-muted leading-relaxed">
                      {s.summary}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="shrink-0 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {chapter.lessons && chapter.lessons.length > 0 && (
        <Card className="bg-elev border-line">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-accent" />
            <h2 className="text-base font-semibold text-ink">Lessons in this chapter</h2>
          </div>
          <ul className="space-y-2">
            {chapter.lessons.map((l) => (
              <li key={l.slug} className="text-sm">
                <div className="text-ink font-medium">{l.title}</div>
                <div className="text-muted text-xs">{l.summary}</div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </Container>
  );
}