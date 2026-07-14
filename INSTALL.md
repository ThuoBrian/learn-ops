# Learn-Ops — Installation Guide

Find free AI/ML and cybersecurity courses, certificates, and scholarships —
matched to your goals — and keep track of what you've enrolled in, all from a
simple menu. No coding experience needed.

> Already comfortable with a terminal and Git? See the **For developers**
> section in [README.md](README.md) for the command-line install instead.

---

## Requirements

- Windows 10 or Windows 11
- An internet connection

That's it. Everything else is installed automatically.

---

## Step 1 — Install Node.js (one-time)

Learn-Ops runs on Node.js. If you already have it, skip to Step 2.

1. Go to **[nodejs.org/en/download](https://nodejs.org/en/download)**
2. Click **Windows Installer (.msi)** under the LTS version
3. Run the installer and click through the defaults
4. When it finishes, close and reopen any open terminal windows

---

## Step 2 — Set up Learn-Ops (one-time)

1. Extract the `learn-ops.zip` file you downloaded
2. Open the extracted folder
3. Double-click **`setup.bat`**
4. A window will open and install everything automatically
5. This takes about 5 minutes — mostly downloading the browser used for scanning
6. When you see **"Setup complete!"**, you're ready

> If Windows shows a blue "Windows protected your PC" warning, click
> **More info** then **Run anyway**. This is normal for scripts downloaded
> from the internet.

---

## Step 3 — Start Learn-Ops

Double-click **`run.bat`** in the learn-ops folder.

You'll see a menu like this:

```
  Learn-Ops — Free Training Finder
  ────────────────────────────────────

? What would you like to do?
❯   Find free trainings
    View my enrollments
    Check system health
    Update the system
    ──────────────────────
    Evaluate a course (needs Claude)
    Process pending URLs (needs Claude)
    My enrollment roadmap (needs Claude)
    ──────────────────────
    Exit
```

Use the **arrow keys** to move up and down, then press **Enter** to select.
Press **Ctrl + C** at any time to quit.

---

## Menu options explained

| Option | What it does |
|---|---|
| **Find free trainings** | Scans the web for free courses and certifications matching your profile |
| **View my enrollments** | Shows all courses you've evaluated, enrolled in, or completed |
| **Check system health** | Verifies everything is installed and working correctly |
| **Update the system** | Downloads the latest version of Learn-Ops |
| **Evaluate a course** | Scores a specific course against your goals (needs Claude) |
| **Process pending URLs** | Batch-evaluates a list of course URLs you've saved (needs Claude) |
| **My enrollment roadmap** | Generates a personalised learning plan (needs Claude) |

---

## Troubleshooting

**"Setup not complete" when I run run.bat**
Run `setup.bat` first. It must finish successfully before `run.bat` will work.

**"Node.js is not installed" during setup**
Follow Step 1 above, then run `setup.bat` again.

**The menu appears garbled or misaligned**
Try resizing your terminal window to be wider (at least 80 characters).
On Windows Terminal or PowerShell, drag the window edge to make it wider.

**"Browser install failed" during setup**
This is usually a temporary network issue. Run `setup.bat` again, or open a
terminal in the learn-ops folder and run:
```
npx playwright install chromium --with-deps
```

**Something else is broken**
Run `setup.bat` again — it will repair the installation.
If the problem persists, contact your system administrator.

---

## Keeping Learn-Ops up to date

Select **Update the system** from the menu to get the latest version.
You do not need to re-run `setup.bat` after an update.
