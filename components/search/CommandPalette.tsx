"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { searchEntries, type SearchEntry } from "@/lib/content/search";
import { Search as SearchIcon, X } from "lucide-react";

interface PaletteProps {
  open: boolean;
  onClose: () => void;
}

const TRACK_PREFIX: Record<string, string> = {
  dsa: "DSA",
  lld: "LLD",
  os: "OS",
  networking: "NET",
};

export function CommandPalette({ open, onClose }: PaletteProps) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchEntry[]>([]);
  const [highlight, setHighlight] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setHighlight(0);
      // Defer focus to next tick so the input mounts.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  React.useEffect(() => {
    setResults(searchEntries(query));
    setHighlight(0);
  }, [query]);

  function go(e: SearchEntry) {
    onClose();
    router.push(e.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const r = results[highlight];
      if (r) go(r);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] bg-base/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-xl rounded-lg bg-elev border border-line shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 border-b border-line">
          <SearchIcon className="w-4 h-4 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search topics, patterns, chapters…"
            className="flex-1 bg-transparent py-3 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted hover:text-ink"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-1">
          {results.length === 0 ? (
            <div className="px-3 py-6 text-sm text-muted text-center">
              {query ? "No matches" : "Start typing to search."}
            </div>
          ) : (
            <ul>
              {results.map((r, i) => {
                const active = i === highlight;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => go(r)}
                      onMouseEnter={() => setHighlight(i)}
                      className={
                        "w-full flex items-center justify-between gap-3 px-3 py-2 rounded text-left text-sm transition " +
                        (active
                          ? "bg-accent/15 text-ink"
                          : "text-muted hover:bg-elev2 hover:text-ink")
                      }
                    >
                      <div className="min-w-0">
                        <div className="text-ink truncate">{r.title}</div>
                        {r.subtitle && (
                          <div className="text-xs text-muted truncate">
                            {r.subtitle}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted shrink-0">
                        {TRACK_PREFIX[r.track] ?? r.track}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="px-3 py-2 border-t border-line text-[10px] text-muted/70 flex items-center gap-3">
          <span>↑↓ to navigate</span>
          <span>↵ to open</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}

interface ButtonProps {
  onOpen: () => void;
}

export function SearchButton({ onOpen }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-md border border-line bg-elev text-muted hover:text-ink hover:border-accent/40 transition text-xs"
      aria-label="Search (⌘K)"
    >
      <SearchIcon className="w-3.5 h-3.5" />
      <span>Search</span>
      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm border border-line">
        ⌘K
      </span>
    </button>
  );
}