import { Container, SectionHeading } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CalendarGrid } from "@/components/prep/CalendarGrid";
import { ProgressReadout } from "@/components/prep/ProgressReadout";
import { OnTrackIndicator } from "@/components/prep/OnTrackIndicator";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { contentStats } from "@/lib/content/stats";

export const dynamic = "force-dynamic";
export const metadata = { title: "Progress — DSA Visual" };

const DAYS_WINDOW = 30;

export default async function ProgressPage() {
  const user = await requireUser();
  const rows = await prisma.progress.findMany({
    where: { userId: user.id },
    orderBy: { lastSeen: "desc" },
  });

  const solved = rows.filter((r) => r.solved);

  const dayBuckets = new Array<boolean>(DAYS_WINDOW).fill(false);
  const todayUtc = new Date();
  todayUtc.setUTCHours(0, 0, 0, 0);
  for (const r of solved) {
    const t = new Date(r.lastSeen);
    t.setUTCHours(0, 0, 0, 0);
    const diffDays = Math.floor((todayUtc.getTime() - t.getTime()) / 86_400_000);
    if (diffDays >= 0 && diffDays < DAYS_WINDOW) {
      dayBuckets[DAYS_WINDOW - 1 - diffDays] = true;
    }
  }

  let streakEndingToday = 0;
  for (let i = dayBuckets.length - 1; i >= 0 && dayBuckets[i] === true; i--) {
    streakEndingToday++;
  }

  const onTrack = streakEndingToday >= 1;

  const solvedByTrack: Record<string, number> = { dsa: 0, lld: 0, os: 0, networking: 0 };
  for (const r of solved) {
    solvedByTrack[r.track] = (solvedByTrack[r.track] ?? 0) + 1;
  }

  return (
    <Container className="py-12 max-w-4xl">
      <SectionHeading
        eyebrow="Progress"
        title="Your learning runway"
        subtitle={`${DAYS_WINDOW}-day calendar of solved topics, plus per-track completion.`}
      />

      <Card className="bg-elev border-line mb-6">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-accent font-medium mb-1">
              Last {DAYS_WINDOW} days
            </div>
            <h3 className="text-xl font-semibold text-ink">Solved-today streak</h3>
          </div>
          <OnTrackIndicator onTrack={onTrack} />
        </div>

        <CalendarGrid
          days={DAYS_WINDOW}
          solvedByDay={dayBuckets}
          todayIndex={DAYS_WINDOW - 1}
        />

        <div className="mt-5">
          <ProgressReadout solved={solved.length} total={contentStats.dsa.topics + contentStats.lld.lessons + contentStats.os.chapters + contentStats.networking.chapters} />
        </div>
      </Card>

      <h2 className="text-lg font-semibold text-ink mb-3">Completion by track</h2>
      <Card className="bg-elev border-line">
        <div className="space-y-4">
          <ProgressBar
            label={`DSA topics (${solvedByTrack.dsa ?? 0} / ${contentStats.dsa.topics})`}
            value={solvedByTrack.dsa ?? 0}
            max={contentStats.dsa.topics}
          />
          <ProgressBar
            label={`LLD lessons (${solvedByTrack.lld ?? 0} / ${contentStats.lld.lessons})`}
            value={solvedByTrack.lld ?? 0}
            max={contentStats.lld.lessons}
          />
          <ProgressBar
            label={`OS chapters (${solvedByTrack.os ?? 0} / ${contentStats.os.chapters})`}
            value={solvedByTrack.os ?? 0}
            max={contentStats.os.chapters}
          />
          <ProgressBar
            label={`Networking chapters (${solvedByTrack.networking ?? 0} / ${contentStats.networking.chapters})`}
            value={solvedByTrack.networking ?? 0}
            max={contentStats.networking.chapters}
          />
        </div>
      </Card>
    </Container>
  );
}