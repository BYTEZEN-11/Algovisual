"use client";

import { cn } from "@/lib/utils";

export type Mode = "timed" | "complete";

export function ModeToggle({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (v: Mode) => void;
}) {
  return (
    <div className="inline-flex p-1 bg-elev2 rounded-md border border-line gap-1">
      {(["timed", "complete"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-sm transition font-medium capitalize",
            value === m
              ? "bg-base text-accent shadow-sm"
              : "text-muted hover:text-ink",
          )}
        >
          {m}
        </button>
      ))}
    </div>
  );
}