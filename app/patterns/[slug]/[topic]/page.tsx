import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { DsaSidebar } from "@/components/content/DsaSidebar";
import { ProblemHeader } from "@/components/content/ProblemHeader";
import { TrackView } from "@/components/content/TrackView";
import { getTopicById, getAllPatterns } from "@/content/patterns";
import type { Approach } from "@/types/content";
import { ArrowLeft } from "lucide-react";
import { TopicClient } from "./TopicClient";
import { formatOps } from "@/lib/utils";

export function generateStaticParams() {
  return getAllPatterns().flatMap((p) =>
    p.topics.map((t) => ({ slug: p.slug, topic: t.slug })),
  );
}

function toClientApproach(a: Approach) {
  return {
    id: a.id,
    name: a.name,
    time: a.time,
    space: a.space,
    opsEstimateDisplay: a.opsEstimate ? formatOps(a.opsEstimate(1000)) : undefined,
    defaultInput: a.defaultInput,
    steps: a.steps,
  };
}

export default function TopicDetailPage({
  params,
}: {
  params: { slug: string; topic: string };
}) {
  const result = getTopicById(params.slug, params.topic);
  if (!result) notFound();
  const { pattern, topic } = result;
  const allPatterns = getAllPatterns();

  const sidebarPatterns = allPatterns.map((p) => ({
    slug: p.slug,
    title: p.title,
    topics: p.topics.map((t) => ({ slug: t.slug, title: t.title })),
  }));

  return (
    <Container className="py-8">
      <TrackView track="dsa" patternSlug={pattern.slug} topicSlug={topic.slug} />
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <DsaSidebar
          patterns={sidebarPatterns}
          activePatternSlug={pattern.slug}
          activeTopicSlug={topic.slug}
        />

        <div>
          <Link
            href={`/patterns/${pattern.slug}`}
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink mb-4"
          >
            <ArrowLeft className="w-3 h-3" /> {pattern.title}
          </Link>

          <ProblemHeader topic={topic} patternTitle={pattern.title} />

          {topic.approaches.length === 0 ? (
            <Card className="mt-6 text-center py-12 text-muted">
              No approaches defined for this topic yet.
            </Card>
          ) : (
            <TopicClient
              patternSlug={pattern.slug}
              topicTitle={topic.title}
              topicSlug={topic.slug}
              patternTitle={pattern.title}
              approaches={topic.approaches.map(toClientApproach)}
              code={topic.code}
              annotations={topic.annotations}
            />
          )}
        </div>
      </div>
    </Container>
  );
}