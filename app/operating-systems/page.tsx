import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Chip } from "@/components/ui/Chip";
import { osParts } from "@/content/os";
import { contentStats } from "@/lib/content/stats";

export const metadata = {
  title: "Operating Systems — DSA Visual",
};

const introEntry = {
  number: "00",
  slug: "intro",
  title: "Introduction to Operating Systems",
  tagline:
    "A guided tour of the entire OS track — what you'll learn, in what order, and why each part matters.",
  sections: 8,
};

const formatNumber = (n: number) => n.toString().padStart(2, "0");

export default function OSPage() {
  let runningIndex = 0;

  return (
    <Container className="py-12">
      {/* Hero ----------------------------------------------------------- */}
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-warn font-medium mb-2">
          Operating Systems
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-ink leading-tight">
          Operating Systems — A Visual Course
        </h1>
        <p className="mt-3 text-muted max-w-2xl text-base md:text-lg">
          Understand the machine under your code.
        </p>
        <p className="mt-3 text-muted max-w-3xl leading-relaxed">
          Full course — from a single system call down into the kernel, back up
          through processes, scheduling, concurrency, memory and file systems.
          Visuals + engineer-style explanations.
        </p>
      </div>

      {/* CTA — start here ------------------------------------------------ */}
      <Link
        href={`/chapter/os/${introEntry.slug}`}
        className="group mb-12 flex items-center gap-4 rounded-lg border border-accent/30 bg-elev p-5 transition hover:border-accent/60 hover:-translate-y-0.5"
      >
        <span className="text-2xl font-semibold text-accent tabular-nums">
          {introEntry.number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-semibold text-ink">
              Start here → {introEntry.title}
            </span>
            <Chip>{introEntry.sections} sections</Chip>
          </div>
          <p className="mt-1 text-sm text-muted leading-relaxed">
            {introEntry.tagline}
          </p>
        </div>
        <span
          aria-hidden
          className="text-2xl text-muted transition group-hover:text-accent group-hover:translate-x-1"
        >
          →
        </span>
      </Link>

      {/* Anchor nav ----------------------------------------------------- */}
      <nav
        aria-label="OS parts"
        className="mb-12 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-line bg-elev/50 px-4 py-3 text-sm"
      >
        {osParts.map((part, i) => (
          <a
            key={part.id}
            href={`#part-${part.id}`}
            className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition"
          >
            <span className="font-mono text-xs text-accent">{part.id}</span>
            <span className="hidden sm:inline">·</span>
            <span>{part.title}</span>
            {i < osParts.length - 1 && (
              <span aria-hidden className="hidden sm:inline text-line">
                |
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* Parts ---------------------------------------------------------- */}
      <div className="space-y-20">
        {osParts.map((part) => {
          const startIndex = runningIndex;
          runningIndex += part.chapters.length;

          return (
            <section key={part.id} id={`part-${part.id}`} className="scroll-mt-20">
              <div className="mb-6 flex items-end gap-4 border-b border-line pb-4">
                <span className="font-mono text-5xl md:text-6xl font-light text-accent/80 leading-none">
                  {part.id}
                </span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-ink leading-tight">
                    {part.title}
                  </h2>
                  <p className="mt-1 text-sm md:text-base text-muted">
                    {part.blurb}
                  </p>
                </div>
                <Chip className="shrink-0 ml-auto">
                  {part.chapters.length}{" "}
                  {part.chapters.length === 1 ? "chapter" : "chapters"}
                </Chip>
              </div>

              <ol className="divide-y divide-line rounded-lg border border-line bg-elev overflow-hidden">
                {part.chapters.map((chapter, i) => {
                  const number = formatNumber(startIndex + i + 1);
                  const href = `/chapter/os/${chapter.slug}`;
                  const sectionCount = chapter.sections ?? 0;

                  return (
                    <li key={chapter.slug}>
                      <Link
                        href={href}
                        className="group flex items-center gap-4 px-4 py-3 transition hover:bg-elev2"
                      >
                        <span className="w-10 shrink-0 font-mono text-base text-muted tabular-nums">
                          {number}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-base font-medium text-ink leading-tight">
                            {chapter.title}
                          </div>
                          {chapter.summary && (
                            <div className="mt-0.5 text-sm text-muted line-clamp-1">
                              {chapter.summary}
                            </div>
                          )}
                        </div>
                        {sectionCount > 0 && (
                          <Chip className="shrink-0">
                            {sectionCount}{" "}
                            {sectionCount === 1 ? "section" : "sections"}
                          </Chip>
                        )}
                        <span
                          aria-hidden
                          className="shrink-0 text-xl text-muted transition group-hover:text-accent group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>

      {/* Closing line */}
      <p className="mt-16 text-center text-sm text-muted">
        {contentStats.os.chapters} chapters · every concept illustrated.
      </p>
    </Container>
  );
}