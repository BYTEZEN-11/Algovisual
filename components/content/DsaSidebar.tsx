"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SidebarPattern {
  slug: string;
  title: string;
  topics: { slug: string; title: string }[];
}

interface DsaSidebarProps {
  patterns: SidebarPattern[];
  activePatternSlug: string;
  activeTopicSlug?: string;
  className?: string;
}

export function DsaSidebar({
  patterns,
  activePatternSlug,
  activeTopicSlug,
  className,
}: DsaSidebarProps) {
  const [openSlugs, setOpenSlugs] = React.useState<string[]>([activePatternSlug]);

  const toggle = (slug: string) => {
    setOpenSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  return (
    <aside
      className={cn(
        "sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 text-sm",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-accent font-medium">
          Tracks
        </div>
        <Link
          href="/"
          className="text-[10px] text-muted hover:text-accent transition"
        >
          ← Home
        </Link>
      </div>
      <nav className="space-y-1">
        {patterns.map((p) => {
          const isOpen = openSlugs.includes(p.slug);
          const isActive = p.slug === activePatternSlug;
          return (
            <PatternGroup
              key={p.slug}
              pattern={p}
              isOpen={isOpen}
              isActive={isActive}
              onToggle={() => toggle(p.slug)}
              activeTopicSlug={activeTopicSlug}
            />
          );
        })}
      </nav>
    </aside>
  );
}

function PatternGroup({
  pattern,
  isOpen,
  isActive,
  onToggle,
  activeTopicSlug,
}: {
  pattern: SidebarPattern;
  isOpen: boolean;
  isActive: boolean;
  onToggle: () => void;
  activeTopicSlug?: string;
}) {
  return (
    <div className="rounded-md">
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-md transition text-left",
          isActive
            ? "bg-accent/10 text-ink"
            : "hover:bg-elev2 text-ink/90",
        )}
      >
        <span className="text-sm font-medium flex items-center gap-2">
          <span
            className={cn(
              "transition-transform inline-block w-3",
              isOpen ? "rotate-90" : "rotate-0",
            )}
          >
            ▶
          </span>
          {pattern.title}
        </span>
        <span className="text-[10px] text-muted">{pattern.topics.length}</span>
      </button>
      {isOpen && (
        <ul className="ml-3 mt-0.5 mb-2 border-l border-line pl-2 space-y-0.5">
          {pattern.topics.map((t) => (
            <li key={t.slug}>
              <TopicLink
                patternSlug={pattern.slug}
                topic={t}
                active={isActive && t.slug === activeTopicSlug}
              />
            </li>
          ))}
          {pattern.topics.length === 0 && (
            <li className="text-xs text-muted/60 italic px-2 py-1">
              No topics yet
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

function TopicLink({
  patternSlug,
  topic,
  active,
}: {
  patternSlug: string;
  topic: SidebarPattern["topics"][number];
  active: boolean;
}) {
  return (
    <Link
      href={`/patterns/${patternSlug}/${topic.slug}`}
      className={cn(
        "block px-2 py-1 rounded text-xs truncate transition",
        active
          ? "bg-accent/15 text-accent font-medium"
          : "text-muted hover:text-ink hover:bg-elev2",
      )}
      title={topic.title}
    >
      {topic.title}
    </Link>
  );
}