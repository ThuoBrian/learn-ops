# Mode: learnplan — Learning Roadmap Generator

Generate a structured, phase-based learning roadmap tailored to the learner's archetype,
current enrollment state, and time budget. Optionally export as a PDF.

## Usage

```
/learn-ops learnplan
/learn-ops learnplan --archetype pentest
/learn-ops learnplan --timeline 6m
```

## Context Loading

Load before starting:
- `config/learner-profile.yml` → `learner.archetype_id`, `learner.time_budget_hrs_week`,
  `learner.target_track`, `learning_goals`
- `config/archetypes.yml` → `target_skills`, `recommended_free_certs`,
  `portfolio_deliverables`, `recruiter_signal_notes` for the archetype
- `data/enrollments.md` → current enrollment states (anchors for the roadmap)
- `modes/_profile.md` → learner narrative and background (for skill-gap reasoning)

If `config/learner-profile.yml` is missing, prompt the learner to run `/learn-ops onboard`
first.

## Step 1 — Baseline Assessment

From `data/enrollments.md`, extract:
- **Completed** — skills already evidenced
- **In Progress** — skills being built now
- **Enrolled** — skills queued
- **Evaluated (DO)** — approved but not yet started

Map each completed/in-progress course to the archetype's `target_skills`. Identify
skill gaps — target skills with no corresponding completed or in-progress course.

Show a brief baseline summary:

```
Archetype: {archetype.name}
Skills evidenced: {N} of {total target skills}
Skills in progress: {N}
Skill gaps: {list}
```

## Step 2 — Build the Roadmap

Organize the roadmap into three phases keyed to the learner's archetype. Each phase
should respect the `time_budget_hrs_week`:

### Phase 1 — Foundations (Weeks 1–{N})

Core prerequisites and entry-level skills from `target_skills`. Prioritize:
- Skills with zero coverage in the learner's background
- Skills listed first in the archetype's `target_skills` (they are ordered by importance)
- Any `recommended_free_certs` that serve as gating credentials

Anchor with any already-enrolled or in-progress courses.

### Phase 2 — Core Skills (Weeks {N}–{M})

Intermediate skills that build on Phase 1. Prioritize:
- Skills the learner mentioned as explicit `learning_goals.skill_gaps`
- Courses already evaluated with a DO verdict (use them as the primary candidates)
- Skills that map to the archetype's `portfolio_deliverables`

### Phase 3 — Specialization & Portfolio (Weeks {M}–{end})

Advanced skills and portfolio-building. Prioritize:
- The archetype's `portfolio_deliverables` — the learner should build at least one
- Any `recommended_free_certs` that serve as recruiter signals
- Stretch skills for the target role

For each phase, list:
- Skill to build
- Recommended course(s) (from evaluated or recommended certs — note if not yet evaluated)
- Estimated weeks at the learner's time budget
- Expected output (badge / project / writeup)

## Step 3 — Timeline Summary Table

| Phase | Skill | Course | Est. weeks | Output |
|-------|-------|--------|-----------|--------|
| 1 | … | … | … | … |
| 2 | … | … | … | … |
| 3 | … | … | … | … |
| **Total** | | | **{N} weeks** | |

If the learner passed `--timeline`, flag any phases that exceed it and suggest trimming
(drop lower-priority skills or reduce to essentials-only plans).

## Step 4 — Recruiter Signal Notes

Quote the archetype's `recruiter_signal_notes` verbatim. Add 1–2 sentences on how the
roadmap maps to those signals (which courses produce the most employer-visible artifacts).

## Step 5 — Save the Roadmap

Write to `reports/roadmap-{archetype_id}-{YYYY-MM-DD}.md` with the full roadmap content.

**PDF export (optional):** If the learner asks for a PDF and `fonts/` is present, note that
they can run `node generate-pdf.mjs reports/roadmap-{archetype_id}-{YYYY-MM-DD}.md` to
render it.

## Step 6 — Next Actions

End with three concrete next steps:

1. The single most important unevaluated course to look at next — suggest
   `/learn-ops course <url>` with the best candidate from `recommended_free_certs`.
2. Whether to run `/learn-ops learn-scan` to find more candidates for Phase 2 gaps.
3. Whether any in-progress courses need a cadence check — suggest `/learn-ops followup`
   if the learner has stalled enrollments.

## Source-of-Truth Boundary

Claims about the learner's skills and completions come ONLY from `data/enrollments.md`
and `learner-profile.md`. Never assume a skill is acquired unless the course is `completed`
in the tracker or the learner states it in this conversation. Reformulate, never fabricate.
