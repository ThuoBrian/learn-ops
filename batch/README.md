# Batch Processing

Process multiple course URLs in parallel via headless workers. Each worker runs the full A–G evaluation pipeline (report + tracker line) autonomously. See the **Headless / Batch Mode** table in `AGENTS.md` for the correct command per CLI.

## Quick Start

1. **Add course URLs** to `batch-input.tsv` (tab-separated: `id`, `url`, `source`, `notes`):

   ```tsv
   id	url	source	notes
   1	https://www.coursera.org/learn/machine-learning	Coursera	
   2	https://www.kaggle.com/learn/intro-to-ml	Kaggle	priority
   ```

2. **Dry run** to preview what will be processed:

   ```bash
   ./batch/batch-runner.sh --dry-run
   ```

3. **Run the batch**:

   ```bash
   ./batch/batch-runner.sh
   ```

4. **Results** are automatically merged into `data/enrollments.md`, processed URLs are reconciled out of the `data/learning-inbox.md` inbox, and integrity is verified with `verify-pipeline.mjs` at the end of the run.

## Options

| Flag | Default | Description |
|------|---------|-------------|
| `--parallel N` | `1` | Number of concurrent headless workers |
| `--dry-run` | off | Preview pending courses without processing |
| `--retry-failed` | off | Only retry courses marked as `failed` in state |
| `--resume-paused` | off | Resume courses paused after a session/rate limit |
| `--start-from N` | `0` | Skip courses with ID below N |
| `--limit N` | `0` | Max number of courses to process in this run (0 = no limit) |
| `--max-retries N` | `2` | Max retry attempts per course before giving up |
| `--rate-limit-sleep N` | `300` | Seconds to wait before retrying a rate-limited worker; use `0` to pause immediately |

## Directory Layout

```
batch/
  batch-runner.sh          # Orchestrator script
  batch-input.tsv          # Input course URLs (you create this)
  batch-state.tsv          # Processing state (auto-managed, resumable)
  logs/                    # Per-course worker logs ({report_num}-{id}.log)
  tracker-additions/       # TSV lines produced by workers
    merged/                # TSVs already merged into enrollments.md
```

## How It Works

1. **batch-runner.sh** reads `batch-input.tsv` and `batch-state.tsv` to determine which courses need processing.
2. For each pending course, it assigns a report number and launches a headless worker to run the A–G evaluation.
3. Each worker evaluates the course, writes a report to `reports/`, and writes a tracker TSV to `tracker-additions/`.
4. After all workers finish, batch-runner calls `merge-tracker.mjs` to merge TSVs into `data/enrollments.md`, `reconcile-pipeline.mjs` to move processed URLs out of the `data/learning-inbox.md` inbox, and `verify-pipeline.mjs` to check integrity.

## Tracker Merge

Workers write one TSV per course to `batch/tracker-additions/`. The merge script (`npm run merge`) handles:

- Deduplication by provider + course title and report number
- In-place updates when a re-evaluation changes the score
- Moving processed TSVs to `tracker-additions/merged/`

Run `npm run merge` manually if you need to merge outside of a batch run.

## Pipeline Reconcile

Batch mode reads courses from `batch-input.tsv`, but the `data/learning-inbox.md` inbox is a separate list. Without reconciliation, a course evaluated by a batch run stays in the inbox `## Pending` section and gets surfaced again on the next scan — producing duplicate reports.

`reconcile-pipeline.mjs` (run as `npm run reconcile`) closes that gap: after the tracker merge, every `completed` or `skipped` course in `batch-state.tsv` whose URL is still in the inbox `## Pending` section is moved to `## Processed` with its report link and score. It is idempotent — safe to run after every batch, or manually.

## Resumability

`batch-state.tsv` tracks the status of every course (`pending`, `processing`, `completed`, `failed`, `skipped`, `rate_limited`, `paused_rate_limit`). If the batch is interrupted, re-running `batch-runner.sh` picks up where it left off. Resume rate-limited rows after the limit resets:

```bash
./batch/batch-runner.sh --resume-paused
```

A PID-based lock file (`batch-runner.pid`) prevents concurrent batch runs. If a previous run crashed, the stale lock is detected and removed automatically.

## Prerequisites

- Your CLI in PATH (see **Headless / Batch Mode** table in `AGENTS.md`)
- Node.js >= 18, Playwright chromium installed (`npm run doctor` to verify)
- `batch-input.tsv` with at least one course URL
