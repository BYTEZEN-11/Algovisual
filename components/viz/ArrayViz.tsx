"use client";

import { cn } from "@/lib/utils";
import { CELL_WIDTH, CELL_GAP } from "@/lib/animation/constants";

interface ArrayVizProps {
  array: number[];
  highlight?: number[];
  highlightColor?: string;
}

export function ArrayViz({
  array,
  highlight = [],
  highlightColor = "var(--accent)",
}: ArrayVizProps) {
  return (
    <div
      className="flex items-end relative"
      style={{ gap: `${CELL_GAP}px` }}
      role="img"
      aria-label="Array visualization"
    >
      {array.map((value, i) => {
        const isHi = highlight.includes(i);
        return (
          <div
            key={i}
            className={cn(
              "relative flex flex-col items-center justify-end",
              "transition-colors duration-300",
            )}
            style={{ width: `${CELL_WIDTH}px` }}
          >
            <div
              className={cn(
                "w-full h-14 rounded-md flex items-center justify-center font-mono text-lg font-medium",
                "border-2 transition-all duration-300",
                isHi
                  ? "text-base"
                  : "bg-elev text-ink border-line",
              )}
              style={
                isHi
                  ? {
                      backgroundColor: highlightColor,
                      borderColor: highlightColor,
                      color: "var(--bg-base)",
                    }
                  : undefined
              }
            >
              {value}
            </div>
            <div className="text-[10px] text-muted font-mono mt-1 select-none">
              {i}
            </div>
          </div>
        );
      })}
    </div>
  );
}