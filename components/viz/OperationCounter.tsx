"use client";

import { formatOps } from "@/lib/utils";

export function OperationCounter({
  value,
  estimate,
}: {
  value: number;
  estimate?: string | number;
}) {
  return (
    <div className="flex items-center gap-3 text-xs font-mono">
      <div className="flex items-center gap-1.5">
        <span className="text-muted">ops</span>
        <span className="text-ink font-medium">{formatOps(value)}</span>
      </div>
      {estimate !== undefined && (
        <>
          <span className="text-muted/50">/</span>
          <div className="flex items-center gap-1.5">
            <span className="text-muted">est n=1k</span>
            <span className="text-warn">
              {typeof estimate === "number" ? formatOps(estimate) : estimate}
            </span>
          </div>
        </>
      )}
    </div>
  );
}