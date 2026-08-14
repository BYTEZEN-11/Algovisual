import type { Pattern } from "@/types/content";
import { twoPointers } from "./two-pointers";
import { arraysHashing } from "./arrays-hashing";
import { slidingWindow } from "./sliding-window";
import { stack } from "./stack";
import { binarySearch } from "./binary-search";
import { monotonicStack } from "./monotonic-stack";
import { backtracking } from "./backtracking";
import { dp1d } from "./dp-1d";
import { dp2d } from "./dp-2d";
import { greedy } from "./greedy";
import { linkedList } from "./linked-list";
import { trees } from "./trees";
import { heap } from "./heap";
import { graphs } from "./graphs";
import { intervals } from "./intervals";
import { bitManipulation } from "./bit-manipulation";
import { trie } from "./trie";
import { unionFind } from "./union-find";
import { prefixSum } from "./prefix-sum";
import { matrices } from "./matrices";
import { bfs } from "./bfs";

// All 21 patterns, each in its own file with full viz content.
export const patterns: Pattern[] = [
  twoPointers,
  arraysHashing,
  slidingWindow,
  stack,
  binarySearch,
  monotonicStack,
  backtracking,
  dp1d,
  dp2d,
  greedy,
  linkedList,
  trees,
  heap,
  graphs,
  intervals,
  bitManipulation,
  trie,
  unionFind,
  prefixSum,
  matrices,
  bfs,
];

export function getAllPatterns(): Pattern[] {
  return patterns;
}

export function getPatternBySlug(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug);
}

export function getTopicById(
  patternSlug: string,
  topicSlug: string,
): { pattern: Pattern; topic: Pattern["topics"][number] } | undefined {
  const pattern = getPatternBySlug(patternSlug);
  if (!pattern) return undefined;
  const topic = pattern.topics.find((t) => t.slug === topicSlug);
  if (!topic) return undefined;
  return { pattern, topic };
}
