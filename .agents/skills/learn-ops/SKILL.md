---
name: learn-ops
description: Free AI/ML & cybersecurity training finder -- discover, evaluate, and track free courses, certs, and programs for IT professionals
arguments: mode
user_invocable: true
user-invocable: true
argument-hint: "[learn-scan | course | courses | learnplan | tracker | learn-pipeline | onboard | deep | followup | update]"
license: MIT
---

# learn-ops -- Router

learn-ops is a multi-CLI learning-opportunity command center. It discovers FREE
AI/ML and cybersecurity trainings (courses + free certs + bootcamps/scholarships),
evaluates each against the learner's goals, and tracks an enrollment pipeline.

## Mode Routing

Determine the mode from `$mode`:

| Input | Mode |
|-------|------|
| (empty / no args) | `discovery` -- Show command menu |
| Course/cert URL or text (no sub-command) | **`course`** (auto-eval) |
| `learn-scan` / `scan` | `learn-scan` |
| `learn-pipeline` / `pipeline` | `learn-pipeline` |
| `course` | `course` |
| `courses` | `courses` |
| `learnplan` | `learnplan` |
| `tracker` | `tracker` |
| `onboard` | `onboard` |
| `deep` | `deep` |
| `followup` | `followup` |
| `update` | `update` |
| `batch` | `batch` |
| `project` | `project` |

**Auto-eval detection:** If `$mode` is not a known sub-command AND contains a course
URL or training text (keywords: "course", "syllabus", "certificate", "enroll",
"modules", "prerequisites", provider name + topic), execute `course`.

If `$mode` is not a sub-command AND doesn't look like a course/training, show discovery.

---

## Discovery Mode (no arguments)

Show this menu:

```
learn-ops -- Command Center

Free AI/ML & Cybersecurity trainings for IT professionals.

Available commands:
  /learn-ops {course URL/text} → COURSE: full A-G evaluation + verdict + learning plan
  /learn-ops learn-scan        → Discover free trainings across providers (Coursera, Kaggle, PortSwigger, …)
  /learn-ops learn-pipeline    → Process pending course URLs from inbox (data/learning-inbox.md)
  /learn-ops course            → Evaluate one course/cert/program (A-G + DO/DON'T DO/TIMEBOX)
  /learn-ops courses           → Compare and rank multiple courses
  /learn-ops learnplan         → Generate a learning-plan / roadmap PDF from goals + enrollments
  /learn-ops tracker           → Learning-tracker overview (evaluated/enrolled/in_progress/completed)
  /learn-ops onboard           → Interactive learner-profile onboarding
  /learn-ops deep              → Deep research on a course/provider
  /learn-ops followup          → Flag stalled enrollments; draft cadence
  /learn-ops project           → Evaluate a portfolio project idea for your target archetype
  /learn-ops update            → Update learn-ops system files

Inbox: add free course URLs to data/learning-inbox.md → /learn-ops learn-pipeline
Or paste a course URL directly to evaluate it.
```

---

## Context Loading by Mode

### Modes that require `_shared.md` + their mode file:
Read `modes/_shared.md` + `modes/{mode}.md`

Applies to: `course`, `courses`, `learnplan`, `learn-pipeline`, `learn-scan`, `batch`

### Standalone modes (only their mode file):
Read `modes/{mode}.md`

Applies to: `tracker`, `deep`, `onboard`, `followup`, `project`, `update`

### Modes delegated to subagent:
For `learn-scan` and `learn-pipeline` (3+ URLs): launch as a single-pass worker with
the content of `_shared.md` + `modes/{mode}.md` injected. Workers must NOT spawn
further subagents or invoke other skills.

```
Agent(
  subagent_type="general-purpose",
  prompt="[content of modes/_shared.md]\n\n[content of modes/{mode}.md]\n\n[invocation data]",
  description="learn-ops {mode}"
)
```

Execute the instructions from the loaded mode file.