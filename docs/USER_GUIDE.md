# Learn-Ops — User Guide

> The complete user manual for **learn-ops**, a CLI-agnostic tool that discovers,
> evaluates, and tracks **free** AI/ML and cybersecurity trainings for IT
> professionals transitioning into applied AI/ML or cybersecurity.
>
> Short on time? The [README](../README.md) is the one-page landing. This guide is
> the full reference. For the canonical data contract and agent rules, see
> [AGENTS.md](../AGENTS.md) and [DATA_CONTRACT.md](../DATA_CONTRACT.md).

---

## Table of contents

1. [What learn-ops does](#1-what-learn-ops-does)
2. [Installation & setup](#2-installation--setup)
3. [First-run onboarding](#3-first-run-onboarding)
4. [The command menu](#4-the-command-menu)
5. [Evaluating a course (A–G)](#5-evaluating-a-course-ag)
6. [The enrollment tracker & states](#6-the-enrollment-tracker--states)
7. [The data model: User vs System layer](#7-the-data-model-user-vs-system-layer)
8. [Customization](#8-customization)
9. [Scripts reference](#9-scripts-reference)
10. [Pipeline integrity rules](#10-pipeline-integrity-rules)
11. [Troubleshooting & FAQ](#11-troubleshooting--faq)
12. [Getting more help](#12-getting-more-help)

---

## 1. What learn-ops does

learn-ops turns your AI coding CLI (Claude Code, Codex, OpenCode, Gemini, Qwen,
Copilot, Kimi, Antigravity, Grok) into a free-training command center. Three loops:

- **Discover** — scan configured free-learning providers (Coursera free-audit, Kaggle
  Learn, PortSwigger Web Security Academy, …) into an inbox of candidate courses.
- **Evaluate** — score any course/cert/program against *your* goals with a 7-block
  A–G report and a clear **DO / DON'T DO / DO WITH TIMEBOX** verdict.
- **Track** — maintain an enrollment lifecycle from `Evaluated → Enrolled → In Progress
  → Completed | Dropped | SKIP` in a single canonical tracker.

It is **free-only by design**: hidden fees are surfaced, certificate-mills are flagged
and auto-downgraded, and the system will recommend *against* enrolling in low-fit
courses (score < 3.5 → DON'T DO).

learn-ops is forked from [career-ops](https://github.com/santifer/career-ops) (the
job-search pipeline). The framework — provider-plugin scanner, A–G evaluation,
canonical-state tracker, safe auto-updater, multi-CLI agent skill — is reused; only
the domain is learning, not jobs.

---

## 2. Installation & setup

### Prerequisites

- An **AI coding CLI** — Claude Code, Gemini CLI, Codex, Qwen Code, OpenCode, GitHub
  Copilot CLI, Antigravity CLI, or Grok Build CLI. (Gemini CLI integration requires
  Node.js 20+.)
- **Node.js 18+** and `git`. `npx` ships with Node and is used by the installer.

### Windows users (no terminal experience needed)

Download the zip from [github.com/ThuoBrian/learn-ops/releases](https://github.com/ThuoBrian/learn-ops/releases),
extract it, and double-click **`setup.bat`** (one-time). After setup, double-click
**`run.bat`** to launch the guided menu (`npm run menu`). See [INSTALL.md](../INSTALL.md)
for full instructions.

### Recommended — clone

```bash
git clone https://github.com/ThuoBrian/learn-ops.git
cd learn-ops
npm install
claude        # or: gemini / codex / qwen / opencode / agy / grok
```

### Advanced — clone manually

```bash
git clone https://github.com/ThuoBrian/learn-ops.git
cd learn-ops
npm install
```

Use this path to track a specific branch, contribute, or audit the code before
installing dependencies.

### Health check

```bash
node doctor.mjs          # or: npm run doctor
node doctor.mjs --json   # machine-readable; check onboardingNeeded
```

`doctor.mjs` validates prerequisites, required files, fonts, and auto-creates the
`data/`, `output/`, `reports/` directories if missing. Exit `0` = healthy, `1` = fix
something (messages are printed).

---

## 3. First-run onboarding

On your first message in the AI CLI, learn-ops runs `node doctor.mjs --json` and, if
`onboardingNeeded` is true, walks you through setup conversationally. The steps mirror
the [data contract](#7-the-data-model-user-vs-system-layer):

1. **`learner-profile.md`** *(required)* — your IT background, transition target,
   artifacts so far, and constraints. Free-form markdown; this is *your* file.
2. **`config/learner-profile.yml`** *(required)* — copy `config/learner-profile.example.yml`
   and fill in: `target_track` (`ai_ml` | `cybersecurity`), `archetype_id` (one id from
   `config/archetypes.yml`), `level`, `time_budget_hrs_week`, `budget`, and
   `learning_goals` (north star + skill gaps + cert targets).
3. **`learning-portals.yml`** *(recommended)* — copy
   `templates/learning-portals.example.yml`; the free-training sources to scan.
4. **`modes/_profile.md`** — copy `modes/_profile.template.md`; map your background to
   your chosen archetype, write your learning narrative, set time/budget policy.

When onboarding is complete, run **`/learn-ops learn-scan`** to discover your first
batch of free trainings.

### Update check

On the first message of each session, learn-ops silently runs
`node update-system.mjs check`. It only speaks up if an update is available. Apply with
`/learn-ops update` (or `npm run update`); roll back with `npm run rollback`. **Your
data is never touched by updates** — only the System layer (see §7).

---

## 4. The command menu

Invoke any command in your AI CLI as `/learn-ops {command}`. With no arguments,
`/learn-ops` prints this menu.

| Command | What it does |
|---------|--------------|
| `/learn-ops {course URL or text}` | **Auto-eval** — full A–G evaluation + verdict + learning plan (routes to `course`). |
| `/learn-ops course` | Evaluate one course/cert/program (A–G + DO/DON'T/TIMEBOX). |
| `/learn-ops courses` | Compare and rank multiple courses against each other. |
| `/learn-ops learn-scan` | Discover free trainings across providers into the inbox. |
| `/learn-ops learn-pipeline` | Evaluate pending URLs in `data/learning-inbox.md`. |
| `/learn-ops learnplan` | Generate a learning-plan / roadmap PDF from goals + enrollments. |
| `/learn-ops tracker` | Enrollment overview (counts per state, stalled detection, wins). |
| `/learn-ops onboard` | Interactive learner-profile onboarding (re-run any time). |
| `/learn-ops deep` | Deep research on a single course/provider. |
| `/learn-ops followup` | Flag stalled enrollments and draft a cadence. |
| `/learn-ops project` | Evaluate a portfolio project idea for your target archetype. |
| `/learn-ops batch` | Batch-process a list of courses in parallel. |
| `/learn-ops update` | Self-update system files (your data is never touched). |

### Auto-eval detection

If you paste something that is **not** a sub-command and it looks like a course
(keywords: "course", "syllabus", "certificate", "enroll", "modules", "prerequisites",
or a provider name + topic), learn-ops runs `course` automatically. So these two are
equivalent:

```
/learn-ops https://www.coursera.org/learn/machine-learning
/learn-ops course https://www.coursera.org/learn/machine-learning
```

### Codex note

Slash commands aren't guaranteed in Codex. Use the mode name in a prompt:

```text
Run learn-ops scan mode in this repo.
Evaluate this course with learn-ops course mode: https://...
Run learn-ops tracker mode and summarize current statuses.
```

For one-shot/batch tasks, `codex exec "Run learn-ops scan mode in this repo."`.

---

## 5. Evaluating a course (A–G)

When you paste a course/cert/program, learn-ops produces **7 blocks** plus a verdict.
This is the core of the tool.

### Availability gate (URL inputs)

For URL inputs, learn-ops first confirms the course is still available/free via
`node check-liveness.mjs <url>` (WebFetch fallback in headless mode). If the page is
gone or the free track is no longer offered, it stops before Block A and tells you.

### The seven blocks

| Block | What it covers |
|-------|----------------|
| **A — Course Summary** | Title, provider, URL, cost tier, format, duration, level, cert eligibility, language, one-line TL;DR. |
| **B — Match with Goals** | Syllabus mapped to your `skill_gaps` + archetype `target_skills`; gaps with mitigation (which modules fill which gap). |
| **C — Effort & Schedule** | Weeks × hrs/wk vs your `time_budget_hrs_week`; missing prerequisites; a proposed weekly schedule. |
| **D — Cost & Market** | True cost (hidden fees? proctoring? lab access?), aid process for `free-via-aid`, recruiter signal, paid alternatives if the free option is weak. |
| **E — Learning Plan** | Module-by-module roadmap with weekly deliverables + a scoreboard; skips modules you already know; marks capstone milestones. |
| **F — Portfolio Deliverable** | The demonstrable artifact the course produces, mapped to your archetype's `portfolio_deliverables`. Shippable capstones score higher than badges. |
| **G — Legitimacy** | Real, current, worthwhile? Three tiers — **High Confidence / Proceed with Caution / Suspicious**. Suspicious auto-downgrades the global score. |

### Scoring (global 1–5)

| Dimension | What it measures | Weight |
|-----------|------------------|--------|
| Match with Goals | alignment to `north_star` + `skill_gaps` + archetype `target_skills` | high |
| North Star Alignment | how well it advances your target archetype | high |
| Cost Value (free quality) | quality-per-free-dollar; hidden fees; paid alternatives | med |
| Time/Effort Fit | weeks × hrs/wk vs `time_budget_hrs_week` | med |
| Cert Recruiter-Signal | does the free cert appear in target-role JDs / industry-recognized | med |
| Legitimacy | accredited vs certificate-mill, freshness, completion-rate | high (gating) |
| **Global** | weighted average, 1–5 | — |

### The verdict

| Global score | Verdict | What you get |
|--------------|---------|--------------|
| **≥ 4.0** | **DO** | Full Block E learning plan with weekly deliverables + scoreboard. |
| **3.5–3.9** | **DO WITH TIMEBOX** (max X weeks) | Condensed essentials-only plan. |
| **< 3.5** | **DON'T DO** | A recommended better free alternative with justification. |

**Bounded research budget:** at most 5 WebSearch queries per course (Blocks D + G
combined). learn-ops stops early when enough evidence exists — it does not run
deep-research or spawn subagents for a single evaluation.

### After the evaluation

learn-ops automatically:

1. Reserves a report number: `node reserve-report-num.mjs` → `NNN`.
2. Writes the report to `reports/{NNN}-{provider-slug}-{YYYY-MM-DD}.md`
   (with a `## Machine Summary` YAML block + `## Learning Plan Draft`).
3. Releases the reservation sentinel: `node reserve-report-num.mjs --release {NNN}`.
4. Records a row in the tracker via `batch/tracker-additions/{NNN}-{provider-slug}.tsv`
   (status *before* score) and runs `node merge-tracker.mjs`.
5. If the course came from the inbox, moves its line to `## Processed` in
   `data/learning-inbox.md`.

You can also run these steps manually — see [§9](#9-scripts-reference) and
[§10](#10-pipeline-integrity-rules).

---

## 6. The enrollment tracker & states

The tracker is the single canonical view of your learning pipeline. It lives in
`data/enrollments.md` (a markdown table) and is the **source of truth** for what you've
done. learn-ops will never claim you completed a course unless it's recorded as
`Completed` here or you say so in the conversation.

### Canonical states (`templates/states.yml`)

| State | When | Group |
|-------|------|-------|
| `Evaluated` | Course evaluated with a report; pending enrollment decision | pending |
| `Enrolled` | Enrollment submitted/confirmed | active |
| `In Progress` | Actively studying | active |
| `Completed` | Course/cert completed | done |
| `Dropped` | Started then abandoned or paused | closed |
| `SKIP` | Doesn't fit your goals — don't enroll | closed |

> The status field must be exactly one of these labels — no markdown bold, no dates,
> no extra text. Run `npm run normalize` to fix non-canonical statuses automatically.

### Viewing the tracker

```bash
/learn-ops tracker     # in your AI CLI — narrative overview + next action
node tracker.mjs       # CLI — counts per state, grouped
```

`tracker` surfaces counts per state, the most recent evaluations, anything `In
Progress` (with stalled-detection via `followup`), and your `Completed` wins — then
suggests the next logical action (e.g., "3 evaluated but not enrolled — pick one to
start").

### Updating statuses

- **To ADD a row:** never edit `data/enrollments.md` directly. Write a TSV to
  `batch/tracker-additions/` and run `node merge-tracker.mjs`.
- **To UPDATE an existing row** (status/notes): editing `data/enrollments.md` directly
  is allowed.

---

## 7. The data model: User vs System layer

This is the most important concept in learn-ops. There are two layers, and the
auto-updater only ever touches the **System layer**. Put personal data **only** in the
User layer.

### User layer (NEVER auto-updated — your personalization)

| File | Holds |
|------|-------|
| `learner-profile.md` | IT background, transition target, artifacts, constraints |
| `config/learner-profile.yml` | target track, archetype, time budget, learning goals |
| `config/archetypes.yml` | archetype set (seeded, but you may extend) |
| `modes/_profile.md` | your archetype mapping, narrative, scoring overrides |
| `modes/_custom.md` | your procedural rules |
| `learning-portals.yml` | the free-training sources to scan |
| `data/*` | enrollments, inbox, scan-history, follow-ups, parser output |
| `reports/*`, `output/*` | generated reports and PDFs |

### System layer (auto-updatable — don't put user data here)

`modes/_shared.md`, `modes/{mode}.md`, `*.mjs` scripts, `providers/*.mjs`,
`templates/*`, `scaffolder/*`, `CLAUDE.md`, `AGENTS.md`, `CODEX.md`, `OPENCODE.md`,
`GEMINI.md`, `KIMI.md`, `docs/*`, `VERSION`, `DATA_CONTRACT.md`.

### The rule

When you want to customize anything — archetype choice, goals, time/budget policy,
scoring weights — write to `modes/_profile.md` or `config/learner-profile.yml`.
**Never** edit `modes/_shared.md` or other system files for user-specific content;
those get overwritten on update. See [DATA_CONTRACT.md](../DATA_CONTRACT.md) for the
full list.

### Source-of-truth boundary

User-facing content (learning plans, course-fit reports, enrollment recommendations)
is generated **exclusively** from: `learner-profile.md`, `config/learner-profile.yml`,
`config/archetypes.yml`, `modes/_profile.md`, `data/enrollments.md`, and statements you
make in the current conversation. **Reformulate, never fabricate** — learn-ops will
reorder, reframe, and emphasize, but never invent skills, metrics, or credentials. If
a claim isn't backed by a source file, it asks you.

---

## 8. Customization

### Your profile — `config/learner-profile.yml`

The single source of truth for your identity as a learner. Key sections:

```yaml
learner:
  target_track: ai_ml          # ai_ml | cybersecurity
  archetype_id: ai_ml_applied  # one id from config/archetypes.yml
  level: intermediate          # beginner | intermediate | advanced
  time_budget_hrs_week: 8
  budget: free_only            # free_only | free_with_aid | scholarship_ok

learning_goals:
  north_star:
    - "Transition from IT operations into applied AI/ML engineering"
  skill_gaps:
    - "LLM evaluation & observability"
    - "RAG systems"
    - "MLOps deployment"
  cert_targets:
    - "ISC2 CC (free)"
    - "Google Cybersecurity Certificate (free via aid)"
```

- `target_track` + `archetype_id` select the scoring archetype.
- `skill_gaps` double as the positive keywords the scanner matches against.
- `cert_targets` feed the "Cert Recruiter-Signal" scoring dimension.
- `time_budget_hrs_week` feeds the "Time/Effort Fit" dimension.

### Your narrative — `modes/_profile.md`

Copy `modes/_profile.template.md`. Fill in: your chosen archetype, the transition
story that frames your learning plan, your cross-cutting advantage (e.g.,
*IT-ops reliability instincts → MLOps*), your time/budget policy, and optional
scoring overrides. The system reads `_shared.md` (system) first, then this file
(your overrides win).

### Archetypes — `config/archetypes.yml`

Six built-in archetypes (extend or add your own):

| id | Track | Summary |
|----|-------|---------|
| `ai_ml_applied` | ai_ml | Ship ML/LLM features into production — retrieval, evals, inference, observability |
| `ml_mlops` | ai_ml | Put ML in production reliably — pipelines, serving, monitoring |
| `ai_ml_research` | ai_ml | Research-oriented ML |
| `cybersecurity_analyst` | cybersecurity | SOC analyst |
| `cloud_security` | cybersecurity | Cloud security engineer |
| `pentest` | cybersecurity | Penetration tester / red team |

Each archetype carries `target_skills`, `recommended_free_certs`,
`portfolio_deliverables`, and `recruiter_signal_notes` — these drive Blocks B, D, F.

### Portals — `learning-portals.yml`

Copy `templates/learning-portals.example.yml`. Configure:

- **`title_filter.positive`** — keywords that keep a course (e.g., `Machine Learning`,
  `MLOps`, `Cybersecurity`, `Penetration`).
- **`title_filter.negative`** — keywords that drop a course (e.g., `Paid`, `Premium`,
  `Guaranteed Job`).
- **`tracked_companies`** — providers with a `provider:` adapter (Kaggle, Coursera,
  PortSwigger). Each only returns free / free-via-aid / scholarship items.
- **`search_queries`** — WebSearch handoff queries for sources with no adapter
  (Fast.ai, DeepLearning.AI, TryHackMe, ISC2 CC, MIT OCW, Stanford, scholarships).

Validate before scanning: `npm run validate:portals`. Verify reachability:
`npm run verify:portals`.

---

## 9. Scripts reference

All scripts are `.mjs` modules in the project root, exposed via `npm run <name>`.

### Daily use

| Command | Purpose |
|---------|---------|
| `npm run doctor` | Validate setup prerequisites; auto-create `data/`, `output/`, `reports/` |
| `npm run scan` | Zero-token portal scanner (reads `learning-portals.yml`) |
| `npm run tracker` | Tracker overview grouped by canonical state |
| `npm run verify` | Pipeline data-integrity health check |
| `npm run liveness` | Test whether course URLs are still active |

### Tracker hygiene

| Command | Purpose |
|---------|---------|
| `npm run normalize` | Map non-canonical statuses to canonical equivalents (`-- --dry-run` to preview) |
| `npm run dedup` | Remove duplicate tracker entries |
| `npm run merge` | Merge pending TSVs in `batch/tracker-additions/` into `data/enrollments.md` |
| `npm run reconcile` | Reconcile pipeline state |

### Updates & reports

| Command | Purpose |
|---------|---------|
| `npm run update:check` | Check for upstream updates |
| `npm run update` | Apply upstream update (System layer only) |
| `npm run rollback` | Roll back the last update |
| `npm run pdf` | Generate a roadmap / learning-plan PDF |
| `node reserve-report-num.mjs` | Reserve the next report number (`--release NNN` after writing) |

### Portal validation

| Command | Purpose |
|---------|---------|
| `npm run validate:portals` | Validate `learning-portals.yml` shape before scanning |
| `npm run verify:portals` | Verify portal URLs are reachable |

> **Note:** a few `package.json` scripts (e.g., `cover-letter`, `sync-check`,
> `scan:full`, `gemini:eval`) are inherited from the career-ops fork and are not
> relevant to the learning workflow.

### Common flags

- `--dry-run` — preview without writing files (`scan`, `normalize`).
- `--company <Name>` — scan a single source only (`scan`).
- `--json` — machine-readable output (`doctor`).

---

## 10. Pipeline integrity rules

These rules keep your tracker and reports consistent. learn-ops follows them
automatically; follow them if you ever edit by hand.

1. **Tracker additions:** write a TSV to `batch/tracker-additions/` then run
   `node merge-tracker.mjs`. Never edit `data/enrollments.md` to *add* rows.
   *Updating* an existing row's status/notes is allowed.
2. **Report numbering:** reserve with `node reserve-report-num.mjs` → `NNN`, write the
   report, then release the sentinel with `--release NNN`. This prevents two reports
   from grabbing the same number.
3. **Report path:** `reports/{NNN}-{provider-slug}-{YYYY-MM-DD}.md`, with
   `**URL:**` and `**Legitimacy:**` headers.
4. **Status field:** exactly one canonical label — no bold, no dates, no extra text.
5. **Health:** `node verify-pipeline.mjs` validates statuses, dedup, report-link
   integrity, score format, and pending-TSV checks.
6. **Hygiene:** `node normalize-statuses.mjs` (fix statuses), `node dedup-tracker.mjs`
   (remove dupes).

---

## 11. Troubleshooting & FAQ

### Onboarding didn't trigger / `doctor` says onboarding needed

Run `node doctor.mjs --json` and look at `onboardingNeeded`. If true, run
`/learn-ops onboard` in your AI CLI and step through the four files in §3.

### `scan` found nothing new

The scanner is bounded by `learning-portals.yml`. If your topic isn't in
`title_filter.positive`, titles get filtered out. Add the keyword to
`title_filter.positive` and re-run. Also check `data/scan-history.tsv` — found items
may already be recorded (duplicates are skipped, not re-added).

### Symlink error on Windows

Windows doesn't create symlinks by default, so the multi-CLI skill entrypoints
(`.claude/skills/`, `.opencode/skills/`, …) check out as plain pointer files. Run
`node update-system.mjs apply` (or clone from `github.com/ThuoBrian/learn-ops` on a fresh install);
the `materializeSkillEntrypoints` step replaces them with real content. No `mklink`
or Developer Mode needed.

### A course I evaluated is missing from the tracker

Tracker rows are added via `batch/tracker-additions/*.tsv` + `node merge-tracker.mjs`.
If a TSV is sitting in that folder unmerged, run `npm run merge`. Run
`npm run verify` to check pipeline integrity.

### Statuses look wrong / inconsistent

Run `npm run normalize` to map aliases to canonical states and strip stray formatting.
Preview first with `npm run normalize -- --dry-run`.

### Can I run learn-ops on a cheaper or local model?

Yes — learn-ops is AI-agnostic. See [docs/RUNNING_ON_A_BUDGET.md](RUNNING_ON_A_BUDGET.md)
for OpenCode, Qwen CLI, DeepSeek, OpenRouter, Ollama, and other low-cost providers.

### Avoiding rate/token limits during a batch run

Pass `--limit <N>` to `batch-runner.sh` to cap offers per run, and
`--resume-paused` to continue an interrupted run without re-doing completed work.

### An update broke something

`npm run rollback` reverts the last `update-system.mjs apply`. Your User-layer data is
never touched by updates, so your profile and tracker are safe.

---

## 12. Getting more help

- **Canonical rules & data contract:** [AGENTS.md](../AGENTS.md),
  [DATA_CONTRACT.md](../DATA_CONTRACT.md).
- **Running on a budget / local models:** [docs/RUNNING_ON_A_BUDGET.md](RUNNING_ON_A_BUDGET.md),
  [docs/FREE_TIER.md](FREE_TIER.md).
- **Local parser cookbook:** [docs/local-parser-cookbook.md](local-parser-cookbook.md).
- **Non-technical team training:** [docs/non-technical-team-training.md](non-technical-team-training.md).
- **Codex guide:** [docs/CODEX.md](CODEX.md).
- **Legacy career-ops docs (archived, stale):** [`docs/_attic/legacy-docs/`](_attic/legacy-docs/)
  — kept for history; not accurate for learn-ops.
- **Issues & discussions:** open a [GitHub Issue](https://github.com/ThuoBrian/learn-ops/issues)
  or [Discussion](https://github.com/ThuoBrian/learn-ops/discussions).

---

*learn-ops is v0.1.0 — a walking-skeleton MVP. Working: discovery (`learn-scan`),
evaluation (`course`), tracker + canonical states, doctor, verify, scan filters, and
three providers (Coursera, Kaggle, PortSwigger). More providers, modes, and multi-CLI
registration are in progress.*