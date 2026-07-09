# Learn-Ops Guide (for Non-Technical Teams)

A plain-English guide to using learn-ops. No coding experience required.

> **What is learn-ops?** A tool that helps IT professionals find and track
> **free** AI/ML and cybersecurity courses, certifications, and programs.
> You navigate a simple menu; the AI does the work.

---

## 0. The One Thing to Remember

You drive, the AI works. You pick an option from the menu, paste a course link
if needed, and get back a report or recommendation. **Nothing is enrolled in
automatically** — you always review before acting.

---

## 1. First-Time Setup (one-time, ~10 minutes)

### Windows — easiest path

1. Download the zip from the [releases page](https://github.com/ThuoBrian/learn-ops/releases)
2. Extract the folder anywhere on your computer
3. Double-click **`setup.bat`** — it installs everything automatically (~5 minutes)
4. When you see **"Setup complete!"**, you're ready

> If Windows shows a blue "Windows protected your PC" warning, click
> **More info** → **Run anyway**. This is normal for downloaded scripts.

See [INSTALL.md](../INSTALL.md) for the full Windows setup guide.

### Mac / Linux

```bash
git clone https://github.com/ThuoBrian/learn-ops.git
cd learn-ops && npm install
node doctor.mjs   # health check — green checkmarks = ready
```

---

## 2. Starting Learn-Ops

**Windows:** Double-click **`run.bat`** in the learn-ops folder, or the
**Learn-Ops** shortcut on your Desktop (created during setup).

**Mac / Linux:**
```bash
npm run menu
```

You'll see an arrow-key menu:

```
  Learn-Ops — Free Training Finder
  ────────────────────────────────────

? What would you like to do?
❯   Find free trainings
    View my enrollments
    Check system health
    Update the system
    ─────────────────────
    Evaluate a course (needs Claude)
    Process pending URLs (needs Claude)
    My enrollment roadmap (needs Claude)
    ─────────────────────
    Exit
```

Use **arrow keys** to move, **Enter** to select, **Ctrl+C** to quit.

---

## 3. Menu Options Explained

| Option | What it does |
|---|---|
| **Find free trainings** | Scans configured providers (Coursera, Kaggle, PortSwigger, …) for new free courses matching your profile |
| **View my enrollments** | Shows all courses you've evaluated, enrolled in, or completed |
| **Check system health** | Verifies everything is installed and working |
| **Update the system** | Downloads the latest version of Learn-Ops |
| **Evaluate a course** | Scores a specific course against your learning goals (needs Claude Code) |
| **Process pending URLs** | Batch-evaluates a list of saved course URLs (needs Claude Code) |
| **My enrollment roadmap** | Generates a personalised learning plan (needs Claude Code) |

---

## 4. Enrollment States

Every course in your tracker has one of these states:

| State | Meaning |
|---|---|
| **Evaluated** | You've read the A–G report; not yet enrolled |
| **Enrolled** | You signed up |
| **In Progress** | You've started the course |
| **Completed** | Finished |
| **Dropped** | Started but stopped |
| **SKIP** | Decided not to pursue |

---

## 5. A 15-Minute Walkthrough

### Discover a free course

1. Open Learn-Ops (`run.bat` or `npm run menu`)
2. Select **Find free trainings** → wait for the scan to finish
3. Open `data/learning-inbox.md` — new course URLs are listed there

### Evaluate a course

1. Copy a course URL from the inbox (or any course URL you found)
2. Open Claude Code: type `claude` in a terminal inside the learn-ops folder
3. Type: `/learn-ops course https://your-course-url-here`
4. Read the A–G report and **DO / DON'T DO / DO WITH TIMEBOX** verdict

### Track your enrollment

Evaluations are automatically added to `data/enrollments.md`.
To see a summary:

1. Open Learn-Ops
2. Select **View my enrollments**

---

## 6. Getting Help

- Run **Check system health** from the menu to diagnose most issues
- See [INSTALL.md](../INSTALL.md) for setup troubleshooting
- Full reference: [docs/USER_GUIDE.md](USER_GUIDE.md)
