"use client";

import * as React from "react";
import type { Pointers } from "@/types/content";
import { CELL_PITCH } from "@/lib/animation/constants";

const POINTER_PALETTE = ["var(--accent)", "var(--accent-2)", "var(--warn)"];

interface PointerOverlayProps {
  pointers: Pointers;
  registerRef: (key: string, el: HTMLDivElement | null) => void;
}

export function PointerOverlay({ pointers, registerRef }: PointerOverlayProps) {
  const entries = Object.entries(pointers);
  if (entries.length === 0) return <div className="h-7 mt-3" />;
  return (
    <div className="relative h-7 mt-3" style={{ marginLeft: 0 }}>
      {entries.map(([name, target], i) => {
        const color = POINTER_PALETTE[i % POINTER_PALETTE.length];
        return (
          <div
            key={name}
            ref={(el) => registerRef(name, el)}
            className="absolute top-0 left-0 px-2 py-1 text-xs font-mono font-bold rounded-sm select-none will-change-transform"
            style={{
              transform: `translateX(${target * CELL_PITCH}px)`,
              backgroundColor: color,
              color: "var(--bg-base)",
              minWidth: 28,
              textAlign: "center",
            }}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
}