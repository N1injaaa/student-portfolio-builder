# Student Portfolio Builder

A resume + portfolio builder for students applying to universities and jobs.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · Zustand ·
React Hook Form + Zod · jsPDF/html2canvas · Supabase (Auth + Postgres).

People sign in with Google. Their profile is stored server-side in Supabase,
so it follows them across devices, and published portfolios are visible to
anyone with the link — not just in the browser that created them.

## Getting started

Requires **Node.js 20.9 or newer** (`node -v` to check).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Local development reads Supabase credentials from `.env.local` (already
filled in with this project's values — see "Environment variables" below).

> **Note:** this project was generated in a sandboxed environment with no
> network access, so `npm install` / `next build` could not be run or
> verified here. The code has been reviewed by hand — import paths, exports,
> and brace/paren balance were all checked — but please run a local build
> and report anything your toolchain flags.

## Environment variables

Two values, both from **Supabase → Project Settings → Data API**:

| Variable | Where it's used |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |

Both are safe to expose in the browser — access control is enforced by
Postgres Row Level Security (RLS) on the database side, not by hiding these
values. `.env.local` is git-ignored; `.env.local.example` is the template.

**For Vercel:** add the same two variables under Project Settings →
Environment Variables before deploying, or the site will build but auth/data
won't work in production.

## Database setup

Run `supabase/schema.sql` once in the Supabase SQL Editor (Project → SQL
Editor → New query → paste → Run). It creates:

- **`profiles`** — one row per signed-in user, holding their portfolio data
  as JSON (`data` column) plus a few denormalized columns (`username`,
  `is_published`, `email`, `full_name`) used for lookups and the admin panel.
  A row is created automatically the moment someone signs in for the first
  time (via a trigger on `auth.users`).
- **`events`** — a log of `portfolio_published` / `resume_downloaded`
  actions, used for the admin panel's counters.
- **`admins`** — email addresses allowed into `/admin`. The schema seeds the
  first admin from the email you ran it with; admins can add or remove other
  admins from inside `/admin` itself.

All three tables have Row Level Security enabled: people can only read/write
their own profile, anyone can view a portfolio once it's published, and only
rows in `admins` can read the aggregate stats or the `events` log.

## Authentication setup (Google via Supabase)

1. **Google Cloud Console** → create a project → configure the OAuth
   consent screen → create an OAuth Client ID (Web application) → add
   `http://localhost:3000` (and your production domain later) as an
   authorized JavaScript origin.
2. **Supabase** → Authentication → Providers → Google → paste the Client ID
   and Client Secret from step 1 → copy the callback URL Supabase shows you.
3. Back in Google Cloud Console, add that callback URL under **Authorized
   redirect URIs** on the same OAuth client.

Once deployed to Vercel, repeat step 1's origin/redirect-URI additions for
your production domain (e.g. `https://your-app.vercel.app`), since Google
only allows sign-in from origins you've explicitly listed.

## Admin panel

Visit `/admin` while signed in with an email listed in the `admins` table.
It shows:

- Total sign-ups, portfolios published, and resume downloads
- The most recently registered users (name, email, portfolio status)
- A list of current admins, with a form to add or remove others by email

Non-admins who visit `/admin` see an "Access denied" screen — the page
itself checks admin status server-side via a Postgres function
(`is_admin()`), not just by hiding a link in the UI.

## What's included

- **Landing page** (`/`) — hero, features, template previews, FAQ.
- **Dashboard** (`/dashboard`) — profile completion, stats, resume/portfolio
  status. Includes a "Load demo profile" button (Alex Johnson sample data)
  for trying out the app.
- **Profile editor** (`/editor`) — Overview, Education, Projects,
  Achievements, Skills, Languages, Certificates, Activities. Every section
  supports add / edit / delete / reorder, autosaved to your Supabase profile.
- **Resume builder** (`/resume`) — four templates (Minimal, Modern, Academic,
  Professional), live no-reload preview, font/size/spacing/accent/section
  toggles, and a PDF export button.
- **Portfolio builder** (`/portfolio/settings`) — theme, layout, photo style,
  accent color, section visibility, username, publish toggle, live preview.
- **Public portfolio** (`/portfolio/[username]`) — a real server-rendered
  page any visitor can open once published, with a "Download Resume" button.
- **Admin panel** (`/admin`) — see above.

All protected pages are wrapped in `<AuthGate>` (`components/auth/`), which
shows a "Continue with Google" screen to signed-out visitors and otherwise
loads/saves the person's profile against Supabase automatically.

## Architecture

```
app/                     Routes (App Router)
  auth/callback/          OAuth redirect handler
  auth/sign-out/           Sign-out route handler
  admin/                   Admin panel (server component)
  portfolio/[username]/    Public portfolio (server component, fetches by username)
components/
  ui/                      Reusable primitives (Button, Input, Card, Toaster, …)
  layout/                  Navbar, theme provider/toggle
  auth/                    Sign-in button, AuthGate, profile load/save logic
  admin/                   Admin management UI
  forms/                   Profile editor forms + the generic list editor
  resume/                  Resume templates + shared building blocks
  portfolio/               Portfolio hero/sections + assembled PortfolioView
lib/
  supabase/                Browser/server Supabase clients + middleware helper
  store.ts                 Zustand store (in-memory profile state, no persistence)
  profile-merge.ts         Fills in defaults for any fields missing from the DB
  track-event.ts           Fire-and-forget analytics event helper
  demo-data.ts             Seed data for "Load demo profile"
  validation.ts            Zod schemas for every form
  pdf-export.ts            html2canvas + jsPDF export helper
  portfolio-theme.ts       Color tokens per portfolio theme
  utils.ts                 cn(), id generation, profile-completion calculator
  site-config.ts           Site author name / copyright line — edit this to add your name
types/profile.ts           Central data model — the single source of truth
supabase/schema.sql        Full database schema, RLS policies, triggers
middleware.ts               Refreshes the Supabase session on every request
```

The data model in `types/profile.ts` mirrors the `data` JSON column in
`profiles`, so a fetched row plus `mergeWithDefaults()` always produces a
complete, safe-to-render `Profile` object even if new fields get added later.

## Design

The visual identity is an "academic ledger / transcript" theme — ink-navy and
paper-white surfaces, a warm gold accent, Fraunces (display serif) paired with
IBM Plex Sans (body) and IBM Plex Mono (stats/figures). Dotted "leader" rules
(seen in the dashboard's completion ledger) echo a report card / table of
contents, tying the visual language back to the student/admissions subject
matter.

## Your name / copyright

Edit `lib/site-config.ts` — one file, one constant (`SITE_AUTHOR`) — to put
your name in the landing page footer's "Created by …" / copyright line.

## Known limitations (MVP scope)

- Profile photos and project images are set by URL, not file upload.
- Reordering uses up/down buttons rather than drag-and-drop.
- Analytics events are fire-and-forget (best-effort) — a failed insert never
  blocks the PDF download or publish action it's attached to.
- ESLint isn't included. `next lint` was removed in Next.js 16, and
  `eslint-config-next@16` requires ESLint 9's flat config; add it yourself
  later with `npx eslint@latest --init` if you want linting.
