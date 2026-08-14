"use client";

import { cn } from "@/lib/utils";

export function Narration({ text }: { text: string }) {
  return (
    <div
      key={text}
      className={cn(
        "mt-4 px-4 py-3 rounded-md bg-elev2 border border-line",
        "text-sm text-ink font-mono animate-in",
      )}
      style={{ animation: "fade-in 0.35s ease-out" }}
    >
      {text || <span className="text-muted">—</span>}
    </div>
  );
}