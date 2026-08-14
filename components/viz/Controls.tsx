"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";

interface ControlsProps {
  idx: number;
  total: number;
  playing: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onReset: () => void;
}

export function Controls({
  idx,
  total,
  playing,
  onPrev,
  onNext,
  onTogglePlay,
  onReset,
}: ControlsProps) {
  const isFirst = idx === 0;
  const isLast = idx === total - 1;
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={onReset}
        disabled={isFirst}
        aria-label="Reset"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Previous step"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="primary"
        onClick={onTogglePlay}
        aria-label={playing ? "Pause" : "Play"}
        className="w-20"
      >
        {playing ? (
          <>
            <Pause className="w-4 h-4" /> Pause
          </>
        ) : (
          <>
            <Play className="w-4 h-4" /> Play
          </>
        )}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onNext}
        disabled={isLast}
        aria-label="Next step"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      <span className="ml-2 text-xs font-mono text-muted">
        {idx + 1} / {total}
      </span>
    </div>
  );
}