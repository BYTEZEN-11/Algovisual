"use client";

import { cn } from "@/lib/utils";

export function PerDaySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex p-1 bg-elev2 rounded-md border border-line gap-1">
      {[1, 2, 4].map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-sm transition font-medium font-mono",
            value === d
              ? "bg-base text-accent shadow-sm"
              : "text-muted hover:text-ink",
          )}
        >
          {d}/day
        </button>
      ))}
    </div>
  );
}