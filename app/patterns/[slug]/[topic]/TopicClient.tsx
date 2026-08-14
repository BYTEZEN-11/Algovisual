"use client";

import * as React from "react";
import type { Approach } from "@/types/content";
import { StepPlayer } from "@/components/viz/StepPlayer";
import { ApproachSwitcher } from "@/components/content/ApproachSwitcher";
import { SolvedToggle } from "@/components/content/SolvedToggle";
import { CodePanel } from "@/components/content/CodePanel";
import { topicId } from "@/lib/utils";

export function TopicClient({
  patternSlug,
  topicTitle,
  topicSlug,
  patternTitle,
  approaches,
  code,
  annotations,
}: {
  patternSlug: string;
  topicTitle: string;
  topicSlug: string;
  patternTitle: string;
  approaches: Approach[];
  code?: { lang: string; lines: string[] };
  annotations?: Record<number, string>;
}) {
  const [approachId, setApproachId] = React.useState(approaches[0].id);
  const approach = approaches.find((a) => a.id === approachId) ?? approaches[0];
  const [activeLine, setActiveLine] = React.useState(1);
  const [sequential, setSequential] = React.useState(true);
  const [hideSolutions, setHideSolutions] = React.useState(false);

  return (
    <div className="space-y-6 mt-6">
      {/* Top-of-player controls: Approach tabs + per-player toggles */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <ApproachSwitcher
          approaches={approaches.map((a) => ({ id: a.id, name: a.name }))}
          value={approachId}
          onValueChange={setApproachId}
        />
        <div className="flex items-center gap-2 text-[11px]">
          <button
            onClick={() => setSequential((v) => !v)}
            className={
              "px-2 py-1 rounded border transition " +
              (sequential
                ? "bg-accent/10 border-accent/30 text-accent"
                : "bg-elev border-line text-muted hover:text-ink")
            }
          >
            Sequential: brute → optimized
          </button>
          <button
            onClick={() => setHideSolutions((v) => !v)}
            className={
              "px-2 py-1 rounded border transition " +
              (hideSolutions
                ? "bg-accent/10 border-accent/30 text-accent"
                : "bg-elev border-line text-muted hover:text-ink")
            }
          >
            {hideSolutions ? "Show solutions" : "Hide solutions"}
          </button>
        </div>
      </div>

      {!hideSolutions && (
        <StepPlayer
          steps={approach.steps}
          approachName={approach.name}
          time={approach.time}
          space={approach.space}
          baseInput={approach.defaultInput}
          onStepChange={(stepIdx) => {
            setActiveLine(Math.min(stepIdx + 1, code?.lines.length ?? 1));
          }}
        />
      )}

      {code && (
        <CodePanel
          lang={code.lang}
          lines={code.lines}
          annotations={annotations}
          highlightLine={activeLine}
          onHighlightLineChange={setActiveLine}
        />
      )}

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs text-muted">
          {patternTitle} · <span className="text-ink">{topicTitle}</span> ·{" "}
          {approach.steps.length} frames
        </div>
        <SolvedToggle topicId={topicId("dsa", patternSlug, topicSlug)} track="dsa" />
      </div>
    </div>
  );
}