export type Track = "dsa" | "lld" | "networking" | "os";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Status = "live" | "bonus" | "new" | "draft";

export type Pointers = Record<string, number>;

export interface VizFrame {
  id: number;
  pointers?: Pointers;
  highlight?: number[];
  path?: number[];
  table?: (string | number)[][];
  variables?: Record<string, string | number>;
  narration: string;
  opCount?: number;
  done?: boolean;
}

export interface Approach {
  id: string;
  name: string;
  time: string;
  space: string;
  opsEstimate?: (n: number) => number;
  defaultInput: Record<string, unknown>;
  steps: VizFrame[];
}

export interface ApproachDTO {
  id: string;
  name: string;
  time: string;
  space: string;
  opsEstimateDisplay?: string;
  defaultInput: Record<string, unknown>;
  steps: VizFrame[];
}

export function toApproachDTO(a: Approach): ApproachDTO {
  return {
    id: a.id,
    name: a.name,
    time: a.time,
    space: a.space,
    opsEstimateDisplay: a.opsEstimate ? formatEstimate(a.opsEstimate(1000)) : undefined,
    defaultInput: a.defaultInput,
    steps: a.steps,
  };
}

function formatEstimate(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export interface Topic {
  slug: string;
  title: string;
  difficulty: Difficulty;
  status: Status;
  description: string;
  problem?: string;
  askedAt?: string[];
  code?: { lang: string; lines: string[] };
  annotations?: Record<number, string>;
  approaches: Approach[];
}

export interface Pattern {
  slug: string;
  title: string;
  tagline: string;
  status: Status;
  icon: string;
  topics: Topic[];
}

export interface Lesson {
  slug: string;
  title: string;
  duration: string;
  summary: string;
  body?: string;
  keyTerms?: string[];
  seeAlso?: string[];
  illustrations?: string[];
}

export interface LLDModule {
  slug: string;
  title: string;
  tagline: string;
  status: Status;
  icon: string;
  lessons: Lesson[];
}

export interface SubTopic {
  slug: string;
  title: string;
  summary: string;
  body: string;
  keyTerms?: string[];
  duration?: string;
}

export interface Chapter {
  slug: string;
  title: string;
  track: Track;
  status: Status;
  summary: string;
  body?: string;
  keyTerms?: string[];
  seeAlso?: string[];
  lessons?: Lesson[];
  subTopics?: SubTopic[];
  sections?: number;
}