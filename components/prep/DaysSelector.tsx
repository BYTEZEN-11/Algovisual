"use client";

import { cn } from "@/lib/utils";

export function DaysSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex p-1 bg-elev2 rounded-md border border-line gap-1">
      {[7, 30, 45].map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={cn(
            "px-4 py-1.5 text-sm rounded-sm transition font-medium font-mono",
            value === d
              ? "bg-base text-accent shadow-sm"
              : "text-muted hover:text-ink",
          )}
        >
          {d}d
        </button>
      ))}
    </div>
  );
}