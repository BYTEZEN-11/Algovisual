import { Container, SectionHeading } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { contentStats } from "@/lib/content/stats";
import { ArrowRight, History, Trophy, BookOpen, Target } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard — DSA Visual" };

interface ProgressRow {
  topicId: string;
  track: string;
  solved: boolean;
  attempts: number;
  lastSeen: Date;
}

export default async function DashboardPage() {
  const user = await requireUser();
  const progress = (await prisma.progress.findMany({
    where: { userId: user.id },
    orderBy: { lastSeen: "desc" },
  })) as ProgressRow[];

  const me = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      lastViewedAt: true,
      lastViewedTrack: true,
      lastViewedPattern: true,
      lastViewedTopic: true,
    },
  });

  const totalSolved = progress.filter((p) => p.solved).length;
  const solvedByTrack: Record<string, number> = { dsa: 0, lld: 0, os: 0, networking: 0 };
  for (const p of progress) {
    if (p.solved) solvedByTrack[p.track] = (solvedByTrack[p.track] ?? 0) + 1;
  }

  const recent = progress.slice(0, 6);

  const continueHref =
    me?.lastViewedTrack && me?.lastViewedPattern && me?.lastViewedTopic
      ? hrefFor(me.lastViewedTrack, me.lastViewedPattern, me.lastViewedTopic)
      : null;

  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="Dashboard"
        title={`Welcome back${user.name ? `, ${user.name.split(" ")[0]}` : ""}.`}
        subtitle="Your progress, recent activity, and where to pick up next."
      />

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatTile
          icon={<Trophy className="w-4 h-4" />}
          label="Total solved"
          value={totalSolved.toString()}
          accent
        />
        <StatTile
          icon={<BookOpen className="w-4 h-4" />}
          label="DSA topics"
          value={`${solvedByTrack.dsa ?? 0} / ${contentStats.dsa.topics}`}
        />
        <StatTile
          icon={<Target className="w-4 h-4" />}
          label="LLD lessons"
          value={`${solvedByTrack.lld ?? 0} / ${contentStats.lld.lessons}`}
        />
        <StatTile
          icon={<History className="w-4 h-4" />}
          label="OS + Networks"
          value={`${(solvedByTrack.os ?? 0) + (solvedByTrack.networking ?? 0)} chapters`}
        />
      </div>

      {/* Continue + Recent */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 bg-elev border-line" glow>
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-2">
            Continue learning
          </div>
          {continueHref ? (
            <>
              <p className="text-sm text-muted mb-4">
                You were last in <span className="text-ink">{me?.lastViewedTopic}</span> on the{" "}
                <span className="text-ink">{me?.lastViewedTrack}</span> track.
              </p>
              <Link href={continueHref}>
                <Button variant="primary">
                  Resume
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-muted mb-4">
                Open any topic and it'll show up here so you can jump back in.
              </p>
              <Link href="/patterns/two-pointers">
                <Button variant="primary">
                  Browse patterns
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </>
          )}
        </Card>

        <Card className="lg:col-span-2 bg-elev border-line">
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-3">
            Recent activity
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-muted">No activity yet. Open a topic to begin.</p>
          ) : (
            <ul className="divide-y divide-line -mx-2">
              {recent.map((r) => (
                <li key={r.topicId} className="flex items-center justify-between px-2 py-2 text-sm">
                  <div className="min-w-0">
                    <div className="text-ink truncate">{r.topicId}</div>
                    <div className="text-xs text-muted">
                      {r.track} · {r.attempts} attempt{r.attempts === 1 ? "" : "s"}
                    </div>
                  </div>
                  <Badge variant={r.solved ? "live" : "neutral"}>
                    {r.solved ? "Solved" : "Open"}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Per-track progress */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-ink mb-3">Progress by track</h2>
        <Card className="bg-elev border-line">
          <div className="space-y-4">
            <ProgressBar
              label="DSA topics"
              value={solvedByTrack.dsa ?? 0}
              max={contentStats.dsa.topics}
            />
            <ProgressBar
              label="LLD lessons"
              value={solvedByTrack.lld ?? 0}
              max={contentStats.lld.lessons}
            />
            <ProgressBar
              label="OS chapters"
              value={solvedByTrack.os ?? 0}
              max={contentStats.os.chapters}
            />
            <ProgressBar
              label="Networks chapters"
              value={solvedByTrack.networking ?? 0}
              max={contentStats.networking.chapters}
            />
          </div>
        </Card>
      </div>
    </Container>
  );
}

function StatTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <Card className="bg-elev border-line">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
        {icon}
        {label}
      </div>
      <div className={`mt-2 text-2xl font-semibold ${accent ? "text-accent" : "text-ink"} font-mono`}>
        {value}
      </div>
    </Card>
  );
}

function hrefFor(track: string, pattern: string, topic: string): string {
  if (track === "dsa") return `/patterns/${pattern}/${topic}`;
  if (track === "lld") return `/lld/${pattern}#${topic}`;
  if (track === "os") return `/operating-systems/${topic}`;
  if (track === "networking") return `/computer-networks/${topic}`;
  return `/${track}/${topic}`;
}