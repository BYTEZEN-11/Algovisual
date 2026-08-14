import { Container } from "@/components/layout/Container";
import { Chip } from "@/components/ui/Chip";
import { networkingChapters, networkingParts } from "@/content/networking";
import { contentStats } from "@/lib/content/stats";

export const metadata = {
  title: "Computer Networks — DSA Visual",
};

const pad = (n: number) => n.toString().padStart(2, "0");

export default function NetworksPage() {
  const chapterNumber = new Map<string, number>();
  networkingChapters.forEach((c, i) => chapterNumber.set(c.slug, i + 1));

  return (
    <Container className="py-12">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-warn font-medium mb-1">
          Computer Networks
        </div>
        <h1 className="text-4xl font-semibold text-ink">From wires to HTTP</h1>
        <p className="mt-2 text-muted max-w-2xl">
          Illustrated chapters across the stack — how a packet is born, addressed, routed,
          fragmented, retransmitted, and finally delivered.
        </p>
      </div>

      {/* Introduction — sits above Part A. */}
      <a
        href="/chapter/networking/intro"
        className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-elev p-5 mb-10 transition hover:border-accent/40 hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl font-mono text-muted w-10 text-center">00</span>
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-medium mb-1">
              Introduction
            </div>
            <h2 className="text-lg font-semibold text-ink leading-tight">
              Start here — how to read these chapters
            </h2>
            <p className="mt-1 text-sm text-muted max-w-2xl">
              A quick tour of the diagrams, notation, and the path the next {networkingChapters.length} chapters
              will walk you through.
            </p>
          </div>
        </div>
        <span className="text-muted group-hover:text-accent transition text-xl">→</span>
      </a>

      {networkingParts.map((part) => (
        <section key={part.id} className="mb-12">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-accent font-medium mb-1">
                Part {part.id}
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-ink leading-tight">
                {part.title}
              </h2>
              <p className="mt-2 text-muted text-sm md:text-base max-w-2xl">
                {part.blurb}
              </p>
            </div>
            <Chip>{part.chapters.length} chapters</Chip>
          </div>

          <ul className="divide-y divide-line rounded-lg border border-line bg-elev overflow-hidden">
            {part.chapters.map((c) => {
              const num = chapterNumber.get(c.slug) ?? 0;
              return (
                <li key={c.slug}>
                  <a
                    href={`/chapter/networking/${c.slug}`}
                    className="group flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-elev2"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-base font-mono text-muted w-10 text-center shrink-0">
                        {pad(num)}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-ink leading-tight truncate">
                          {c.title}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted truncate">
                          {c.summary}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {typeof c.sections === "number" && (
                        <Chip>
                          {c.sections} {c.sections === 1 ? "section" : "sections"}
                        </Chip>
                      )}
                      <span className="text-muted group-hover:text-accent transition text-xl">
                        →
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </Container>
  );
}