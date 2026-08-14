import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PatternCard } from "@/components/content/PatternCard";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InterviewPrepWidget } from "@/components/prep/InterviewPrepWidget";
import { getAllPatterns } from "@/content/patterns";
import { lldModules } from "@/content/lld";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroDemo } from "@/components/demo/HeroDemo";
import { contentStats } from "@/lib/content/stats";
import { ContinueCard } from "@/components/home/ContinueCard";

const DSA_TOPIC_CHIPS = [
  "Two Pointers",
  "Arrays & Hashing",
  "Sliding Window",
  "Stack",
  "Linked List",
  "Heap",
  "Binary Search",
  "DFS",
  "+10 more",
];

const LLD_CHIPS = [
  "SOLID",
  "Design Patterns",
  "UML",
  "Sequence diagrams",
  "Parking Lot",
  "Splitwise",
];

const NETWORKING_CHIPS = [
  "IP & Subnets",
  "TCP / UDP",
  "Routing",
  "DNS",
  "HTTP & TLS",
  "ARP",
  "NAT",
];

const OS_CHIPS = [
  "Processes",
  "Scheduling",
  "Threads",
  "Deadlocks",
  "Virtual Memory",
  "File Systems",
  "Concurrency",
];

export default function HomePage() {
  const allPatterns = getAllPatterns();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-medium mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Watch the algorithm think
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-ink leading-[1.05] tracking-tight">
              Algorithms you can see.
            </h1>
            <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">
              Every pattern, stepped through one frame at a time — pointers
              gliding, trees recursing, DP tables filling in. Press play and
              watch the idea unfold.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/patterns/two-pointers/two-sum">
                <Button size="lg" variant="primary">
                  Start with DSA
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#tracks">
                <Button size="lg" variant="outline">
                  Choose a track
                </Button>
              </a>
            </div>
          </div>

          {/* Live demo */}
          <div className="mt-12 max-w-3xl">
            <HeroDemo />
          </div>
        </Container>
      </section>

      {/* Tracks */}
      <section id="tracks" className="section scroll-mt-20">
        <Container>
          <div className="mb-10">
            <div className="text-xs uppercase tracking-widest text-accent font-medium mb-1">
              Pick a track
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink">
              Four tracks, one lab.
            </h2>
            <p className="mt-3 text-muted max-w-2xl">
              Each topic is taught the same way — by animating it. Jump straight
              in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TrackCard
              badge="live"
              badgeVariant="live"
              title="DSA Visual"
              subtitle="Data Structures & Algorithms"
              description="Animated, step-by-step walkthroughs from two pointers to dynamic programming. Brute force first, then the optimized trick — always with the why."
              chips={DSA_TOPIC_CHIPS}
              stat={`${contentStats.dsa.patterns} patterns · ${contentStats.dsa.topics} topics`}
              href="/patterns/two-pointers"
              glowing
            />
            <TrackCard
              badge="bonus"
              badgeVariant="bonus"
              title="LLD Visual"
              subtitle="Low-Level & OOP Design"
              description="Object-oriented design taught with animated UML — class & sequence diagrams that build themselves, plus the theory behind every pattern."
              chips={LLD_CHIPS}
              stat={`${contentStats.lld.modules} modules · ${contentStats.lld.lessons} lessons`}
              href="/lld/solid"
            />
            <TrackCard
              badge="new"
              badgeVariant="new"
              title="Networking Visual"
              subtitle="Computer Networks, from the wire up"
              description="A full visual course — from a single fetch() down to bits on the wire and back up through TCP, DNS, HTTP and TLS. Every step illustrated."
              chips={NETWORKING_CHIPS}
              stat={`${contentStats.networking.chapters} chapters · illustrated notes`}
              href="/computer-networks"
            />
            <TrackCard
              badge="new"
              badgeVariant="new"
              title="OS Visual"
              subtitle="How your machine really runs your code"
              description="A full visual course — processes, scheduling, concurrency, virtual memory and file systems, explained the way a working engineer needs them."
              chips={OS_CHIPS}
              stat={`${contentStats.os.chapters} chapters · illustrated notes`}
              href="/operating-systems"
            />
          </div>
        </Container>
      </section>

      {/* Continue learning (only renders for signed-in users with history) */}
      <section className="section">
        <Container>
          <ContinueCard />
        </Container>
      </section>

      {/* Pitch */}
      <section className="section">
        <Container>
          <Card className="bg-elev" glow>
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">
                  Never stop at the first answer.
                </h2>
                <p className="mt-3 text-muted leading-relaxed max-w-2xl">
                  Every problem carries its approaches side by side — the
                  obvious brute force and the sharp optimization. Jump between
                  them in a tap and watch the time and space complexity fall, so
                  you learn the <em>why</em>, not just the trick.
                </p>
                <div className="mt-6">
                  <Link href="/patterns/two-pointers/two-sum">
                    <Button variant="primary">
                      See it on a real problem
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="text-xs text-muted font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span>Brute force</span>
                  <span className="text-warn">O(n²)</span>
                </div>
                <div className="h-px bg-line" />
                <div className="flex items-center justify-between">
                  <span>Sort + two pointers</span>
                  <span className="text-accent">O(n)</span>
                </div>
                <div className="h-px bg-line" />
                <div className="flex items-center justify-between">
                  <span>Hash map</span>
                  <span className="text-accent">O(n)</span>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Pattern grid */}
      <section className="section">
        <Container>
          <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-accent font-medium mb-1">
                DSA Patterns
              </div>
              <h2 className="text-3xl font-semibold text-ink">
                Eighteen patterns, one lab.
              </h2>
            </div>
            <Chip>{allPatterns.length} patterns</Chip>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPatterns.map((p) => (
              <PatternCard key={p.slug} pattern={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Prep */}
      <section className="section">
        <Container>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest text-accent font-medium">
                New
              </span>
              <span className="text-xs text-muted">·</span>
              <span className="text-xs uppercase tracking-widest text-accent font-medium">
                Interview Prep
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink">
              Prep like the interview’s next week.
            </h2>
            <p className="mt-3 text-muted max-w-2xl">
              Timed tracks of 7, 30, or 45 days at 1, 2, or 4 problems per day.
              Calendar-anchored schedule, today marker, on-track read-out. Plus a
              complete track that lays the entire pool out as a topic-grouped
              checklist.
            </p>
          </div>
          <InterviewPrepWidget />
        </Container>
      </section>
    </>
  );
}

function TrackCard({
  badge,
  badgeVariant,
  title,
  subtitle,
  description,
  chips,
  stat,
  href,
  glowing,
}: {
  badge: string;
  badgeVariant: "live" | "bonus" | "new";
  title: string;
  subtitle: string;
  description: string;
  chips: string[];
  stat: string;
  href: string;
  glowing?: boolean;
}) {
  return (
    <Link href={href} className="block group">
      <Card hover glow={glowing} className="h-full flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs uppercase tracking-wider text-accent font-medium">
            {title.split(" ")[0]}
          </span>
          <Badge variant={badgeVariant}>
            {badgeVariant === "live" && "● "}
            {badgeVariant === "bonus" && "★ "}
            {badgeVariant === "new" && "✦ "}
            {badge}
          </Badge>
        </div>
        <div className="mt-3 text-xl font-semibold text-ink leading-tight">
          {subtitle}
        </div>
        <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-xs">
          <span className="text-muted font-mono">{stat}</span>
          <span className="text-accent opacity-80 group-hover:opacity-100 transition">
            Enter →
          </span>
        </div>
      </Card>
    </Link>
  );
}
