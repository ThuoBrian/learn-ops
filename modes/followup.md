# Mode: followup — Stalled Enrollment Cadence

Review active enrollments that have gone stale and help the learner decide whether to
resume, drop, or defer each one. Run this when the learner feels behind or wants a
progress check.

## Purpose

Flag courses with status `Enrolled` or `In Progress` that appear stalled (no progress
note updated recently), prompt the learner to choose an action for each, and write the
resulting status changes back to the tracker.

## Context Loading

This mode is standalone — it does NOT load `_shared.md`.

Load before starting:
- `data/enrollments.md` — source of tracker rows
- `config/learner-profile.yml` → `learner.time_budget_hrs_week`, archetype_id
- `data/follow-ups.md` — follow-up history (created on first use)
- `reports/` — evaluation reports for context on each course

## Step 1 — Run Cadence Script

Execute:

```bash
node followup-cadence.mjs
```

Parse the JSON output. It contains per-enrollment entries with: provider, course title,
status, report path, last-updated date, and urgency flag.

If no active enrollments exist, tell the learner:
> "No active enrollments to follow up on. Enroll in a course first with `/learn-ops course`."

## Step 2 — Display Stalled Enrollments

Filter for entries where status is `enrolled` or `in_progress`. Determine stale threshold:
a course is **stalled** if its tracker row has not been updated in more than **14 days**
(compare tracker date column to today).

Show a cadence dashboard sorted by urgency (stalled > active):

```
Enrollment Cadence Dashboard — {date}
{N} active enrollments, {N} stalled

| # | Provider | Course | Status | Days since update | Urgency |
```

Visual indicators:
- **STALLED** — no update in >14 days
- **ACTIVE** — updated within the last 14 days (show for completeness but no action needed)

## Step 3 — Prompt for Action on Each Stalled Course

For each **stalled** enrollment, read the linked report (`reports/{NNN}-*.md`) for context
on what the course covers and what the learner's original plan was.

Show:

```
## Stalled: {Provider} — {Course} (#{num})

**Status:** {enrolled | in_progress}
**Days since last update:** {N}
**Original score:** {score}/5
**Original plan:** {excerpt from Block E of the report, if available}

What do you want to do?
  R) Resume — I'll study this week. Update to In Progress with a note.
  D) Drop — Not worth continuing. Change status to Dropped.
  F) Defer — Pause for now. Keep status but add a defer note with a target resume date.
```

Wait for the learner's choice before moving to the next item. Do not batch or assume.

## Step 4 — Record Status Updates

For each learner decision, write a TSV line to `batch/tracker-additions/{NNN}-followup.tsv`
(9 cols, status BEFORE score):

```
{NNN}\t{date}\t{provider}\t{course}\t{new_status}\t{score}/5\t{plan_emoji}\t[{NNN}]({report_path})\t{note}
```

Where:
- `R) Resume` → status: `in_progress`, note: "Resumed {YYYY-MM-DD}"
- `D) Drop` → status: `dropped`, note: "Dropped {YYYY-MM-DD} — {learner's reason if given}"
- `F) Defer` → status: `enrolled`, note: "Deferred — target resume: {date learner gives}"

After writing all TSV lines, instruct the learner:

```bash
node merge-tracker.mjs
```

## Step 5 — Update Follow-Up History

Append to `data/follow-ups.md` (create if it doesn't exist):

```markdown
# Follow-up History

| # | Entry# | Date | Provider | Course | Action | Notes |
|---|--------|------|----------|--------|--------|-------|
```

Add one row per decision made in Step 3. Only record decisions the learner explicitly confirmed.

## Step 6 — Summary

After processing all stalled enrollments:

> **Cadence Check** ({date})
> - {N} enrollments reviewed
> - {N} resumed
> - {N} dropped
> - {N} deferred
> - {N} already active (no action needed)
>
> Run `node verify-pipeline.mjs` to confirm the tracker is clean.

## Cadence Rules Reference

| Status | Stale threshold | Default action to suggest |
|--------|----------------|--------------------------|
| Enrolled | 14 days | Resume or defer |
| In Progress | 14 days | Check in — still going? |

These defaults can be overridden in `modes/_custom.md`.
