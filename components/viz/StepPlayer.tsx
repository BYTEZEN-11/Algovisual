"use client";

import * as React from "react";
import type { Approach, VizFrame } from "@/types/content";
import { ArrayViz } from "./ArrayViz";
import { PointerOverlay } from "./PointerOverlay";
import { Narration } from "./Narration";
import { Controls } from "./Controls";
import { OperationCounter } from "./OperationCounter";
import { ensureGsapRegistered, gsap } from "@/lib/animation/register";
import { CELL_PITCH, STEP_INTERVAL_MS } from "@/lib/animation/constants";
import { formatOps } from "@/lib/utils";

interface StepPlayerProps {
  steps: VizFrame[];
  approachName: string;
  time: string;
  space: string;
  opsEstimateDisplay?: string;
  baseInput: Record<string, unknown>;
  onStepChange?: (stepIdx: number) => void;
}

function estimateFromTime(time: string, n: number): number | undefined {
  const match = /O\(n\^?(\d+)\)/i.exec(time.trim());
  if (!match) return undefined;
  const exp = parseInt(match[1], 10);
  if (Number.isNaN(exp)) return undefined;
  return Math.pow(n, exp);
}

export function StepPlayer({
  steps,
  approachName,
  time,
  space,
  opsEstimateDisplay,
  baseInput,
  onStepChange,
}: StepPlayerProps) {
  ensureGsapRegistered();

  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [input, setInput] = React.useState<Record<string, unknown>>(baseInput);

  React.useEffect(() => {
    setIdx(0);
    setPlaying(false);
    setInput(baseInput);
  }, [approachName, baseInput]);

  React.useEffect(() => {
    onStepChange?.(idx);
  }, [idx]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const pointerRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  const registerRef = React.useCallback(
    (key: string, el: HTMLDivElement | null) => {
      if (el) pointerRefs.current[key] = el;
    },
    [],
  );

  const total = steps.length;
  const frame = steps[idx];
  const array = (input.array as number[]) ?? [];
  const n = (input.n as number) ?? array.length ?? 1000;
  const liveEstimate = estimateFromTime(time, n);
  const displayEstimate =
    opsEstimateDisplay ??
    (liveEstimate !== undefined ? formatOps(liveEstimate) : undefined);

  React.useLayoutEffect(() => {
    if (!frame?.pointers) return;
    const pointers = frame.pointers;
    for (const [name, target] of Object.entries(pointers)) {
      const el = pointerRefs.current[name];
      if (!el) continue;
      const prevX = (el as HTMLDivElement & { _gsapX?: number })._gsapX ?? 0;
      gsap.fromTo(
        el,
        { x: prevX },
        { x: target * CELL_PITCH, duration: 0.45, ease: "power2.out" },
      );
      (el as HTMLDivElement & { _gsapX?: number })._gsapX =
        target * CELL_PITCH;
    }
  }, [idx, frame]);

  React.useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setIdx((i) => {
        if (i < total - 1) return i + 1;
        setPlaying(false);
        return i;
      });
    }, STEP_INTERVAL_MS);
    return () => clearTimeout(t);
  }, [playing, idx, total]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        setIdx((i) => Math.min(total - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        setIdx((i) => Math.max(0, i - 1));
      } else if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <div
      ref={containerRef}
      className="rounded-lg bg-elev border border-line p-6 overflow-x-auto"
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="font-semibold text-ink">{approachName}</div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-muted">Time</span>
          <span className="px-2 py-0.5 rounded-sm bg-accent/15 text-accent border border-accent/30">
            {time}
          </span>
          <span className="text-muted">Space</span>
          <span className="px-2 py-0.5 rounded-sm bg-accent-2/15 text-accent-2 border border-accent-2/30">
            {space}
          </span>
        </div>
      </div>

      <ArrayViz array={array} highlight={frame?.highlight ?? []} />
      <PointerOverlay
        pointers={frame?.pointers ?? {}}
        registerRef={registerRef}
      />
      {frame?.variables && (
        <div className="mt-3 px-3 py-2 rounded-md bg-base border border-line text-xs font-mono flex flex-wrap gap-x-4 gap-y-1">
          {Object.entries(frame.variables).map(([k, v]) => (
            <span key={k}>
              <span className="text-muted">{k}</span>
              <span className="text-ink ml-1.5">{String(v)}</span>
            </span>
          ))}
        </div>
      )}
      <Narration text={frame?.narration ?? ""} />

      <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
        <Controls
          idx={idx}
          total={total}
          playing={playing}
          onPrev={() => setIdx((i) => Math.max(0, i - 1))}
          onNext={() => setIdx((i) => Math.min(total - 1, i + 1))}
          onTogglePlay={() => setPlaying((p) => !p)}
          onReset={() => {
            setIdx(0);
            setPlaying(false);
          }}
        />
        <OperationCounter value={frame?.opCount ?? 0} estimate={displayEstimate} />
      </div>
      <p className="mt-4 text-[10px] text-muted/60">
        Use ← → to step, Space to play/pause.
      </p>
    </div>
  );
}

export type { Approach };