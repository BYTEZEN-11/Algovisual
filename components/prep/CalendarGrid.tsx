"use client";

import { cn } from "@/lib/utils";

interface CalendarGridProps {
  days: number;
  solvedByDay: boolean[];
  todayIndex: number;
}

export function CalendarGrid({ days, solvedByDay, todayIndex }: CalendarGridProps) {
  const cells = Array.from({ length: days }, (_, i) => i);
  return (
    <div
      className="grid gap-1.5"
      style={{
        gridTemplateColumns: `repeat(${Math.min(7, days)}, minmax(0, 1fr))`,
      }}
    >
      {cells.map((d) => {
        const isToday = d === todayIndex;
        const isPast = d < todayIndex;
        const isFuture = d > todayIndex;
        const solved = solvedByDay[d];
        return (
          <div
            key={d}
            className={cn(
              "aspect-square rounded-md flex items-center justify-center text-xs font-mono border transition",
              solved
                ? "bg-accent/15 text-accent border-accent/40"
                : isToday
                  ? "bg-elev2 text-accent border-accent/50 ring-1 ring-accent/30"
                  : isPast
                    ? "bg-elev2/40 text-muted/40 border-line"
                    : "bg-elev2 text-muted border-line",
            )}
          >
            {d + 1}
          </div>
        );
      })}
    </div>
  );
}