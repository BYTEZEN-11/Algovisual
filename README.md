<div align="center">

<h1>⚡ AlgoVisual</h1>

<p>
  <strong>A visual computer-science learning platform — algorithms stepped through frame-by-frame,<br/>
  with pointer animation, complexity badges, and an interview-prep planner.</strong>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-5.x-2d3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-3.12-88ce02?style=for-the-badge&logo=greensock&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

<p>
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-routes">Routes</a> •
  <a href="#-adding-content">Adding Content</a>
</p>

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎞️ **Frame-by-frame step player** | Play / Pause / Step / Reset with keyboard shortcuts (`←` `→` `Space`) |
| 🔀 **Approach switcher** | Toggle Brute → Optimal and watch time complexity drop in real time |
| 📐 **Animated pointers** | GSAP-powered pointer translation over array bars |
| 📊 **Complexity badges** | Live time & space complexity displayed per approach |
| 🧩 **18 DSA patterns** | Two Pointers (fully animated) + 17 patterns seeded with stub topics |
| 📚 **4 learning tracks** | DSA · LLD · Computer Networks · Operating Systems |
| 📅 **Interview Prep Planner** | Mode selector, days picker, per-day problems, calendar grid & on-track indicator |
| 🔖 **Bookmarks** | Save topics for later, persisted per user in the database |
| 📈 **Progress tracking** | Attempt logging + visual progress per pattern |
| 🔐 **Auth** | Google OAuth + email/password sign-up via NextAuth v5 (Auth.js) |
| 🌙 **Dark neon-lab theme** | Purpose-built dark UI, no flickering, no FOUC |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) — App Router, Server Components, Server Actions |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 3.4 + `tailwind-merge` + `clsx` |
| **Animation** | [GSAP 3](https://gsap.com/) via `@gsap/react` + Framer Motion |
| **Auth** | [NextAuth v5 (Auth.js)](https://authjs.dev/) — Google OAuth + Credentials |
| **Database** | SQLite via [Prisma 5](https://www.prisma.io/) ORM |
| **Validation** | [Zod](https://zod.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Password hashing** | `bcryptjs` |

---

## 🚀 Quick Start

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/BYTEZEN-11/Algovisual.git
cd Algovisual

# 2. Install dependencies
npm install

# 3. Set up the database
npx prisma migrate dev --name init

# 4. Copy env file
cp .env.example .env.local
```

### Environment Variables

Open `.env.local` and fill in the values:

```env
# Required — generate with: openssl rand -base64 32
AUTH_SECRET=your_secret_here

# Optional — only needed for Google sign-in
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

> **Note:** The app runs fully without Google credentials — the sign-in button will appear but Google login will fail gracefully until credentials are set.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Google OAuth Setup (Optional)

1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create an **OAuth 2.0 Client ID** (Web application)
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy `Client ID` and `Client Secret` into `.env.local`

---

## 📁 Project Structure

```
Algovisual/
├── app/                        # Next.js App Router
│   ├── api/                    # API routes (auth, bookmarks, progress, stats)
│   ├── patterns/[slug]/        # Pattern detail & topic step player
│   ├── lld/[slug]/             # Low-Level Design modules
│   ├── computer-networks/      # 31 networking chapters
│   ├── operating-systems/      # 37 OS chapters
│   ├── dashboard/              # User dashboard
│   ├── prepare/                # Interview prep planner
│   └── ...                     # login, signup, bookmarks, progress pages
│
├── components/
│   ├── viz/                    # Core visualizer (StepPlayer, ArrayViz, Controls)
│   ├── content/                # DsaSidebar, CodePanel, ComplexityBadge, etc.
│   ├── prep/                   # Interview prep widgets
│   ├── auth/                   # Auth UI components
│   ├── layout/                 # Navbar, Footer, Container
│   └── ui/                     # Reusable: Button, Card, Badge, Tabs, ProgressBar
│
├── content/
│   ├── patterns/               # 18 DSA pattern definitions (TypeScript)
│   ├── lld/                    # LLD module definitions
│   ├── networking/             # Computer Networks chapter data
│   └── os/                     # Operating Systems chapter data
│
├── lib/
│   ├── animation/              # GSAP registration & constants
│   ├── content/                # Loader, search, stats, tracks
│   ├── auth-guards.ts          # Session helpers
│   ├── prisma.ts               # Prisma client singleton
│   └── utils.ts                # General utilities
│
├── prisma/
│   └── schema.prisma           # User, Session, Account, Progress, Bookmark models
│
├── types/
│   ├── content.ts              # Pattern, Topic, Step, Approach types
│   └── next-auth.d.ts          # NextAuth session type extensions
│
└── middleware.ts               # Route protection
```

---

## 🗺 Routes

| Route | Description |
|---|---|
| `/` | Homepage — hero demo, track cards, 18-pattern grid, prep widget |
| `/patterns/[slug]` | Pattern overview with topic list |
| `/patterns/[slug]/[topic]` | Topic detail with animated StepPlayer |
| `/lld/[slug]` | LLD module detail (e.g. `/lld/solid`) |
| `/computer-networks` | 31 networking chapters |
| `/operating-systems` | 37 OS chapters |
| `/prepare` | Full-page interview prep planner |
| `/dashboard` | User dashboard with progress overview |
| `/bookmarks` | Saved topics |
| `/progress` | Detailed progress per pattern |
| `/login` | Sign in page |
| `/signup` | Email + password registration |

---

## ✏️ Adding Visualizer Content

Each pattern lives in `content/patterns/*.ts`. Create a new file:

```ts
import type { Pattern } from "@/types/content";

export const myPattern: Pattern = {
  slug: "my-pattern",
  title: "My Pattern",
  tagline: "One-line description of what this pattern solves.",
  status: "live",                // "live" | "stub"
  icon: "Sparkles",              // any lucide-react icon name
  topics: [
    {
      slug: "problem-one",
      title: "Problem Title",
      difficulty: "Medium",      // "Easy" | "Medium" | "Hard"
      status: "live",
      description: "What the problem is and what to watch for.",
      approaches: [
        {
          id: "brute",
          name: "Brute Force",
          time: "O(n²)",
          space: "O(1)",
          opsEstimate: (n) => n * n,
          defaultInput: { array: [2, 7, 11, 15] },
          steps: [
            {
              id: 0,
              narration: "Start with both pointers at the beginning.",
              pointers: { L: 0, R: 1 },
              highlight: [0, 1],
              opCount: 0,
            },
            // add more steps...
          ],
        },
      ],
    },
  ],
};
```

Then register it in `content/patterns/index.ts`:

```ts
export { myPattern } from "./my-pattern";
```

---

## 🧪 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at `http://localhost:3000` |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma DB browser |
| `npx prisma migrate dev` | Apply database migrations |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit with sign-off: `git commit -m "add amazing feature" -s`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow the existing code style and keep commits small and focused.

---

## 📄 License

This is an original build. Released under the [MIT License](LICENSE) — use it however you like.

---

<div align="center">
  <p>Built with ❤️ by <strong>BYTEZEN-11</strong></p>
  <p>
    <a href="https://github.com/BYTEZEN-11/Algovisual">⭐ Star this repo</a> if you find it helpful!
  </p>
</div>