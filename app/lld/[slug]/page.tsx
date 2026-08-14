import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { StatusBadge } from "@/components/content/StatusBadge";
import { LldSidebar } from "@/components/content/LldSidebar";
import { lldModules } from "@/content/lld";
import { ArrowLeft, BookOpen, Tag } from "lucide-react";

export function generateStaticParams() {
  return lldModules.map((m) => ({ slug: m.slug }));
}

export default function LLDModulePage({ params }: { params: { slug: string } }) {
  const m = lldModules.find((mod) => mod.slug === params.slug);
  if (!m) notFound();
  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <LldSidebar modules={lldModules} activeModuleSlug={m.slug} />

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink mb-6"
          >
            <ArrowLeft className="w-3 h-3" /> Home
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-3 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-accent-2 font-medium mb-1">
                LLD · {m.slug.toUpperCase()}
              </div>
              <h1 className="text-4xl font-semibold text-ink">{m.title}</h1>
              <p className="mt-2 text-muted max-w-2xl">{m.tagline}</p>
            </div>
            <StatusBadge status={m.status} />
          </div>

          <div className="space-y-3">
            {m.lessons.map((l) => (
              <Card key={l.slug} hover>
                <div id={l.slug} className="scroll-mt-24" />
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent-2" />
                      <div className="text-base font-medium text-ink">{l.title}</div>
                    </div>
                    <div className="text-sm text-muted mt-1">{l.summary}</div>
                    {l.body && (
                      <p className="mt-3 text-sm text-ink/80 leading-relaxed">
                        {l.body}
                      </p>
                    )}
                    {l.keyTerms && l.keyTerms.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted">
                          <Tag className="w-3 h-3" /> Key terms
                        </span>
                        {l.keyTerms.map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                    )}
                    {l.seeAlso && l.seeAlso.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted">
                          See also
                        </span>
                        {l.seeAlso.map((s) => (
                          <SeeAlsoLink key={s} slug={s} />
                        ))}
                      </div>
                    )}
                  </div>
                  <Badge>{l.duration}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

function SeeAlsoLink({ slug }: { slug: string }) {
  const target = findLesson(slug);
  if (!target) {
    return <Chip>{slug}</Chip>;
  }
  return (
    <Link href={`/lld/${target.module.slug}#${target.lesson.slug}`}>
      <Chip>{target.lesson.title}</Chip>
    </Link>
  );
}

function findLesson(lessonSlug: string): { module: typeof lldModules[number]; lesson: typeof lldModules[number]["lessons"][number] } | null {
  for (const module of lldModules) {
    const lesson = module.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) return { module, lesson };
  }
  return null;
}
