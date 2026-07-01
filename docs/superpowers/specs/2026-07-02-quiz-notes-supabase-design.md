# Design: Quiz Hub, Central Notes, and Supabase backend

Date: 2026-07-02
Status: Approved (brainstorming)
Branch: `feature/quiz-notes-supabase` (off `redesign/ui-ux`)

## Summary

Three related additions to Data Crest, building on the redesigned UI and token
system:

1. **Quiz Hub** (`/quiz`): a standalone quiz that aggregates the existing
   per-section questions into a mixed, randomized, scored experience.
2. **Central Notes** (`/notes`): one place that lists every note the user has
   written, with its law, chapter, section, and a link back to the source.
3. **Supabase backend**: a `profiles` table for account details and a `notes`
   table so notes sync across devices when signed in, both protected by RLS.

These are net-new features (not the restyle-only redesign). Guest behavior is
preserved: everything keeps working with localStorage when signed out or when
Supabase is not configured.

## Goals

- A discoverable quiz segment that does not require inventing new legal content.
- A single aggregated view of all user notes with full context.
- Durable, per-user storage of profile and notes in Supabase, with sane
  security (row-level security), applied by the user via a provided migration.

## Non-goals (out of scope for this spec)

- Syncing learning progress/score to Supabase (stays in localStorage for now).
- Persistent quiz-attempt history in the database (`quiz_results` table is
  deferred; the Quiz Hub only updates the local learning score).
- Editing notes from the central page (editing stays in the section Notes tab,
  one editing surface). The central page supports view, open-in-context, delete.
- Any change to routing, auth flow, or existing feature behavior beyond the
  additions described here.

## Constraints and environment

- Non-interactive session cannot run the Supabase MCP OAuth, so the backend is
  delivered as SQL + code. The user applies the migration (Supabase SQL editor
  or `supabase db push`) and confirms `NEXT_PUBLIC_SUPABASE_URL` /
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel and `.env.local`.
- Stack: Next 16 (App Router, `src/`), React 19, Tailwind v4, `@supabase/supabase-js`.
- Existing: `src/lib/supabase.ts` exports a null-safe `supabase` client; auth
  (email + Google OAuth) already works via `/auth/login` and `/auth/callback`.
- Notes today: localStorage keys `note-${sectionId}` (DPDPA) and
  `gdpr-note-${sectionId}` (GDPR), written inline in the two lesson clients.
- Progress today: `src/lib/progress.ts` over localStorage key
  `datacrest_progress_v2`; `markQuizCorrect(sectionId, qIdx)` dedupes via a Set.

---

## Feature 1: Quiz Hub (`/quiz`)

### Question aggregation
A pure helper builds the question pool from the data files at module load:

```
type QuizSource = {
  law: "dpdpa" | "gdpr";
  lawLabel: string;          // "DPDPA 2023" | "GDPR 2016/679"
  chapterId: string;
  sectionId: string;
  sectionNumber: string;     // "3" or "g1-2" style, as in data
  sectionTitle: string;
  href: string;              // /dpdpa/<ch>/<sec> or /gdpr/<ch>/<sec>
  qIdx: number;              // index within section.quiz (for scoring)
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
};
```

`buildQuizPool()` flatMaps `dpdpaAct.chapters` and `gdpr.chapters`, and for each
section with a non-empty `quiz`, emits one `QuizSource` per question.

### Flow and UI (single client page)
- **Setup screen:** scope selector (DPDPA / GDPR / Mixed) and length (5 / 10 /
  15, capped at pool size). "Start quiz" button.
- **Question screen:** one question at a time. Reuses the section-quiz visual
  language (option buttons, correct/incorrect feedback, explanation panel,
  tokenized accents). A progress indicator (`Q n / total`) and a running score.
  Advancing is manual ("Next") after answering.
- **Results screen:** final score (`k / total`), a compact per-question review
  list (each showing the question, the user's answer vs correct, and an
  "Open section" link to `href`), and a "Restart" / "New quiz" action.
- Randomization: Fisher-Yates shuffle of the selected pool on start (option
  order is left intact so `answer` indices stay valid). A fresh shuffle per run.

### Scoring integration
When a question is answered correctly, call
`markQuizCorrect(sectionId, qIdx)` (same call the section quiz uses). Because
progress dedupes per `(sectionId, qIdx)`, hub answers and section answers share
one source of truth and never double-count. The results screen shows the
points delta consistent with the section quiz ("+N points").

### Discoverability
- Navbar: a `GraduationCap` icon button linking to `/quiz`, active-state aware.
  The right cluster is allowed to wrap / condense on very small screens so it
  never overflows 360px (see Edge cases).
- Home: a "Test your knowledge" secondary action in the hero, linking to `/quiz`.

### Files
- Add `src/app/quiz/page.tsx` (client component; setup/question/results states).
- Add `src/lib/quiz-pool.ts` (`buildQuizPool`, `shuffle`, scope filter).
- Edit `src/components/layout/navbar.tsx` (Quiz icon; small-screen wrapping).
- Edit `src/app/page.tsx` (home entry point).

---

## Feature 2: Central Notes (`/notes`)

### Notes library (`src/lib/notes.ts`)
Centralizes all note logic (currently inline and duplicated). Null-safe.

```
type Note = {
  law: "dpdpa" | "gdpr";
  sectionId: string;
  content: string;
  updatedAt: number;         // epoch ms; local notes use lastModified best-effort
  // resolved context (filled by the aggregator, not stored):
  chapterId?: string; sectionNumber?: string; sectionTitle?: string; href?: string;
};

localKey(law, sectionId)          // "note-<id>" | "gdpr-note-<id>"
getLocalNotes(): Note[]           // scans localStorage for note-* and gdpr-note-*
saveNote(law, sectionId, content) // writes localStorage; if signed in, upsert Supabase
deleteNote(law, sectionId)        // removes locally; if signed in, delete from Supabase
getAllNotes(): Promise<Note[]>    // merges local + (if signed in) cloud; cloud wins if newer
resolveContext(note): Note        // matches sectionId in dpdpaAct/gdpr -> chapter/section/title/href
```

Notes are keyed by `(law, sectionId)`. Merge rule: union by key; when both exist,
keep the one with the greater `updatedAt`. Empty content means "no note".

### Section pages
- `SectionPageClient` and `GdprSectionPageClient` switch their inline
  save/load to `notes.saveNote` / a `notes.getNote` read. Saving while signed in
  upserts to Supabase; signed out stays local. Behavior for guests is identical
  to today.
- Add `?tab=notes` support: the lesson reads an initial tab from `searchParams`
  (falls back to `content`). This makes "Open in context" land on the note.

### Notes page (`src/app/notes/page.tsx`, client)
- On mount, `getAllNotes()` then `resolveContext` for each.
- Renders a list of cards: law badge, `Chapter X · §Y — Title`, note text
  (clamped with expand), and actions: **Open in context**
  (`<href>?tab=notes`) and **Delete** (with confirm).
- Grouped by law (DPDPA first, then GDPR), sorted by chapter/section.
- Empty state: friendly prompt linking to `/dpdpa`.
- Signed-out users still see their local notes; a subtle hint offers sign-in for
  cross-device sync.
- Discoverability: reached from the Profile page (a "My notes" link) and directly
  at `/notes`. No new top-level navbar icon, to avoid crowding.

### localStorage format compatibility
Existing notes are stored as plain strings under `note-*` / `gdpr-note-*`.
`saveNote` writes JSON `{ content, updatedAt }` going forward. `getLocalNotes`
parses both: a value that fails JSON parse (or is not an object with `content`)
is treated as legacy content with `updatedAt = 0`, so any cloud copy wins on
merge. The section clients read/write only through `lib/notes.ts`, so no page
depends on the raw string format.

### Files
- Add `src/lib/notes.ts`, `src/app/notes/page.tsx`.
- Edit the two lesson clients (note save/load via lib; initial tab from URL).
- Edit `src/app/profile/page.tsx` (link to `/notes`).

---

## Feature 3: Supabase backend

### Migration (`supabase/migrations/0001_profiles_notes.sql`)

```sql
-- profiles: one row per auth user
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email,
          new.raw_user_meta_data->>'full_name',
          new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- notes: one row per (user, law, section)
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  law text not null check (law in ('dpdpa','gdpr')),
  section_id text not null,
  content text not null default '',
  updated_at timestamptz not null default now(),
  unique (user_id, law, section_id)
);

-- RLS
alter table public.profiles enable row level security;
alter table public.notes enable row level security;

create policy "profiles are self-readable"  on public.profiles for select using (auth.uid() = id);
create policy "profiles are self-updatable" on public.profiles for update using (auth.uid() = id);

create policy "notes are self-readable"  on public.notes for select using (auth.uid() = user_id);
create policy "notes are self-insertable" on public.notes for insert with check (auth.uid() = user_id);
create policy "notes are self-updatable" on public.notes for update using (auth.uid() = user_id);
create policy "notes are self-deletable" on public.notes for delete using (auth.uid() = user_id);
```

### Client usage
- `lib/notes.ts` uses the existing null-safe `supabase` client. Upsert on
  `(user_id, law, section_id)`; select all rows for `auth.uid()`; delete by key.
- Profile page reads the `profiles` row (falls back to session metadata, as
  today, when the row or Supabase is absent).
- All Supabase calls are guarded by `if (!supabase) return localFallback`.

### Apply steps (for the user)
1. Open Supabase project → SQL Editor → paste `0001_profiles_notes.sql` → Run
   (or `supabase db push` if using the CLI with the repo linked).
2. Confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
   in Vercel (production) and `.env.local` (local).
3. Redeploy / merge the PR.

---

## Edge cases

- **Supabase not configured / guest:** all reads/writes fall back to
  localStorage; no errors; pages render local data.
- **Navbar overflow at 360px:** the right cluster wraps or reduces gaps; icons
  keep 44px targets. Verified at 360/768/1024.
- **Notes for unknown `sectionId`:** if a stored note's section no longer
  resolves (data changed), show the note with a generic label and a link to the
  law index rather than dropping it.
- **Empty pool for a chosen quiz scope:** disable start / show "no questions
  yet" for that scope.
- **Merge conflicts (local vs cloud note):** newer `updatedAt` wins; after a
  successful cloud fetch, local is reconciled to match.
- **Reduced motion / both themes:** new pages use tokens and respect the global
  reduced-motion rule; AA contrast via existing `--*-text` variants.

## Testing

- `buildQuizPool` returns one entry per question; scope filter and length cap
  behave; shuffle preserves option/answer alignment.
- `notes` merge: local-only, cloud-only, and both (newer wins) cases.
- Quiz Hub correct answer marks `markQuizCorrect` and does not double-count.
- Guest path: no Supabase calls; localStorage round-trips.
- `npm run build` green; no new lint errors; both themes; 360/768/1024/1440.

## Sequencing (for the plan)

1. `lib/quiz-pool.ts` + `/quiz` page + navbar/home entry (self-contained, local).
2. `lib/notes.ts` + `/notes` page + `?tab=notes` + lesson-client refactor
   (localStorage path first; guest-complete).
3. Supabase migration + wire cloud sync into `lib/notes.ts` + profile read.
4. Build, QA, docs for apply steps, PR.
