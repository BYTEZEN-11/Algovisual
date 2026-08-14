import Link from "next/link";
import type { Topic } from "@/types/content";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ComplexityBadge } from "./ComplexityBadge";

export function TopicCard({
  patternSlug,
  topic,
}: {
  patternSlug: string;
  topic: Topic;
}) {
  const difficultyVariant =
    topic.difficulty === "Easy"
      ? "easy"
      : topic.difficulty === "Medium"
        ? "medium"
        : "hard";
  const primary = topic.approaches[0];

  return (
    <Link href={`/patterns/${patternSlug}/${topic.slug}`} className="block">
      <Card hover>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base">{topic.title}</CardTitle>
            <Badge variant={difficultyVariant}>{topic.difficulty}</Badge>
          </div>
        </CardHeader>
        <CardDescription className="line-clamp-2">
          {topic.description}
        </CardDescription>
        {primary && (
          <div className="mt-4">
            <ComplexityBadge time={primary.time} space={primary.space} />
          </div>
        )}
      </Card>
    </Link>
  );
}