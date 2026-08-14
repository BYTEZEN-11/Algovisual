"use client";

import * as React from "react";
import Link from "next/link";
import type { LLDModule, Lesson } from "@/types/content";
import { cn } from "@/lib/utils";

interface LldSidebarProps {
  modules: LLDModule[];
  activeModuleSlug: string;
  activeLessonSlug?: string;
  className?: string;
}

export function LldSidebar({
  modules,
  activeModuleSlug,
  activeLessonSlug,
  className,
}: LldSidebarProps) {
  const [openSlugs, setOpenSlugs] = React.useState<Set<string>>(
    () => new Set([activeModuleSlug]),
  );

  const toggle = (slug: string) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
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
          LLD Track
        </div>
        <Link
          href="/"
          className="text-[10px] text-muted hover:text-accent transition"
        >
          ← Home
        </Link>
      </div>
      <nav className="space-y-1">
        {modules.map((m) => {
          const isOpen = openSlugs.has(m.slug);
          const isActive = m.slug === activeModuleSlug;
          return (
            <ModuleGroup
              key={m.slug}
              module={m}
              isOpen={isOpen}
              isActive={isActive}
              onToggle={() => toggle(m.slug)}
              activeLessonSlug={activeLessonSlug}
            />
          );
        })}
      </nav>
    </aside>
  );
}

function ModuleGroup({
  module,
  isOpen,
  isActive,
  onToggle,
  activeLessonSlug,
}: {
  module: LLDModule;
  isOpen: boolean;
  isActive: boolean;
  onToggle: () => void;
  activeLessonSlug?: string;
}) {
  return (
    <div className="rounded-md">
      <Link
        href={`/lld/${module.slug}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
          e.preventDefault();
          onToggle();
        }}
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
            onClick={(e) => {
              e.preventDefault();
              onToggle();
            }}
          >
            ▶
          </span>
          {module.title}
        </span>
        <span className="text-[10px] text-muted">{module.lessons.length}</span>
      </Link>
      {isOpen && (
        <ul className="ml-3 mt-0.5 mb-2 border-l border-line pl-2 space-y-0.5">
          {module.lessons.map((l) => (
            <li key={l.slug}>
              <LessonLink
                moduleSlug={module.slug}
                lesson={l}
                active={isActive && l.slug === activeLessonSlug}
              />
            </li>
          ))}
          {module.lessons.length === 0 && (
            <li className="text-xs text-muted/60 italic px-2 py-1">
              No lessons yet
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

function LessonLink({
  moduleSlug,
  lesson,
  active,
}: {
  moduleSlug: string;
  lesson: Lesson;
  active: boolean;
}) {
  return (
    <Link
      href={`/lld/${moduleSlug}#${lesson.slug}`}
      className={cn(
        "block px-2 py-1 rounded text-xs truncate transition",
        active
          ? "bg-accent/15 text-accent font-medium"
          : "text-muted hover:text-ink hover:bg-elev2",
      )}
      title={lesson.title}
    >
      {lesson.title}
    </Link>
  );
}
