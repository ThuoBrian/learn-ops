# Learn-Ops

Free **AI/ML & Cybersecurity** training finder for IT professionals. Discover free
courses, free certs, and scholarships; evaluate each against your career goals; track an
enrollment pipeline — all from your AI coding CLI (Claude Code, Codex, OpenCode, Gemini,
Qwen, Copilot, Kimi, Antigravity CLI).

Maintained by **Brian Thuo** (bthuo@poverty-action.org).
Forked from [career-ops](https://github.com/santifer/career-ops) (the AI job-search
pipeline). Same framework — provider-plugin scanner, A-G evaluation, canonical-state
tracker, safe auto-updater, multi-CLI agent skill — repurposed for **learning**, not jobs.

## What it does

- **Discover** free trainings across providers (Coursera free-audit, Kaggle Learn,
  PortSwigger Web Security Academy, …) with `/learn-ops learn-scan`.
- **Evaluate** any course/cert/program with `/learn-ops course {URL}` — an A-G report
  scoring fit against your goals, with a **DO / DON'T DO / DO WITH TIMEBOX** verdict and
  a learning plan. Free-only by default; hidden fees and certificate-mills are flagged.
- **Track** your enrollment lifecycle: `evaluated → enrolled → in_progress → completed | dropped | skip`.

## Quick start

```bash
git clone https://github.com/ThuoBrian/learn-ops
cd learn-ops && npm install
node doctor.mjs                   # health check
```

Then in your AI CLI, run `/learn-ops` to see the command menu. On first run it guides you
through onboarding (learner profile + goals + sources to scan).

**Windows users (no terminal experience needed):** Download the zip, extract it, and
double-click `setup.bat`. After setup, double-click `run.bat` to launch the guided menu.
See [INSTALL.md](INSTALL.md) for full instructions.

## Commands

| Command | What it does |
|---------|--------------|
| `/learn-ops {course URL}` | Full A-G evaluation + verdict + learning plan |
| `/learn-ops learn-scan` | Discover free trainings into the inbox |
| `/learn-ops learn-pipeline` | Evaluate pending inbox URLs |
| `/learn-ops course` / `courses` | Evaluate / compare courses |
| `/learn-ops learnplan` | Generate a roadmap PDF |
| `/learn-ops tracker` | Enrollment overview |
| `/learn-ops onboard` | Interactive profile onboarding |
| `/learn-ops update` | Self-update (your data is never touched) |

## Configure

- `config/learner-profile.yml` — your target track (`ai_ml` | `cybersecurity`), archetype,
  time budget, and learning goals.
- `config/archetypes.yml` — the archetype set (IT→AI/ML, IT→Cybersecurity, …) the
  evaluation scores against.
- `learning-portals.yml` — the free-training sources to scan (Coursera, Kaggle,
  PortSwigger, TryHackMe, ISC2, MIT OCW, scholarships, …).

## Status

v0.1.0 — walking-skeleton MVP. Working: discovery (`learn-scan`), evaluation (`course`),
tracker + states, doctor, verify, scan filters, 3 providers (Coursera, Kaggle,
PortSwigger). More providers, modes, multi-CLI registration, and the OSSU seed are in
progress (see the plan).