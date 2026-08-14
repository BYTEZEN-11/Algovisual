import Link from "next/link";
import * as Icons from "lucide-react";
import type { Pattern } from "@/types/content";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "./StatusBadge";
import { Chip } from "@/components/ui/Chip";

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const Icon =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      pattern.icon
    ] ?? Icons.Code2;
  return (
    <Link href={`/patterns/${pattern.slug}`} className="block group">
      <Card hover glow className="h-full">
        <CardHeader>
          <div className="flex items-center gap-2 text-accent">
            <Icon className="w-5 h-5" />
            <div className="text-xs uppercase tracking-wider font-medium">
              Pattern
            </div>
          </div>
          <StatusBadge status={pattern.status} />
        </CardHeader>
        <CardTitle className="mt-3">{pattern.title}</CardTitle>
        <CardDescription className="mt-2">{pattern.tagline}</CardDescription>
        <div className="mt-5 flex items-center justify-between text-xs text-muted">
          <span>{pattern.topics.length} topic{pattern.topics.length !== 1 ? "s" : ""}</span>
          <span className="text-accent opacity-0 group-hover:opacity-100 transition">
            Open →
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pattern.topics.slice(0, 4).map((t) => (
            <Chip key={t.slug}>{t.title}</Chip>
          ))}
          {pattern.topics.length > 4 && (
            <Chip>+{pattern.topics.length - 4}</Chip>
          )}
        </div>
      </Card>
    </Link>
  );
}