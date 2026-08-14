import type { Chapter, SubTopic, Track } from "@/types/content";
import { osChapters } from "@/content/os";
import { networkingChapters } from "@/content/networking";

function chaptersFor(track: Track): Chapter[] {
  return track === "os" ? osChapters : networkingChapters;
}

export function getChapterBySlug(track: Track, slug: string): Chapter | undefined {
  return chaptersFor(track).find((c) => c.slug === slug);
}

export function getSubTopicBySlug(
  track: Track,
  chapterSlug: string,
  subTopicSlug: string,
): { chapter: Chapter; subTopic: SubTopic } | undefined {
  const chapter = getChapterBySlug(track, chapterSlug);
  if (!chapter?.subTopics) return undefined;
  const subTopic = chapter.subTopics.find((s) => s.slug === subTopicSlug);
  if (!subTopic) return undefined;
  return { chapter, subTopic };
}

export function getAllChapterSlugs(): { track: Track; slug: string }[] {
  return [
    ...osChapters.map((c) => ({ track: "os" as const, slug: c.slug })),
    ...networkingChapters.map((c) => ({ track: "networking" as const, slug: c.slug })),
  ];
}

export function getAllSubTopicSlugs(): {
  track: Track;
  chapterSlug: string;
  subTopicSlug: string;
}[] {
  const result: { track: Track; chapterSlug: string; subTopicSlug: string }[] = [];
  for (const c of networkingChapters) {
    if (!c.subTopics) continue;
    for (const s of c.subTopics) {
      result.push({
        track: "networking",
        chapterSlug: c.slug,
        subTopicSlug: s.slug,
      });
    }
  }
  for (const c of osChapters) {
    if (!c.subTopics) continue;
    for (const s of c.subTopics) {
      result.push({
        track: "os",
        chapterSlug: c.slug,
        subTopicSlug: s.slug,
      });
    }
  }
  return result;
}