# Learn-Ops -- Free AI/ML & Cybersecurity Training Finder

> This file is the Claude Code entrypoint. The canonical instructions live in
> `AGENTS.md` (shared across all supported CLI agents). Read `AGENTS.md` for the
> full data contract, source-of-truth boundary, onboarding, update check, and
> pipeline-integrity rules.

## Quick reference

- Onboarding / first message: `node doctor.mjs --json` → guide if `onboardingNeeded`.
- Update check (silent unless update-available): `node update-system.mjs check`.
- Discover free trainings: `node scan.mjs` (or `/learn-ops learn-scan`).
- Evaluate one course: `/learn-ops course {URL}` (follows `modes/course.md` A-G).
- Tracker integrity: `node merge-tracker.mjs` (TSV), `node verify-pipeline.mjs`.

## Modes

| If the learner... | Mode |
|-------------------|------|
| Pastes course URL/text | `course` (auto-eval) |
| Wants to discover free trainings | `learn-scan` |
| Processes pending inbox URLs | `learn-pipeline` |
| Compares multiple courses | `courses` |
| Wants a roadmap PDF | `learnplan` |
| Asks enrollment status | `tracker` |
| Onboards / builds profile | `onboard` |
| Deep research on a provider | `deep` |
| Stalled enrollments cadence | `followup` |
| Updates the system | `update` |

See `AGENTS.md` and `.agents/skills/learn-ops/SKILL.md` for routing details.