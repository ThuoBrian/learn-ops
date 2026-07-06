# Learn-Ops Training Guide (for Non-Technical Teams)

A plain-English, step-by-step guide to using learn-ops. No coding experience required.

> **What is learn-ops?** An AI assistant that lives inside your terminal (Claude Code, OpenCode, Gemini, etc.). It helps you find job postings, decide which ones are worth applying to, generate a tailored CV, draft outreach messages, and track every application in one place. You talk to it in plain English; it does the work.

---

## 0. The One Thing to Remember

You drive, the AI works. You type a short command (a "slash command"), paste a job posting or link, and the AI returns a report, a CV, or a draft for you to review. **You always review before anything is sent.** The AI never clicks "Submit" for you.

Every command starts with:

```
/learn-ops
```

Think of `/learn-ops` as the door. After it you add a word (the "mode") that tells the AI what you want.

---

## 1. First-Time Setup (one-time, ~10 minutes)

The AI does setup with you. On your first session it will check if your files exist and walk you through:

1. **Your CV** → paste your CV, a LinkedIn link, or just describe your experience. It builds `cv.md`.
2. **Your profile** → name, email, location, target roles, salary range. Goes into `config/profile.yml`.
3. **Your portals** → the list of companies the scanner searches. Pre-loaded with 45+ companies; you can add more.
4. **Your tracker** → a table (`data/applications.md`) where every application is recorded automatically.
5. **Get to know you** → the more you tell it (superpowers, deal-breakers, best achievement), the better it filters. This is the most valuable step.

> You only do this once. After that, the system remembers you and gets smarter with every evaluation.

**Health check (optional, but reassuring):**

```
node doctor.mjs
```

Tells you everything is installed and ready. Green checkmarks = good.

---

## 2. The Command Menu

Type this any time to see every command:

```
/learn-ops
```

You'll get a menu of options. Below is what each one does, in plain English.

---

## 3. The Core Workflow (what you'll do 90% of the time)

This is the "happy path" — from job posting to tracked application.

### Step A — Find a job

Two ways:

- **You already have a posting:** paste the text or a URL directly.
- **You want the scanner to find postings:** run `/learn-ops scan` (see Section 5).

### Step B — Evaluate it (the auto-pipeline)

Just paste the job description or URL — no extra words needed:

```
/learn-ops {paste JD text or URL here}
```

The AI runs the **auto-pipeline** and produces:

1. **A scored evaluation report** (saved in `reports/`) — how well the role fits you, with a 0–5 score and reasoning.
2. **A tailored CV PDF** (if the fit is good) — ATS-friendly, saved in `output/`.
3. **A tracker entry** — the job is logged in `data/applications.md` automatically.

> **Rule of thumb:** score **4.0/5 or higher** = worth applying. Below 4.0 = the AI will recommend you skip it. Your time is valuable; so is the recruiter's.

### Step C — Review and decide

Open the report, read the reasoning. If you want to proceed, the CV PDF is ready to send. If not, the AI marks it and you move on.

### Step D — Apply (you stay in control)

```
/learn-ops apply
```

The AI reads an application form, drafts your answers using your CV and story bank, and fills them in. **You review every answer before submitting.** The AI stops before "Submit."

### Step E — Track everything

```
/learn-ops tracker
```

Shows your status overview: what's Evaluated, Applied, in Interview, Offered, Rejected, etc. All statuses are standardized (see Section 7).

---

## 4. Every Command Explained (the "modes")

| Command | What it does | When to use it |
|---|---|---|
| `/learn-ops {JD or URL}` | Full pipeline: evaluate + report + PDF + tracker | You have a posting and want the full treatment |
| `/learn-ops oferta` | Evaluation only (no auto PDF) | You want a quick read on fit, no CV yet |
| `/learn-ops ofertas` | Compare and rank multiple offers side by side | You're choosing between 2+ roles |
| `/learn-ops contacto` | LinkedIn outreach: finds contacts + drafts a message | You want a warm intro to a recruiter/hiring manager |
| `/learn-ops deep` | Deep research on a company | Before an interview or to decide if you like the company |
| `/learn-ops interview-prep` | Generates a company-specific interview prep doc | You have an interview scheduled |
| `/learn-ops interview` | Interactive onboarding chat to build your profile/CV | First time, or refreshing your profile |
| `/learn-ops pdf` | Generate just the CV PDF (ATS-optimized) | You already evaluated, now you need the PDF |
| `/learn-ops latex` | Export CV as LaTeX/Overleaf `.tex` | You want to edit the CV in Overleaf |
| `/learn-ops cover` | Generate a cover letter (paste a JD, or use a saved slug) | A role asks for a cover letter |
| `/learn-ops training` | Evaluate a course/cert against your career goal | Deciding whether a course is worth your time |
| `/learn-ops project` | Evaluate a portfolio project idea | Deciding what to build to strengthen your CV |
| `/learn-ops tracker` | Show application status overview | Anytime you want a status snapshot |
| `/learn-ops apply` | Live application assistant (reads form, drafts answers) | When filling out an online application |
| `/learn-ops scan` | Scan portals and discover new postings | When you want fresh job leads |
| `/learn-ops batch` | Process many postings in parallel | You have a list of URLs to evaluate at once |
| `/learn-ops patterns` | Analyze rejection patterns to improve targeting | You've applied to several and want to learn from results |
| `/learn-ops followup` | Flag overdue follow-ups and draft follow-up messages | Keeping your application momentum |
| `/learn-ops pipeline` | Process pending URLs from your inbox (`data/pipeline.md`) | You saved URLs for later; now process them |
| `/learn-ops update` | Update the learn-ops system itself | When a new version is available |

---

## 5. The Scanner and Its "Flags"

A **flag** is just an extra word you add to a command to tweak how it behaves. Think of flags as options or switches.

`/learn-ops scan` searches the configured companies' job boards for new postings and adds the matches to your inbox. Under the hood it runs `scan.mjs`, which accepts these flags:

| Flag | Plain-English meaning |
|---|---|
| `--dry-run` | **Preview mode.** Shows what it would find without saving anything. Great for a first look. |
| `--company <Name>` | Scan only one company, e.g. `--company Cohere`. Faster when you're checking a specific employer. |
| `--verify` | Open each new posting in a real browser to confirm it's still alive (not expired). Drops dead links. Needs Playwright/Chromium installed. |
| `--headed-fallback` | If a site blocks the headless browser, retry in a visible browser window. Only useful with `--verify`, and needs a screen (not for servers). |
| `--throttle` | Slow down between checks so the site doesn't block you for being too fast. Adds a ~5–10s gap. |
| `--throttle=8000` | Same, but you pick the wait time in milliseconds (here, 8s base). |
| `--rediscover-404` | If a tracked posting's link is dead, search for where the role moved and re-verify before giving up. Only works with `--verify`. |

**Examples (read as sentences):**

- `scan --dry-run` → "Show me what you'd find, but don't save anything."
- `scan --company OpenAI` → "Just scan OpenAI's jobs."
- `scan --verify --throttle` → "Find jobs, confirm each is live in a browser, and don't rush so we don't get blocked."

> The scanner is "zero-token" — it reads company job-board APIs directly, so scanning 90+ companies costs nothing in AI usage. Postings the scanner can't reach via API are handed off to a web-search step.

---

## 6. Other Handy Scripts and Their Flags

These are run directly with `node <script>`. You won't need them often, but here's the reference:

### Health and maintenance

| Command | What it does | Flags |
|---|---|---|
| `node doctor.mjs` | Checks your setup is healthy | (none) — add `--json` for machine output |
| `node verify-pipeline.mjs` | Validates tracker, statuses, links, scores | (none) |
| `node normalize-statuses.mjs` | Fixes non-standard status labels | (none) |
| `node dedup-tracker.mjs` | Removes duplicate tracker rows | (none) |
| `node merge-tracker.mjs` | Merges pending tracker additions | `--dry-run`, `--verify`, `--migrate` (fixes old report links) |
| `node update-system.mjs check` | Check for learn-ops updates | `check`, `apply`, `rollback`, `dismiss` |

### CV generation

| Command | What it does | Flags |
|---|---|---|
| `node generate-pdf.mjs <input.html> <output.pdf>` | Turns an HTML CV into a PDF | `--format=letter` or `--format=a4` (paper size) |
| `node generate-latex.mjs <input.html> [output.tex]` | Turns a CV into LaTeX/Overleaf format | (output path optional) |

### Liveness checker (is a posting still open?)

```
node check-liveness.mjs <url> [url2 ...]
node check-liveness.mjs --file urls.txt
```

| Flag | Meaning |
|---|---|
| `--file <path>` | Read a list of URLs from a file instead of pasting them |
| `--no-fallback` | Stay fully headless; don't pop up a browser if blocked |
| `--throttle[=ms]` | Wait between checks so you don't get rate-limited |

---

## 7. Application Statuses (the tracker vocabulary)

The tracker uses fixed status words so everyone (you, the AI, reports) speaks the same language:

| Status | Meaning |
|---|---|
| `Evaluated` | Report done; you haven't decided yet |
| `Applied` | Application sent |
| `Responded` | Company replied |
| `Interview` | In the interview process |
| `Offer` | You received an offer 🎉 |
| `Rejected` | Company said no |
| `Discarded` | You passed, or the posting closed |
| `SKIP` | Doesn't fit — don't apply |

> Statuses are kept clean: no bold text, no dates, no extra words in the status column. Dates go in the date column; notes go in the notes column.

---

## 8. A Walkthrough You Can Run Today (15 minutes)

1. **Open your terminal** in this project and start your AI CLI (e.g. `claude`).
2. **See the menu:** type `/learn-ops`.
3. **Find leads:** type `/learn-ops scan --dry-run` — preview what's out there without saving.
4. **Pick one posting** from the results and paste its text: `/learn-ops {paste text}`.
5. **Read the report** the AI generates (in `reports/`). Check the score and the legitimacy tier.
6. **If score ≥ 4.0:** open the CV PDF in `output/`. Review it.
7. **Log it:** it's already in your tracker — confirm with `/learn-ops tracker`.
8. **Apply:** go to the company's site, then `/learn-ops apply` to draft answers. **Review before submitting.**
9. **Follow up later:** in a week, run `/learn-ops followup` to see what needs a nudge.

---

## 9. Golden Rules

- **You review, the AI drafts.** Never submit anything you haven't read.
- **Quality over quantity.** A few well-targeted beats many generic. Below 4.0/5, skip it.
- **Tell the AI when it's wrong.** "This score is too high" or "You missed my X experience" — it learns and improves your profile (`modes/_profile.md`, `config/profile.yml`).
- **One source of truth.** Your CV is `cv.md`; proof points live in `article-digest.md`. The AI reads them fresh each time — never let it invent numbers.
- **When in doubt, type `/learn-ops`.** The menu always reminds you what's possible.

---

## 10. Troubleshooting (plain language)

| Symptom | What to do |
|---|---|
| "I don't know where to start" | Run `node doctor.mjs`. Green = ready. |
| Scanner returned nothing new | Try `scan --dry-run` first; check `portals.yml` has your target companies/keywords. |
| A posting looks expired | Run `node check-liveness.mjs <url>` to confirm. |
| CV PDF looks wrong on paper size | Re-run with `--format=a4` (or `letter`). |
| Tracker looks messy | Run `node verify-pipeline.mjs`, then `node normalize-statuses.mjs` and `node dedup-tracker.mjs`. |
| "I want to undo an update" | `node update-system.mjs rollback` |
| AI is scoring things wrong for me | Tell it why, in plain English. It updates your profile so future evaluations fit you better. |

---

*You don't need to memorize any of this. Bookmark this guide, and start every session with `/learn-ops`. The rest follows naturally.*