# DSA Visual

> A visual computer-science learning platform — algorithms stepped through frame-by-frame, with pointer animation, complexity badges, and an interview-prep planner.

Inspired by the same concept as a popular DSA learning site, but with original branding (dark "neon lab" aesthetic), original copy, and a fully-owned codebase.

## Stack

- **Next.js 14** (App Router) + **TypeScript** (strict)
- **Tailwind CSS** for styling
- **GSAP** for the animation engine (via `@gsap/react`)
- **NextAuth v5** (Auth.js) with Google provider
- **Prisma** + **SQLite** for users + progress
- **Lucide React** for icons

## Features

- **18 DSA patterns** — Two Pointers (fully visualized), 17 more seeded with stub topics.
- **Algorithm step player** — play/pause/step/reset with arrow-key + space shortcuts, animated pointer translation via GSAP.
- **Approach switcher** — toggle Brute → Sort + Two Pointers → Hash Map and watch complexity drop.
- **4 tracks** — DSA, LLD, Computer Networks, Operating Systems.
- **Interview Prep widget** — mode/days/per-day, calendar grid, on-track indicator.
- **Progress + bookmarks** — persisted per user via NextAuth-protected API routes.

## Setup

```bash
# 1. Install
npm install

# 2. Set up the database
npx prisma migrate dev --name init

# 3. Configure env (optional, only needed for Google sign-in)
cp .env.example .env.local
# fill AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET
# generate AUTH_SECRET: openssl rand -base64 32

# 4. Run
npm run dev
```

Open http://localhost:3000.

## Google OAuth (optional)

The app runs without any Google credentials — "Sign in" still appears but will error if clicked. To enable real sign-in:

1. Create OAuth credentials at https://console.cloud.google.com/apis/credentials
2. Set redirect URI to `http://localhost:3000/api/auth/callback/google`
3. Fill `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in `.env.local`

## Routes

- `/` — Homepage with hero demo + 4 track cards + 18-pattern grid + prep widget
- `/patterns/[slug]` — Pattern detail with topic list
- `/patterns/[slug]/[topic]` — Topic detail with StepPlayer
- `/lld/[slug]` — LLD module detail (e.g. `/lld/solid`)
- `/computer-networks` — 31 networking chapters
- `/operating-systems` — 37 OS chapters
- `/prepare` — Full-page interview prep planner

## Adding viz content

Each pattern lives in `content/patterns/*.ts`. The shape is:

```ts
import type { Pattern } from "@/types/content";

export const myPattern: Pattern = {
  slug: "my-pattern",
  title: "My Pattern",
  tagline: "What this pattern is for.",
  status: "live",
  icon: "Sparkles",           // lucide-react icon name
  topics: [
    {
      slug: "problem-1",
      title: "Problem Title",
      difficulty: "Easy",      // Easy | Medium | Hard
      status: "live",
      description: "What the problem is.",
      approaches: [
        {
          id: "primary",
          name: "Primary Approach",
          time: "O(n)",
          space: "O(1)",
          opsEstimate: (n) => n,
          defaultInput: { array: [1, 2, 3] },
          steps: [
            {
              id: 0,
              narration: "What happens on this frame.",
              pointers: { L: 0, R: 2 },
              highlight: [0, 2],
              opCount: 0,
            },
            // ...
          ],
        },
      ],
    },
  ],
};
```

Then add the export to `content/patterns/index.ts`.

## License

This is an original build. You're free to use it however you like.