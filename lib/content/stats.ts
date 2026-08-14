import { patterns } from "@/content/patterns";
import { lldModules } from "@/content/lld";
import { osChapters, osParts } from "@/content/os";
import { networkingChapters, networkingParts } from "@/content/networking";

const dsaTopics = patterns.reduce((acc, p) => acc + p.topics.length, 0);
const lldLessons = lldModules.reduce((acc, m) => acc + m.lessons.length, 0);
const osSubTopics = osChapters.reduce(
  (acc, c) => acc + (c.subTopics?.length ?? 0),
  0,
);
const networkingSubTopics = networkingChapters.reduce(
  (acc, c) => acc + (c.subTopics?.length ?? 0),
  0,
);

export const contentStats = {
  dsa: {
    patterns: patterns.length,
    topics: dsaTopics,
  },
  lld: {
    modules: lldModules.length,
    lessons: lldLessons,
  },
  os: {
    parts: osParts.length,
    chapters: osChapters.length,
    subTopics: osSubTopics,
  },
  networking: {
    parts: networkingParts.length,
    chapters: networkingChapters.length,
    subTopics: networkingSubTopics,
  },
};
