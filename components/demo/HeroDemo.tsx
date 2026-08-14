"use client";

import * as React from "react";
import { ArrayViz } from "@/components/viz/ArrayViz";
import { PointerOverlay } from "@/components/viz/PointerOverlay";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { ensureGsapRegistered, gsap } from "@/lib/animation/register";
import { CELL_PITCH } from "@/lib/animation/constants";
import { formatOps } from "@/lib/utils";

interface DemoFrame {
  pointers: Record<string, number>;
  highlight: number[];
  narration: string;
}

interface DemoApproach {
  id: string;
  name: string;
  hint: string;
  time: string;
  space: string;
  workFn: (n: number) => number;
  frames: DemoFrame[];
}

const TWO_SUM_ARRAY = [1, 4, 6, 8, 11, 15];

const APPROACHES: DemoApproach[] = [
  {
    id: "brute",
    name: "Brute force",
    hint: "Check every pair — two nested loops over the array.",
    time: "O(n²)",
    space: "O(1)",
    workFn: (n) => n * n,
    frames: [
      { pointers: { i: 0, j: 1 }, highlight: [0, 1], narration: "Try i=0, j=1: 1 + 4 = 5 < 14." },
      { pointers: { i: 0, j: 2 }, highlight: [0, 2], narration: "1 + 6 = 7 < 14. Move j." },
      { pointers: { i: 0, j: 3 }, highlight: [0, 3], narration: "1 + 8 = 9 < 14. Move j." },
      { pointers: { i: 0, j: 4 }, highlight: [0, 4], narration: "1 + 11 = 12 < 14. Move j." },
      { pointers: { i: 0, j: 5 }, highlight: [0, 5], narration: "1 + 15 = 16 > 14. Reset, i++." },
      { pointers: { i: 1, j: 2 }, highlight: [1, 2], narration: "i=1, j=2: 4 + 6 = 10 < 14." },
      { pointers: { i: 1, j: 3 }, highlight: [1, 3], narration: "4 + 8 = 12 < 14." },
      { pointers: { i: 1, j: 4 }, highlight: [1, 4], narration: "4 + 11 = 15 > 14. Move j over." },
      { pointers: { i: 2, j: 3 }, highlight: [2, 3], narration: "i=2, j=3: 6 + 8 = 14 == target. Found!" },
    ],
  },
  {
    id: "two-pointers",
    name: "Sort + two pointers",
    hint: "Walk L from the left, R from the right; move the smaller side.",
    time: "O(n)",
    space: "O(1)",
    workFn: (n) => n,
    frames: [
      { pointers: { L: 0, R: 5 }, highlight: [0, 5], narration: "L=0, R=5. Sum = 1 + 15 = 16 > 14." },
      { pointers: { L: 0, R: 4 }, highlight: [0, 4], narration: "Move R in. Sum = 1 + 11 = 12 < 14." },
      { pointers: { L: 1, R: 4 }, highlight: [1, 4], narration: "Move L out. Sum = 4 + 11 = 15 > 14." },
      { pointers: { L: 1, R: 3 }, highlight: [1, 3], narration: "Move R in. Sum = 4 + 8 = 12 < 14." },
      { pointers: { L: 2, R: 3 }, highlight: [2, 3], narration: "Move L out. Sum = 6 + 8 = 14 == target. Found!" },
    ],
  },
  {
    id: "hash",
    name: "Hash map",
    hint: "For each a, check if (target - a) is already in the map.",
    time: "O(n)",
    space: "O(n)",
    workFn: (n) => n,
    frames: [
      { pointers: { i: 0 }, highlight: [0], narration: "i=0: need 13. Map empty. Insert {1→0}." },
      { pointers: { i: 1 }, highlight: [1], narration: "i=1: need 10. Insert {1→0, 4→1}." },
      { pointers: { i: 2 }, highlight: [2], narration: "i=2: need 8. Insert {1→0, 4→1, 6→2}." },
      { pointers: { i: 3 }, highlight: [3], narration: "i=3: need 6. Hit! Answer is (i=3, value at key 6)." },
    ],
  },
];

export function HeroDemo() {
  ensureGsapRegistered();
  const [approachId, setApproachId] = React.useState<string>(APPROACHES[1].id);
  const [frameIdx, setFrameIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [n, setN] = React.useState(1000);

  const approach =
    APPROACHES.find((a) => a.id === approachId) ?? APPROACHES[0];
  const frames = approach.frames;
  const total = frames.length;
  const frame = frames[frameIdx];

  React.useEffect(() => {
    setFrameIdx(0);
  }, [approachId]);

  React.useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setFrameIdx((i) => (i + 1) % total);
    }, 1400);
    return () => clearTimeout(t);
  }, [playing, frameIdx, total]);

  const pointerRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const registerRef = React.useCallback(
    (key: string, el: HTMLDivElement | null) => {
      if (el) pointerRefs.current[key] = el;
    },
    [],
  );

  React.useLayoutEffect(() => {
    for (const [name, target] of Object.entries(frame.pointers)) {
      const el = pointerRefs.current[name];
      if (!el) continue;
      const prev = (el as HTMLDivElement & { _gsapX?: number })._gsapX ?? 0;
      gsap.fromTo(
        el,
        { x: prev },
        { x: target * CELL_PITCH, duration: 0.45, ease: "power2.out" },
      );
      (el as HTMLDivElement & { _gsapX?: number })._gsapX =
        target * CELL_PITCH;
    }
  }, [frame]);

  const work = approach.workFn(n);
  const sliderMax = 10000;

  return (
    <div className="rounded-lg bg-elev border border-line p-6 md:p-7 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-sm bg-accent/15 text-accent border border-accent/30 uppercase tracking-wider">
            ● live
          </span>
          <span className="text-sm font-semibold text-ink">
            two-pointers · target 14
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-muted">Time</span>
          <span className="px-2 py-0.5 rounded-sm bg-accent/15 text-accent border border-accent/30">
            {approach.time}
          </span>
          <span className="text-muted">Space</span>
          <span className="px-2 py-0.5 rounded-sm bg-accent-2/15 text-accent-2 border border-accent-2/30">
            {approach.space}
          </span>
        </div>
      </div>

      <ArrayViz array={TWO_SUM_ARRAY} highlight={frame.highlight} />
      <PointerOverlay pointers={frame.pointers} registerRef={registerRef} />

      <div className="mt-4 px-4 py-3 rounded-md bg-elev2 border border-line text-sm text-ink font-mono">
        {frame.narration}
      </div>

      {/* Approach tabs */}
      <div className="mt-5">
        <Tabs
          value={approachId}
          onValueChange={setApproachId}
          defaultValue={approachId}
        >
          <TabsList>
            {APPROACHES.map((a) => (
              <TabsTrigger key={a.id} value={a.id}>
                {a.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <p className="mt-2 text-xs text-muted">{approach.hint}</p>
        <p className="mt-1 text-[11px] text-accent/80">
          ↑ tap an approach to leap — the cost falls as you go.
        </p>
      </div>

      {/* n-scale slider */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-muted">
            Work to solve · n = {n.toLocaleString()}
          </span>
          <span className="text-ink font-medium">
            {formatOps(work)} ops
          </span>
        </div>
        <input
          type="range"
          min={100}
          max={sliderMax}
          step={100}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
          aria-label="Input size n"
        />
        <div className="flex justify-between text-[10px] text-muted/70 font-mono mt-1">
          <span>100</span>
          <span>1k</span>
          <span>10k</span>
        </div>
      </div>

      {/* Step controls */}
      <div className="mt-5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFrameIdx(0)}
            className="p-2 rounded-md hover:bg-elev2 text-muted hover:text-ink transition"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              setFrameIdx((i) => (i - 1 + total) % total)
            }
            className="p-2 rounded-md hover:bg-elev2 text-muted hover:text-ink transition"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-white text-xs font-medium hover:brightness-110 transition"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Play
              </>
            )}
          </button>
          <button
            onClick={() => setFrameIdx((i) => (i + 1) % total)}
            className="p-2 rounded-md hover:bg-elev2 text-muted hover:text-ink transition"
            aria-label="Next step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="ml-2 text-xs font-mono text-muted">
            {frameIdx + 1} / {total}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted/60">
          Frame {frameIdx + 1} of {total}
        </span>
      </div>
    </div>
  );
}
