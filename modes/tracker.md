# Mode: tracker — Learning Tracker Overview

Show the learner's enrollment pipeline status from `data/enrollments.md`.

## Run

`node tracker.mjs` — prints a status overview grouped by canonical state.

## Canonical states (from `templates/states.yml`)

| State | When |
|-------|------|
| `Evaluated` | Course evaluated with a report; pending enrollment decision |
| `Enrolled` | Enrollment submitted/confirmed |
| `In Progress` | Actively studying |
| `Completed` | Course/cert completed |
| `Dropped` | Started then abandoned/paused |
| `SKIP` | Doesn't fit — don't enroll |

## Output

Summarize: counts per state, the most recent evaluations, anything `In Progress`
(stalled-detection via `followup`), and `Completed` wins. Surface the next logical
action (e.g., "3 evaluated but not enrolled — pick one to start").

## Pipeline integrity

- Tracker additions: write a TSV to `batch/tracker-additions/` and run
  `node merge-tracker.mjs` (never edit `enrollments.md` to ADD rows).
- Updating an existing row's status/notes in `enrollments.md` is allowed.
- Health: `node verify-pipeline.mjs`. Normalize: `node normalize-statuses.mjs`.
  Dedup: `node dedup-tracker.mjs`.