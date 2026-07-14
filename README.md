# Learn-Ops

**Find free AI/ML and cybersecurity courses, certificates, and scholarships — matched
to your goals — and keep track of what you've enrolled in.**

<<<<<<< HEAD
No coding experience needed. Everything runs from a simple menu on your computer.
=======
Maintained by **Brian Thuo** (thuogachau@gmail.com).
Same framework — provider-plugin scanner, A-G evaluation, canonical-state
tracker, safe auto-updater, multi-CLI agent skill — repurposed for **learning**, not jobs.
>>>>>>> 601f1f65cfdd9fd506d89e965cf09675d709fd6f

Maintained by **Brian Thuo** (<thuogachau@gmail.com>).

---

## What Learn-Ops does

- **Finds free training** — scans sites like Coursera (free-audit courses), Kaggle
  Learn, and PortSwigger's Web Security Academy for courses and certifications that
  cost nothing.
- **Scores each course for you** — checks it against your goals and flags hidden
  fees or low-quality "certificate mills," then tells you whether to enroll, skip,
  or try it with a time limit.
- **Tracks your progress** — one place to see what you've found, enrolled in, are
  currently taking, or have finished.

## Getting started (Windows, no terminal needed)

1. Download the `learn-ops.zip` file and extract it to a folder.
2. Double-click **`setup.bat`**. This installs everything automatically (takes
   about 5 minutes).
3. Double-click **`run.bat`** to open the menu.

That's the whole install. Full step-by-step instructions, screenshots of the menu,
and troubleshooting tips are in **[INSTALL.md](INSTALL.md)** — start there if
anything is unclear.

## Using the menu

Once `run.bat` is open, use the **arrow keys** to pick an option and press **Enter**:

| Option              | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| Find free trainings | Scans the web for free courses matching your profile  |
| View my enrollments | Shows courses you've found, enrolled in, or completed |
| Check system health | Confirms everything is installed and working          |
| Update the system   | Gets the latest version of Learn-Ops                  |

A few advanced options in the menu are marked **"needs Claude"** — those require
the free Claude Code AI assistant to be set up on your computer (see
[INSTALL.md](INSTALL.md)). You can use everything else without it.

## Setting your goals

Learn-Ops personalizes results based on a short profile: what you're learning
toward (AI/ML or cybersecurity), how much time you have per week, and what you
want out of it. The menu will walk you through this the first time you run it —
you don't need to edit any files by hand.

## Getting help

- Stuck installing or running it? See **[INSTALL.md](INSTALL.md)** — it covers
  the most common issues.
- Still stuck? Contact your system administrator.

---

## For developers

Learn-Ops is a Node.js project, forked from
[career-ops](https://github.com/santifer/career-ops) (the AI job-search
pipeline) and repurposed for learning. It's designed to be driven either by the
plain menu above or directly from an AI coding CLI (Claude Code, Codex,
OpenCode, Gemini, Qwen, Copilot, Kimi, Antigravity CLI).

### Install from source

```bash
git clone https://github.com/ThuoBrian/learn-ops
cd learn-ops && npm install
node doctor.mjs                   # health check
```

Then in your AI CLI, run `/learn-ops` to see the command menu. On first run it
guides you through onboarding (learner profile + goals + sources to scan).

### CLI commands

| Command                         | What it does                                  |
| ------------------------------- | --------------------------------------------- |
| `/learn-ops {course URL}`       | Full A-G evaluation + verdict + learning plan |
| `/learn-ops learn-scan`         | Discover free trainings into the inbox        |
| `/learn-ops learn-pipeline`     | Evaluate pending inbox URLs                   |
| `/learn-ops course` / `courses` | Evaluate / compare courses                    |
| `/learn-ops learnplan`          | Generate a roadmap PDF                        |
| `/learn-ops tracker`            | Enrollment overview                           |
| `/learn-ops onboard`            | Interactive profile onboarding                |
| `/learn-ops update`             | Self-update (your data is never touched)      |

### Configuration files

- `config/learner-profile.yml` — target track (`ai_ml` | `cybersecurity`),
  archetype, time budget, and learning goals.
- `config/archetypes.yml` — the archetype set (IT→AI/ML, IT→Cybersecurity, …)
  the evaluation scores against.
- `learning-portals.yml` — the free-training sources to scan (Coursera, Kaggle,
  PortSwigger, TryHackMe, ISC2, MIT OCW, scholarships, …).

### Status

v0.1.0 — walking-skeleton MVP. Working: discovery (`learn-scan`), evaluation
(`course`), tracker + states, doctor, verify, scan filters, 3 providers
(Coursera, Kaggle, PortSwigger). More providers, modes, multi-CLI registration,
and the OSSU seed are in progress (see the plan).
