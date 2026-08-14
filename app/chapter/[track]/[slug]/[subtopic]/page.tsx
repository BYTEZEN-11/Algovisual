import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ArrowLeft, Tag, Clock } from "lucide-react";
import { getAllSubTopicSlugs, getSubTopicBySlug } from "@/lib/content/loader";
import type { Track } from "@/types/content";

export function generateStaticParams() {
  return getAllSubTopicSlugs();
}

export const dynamicParams = false;

const TRACK_LABEL: Record<string, string> = {
  os: "Operating Systems",
  networking: "Computer Networks",
};

const TRACK_INDEX: Record<string, string> = {
  os: "/operating-systems",
  networking: "/computer-networks",
};

export function generateMetadata({
  params,
}: {
  params: { track: string; slug: string; subtopic: string };
}) {
  const found = getSubTopicBySlug(
    params.track as Track,
    params.slug,
    params.subtopic,
  );
  return {
    title: found
      ? `${found.subTopic.title} — ${found.chapter.title} — DSA Visual`
      : "Sub-topic — DSA Visual",
  };
}

export default function SubTopicPage({
  params,
}: {
  params: { track: string; slug: string; subtopic: string };
}) {
  const track = params.track as Track;
  if (track !== "os" && track !== "networking") notFound();

  const found = getSubTopicBySlug(track, params.slug, params.subtopic);
  if (!found) notFound();
  const { chapter, subTopic } = found;

  return (
    <Container className="py-12 max-w-3xl">
      <Link
        href={`/chapter/${track}/${chapter.slug}`}
        className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink mb-3"
      >
        <ArrowLeft className="w-3 h-3" /> Back to {chapter.title}
      </Link>
      <Link
        href={TRACK_INDEX[track]}
        className="block text-xs text-muted hover:text-accent mb-6"
      >
        All {TRACK_LABEL[track]} chapters →
      </Link>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-accent font-medium mb-2">
          {TRACK_LABEL[track]} · {chapter.title} · Sub-topic
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">
          {subTopic.title}
        </h1>
        <p className="mt-2 text-muted max-w-2xl">{subTopic.summary}</p>
        {subTopic.duration && (
          <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted">
            <Clock className="w-3 h-3" /> {subTopic.duration}
          </div>
        )}
      </div>

      <Card className="bg-elev border-line mb-6">
        <p className="text-base text-ink/90 leading-relaxed whitespace-pre-line">
          {subTopic.body}
        </p>
      </Card>

      {subTopic.keyTerms && subTopic.keyTerms.length > 0 && (
        <Card className="bg-elev border-line">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted">
              <Tag className="w-3 h-3" /> Key terms
            </span>
            {subTopic.keyTerms.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </Card>
      )}
    </Container>
  );
}