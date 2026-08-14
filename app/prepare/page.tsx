import { Container } from "@/components/layout/Container";
import { InterviewPrepWidget } from "@/components/prep/InterviewPrepWidget";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Interview Prep — DSA Visual",
};

export default function PreparePage() {
  return (
    <Container className="py-12 max-w-4xl">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-accent font-medium mb-1">
          Interview Prep
        </div>
        <h1 className="text-4xl font-semibold text-ink">Plan your run</h1>
        <p className="mt-2 text-muted max-w-2xl">
          Set a window and a pace. The calendar reflects your solved problems; the on-track
          indicator turns green when you&apos;re shipping at the planned rate.
        </p>
      </div>
      <InterviewPrepWidget />
      <Card className="mt-6">
        <h3 className="text-lg font-semibold text-ink mb-2">How it works</h3>
        <ul className="text-sm text-muted space-y-1.5">
          <li>· Pick a mode: <span className="text-ink">Timed</span> for interview-style practice, <span className="text-ink">Complete</span> for deep work.</li>
          <li>· Choose a day window (7/30/45) and a per-day target.</li>
          <li>· Solve problems &amp; mark them solved — they light up the calendar.</li>
          <li>· The on-track badge tells you whether you&apos;re keeping pace.</li>
        </ul>
      </Card>
    </Container>
  );
}