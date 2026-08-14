"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { ModeToggle, type Mode } from "./ModeToggle";
import { DaysSelector } from "./DaysSelector";
import { PerDaySelector } from "./PerDaySelector";
import { CalendarGrid } from "./CalendarGrid";
import { ProgressReadout } from "./ProgressReadout";
import { OnTrackIndicator } from "./OnTrackIndicator";
import { Card } from "@/components/ui/Card";

interface PrepState {
  progress: { topicId: string; solved: boolean }[];
}

export function InterviewPrepWidget() {
  const { data } = useSession();
  const [mode, setMode] = React.useState<Mode>("timed");
  const [days, setDays] = React.useState(7);
  const [perDay, setPerDay] = React.useState(1);
  const [solvedTopicIds, setSolvedTopicIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!data?.user) return;
    fetch("/api/progress")
      .then((r) => r.json())
      .then((d: PrepState) => {
        setSolvedTopicIds(
          d.progress?.filter((p: { solved: boolean }) => p.solved).map((p: { topicId: string }) => p.topicId) ?? [],
        );
      })
      .catch(() => {});
  }, [data?.user]);

  const total = days * perDay;
  // For demo: solved map distributes solved topics into the calendar.
  const solvedByDay = Array.from({ length: days }, (_, i) => i < solvedTopicIds.length);
  const solvedCount = solvedByDay.filter(Boolean).length;
  const onTrack = solvedCount >= Math.min(solvedTopicIds.length, total);

  return (
    <Card className="bg-elev border-line" glow>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
        <div>
          <div className="text-xs uppercase tracking-wider text-accent font-medium mb-1">
            Interview Prep
          </div>
          <h3 className="text-xl font-semibold text-ink">Plan your run</h3>
          <p className="text-sm text-muted mt-1">
            Pick a window, set pace, and watch the calendar fill in as you ship problems.
          </p>
        </div>
        <OnTrackIndicator onTrack={onTrack} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="block text-xs text-muted mb-1.5">Mode</label>
          <ModeToggle value={mode} onChange={setMode} />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1.5">Days</label>
          <DaysSelector value={days} onChange={setDays} />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1.5">Per day</label>
          <PerDaySelector value={perDay} onChange={setPerDay} />
        </div>
      </div>

      <CalendarGrid days={days} solvedByDay={solvedByDay} todayIndex={0} />

      <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
        <ProgressReadout solved={solvedCount} total={total} />
        <div className="text-xs text-muted">
          {mode === "timed" ? "Timed practice" : "Complete mode"}
        </div>
      </div>
    </Card>
  );
}