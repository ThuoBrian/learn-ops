# Learn-Ops -- Free AI/ML & Cybersecurity Training Finder

An AI-assisted, CLI-agnostic tool that discovers, evaluates, and tracks **FREE**
AI/ML and cybersecurity trainings (courses + free certs + bootcamps/scholarships) for
IT professionals. Forked from `career-ops` (the job-search pipeline) — the framework
(scanner, A-G evaluation, canonical-state tracker, safe auto-updater, multi-CLI skill)
is reused; only the domain logic is learning, not jobs.

## What it does

- `/learn-ops learn-scan` → discover free trainings across providers (Coursera, Kaggle, PortSwigger, …) into the inbox.
- `/learn-ops course {URL or text}` → full A-G evaluation against your goals + a DO / DON'T DO / DO WITH TIMEBOX verdict + a learning plan.
- `/learn-ops learn-pipeline` → evaluate pending inbox URLs.
- `/learn-ops tracker` → enrollment overview (evaluated / enrolled / in_progress / completed / dropped / skip).
- `/learn-ops update` → self-update.

## Data Contract (CRITICAL)

**User layer (NEVER auto-updated — personalization goes here):**
`learner-profile.md`, `config/learner-profile.yml`, `modes/_profile.md`, `modes/_custom.md`,
`learning-portals.yml`, `data/*`, `reports/*`, `output/*`.

**System layer (auto-updatable — DON'T put user data here):**
`modes/_shared.md`, `modes/{mode}.md`, `*.mjs` scripts, `templates/*`, `scaffolder/*`,
`CLAUDE.md`, `AGENTS.md`, `docs/*`, `VERSION`, `DATA_CONTRACT.md`.

**THE RULE:** when the learner asks to customize anything (archetype, goals, time/budget
policy, scoring weights), write to `modes/_profile.md` or `config/learner-profile.yml`.
NEVER edit `modes/_shared.md` or system files for user-specific content.

## Source-of-Truth Boundary

User-facing content (learning plans, course-fit reports, enrollment recommendations) is
generated **exclusively** from: `learner-profile.md`, `config/learner-profile.yml`,
`config/archetypes.yml`, `modes/_profile.md`, `data/enrollments.md`, and statements the
learner makes in the current conversation. **Reformulate, never fabricate.** Never claim
the learner completed a course/cert unless it's `completed` in `data/enrollments.md` or
stated in conversation.

## First Run — Onboarding

Run `node doctor.mjs --json` on first message. If `onboardingNeeded` is true, guide the
learner step by step:

1. **learner-profile.md** (required) — IT background, transition target, artifacts, constraints.
2. **config/learner-profile.yml** (required) — `cp config/learner-profile.example.yml`; set target_track, archetype_id, time budget, learning_goals.
3. **learning-portals.yml** (recommended) — `cp templates/learning-portals.example.yml`; the free-training sources to scan.
4. **modes/_profile.md** — `cp modes/_profile.template.md`; map background to chosen archetype.
5. Get to know the learner (superpowers, deal-breakers, best artifact) — store in `_profile.md`/`learner-profile.yml`.

Then confirm readiness and suggest `/learn-ops learn-scan`.

## Update Check

On first message of each session, run `node update-system.mjs check` (silent unless
`update-available`). Rollback: `node update-system.mjs rollback`.

## Pipeline Integrity

- Tracker additions: write a TSV to `batch/tracker-additions/` + `node merge-tracker.mjs`
  (NEVER edit `data/enrollments.md` to ADD rows; UPDATING existing rows is allowed).
- Report numbering: `node reserve-report-num.mjs` → NNN; `--release NNN` after writing.
- Reports: `reports/{###}-{provider-slug}-{YYYY-MM-DD}.md` with `**URL:**` + `**Legitimacy:**` headers.
- Health: `node verify-pipeline.mjs`. Normalize: `node normalize-statuses.mjs`. Dedup: `node dedup-tracker.mjs`.

## Canonical States (`templates/states.yml`)

`Evaluated | Enrolled | In Progress | Completed | Dropped | SKIP`

No markdown bold, no dates, no extra text in the status field.

## Ethical Use

Quality over quantity. Recommend AGAINST enrolling in low-fit courses (score <3.5 →
DON'T DO). Surface genuinely free options; flag hidden fees and certificate-mills (Block G
"Suspicious" → auto-downgrade). Never fabricate skills, metrics, or credentials.