# DSA Visual — Platform Audit (Phase 1–8)

This document audits the rebuilt platform against the reference IA at `https://dsa.chaicode.com/`. It is grounded in the code that's actually in `C:\Users\Nitesh-PC\Desktop\dsa` and in the production build that was verified end-to-end on **2026-08-02**.

The product is built as an **original** implementation: the taxonomy (categories, topic names) follows the public IA, but every tutorial body, diagram, and editorial is hand-written for this codebase. No copy, sequencing, or artwork was lifted from the reference.

---

## Phase 1 — Complete Website Analysis

### 1.1 Project Overview

A self-paced learning platform for four engineering interview tracks — **DSA**, **LLD**, **Computer Networks**, and **Operating Systems** — built around an animated viz engine. Users move through topics and watch the algorithm/step happen visually, can mark topics solved, and (when signed in) track progress across tracks.

### 1.2 Purpose

Replace static textbook explanations with a visual, frame-by-frame walkthrough. The pitch section on the home page states it directly: *"Every pattern, stepped through one frame at a time — pointers gliding, trees recursing, DP tables filling in."*

### 1.3 Target Users

- DSA interview prep candidates
- Engineering students learning OS / Networks fundamentals
- Working engineers who want UML / design-pattern reference

Sign-in is optional for browsing; required for any persistence (solved / bookmarks / progress / streak).

### 1.4 User Flow

```
┌─────────┐    ┌───────────┐    ┌──────────────┐    ┌──────────┐
│ Home    │ →  │ Track     │ →  │ Topic viz    │ →  │ Mark     │
│ (/)     │    │ landing   │    │ (step player)│    │ solved   │
└─────────┘    └───────────┘    └──────────────┘    └──────────┘
     │                                       │             │
     │                                       ↓             ↓
     │         ┌──────────────┐         ┌──────────┐  ┌─────────┐
     └───────→ │ Search (⌘K)  │         │ Bookmark │  │ Dashbrd │
               └──────────────┘         └──────────┘  └─────────┘
```

### 1.5 Information Architecture

Public routes:

| Path | Purpose | Renderer |
| --- | --- | --- |
| `/` | Home — hero, track tiles, prep widget, pattern grid | Server |
| `/patterns` | (implicit; via `/patterns/two-pointers`) | — |
| `/patterns/[slug]` | Pattern index | Server (SSG) |
| `/patterns/[slug]/[topic]` | Topic viz page | Server + client |
| `/lld/[slug]` | LLD module page | Server (SSG) |
| `/operating-systems` | OS index | Server |
| `/computer-networks` | Networks index | Server |
| `/chapter/[track]/[slug]` | Generic chapter deep page (OS + Networks) | Server (SSG) |
| `/prepare` | Interview prep widget | Client |
| `/pricing`, `/privacy`, `/terms`, `/refund` | Static legal pages | Server |

Authenticated routes (307 → `/?signin=1&return=…` when signed out):

| Path | Purpose |
| --- | --- |
| `/dashboard` | Stats + continue-learning + recent activity |
| `/bookmarks` | Saved topics grouped by track |
| `/progress` | 30-day calendar + per-track completion |

### 1.6 Navigation Structure

Top-bar nav (`components/layout/Navbar.tsx`): **DSA · LLD · Networks · OS · Prep**, plus **Dashboard / Bookmarks** when signed in, plus **Search** button, **Theme toggle**, and **Sign-in / User menu** on the right side.

### 1.7 UI Components

A small set of primitives (`components/ui/`):

- `Card` — base surface with `elev` / `elev2` variants, optional `glow` accent and `hover` lift.
- `Button` — `primary` / `outline` / `ghost` × `sm` / `md` / `lg`.
- `Badge` — `live` (green dot) / `bonus` / `new` / `neutral`.
- `Chip` — small label, used for topic tags and section counts.
- `ProgressBar` — labelled horizontal bar.
- `Tabs` — segment switcher.

Layered components:

- `PatternCard` — DSA pattern tile.
- `TopicCard` — list-row variant.
- `ProblemHeader` — title + meta row on topic pages.
- `DetailsDisclosure` — collapsible diagram-block wrapper.
- `CodePanel` — syntax-highlighted code block.
- `ApproachSwitcher` — toggle between brute / optimal approaches on a topic.
- `ComplexityBadge` — O(n) tag.
- `StatusBadge` — `live` / `draft` / `new`.
- `LldSidebar`, `DsaSidebar` — in-page navigation.

Viz engine (`components/viz/`):

- `StepPlayer` — play / pause / step / scrub.
- `ArrayViz` — visual array with mutations.
- `PointerOverlay` — GSAP-animated pointer markers.
- `Narration` — current-step text.
- `Controls` — play/pause UI.
- `OperationCounter` — running op count.

Prep widget (`components/prep/`):

- `InterviewPrepWidget` (composes the others).
- `ModeToggle` (Timed / Complete).
- `DaysSelector` (7 / 30 / 45).
- `PerDaySelector` (1 / 2 / 4).
- `CalendarGrid` (per-day cells).
- `ProgressReadout` (solved / total).
- `OnTrackIndicator` (green / amber badge).

Global:

- `Navbar`, `Footer`, `Container` / `SectionHeading`.
- `ContinueCard` (homepage resume).
- `SearchRoot` + `CommandPalette` (⌘K).
- `ThemeProvider` + `ThemeToggle`.
- `SolvedToggle`, `TrackView`, `UserMenu`, `SignInButton`.

### 1.8 Layout

- Container width capped at `max-w-4xl` for content pages; `max-w-6xl` for the home and index pages.
- Persistent top nav with backdrop blur on scroll.
- Sections separated by `section` class with vertical rhythm.
- 12-column CSS grid on large screens for the track tiles.

### 1.9 Color Palette

CSS custom variables in `app/globals.css`, with a `:root[data-theme="dark"]` override block that flips the same names. The named tailwind tokens map to these (`tailwind.config.ts`):

| Token | Light | Dark |
| --- | --- | --- |
| `bg-base` | `#fbf9f4` | `#0b0a13` |
| `bg-elev` | `#ffffff` | `#15131f` |
| `bg-elev2` | `#f5f2e9` | `#1c1a2a` |
| `text-ink` | `#1a1810` | `#f5f3ec` |
| `text-muted` | `#6b6457` | `#9892a8` |
| `text-accent` | `#d97706` (amber) | `#fbbf24` |
| `text-warn` | `#b91c1c` | `#fca5a5` |
| `border-line` | `#e8e4d8` | `#2a2738` |

### 1.10 Typography

- Sans: system stack (`font-sans`) — `ui-sans-serif, system-ui, ...` — used for UI.
- Mono: `font-mono` — `ui-monospace, SFMono-Regular, ...` — used for code, ops, indices.
- Display: same sans, `font-semibold` + `tracking-tight` for headings.
- Section eyebrows: `text-xs uppercase tracking-widest text-accent`.

### 1.11 Icons

`lucide-react` throughout. Heavy users: `ArrowRight`, `Sparkles`, `Trophy`, `BookOpen`, `Target`, `History`, `Search`, `X`, `Sun`, `Moon`.

### 1.12 Cards

`<Card>` supports `hover` (translates on y-axis on hover) and `glow` (accent-color sheen). `bg-elev` background, `border-line` border, `rounded-lg`.

### 1.13 Buttons

`<Button>` variants: `primary` (filled accent), `outline` (bordered), `ghost` (transparent). Sizes: `sm`, `md`, `lg`. Accepts icon children (rendered to the right).

### 1.14 Forms

- Sign-in: Google OAuth button (no email/password fields).
- Search palette: single text input, debounced via React state.
- No multi-field forms exist beyond auth.

### 1.15 Modals

- `CommandPalette` (search) — fixed-overlay modal with backdrop blur, dismiss on Esc / outside click.
- No other modals.

### 1.16 Sidebar

`DsaSidebar` and `LldSidebar` render on the corresponding track pages. They are in-document navigation, not a layout sidebar.

### 1.17 Header

Sticky top bar with backdrop blur. Contains logo, primary nav, conditional auth-area links, search, theme toggle, sign-in / user menu.

### 1.18 Footer

`components/layout/Footer.tsx` — minimal: copyright, links to `/privacy`, `/terms`, `/pricing`, `/refund`.

### 1.19 Responsive Behaviour

- `sm` (640), `md` (768), `lg` (1024), `xl` (1280) breakpoints.
- Track grid: `1 → 2 → 4` columns across `sm → md → lg`.
- Pattern grid: `1 → 2 → 3` columns.
- Nav collapses inline links via `hidden md:flex`.
- Search button is `hidden sm:inline-flex`.

### 1.20 Mobile Layout

- Single-column track tiles.
- Nav hides inline links; auth controls collapse to icons.
- Calendar grid uses 6 / 7 / 10 columns depending on `days` (7/30/45).

### 1.21 Tablet Layout

Two-column track grid; full nav visible; sidebar nav in topic pages collapses to a top-of-page list.

### 1.22 Desktop Layout

Four-column track grid; triple-column pattern grid; sticky navbar with all controls visible; 1280px max content width.

### 1.23 Animations

- Tailwind `transition` for hover states.
- GSAP (`@gsap/react`) for pointer overlay animation inside the viz engine.
- `animate-pulse` on the logo dot.
- `transform translate-x-1` on hover for arrow indicators.

### 1.24 Loading States

Minimal — the app is mostly SSG'd. The `HeroDemo` and `StepPlayer` use skeletal CSS for pre-mount.

### 1.25 Empty States

- Dashboard "Continue learning" — when no history, shows a "Browse patterns" CTA.
- Dashboard "Recent activity" — "No activity yet. Open a topic to begin."
- Bookmarks — empty-state list when no bookmarks.
- Search palette — "No matches" / "Start typing to search."

### 1.26 Error States

- `app/error.tsx` — top-level error boundary.
- `app/not-found.tsx` — global 404 with link back to home.
- API routes return `{ error: "..." }` with appropriate status codes (401 / 403 / 400).

---

## Phase 2 — Feature Extraction

### F1. Animated step-player for DSA topics

- **Purpose:** Walk through a problem frame by frame.
- **User flow:** Open a topic → press Play → watch steps → manual scrub if needed.
- **UI:** `StepPlayer` orchestrates `ArrayViz`, `PointerOverlay`, `Narration`, `Controls`, `OperationCounter`.
- **Backend:** Static viz data lives in `content/patterns/*.ts` per topic. No server roundtrip.
- **DB:** None.
- **API:** None.
- **Validation:** N/A (read-only).
- **Edge cases:** Empty `steps` array → player hidden; topic with one approach → no ApproachSwitcher.

### F2. Multiple approaches per topic

- **Purpose:** Show brute and optimal side-by-side.
- **UI:** `ApproachSwitcher` segment picker, swaps which `steps` array is rendered.
- **Backend:** Each topic's `approaches` array carries its own `steps` and `complexity`.

### F3. Mark solved (authenticated)

- **Purpose:** Persist a user's solved state.
- **API:** `POST /api/progress { topicId, track, solved: boolean }` — idempotent upsert, **no longer** auto-bumps `attempts`.
- **Origin check:** `requireSameOrigin(req)` (rejects 403 on cross-origin).
- **DB:** `Progress { userId, topicId, track, solved, attempts, lastSeen }` with `@@unique([userId, topicId])`.
- **Validation:** Zod-style body check (topicId, track, solved all required).
- **Edge cases:** No session → 401; wrong origin → 403; missing topicId → 400.

### F4. Increment attempt (separate intent)

- **API:** `POST /api/progress/attempt { topicId, track }`.
- **Purpose:** Bump `attempts` without changing `solved`. Wired but not yet called from any UI — kept available for a future "I tried this" button.

### F5. Bookmark with list / add / remove

- **API:** `GET /api/bookmark` (list for current user), `POST /api/bookmark` (add), `DELETE /api/bookmark` (remove).
- **UI:** Bookmark button on topic pages (via `SolvedToggle` extension or sibling component).
- **DB:** `Bookmark { userId, topicId, track, createdAt }` with `@@unique([userId, topicId])`.
- **Edge cases:** Already-exists on POST → idempotent 200.

### F6. Dashboard

- **Purpose:** Single-screen view of the user's state.
- **Components:** Stats grid, continue-learning card, recent activity, per-track progress bars.
- **Data:** `prisma.progress + prisma.user` read directly server-side; `requireUser()` redirects when signed out.

### F7. Bookmarks page

- **Purpose:** List saved topics grouped by track.
- **Resolution:** Each `topicId` is matched against the static content arrays to recover a human title and an href; fallback shows raw id if unresolved.

### F8. Progress page

- **Purpose:** Long-window view of solved activity.
- **Components:** `CalendarGrid` (30 days), `ProgressReadout`, `OnTrackIndicator`, plus per-track `ProgressBar`.
- **Logic:** Bucket solved timestamps by UTC day; streak-ending-today = trailing run of `true` cells.

### F9. Chapter deep pages (OS + Networks)

- **Purpose:** Resolve the 404s on `/operating-systems/[slug]` and `/computer-networks/[slug]`.
- **Route:** `/chapter/[track]/[slug]` with `generateStaticParams` over all 69 chapters.
- **Renderer:** Generic — eyebrow, title, summary, body, key terms, see-also.

### F10. Theme toggle (light / dark)

- **Persistence:** `localStorage["dsa-visual-theme"]`, default `system`.
- **Pre-paint:** Inline script in `app/layout.tsx` reads localStorage and sets `data-theme` on `<html>` before first paint to avoid FOUC.
- **CSS:** `:root[data-theme="dark"]` block overrides the same variables.
- **Hydration:** `suppressHydrationWarning` on `<html>`.

### F11. Search palette (⌘K)

- **Trigger:** `Cmd/Ctrl + K` global listener in `SearchRoot`.
- **Index:** Built once at module load from `patterns + lldModules + osChapters + networkingChapters` (no indexing work at keystroke).
- **Matcher:** `fuzzyMatch` — prefix > substring > weighted-subsequence.
- **Bindings:** `↑/↓` navigate, `↵` opens, `Esc` closes.
- **Nav:** `router.push(href)` (no full reload).

### F12. Continue learning

- **Capture:** `components/content/TrackView.tsx` posts `/api/track-view` on topic page mount.
- **Storage:** `User.lastViewedAt / Track / Pattern / Topic`.
- **Render:** `ContinueCard` on `/` (only renders for signed-in users with history); also surfaced on `/dashboard`.

### F13. Auto-computed stats

- **Source:** `lib/content/stats.ts` derives DSA pattern/topic counts, LLD module/lesson counts, OS chapter count, Networks chapter count from the static arrays.
- **Wired into:** `app/page.tsx`, `app/operating-systems/page.tsx`, `app/computer-networks/page.tsx`, `app/dashboard/page.tsx`, `app/progress/page.tsx`.

### F14. Interview prep widget

- **UI:** Mode (Timed / Complete), Days (7 / 30 / 45), Per-day (1 / 2 / 4) — same IA as the reference, original copy.
- **Live readouts:** `ProgressReadout`, `OnTrackIndicator`, `CalendarGrid`.
- **Data:** Reads `/api/progress` for the user's solved topic IDs.

### F15. Sign-in / auth

- **Provider:** Google OAuth via NextAuth v5.
- **Strategy:** JWT session (not DB).
- **Authorization:** `requireUser()` on dashboard / bookmarks / progress; `getOptionalUser()` on public pages.
- **Type safety:** `types/next-auth.d.ts` augments `Session.user` with `id: string`.

### F16. CSRF / Origin protection

- **Helper:** `lib/api/origin.ts` `requireSameOrigin(req)` — checks `Origin` or `Referer` header against `new URL(req.url).host`.
- **Applied to:** `POST /api/progress`, `POST /api/progress/attempt`, `POST /api/bookmark`, `DELETE /api/bookmark`.

### F17. SEO / Metadata

- `metadata` exports per page set `title`.
- Pages are SSG'd where possible (chapters, LLD modules, DSA patterns and topics).
- `robots` and `sitemap.ts` are not yet authored — covered in the gap list.

### F18. Static build & deployment

- `npm run build` succeeds with 236 static pages.
- Output targets Node.js (default Next.js runtime); no Vercel-specific features used.

### F19. Accessibility & motion

- `aria-label` on icon buttons.
- `aria-hidden` on decorative arrows.
- Keyboard navigation on the search palette.
- `prefers-reduced-motion` is not currently honored by the GSAP overlay — gap.

---

## Phase 3 — Page-by-page Breakdown

### `/` (Home)

- **Components:** `Hero`, `TrackCard × 4`, `PatternCard × 21`, `InterviewPrepWidget`, `ContinueCard`, `Pitch` card.
- **API:** None on the server; `/api/recent` is fetched by `ContinueCard` client-side.
- **States:** Anonymous (no ContinueCard rendered), signed-in with history (card appears), signed-in without history (card prompts "Browse patterns").
- **Actions:** Click track → navigate; click pattern → navigate; click `?signin=1` → bounce through Google.
- **Responsive:** Hero is single-column ≤ md; track grid is 1 / 2 / 4 cols.

### `/patterns/[slug]` (Pattern index)

- **Components:** `DsaSidebar`, pattern header, `TopicCard` list.
- **API:** None.
- **SSG:** All 21 patterns at build time.

### `/patterns/[slug]/[topic]` (Topic viz)

- **Components:** `ProblemHeader`, `ApproachSwitcher`, `StepPlayer`, `Narration`, `CodePanel`, `ComplexityBadge`, `DetailsDisclosure`, `SolvedToggle`, `TrackView`.
- **API:** `POST /api/progress` (solve), `POST /api/track-view` (record view).
- **States:** Anonymous (no Save / Mark controls), signed-in (controls visible).
- **Business logic:** `toClientApproach` strips non-serializable functions from the topic data before handing to the client.
- **SSG:** All 117 topics pre-rendered.

### `/lld/[slug]` (LLD module)

- **Components:** `LldSidebar`, module header, lesson list.
- **API:** None.
- **SSG:** All 8 modules.

### `/operating-systems` (OS index)

- **Components:** Introduction row, per-part chapter list with global numbering.
- **API:** None.

### `/computer-networks` (Networks index)

- **Components:** Introduction row, per-part chapter list.
- **API:** None.

### `/chapter/[track]/[slug]` (Generic chapter)

- **Components:** Eyebrow, title, summary, body, key terms, related links.
- **API:** None.
- **SSG:** 69 chapter paths.
- **Edge cases:** Slug not in `getAllChapterSlugs` → 404 (`dynamicParams = false`).

### `/prepare`

- **Components:** `InterviewPrepWidget`, "How it works" card.
- **API:** `GET /api/progress` (when signed in).

### `/dashboard`

- **Components:** `StatTile × 4`, continue card, recent activity card, per-track progress card.
- **API:** Reads `prisma` directly server-side.
- **Auth:** `requireUser()`.

### `/bookmarks`

- **Components:** Track-grouped list with title resolution.
- **API:** Reads `prisma.bookmark` directly server-side.
- **Auth:** `requireUser()`.

### `/progress`

- **Components:** `CalendarGrid`, `ProgressReadout`, `OnTrackIndicator`, `ProgressBar × 4`.
- **API:** Reads `prisma.progress` directly server-side.
- **Auth:** `requireUser()`.

### `/pricing`, `/privacy`, `/terms`, `/refund`

- **Static pages.** No API, no auth.

---

## Phase 4 — Database Design

### ER Diagram (text)

```
                ┌────────┐
                │  User  │
                └───┬────┘
                    │ 1
   ┌────────────────┼────────────────┬───────────────┐
   │ n              │ n              │ n             │ n
┌──┴──────┐   ┌─────┴──────┐  ┌──────┴──────┐  ┌─────┴──────┐
│Progress │   │ Bookmark   │  │  Setting    │  │  Session   │
└─────────┘   └────────────┘  └─────────────┘  └────────────┘
                                     │
                                   (key index)


Account ──→ User (1..n)   (NextAuth OAuth credentials)
```

### Schema (`prisma/schema.prisma`)

`User`
- `id` (cuid, PK)
- `email` (unique)
- `name`, `image`
- `lastViewedAt?`, `lastViewedTrack?`, `lastViewedPattern?`, `lastViewedTopic?`
- `createdAt`
- relations: `accounts`, `sessions`, `progress`, `bookmarks`, `settings`

`Account` — NextAuth OAuth account → provider / providerAccountId
`Session` — NextAuth session row (even though JWT strategy is used by NextAuth, the table is reserved for future DB sessions)
`VerificationToken` — NextAuth email token

`Progress`
- `id`, `userId`, `topicId`, `track`, `solved`, `attempts`, `lastSeen`
- `@@unique([userId, topicId])`, `@@index([userId])`

`Bookmark`
- `id`, `userId`, `topicId`, `track`, `createdAt`
- `@@unique([userId, topicId])`

`Setting`
- `id`, `userId`, `key`, `value`
- `@@unique([userId, key])`, `@@index([userId])`

Migration history:
- `20260730144424_init` — initial schema
- `20260802174301_add_user_view_history` — adds `lastViewed*` + `Setting`

### Indexes

| Index | Purpose |
| --- | --- |
| `User.email` unique | Lookup by email |
| `Progress @@unique([userId, topicId])` | Idempotent upsert |
| `Progress @@index([userId])` | Per-user progress queries |
| `Bookmark @@unique([userId, topicId])` | Idempotent add |
| `Setting @@unique([userId, key])` | Per-user key lookup |

### Constraints

- All FKs cascade on delete.
- `progress.attempts >= 0` is enforced in app code (Prisma's SQLite provider doesn't support check constraints).

### Provider choice

SQLite via `prisma/dev.db`. For production, the same schema works on PostgreSQL by changing the `provider` and `DATABASE_URL`. No code changes required.

---

## Phase 5 — API Design

All endpoints are Next.js Route Handlers under `app/api/`. Auth is via NextAuth session cookie.

### `GET /api/progress`

- Auth: required.
- Response: `{ progress: { topicId, track, solved, attempts, lastSeen }[] }`.
- Errors: 401.

### `POST /api/progress`

- Body: `{ topicId: string, track: "dsa"|"lld"|"os"|"networking", solved: boolean }`.
- Auth: required.
- Origin: required.
- Response: `{ ok: true, progress: ProgressRow }`.
- Errors: 400 (body), 401, 403 (origin), 500.

### `POST /api/progress/attempt`

- Body: `{ topicId, track }`.
- Auth: required.
- Origin: required.
- Behavior: Increments `attempts`, updates `lastSeen`. Does not touch `solved`.
- Errors: 400, 401, 403.

### `GET /api/bookmark`

- Auth: required.
- Response: `{ bookmarks: { topicId, track, createdAt }[] }`.

### `POST /api/bookmark`

- Body: `{ topicId, track }`.
- Auth: required.
- Origin: required.
- Idempotent.

### `DELETE /api/bookmark`

- Body: `{ topicId }`.
- Auth: required.
- Origin: required.

### `POST /api/track-view`

- Body: `{ track: "dsa"|"lld"|"os"|"networking", patternSlug: string, topicSlug: string }`.
- Auth: required.
- Origin: required.
- Behavior: Upserts `User.lastViewedAt / lastViewedTrack / lastViewedPattern / lastViewedTopic`.

### `GET /api/stats`

- Auth: required.
- Response: `{ totalSolved, solvedByTrack: { dsa, lld, os, networking }, totalAvailable: { dsa, lld, os, networking }, streakDays }`.

### `GET /api/recent`

- Auth: required.
- Response: `{ lastViewed: { track, pattern, topic, href, title } | null, recent: { topicId, track, lastSeen }[] }`.

### `GET /api/auth/[...nextauth]`

- NextAuth handler. Issues / validates session cookie.

---

## Phase 6 — Implementation

The work is already in the codebase. The relevant files are:

### Stack

- **Next.js 14.2.18** App Router, **TypeScript strict**, **Tailwind CSS 3.4**, **Prisma 5.22.0** + **SQLite**, **NextAuth v5** (beta) + Google OAuth, **Zod** for body validation, **GSAP** for pointer animation, **lucide-react** for icons.

### Folder structure

```
dsa/
├── app/
│   ├── api/                    # Route handlers
│   │   ├── auth/[...nextauth]/
│   │   ├── progress/route.ts
│   │   ├── progress/attempt/route.ts
│   │   ├── bookmark/route.ts
│   │   ├── track-view/route.ts
│   │   ├── stats/route.ts
│   │   └── recent/route.ts
│   ├── chapter/[track]/[slug]/
│   ├── patterns/[slug]/[topic]/
│   ├── lld/[slug]/
│   ├── operating-systems/
│   ├── computer-networks/
│   ├── dashboard/, bookmarks/, progress/, prepare/
│   ├── pricing/, privacy/, terms/, refund/
│   ├── layout.tsx, page.tsx, providers.tsx, error.tsx, not-found.tsx, globals.css
├── components/
│   ├── ui/         primitives
│   ├── layout/     Navbar, Footer, Container
│   ├── viz/        StepPlayer + ArrayViz + PointerOverlay + ...
│   ├── content/    PatternCard, SolvedToggle, TrackView, sidebar navs
│   ├── prep/       InterviewPrepWidget + subcomponents
│   ├── search/     CommandPalette, SearchRoot
│   ├── theme/      ThemeProvider, ThemeToggle
│   ├── auth/       SignInButton, UserMenu
│   ├── home/       ContinueCard
│   └── demo/       HeroDemo
├── content/
│   ├── patterns/   21 files, one per pattern
│   ├── lld/        index.ts — 8 modules
│   ├── os/         index.ts — 37 chapters in 7 parts
│   └── networking/ index.ts — 32 chapters in 3 parts
├── lib/
│   ├── auth.ts, auth-guards.ts
│   ├── api/origin.ts
│   ├── content/stats.ts, loader.ts, search.ts
│   ├── prisma.ts, utils.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/{20260730144424_init, 20260802174301_add_user_view_history}
│   └── dev.db
├── types/
│   └── next-auth.d.ts
├── auth.ts, auth.config.ts, middleware.ts
├── tailwind.config.ts, next.config.mjs, tsconfig.json
└── package.json
```

### Clean architecture

- **Components** are split into `ui` (dumb primitives), `layout` (header/footer), and feature (`prep`, `search`, `theme`, `home`, `content`, `viz`).
- **Server** logic lives in `app/api/*` and `app/<page>/page.tsx`.
- **Shared** logic lives in `lib/*` and `content/*`.
- **DB** is encapsulated behind `lib/prisma.ts` (singleton).
- **Auth** is encapsulated behind `lib/auth-guards.ts` (`requireUser`, `getOptionalUser`).

### Accessibility

- `aria-label` on icon buttons.
- `aria-hidden` on decorative arrows.
- `aria-modal` on the search palette.
- Keyboard navigation in the palette.
- `prefers-reduced-motion` is **not currently honored** by GSAP — gap.

### SEO

- `metadata` exports per page.
- SSG for static content.
- `robots.ts` / `sitemap.ts` are **not authored** — gap.

### Performance

- 87.2 KiB shared JS across all pages.
- Largest single page bundle: `/patterns/[slug]/[topic]` at 6.26 KiB + 140 KiB total — reasonable for a viz-heavy page.
- 236 static pages generated.
- GSAP lazily-needed per topic.

---

## Phase 7 — Reference Match

| Reference surface | Status | Evidence |
| --- | --- | --- |
| Home with hero, pitch, tracks | ✅ Match | `app/page.tsx` |
| Track landing for DSA | ✅ Match | `/patterns/[slug]` |
| Track landing for LLD | ✅ Match | `/lld/[slug]` |
| Track landing for OS | ✅ Match | `/operating-systems` |
| Track landing for Networks | ✅ Match | `/computer-networks` |
| Chapter deep pages (OS + Networks) | ✅ Match (fixes 404s) | `/chapter/[track]/[slug]` |
| Topic viz with stepped animation | ✅ Match | `StepPlayer` + `ArrayViz` |
| Approach toggle (brute / optimal) | ✅ Match | `ApproachSwitcher` |
| Mark solved | ✅ Match | `SolvedToggle` → `/api/progress` |
| Bookmarks | ✅ Match | `/bookmarks` + `/api/bookmark` |
| Personal dashboard | ✅ Match (added) | `/dashboard` |
| Progress page | ✅ Match | `/progress` |
| Interview prep widget (Mode/Days/Per-day) | ✅ Match | `/prepare` |
| Search palette (⌘K) | ✅ Match (added) | `CommandPalette` |
| Theme toggle | ✅ Match (added) | `ThemeToggle` |
| Last-viewed / Continue learning | ✅ Match (added) | `ContinueCard` + `TrackView` |
| Auto-computed stats | ✅ Match | `lib/content/stats.ts` |
| Unauthenticated UX | ✅ Match | `SolvedToggle` redirects to `/?signin=1&return=…` |
| Type-augmented `Session.user.id` | ✅ Match | `types/next-auth.d.ts` |
| CSRF / Origin check | ✅ Match | `lib/api/origin.ts` |
| Split progress intent | ✅ Match | `/api/progress` vs `/api/progress/attempt` |
| Pricing / Privacy / Terms / Refund pages | ✅ Match | four routes |
| Animated gestures inside the viz | ✅ Match | GSAP-driven `PointerOverlay` |
| Light / dark theme persistence | ✅ Match | `ThemeProvider` + inline pre-paint script |
| Reduced-motion respect | ⚠️ **Gap** | GSAP overlay doesn't honor `prefers-reduced-motion` |
| Sitemap / robots / OG images | ⚠️ **Gap** | not authored |
| Email / password auth | ❌ Not implemented | Google OAuth only |
| Email notifications / weekly digest | ❌ Not implemented | out of scope |
| Payment / checkout | ❌ Not implemented | `/pricing` is informational only |
| Comments / discussion | ❌ Not implemented | out of scope |
| Inline SVG diagrams in chapters | ⚠️ **Gap** | planned — content uses prose only today |

---

## Phase 8 — Quality Check

### ✅ Verified

- `npx tsc --noEmit` — clean.
- `npx next build` — 236 pages generated, no warnings, no errors.
- All 21 pattern pages render.
- All 117 topic pages render.
- All 8 LLD modules render.
- All 69 chapter pages render.
- `GET /` → 200.
- `GET /chapter/os/intro` → 200.
- `GET /chapter/networking/how-http-request-travels` → 200.
- `GET /dashboard`, `/bookmarks`, `/progress` (signed out) → 307 redirect to `/?signin=1&return=…`.
- `POST /api/progress` (no cookie) → 401.
- `POST /api/progress` (cross-origin) → 403.
- Content links from `/operating-systems` and `/computer-networks` route to `/chapter/...`.

### ⚠️ Gaps (honest report)

1. **No inline SVG diagrams** in chapter pages — chapter content is prose-only. The plan called for these; they were deferred.
2. **No `prefers-reduced-motion` honoring** in the GSAP overlay.
3. **No `robots.ts` / `sitemap.ts`** — for organic SEO indexing.
4. **No e2e tests** — no Playwright / Vitest suite. Build + typecheck + smoke-test are the only gates.
5. **No password / email auth** — Google only.
6. **`/api/progress/attempt` is unwired** — kept available for future UI.
7. **`framer-motion` is in `package.json` but unused**.
8. **No CI workflow files** — builds run locally.

### 📜 Feature Checklist

> "100% implementation" against a reference I can't copy means: every named feature on the public IA is shipped as a functional equivalent, with the noted gaps above. The IA is matched; the editorial is original.

- [x] Home with hero, pitch, track tiles
- [x] DSA track with 21 patterns × 117 topics × step-by-step viz
- [x] LLD track with 8 modules × 45 lessons
- [x] OS track with 37 chapters (SSG'd)
- [x] Networks track with 32 chapters (SSG'd)
- [x] DSA topic viz with approach switcher
- [x] Mark solved (idempotent, no auto-increment)
- [x] Bookmark (idempotent)
- [x] Dashboard
- [x] Bookmarks page
- [x] Progress page (30-day calendar + per-track)
- [x] Interview prep widget (Mode / Days / Per-day)
- [x] Search palette (⌘K)
- [x] Theme toggle (light / dark, persisted, no-FOUC)
- [x] Last-viewed / Continue learning
- [x] Auto-computed stats
- [x] Unauthenticated UX (intact return URL)
- [x] `Session.user.id` typed
- [x] CSRF / Origin check on mutating routes
- [x] Split progress intent (mark-solved vs attempt)
- [x] Static legal pages
- [x] Production build, typecheck, smoke-test pass
- [ ] Inline SVG diagrams in chapter pages (gap)
- [ ] `prefers-reduced-motion` honored (gap)
- [ ] `robots.ts` / `sitemap.ts` (gap)
- [ ] E2E test suite (gap)
- [ ] Email / password auth (gap)
- [ ] CI workflow (gap)

---

## Reading & running

```bash
npm install
npx prisma migrate dev              # apply schema
npm run dev                          # http://localhost:3000
```

Environment variables expected (see `.env.local`):

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<32 random bytes>"
GOOGLE_CLIENT_ID="<from Google Cloud Console>"
GOOGLE_CLIENT_SECRET="<from Google Cloud Console>"
```

For production:

```bash
DATABASE_URL="postgresql://…/dsa"   # switch provider in schema.prisma
```

Deploy: any Node host (Vercel works out-of-the-box, Render, Fly.io, Railway). Static pages stay static; the three authenticated routes are dynamic.
