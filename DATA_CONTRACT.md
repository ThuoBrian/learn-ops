# Data Contract

Two layers. The auto-updater (`node update-system.mjs apply`) only touches the
**System layer**; user data in the **User layer** is never overwritten.

## User Layer (NEVER auto-updated — personalization here)

- `learner-profile.md` — IT background, transition target, artifacts, constraints
- `config/learner-profile.yml` — target track, archetype, time budget, learning goals
- `config/archetypes.yml` — (seeded, but user may extend) archetype definitions
- `modes/_profile.md` — user archetype mapping + narrative + overrides
- `modes/_custom.md` — user procedural rules
- `learning-portals.yml` — free-training sources to scan
- `data/enrollments.md` — learning tracker (source of truth)
- `data/learning-inbox.md` — pending course URLs
- `data/scan-history.tsv` — scanner dedup history
- `data/follow-ups.md` — learning cadence tracker
- `data/*` (parser-output), `reports/*`, `output/*`

## System Layer (auto-updatable — DON'T put user data here)

- `modes/_shared.md` — shared system context + scoring
- `modes/{mode}.md` — mode instructions (course, learn-scan, tracker, …)
- `*.mjs` scripts (scan.mjs, merge-tracker.mjs, doctor.mjs, update-system.mjs, …)
- `providers/*.mjs` — discovery adapters (excluding `_`-prefixed helpers)
- `templates/*` (states.yml, learning-portals.example.yml)
- `scaffolder/*` — installer + skill entrypoints
- `CLAUDE.md`, `AGENTS.md`, `CODEX.md`, `OPENCODE.md`, `GEMINI.md`, `KIMI.md`
- `docs/*`, `VERSION`, `DATA_CONTRACT.md`

## THE RULE

When the learner asks to customize anything (archetype, goals, time/budget policy,
scoring weights), write to `modes/_profile.md` or `config/learner-profile.yml`.
NEVER edit `modes/_shared.md` or other system files for user-specific content —
those get overwritten on update.