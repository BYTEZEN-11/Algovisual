import type { Pattern } from "@/types/content";

interface StubTopic {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  summary: string;
}

const stubFromTopics = (
  slug: string,
  title: string,
  tagline: string,
  icon: string,
  topics: StubTopic[],
): Pattern => ({
  slug,
  title,
  tagline,
  status: "draft",
  icon,
  topics: topics.map((t) => ({
    slug: t.slug,
    title: t.title,
    difficulty: t.difficulty,
    status: "draft",
    description: t.summary,
    approaches: [
      {
        id: "primary",
        name: "Primary",
        time: "—",
        space: "—",
        defaultInput: { array: [1, 2, 3, 4, 5] },
        steps: [
          {
            id: 0,
            narration: "Content coming soon — this is a stub pattern.",
            opCount: 0,
          },
        ],
      },
    ],
  })),
});

// Patterns still using stub content. These are the topics that need a
// dedicated <slug>.ts file with full viz content. Keep this list in sync
// with full files in index.ts.
export const stubPatterns: Pattern[] = [];
