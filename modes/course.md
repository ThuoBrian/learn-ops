# Mode: course — Full A-G Course/Cert/Program Evaluation

When the learner pastes a free course, cert, or program (text or URL), deliver the
7 blocks (A-F evaluation + G legitimacy) and a verdict (DO / DON'T DO / DO WITH TIMEBOX).

## Availability gate (URL inputs)

When the learner pastes a **URL**, confirm the course is still available/free before
evaluating. Use `node check-liveness.mjs <url>` (or WebFetch as fallback in headless
mode). If the page is gone or the free track is no longer offered, stop before Block A
and tell the learner. For pasted text, note that availability can't be verified and proceed.

## Bounded Research Budget

Company/provider and recruiter-signal research is a single-pass lookup:
- hard cap: 5 total WebSearch queries (Blocks D + G combined)
- prefer targeted queries that answer more than one question; stop early
- do not invoke deep-research / deep skill; do not spawn subagents

## Step 0 — Archetype Detection

Read `config/learner-profile.yml` → `learner.archetype_id`, then load that archetype
from `config/archetypes.yml`. This determines which `target_skills` / `recommended_free_certs`
/ `portfolio_deliverables` to score against.

## Block A — Course Summary

| Field | Value |
|------|-------|
| Title | |
| Provider | |
| URL | |
| Cost tier | free / free-via-aid / scholarship |
| Format | self-paced / cohort / bootcamp / cert |
| Duration | weeks × hrs/wk (or total hours) |
| Level | beginner / intermediate / advanced |
| Cert eligible | yes/no (and cert cost if any) |
| Language | |
| TL;DR | one sentence |

## Block B — Match with Goals

Map the syllabus/modules to `learner-profile.yml` `learning_goals.skill_gaps` and the
archetype's `target_skills`. Table: each JD/syllabus requirement → evidence in the
learner's `learner-profile.md` (background + artifacts so far). Include a **Gaps** section
with mitigation (which modules fill which skill gap; prerequisites the learner lacks).

## Block C — Effort & Schedule

1. Weeks × hrs/wk vs `learner.time_budget_hrs_week` — does it fit?
2. Prerequisites the learner doesn't yet meet.
3. A proposed weekly schedule within the time budget.

## Block D — Cost & Market

- True cost: is the free track genuinely free? Hidden fees (cert, proctoring, lab access)?
- If `free-via-aid`: what's the aid process, and is the cert worth it vs a fully-free alternative?
- Recruiter signal: does the cert appear in target-role JDs / is it industry-recognized?
  (Use the bounded WebSearch budget; cite sources.)
- Paid alternatives comparison (only if the free option is weak).

## Block E — Learning Plan

Module-by-module roadmap with weekly deliverables and a scoreboard. Skip modules the
learner already knows (cite `learner-profile.md`). Mark capstone milestones.

## Block F — Portfolio Deliverable

What demonstrable artifact does this course produce? Map it to the archetype's
`portfolio_deliverables`. A course that yields a shippable capstone scores higher than
one that yields only a completion badge. Note what to build/extend to make it
interview-ready.

## Block G — Legitimacy

Assess whether this is a real, current, worthwhile free training (see `modes/_shared.md`
→ Block G). Three tiers: High Confidence / Proceed with Caution / Suspicious.

Signals: provider accreditation, content freshness (last updated), syllabus specificity,
instructor credentials, completion-rate/reviews, cost-tier transparency.

**Suspicious → auto-downgrade global to <3.5 → DON'T DO.**

## Verdict

Score 1-5 (see `modes/_shared.md` scoring). Then:

- **DO** (≥4.0) → commit; use the Block E plan with weekly deliverables + scoreboard.
- **DO WITH TIMEBOX** (3.5–3.9, max X weeks) → condensed essentials-only plan.
- **DON'T DO** (<3.5) → recommend a better free alternative with justification.

## After the evaluation

1. Reserve a report number: `node reserve-report-num.mjs` → NNN.
2. Write the report: `reports/{NNN}-{provider-slug}-{YYYY-MM-DD}.md` (include a `## Machine Summary` YAML block + a `## Learning Plan Draft` section).
3. Release the sentinel: `node reserve-report-num.mjs --release {NNN}`.
4. Record in the tracker: write a TSV to `batch/tracker-additions/{NNN}-{provider-slug}.tsv`
   (9 cols, **status BEFORE score**):
   `{NNN}\t{date}\t{provider}\t{course}\t{status}\t{score}/5\t{plan_emoji}\t[{NNN}](reports/{NNN}-{slug}-{date}.md)\t{note}`
   where status ∈ `evaluated | enrolled | in_progress | completed | dropped | skip` (see `templates/states.yml`).
5. Run `node merge-tracker.mjs`.
6. If the course came from `data/learning-inbox.md`, move its line to `## Processed`.

**Source of truth:** claims about the learner's background/skills/certs come ONLY from
`learner-profile.md`, `config/learner-profile.yml`, `config/archetypes.yml`, `data/enrollments.md`,
and statements the learner makes in this conversation. Reformulate, never fabricate.