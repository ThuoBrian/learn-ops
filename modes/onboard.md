# Mode: onboard — Interactive Learner Onboarding

Guide the learner through first-time setup. Triggered automatically when
`node doctor.mjs --json` returns `onboardingNeeded: true`, or invoked directly
with `/learn-ops onboard`.

## Purpose

Create the four user-layer files that personalize every future evaluation:
`learner-profile.md`, `config/learner-profile.yml`, `modes/_profile.md`, `modes/_custom.md`.

## Before Starting

Run `node doctor.mjs --json` and read the output. If `onboardingNeeded` is false, tell
the learner they are already set up and suggest `/learn-ops learn-scan` as a next step.

## Step 1 — Ask Five Profile Questions

Ask these questions one at a time (or as a short numbered list if the learner prefers):

1. **Current role**: What is your current IT role? (e.g. sysadmin, DevOps engineer, network engineer, help-desk, DBA)
2. **Experience level**: How many years in IT? Roughly what level — junior / mid / senior?
3. **Transition target**: What are you aiming for? (AI/ML engineer, MLOps, AI researcher, cybersecurity analyst, cloud security, penetration tester)
4. **Time budget**: How many hours per week can you dedicate to learning? (be realistic)
5. **Learning style**: Do you prefer structured courses with certs, hands-on labs, or self-directed reading? Any strong preferences or constraints?

Record the answers in memory for Steps 2–6.

## Step 2 — Match to an Archetype

Read `config/archetypes.yml`. Show the learner the archetype options relevant to their
stated target track (filter by `track: ai_ml` or `track: cybersecurity` based on Step 1):

```
Based on your goal, here are the closest archetypes:

  [1] {archetype.name} — {archetype.summary}
  [2] {archetype.name} — {archetype.summary}
  …

Which fits best? (enter number, or describe if none fits)
```

Confirm the choice. If the learner is uncertain, recommend the archetype whose
`target_skills` most closely match what they described in Step 1. Store the
`archetype_id` for the next step.

## Step 3 — Write `config/learner-profile.yml`

Copy `config/learner-profile.example.yml` as the base. Fill in the fields from Steps 1–2:
- `learner.role` — current IT role
- `learner.experience_level` — junior / mid / senior
- `learner.target_track` — ai_ml / cybersecurity
- `learner.archetype_id` — chosen archetype id from Step 2
- `learner.time_budget_hrs_week` — number from Step 1.4
- `learning_goals.style` — structured / hands-on / self-directed (from Step 1.5)

Leave `learning_goals.skill_gaps` empty for now (doctor.mjs will prompt to fill it after
the first few evaluations).

Show the learner the written file and ask: "Does this look right? Any corrections?"
Apply corrections before continuing.

## Step 4 — Write `modes/_profile.md`

Copy `modes/_profile.template.md` as the base. Fill in:
- The learner's archetype section with their background narrative (synthesized from Steps 1–2)
- Their strongest existing IT skills (from Step 1.1 and 1.2)
- Their stated learning goals and constraints (from Steps 1.3–1.5)

Keep it concise — this file is loaded on every evaluation. 1–2 paragraphs max.

## Step 5 — Write `modes/_custom.md`

Copy `modes/_custom.template.md` as the base. Leave the House Rules and Custom Workflows
sections as `(none yet — add yours above)`. Do not pre-fill — this file is the learner's
personal scratch space.

Tell the learner:
> "I've created `modes/_custom.md` for your personal rules. Edit it anytime to tell me
> things like 'always prefer hands-on labs' or 'skip courses longer than 8 hours'."

## Step 6 — Write `learner-profile.md`

Create `learner-profile.md` in the repo root with a free-form summary:

```markdown
# Learner Profile

**Role:** {current role}
**Experience:** {N} years in IT ({level})
**Transition target:** {target}
**Archetype:** {archetype name}
**Time budget:** {N} hrs/week
**Learning style:** {style preference}

## Background

{2–3 sentences synthesizing what the learner told you about their background and goals.}

## Strongest existing skills

{bullet list of skills they mentioned}

## Constraints and preferences

{anything they flagged in Step 1.5 or elsewhere}
```

## Step 7 — Confirm and Next Steps

Run `node doctor.mjs` (without `--json`) and show the output. If all checks pass, tell the
learner:

> "Setup complete! Here's what to do next:
> 1. `/learn-ops learn-scan` — discover free courses for your archetype.
> 2. `/learn-ops course <url>` — evaluate a specific course URL.
> 3. Edit `config/learner-profile.yml` anytime to update your goals or time budget."

If any doctor checks still fail, address them before finishing.

## Source-of-Truth Boundary

Only write to user-layer files: `learner-profile.md`, `config/learner-profile.yml`,
`modes/_profile.md`, `modes/_custom.md`. Never modify system-layer files during onboarding.
