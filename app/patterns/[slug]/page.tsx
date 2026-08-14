import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { TopicCard } from "@/components/content/TopicCard";
import { StatusBadge } from "@/components/content/StatusBadge";
import { getAllPatterns, getPatternBySlug } from "@/content/patterns";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return getAllPatterns().map((p) => ({ slug: p.slug }));
}

export default function PatternPage({
  params,
}: {
  params: { slug: string };
}) {
  const pattern = getPatternBySlug(params.slug);
  if (!pattern) notFound();

  return (
    <Container className="py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink mb-6"
      >
        <ArrowLeft className="w-3 h-3" /> All patterns
      </Link>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-8">
        <div>
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-1">
            Pattern
          </div>
          <h1 className="text-4xl font-semibold text-ink">{pattern.title}</h1>
          <p className="mt-2 text-muted max-w-2xl">{pattern.tagline}</p>
        </div>
        <StatusBadge status={pattern.status} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pattern.topics.map((t) => (
          <TopicCard key={t.slug} patternSlug={pattern.slug} topic={t} />
        ))}
      </div>

      {pattern.topics.length === 0 && (
        <Card className="text-center py-12 text-muted">
          No topics yet — content coming soon.
        </Card>
      )}
    </Container>
  );
}