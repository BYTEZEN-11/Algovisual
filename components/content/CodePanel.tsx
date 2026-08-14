"use client";

import * as React from "react";
import { Copy, Check, Code2 } from "lucide-react";

interface CodePanelProps {
  lang?: string;
  lines: string[];
  annotations?: Record<number, string>;
  highlightLine?: number;
  onHighlightLineChange?: (line: number) => void;
}

export function CodePanel({
  lang = "python",
  lines,
  annotations = {},
  highlightLine,
  onHighlightLineChange,
}: CodePanelProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [internalHighlight, setInternalHighlight] = React.useState(1);

  const activeLine = highlightLine ?? internalHighlight;

  const onLineClick = (i: number) => {
    if (onHighlightLineChange) onHighlightLineChange(i);
    else setInternalHighlight(i);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
    }
  };

  const codeText = lines.join("\n");

  return (
    <div className="rounded-lg bg-elev border border-line overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-line bg-elev2/50">
        <div className="flex items-center gap-2 text-xs">
          <Code2 className="w-3.5 h-3.5 text-muted" />
          <span className="font-medium text-ink">Practice</span>
          <span className="text-[10px] uppercase tracking-wider text-muted px-1.5 py-0.5 rounded-sm bg-elev border border-line">
            {lang}
          </span>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="ml-2 text-muted hover:text-ink text-xs"
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "▸" : "▾"}
          </button>
        </div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-ink transition"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-accent" /> copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> copy
            </>
          )}
        </button>
      </div>
      {!collapsed && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">
          <pre className="text-xs font-mono leading-relaxed overflow-x-auto">
            <code>
              {lines.map((ln, i) => {
                const isActive = activeLine === i + 1;
                return (
                  <div
                    key={i}
                    onClick={() => onLineClick(i + 1)}
                    className={
                      "flex gap-3 cursor-pointer px-1 rounded transition " +
                      (isActive
                        ? "bg-accent/10 text-ink"
                        : "text-ink/85 hover:bg-elev2")
                    }
                  >
                    <span className="select-none w-5 text-right text-muted/60 text-[10px] mt-px">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">{ln || " "}</span>
                  </div>
                );
              })}
            </code>
          </pre>
          <aside className="rounded-md bg-base border border-line p-3 text-xs text-muted/90">
            {annotations[activeLine] ? (
              <>
                <div className="text-[10px] uppercase tracking-wider text-muted mb-1">
                  Line {activeLine}
                </div>
                <p className="leading-relaxed">{annotations[activeLine]}</p>
              </>
            ) : (
              <p className="italic text-muted/60">
                Click a line to read an inline note.
              </p>
            )}
            <div className="mt-3 text-[10px] text-muted/60 font-mono whitespace-pre-wrap">
              {codeText.length < 200
                ? codeText
                : `${codeText.slice(0, 200)}…`}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}