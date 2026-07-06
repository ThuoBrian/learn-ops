# Mode: batch — Batch Processing of Pending Course URLs

Evaluate multiple course URLs from `data/learning-inbox.md` in sequence, producing a
report and tracker entry for each. Use this when the inbox has accumulated several URLs
and the learner wants to process them all in one session.

## Architecture

```text
Batch orchestrator (this mode)
  │
  │  Reads data/learning-inbox.md → pending URL list
  │
  ├─ URL 1: delegate to `course` mode → report .md + tracker TSV
  ├─ URL 2: same
  └─ End: merge tracker-additions → data/enrollments.md + summary
```

Each URL is evaluated independently. The orchestrator tracks progress so a partial run
can be resumed without re-evaluating completed items.

## Files

```text
data/
  learning-inbox.md         # Pending URLs (source)
batch/
  batch-input.tsv           # URLs extracted from inbox (auto-generated)
  batch-state.tsv           # Progress per URL (auto-generated, gitignored)
  batch-runner.sh           # Standalone shell orchestrator
  batch-prompt.md           # Prompt template for headless workers
  logs/                     # One log per URL (gitignored)
  tracker-additions/        # Tracker TSV lines (gitignored until merged)
```

## Mode A: Interactive (agent-driven)

1. **Read inbox**: Parse `data/learning-inbox.md` → collect all lines in the `## Pending`
   section that contain URLs.
2. **Show queue**: List the pending URLs with a count.
3. **Read state**: Check `batch/batch-state.tsv` → skip any URLs already marked `completed`.
4. **For each pending URL**:
   a. Run `node check-liveness.mjs <url>` — skip if unreachable (mark `failed` in state).
   b. Reserve a report number: `node reserve-report-num.mjs` → NNN.
   c. Delegate to `course` mode: evaluate the URL using the full A-G rubric.
   d. Write report to `reports/{NNN}-{provider-slug}-{YYYY-MM-DD}.md`.
   e. Release sentinel: `node reserve-report-num.mjs --release {NNN}`.
   f. Write tracker line to `batch/tracker-additions/{NNN}-{slug}.tsv`.
   g. Mark URL `completed` in `batch/batch-state.tsv`.
   h. Move the URL line from `## Pending` to `## Processed` in `data/learning-inbox.md`.
5. **After all URLs**: run `node merge-tracker.mjs` to flush into `data/enrollments.md`.
6. **Summary**: show counts (processed / failed / skipped) and top-scoring courses.

### What to watch during a run

1. The agent conversation — turn-by-turn narration of which URL is being evaluated.
2. `batch/batch-state.tsv` — progress per URL (safe to inspect mid-run).

## Mode B: Standalone script

```bash
batch/batch-runner.sh [OPTIONS]
```

Options:

- `--dry-run` — list pending URLs without evaluating
- `--retry-failed` — retry only URLs marked `failed`
- `--resume-paused` — resume URLs paused after a session/rate limit
- `--start-from N` — start from inbox item N
- `--limit N` — max number of URLs to process in this run
- `--parallel N` — N workers in parallel (default: 1 — sequential is safer)
- `--max-retries N` — attempts per URL (default: 2)
- `--rate-limit-sleep N` — seconds to wait before retrying after a rate limit (default: 300)

## batch-state.tsv Format

```
id  url           status       started_at  completed_at  report_num  score  error        retries
1   https://...   completed    2026-...    2026-...      002         4.2    -            0
2   https://...   failed       2026-...    2026-...      -           -      Unreachable  1
3   https://...   pending      -           -             -           -      -            0
```
(columns are tab-separated in the actual file)

Valid statuses: `pending`, `processing`, `completed`, `failed`, `skipped`, `rate_limited`,
`paused_rate_limit`.

## Resumability

- If a run crashes → re-run → reads `batch-state.tsv` → skips completed URLs.
- Lock file (`batch-runner.pid`) prevents concurrent execution.
- Each URL is independent: a failure on URL #5 does not affect #6 onwards.

## Workers (headless / standalone mode)

Each worker receives `batch/batch-prompt.md` as a system prompt. It is self-contained.
See the **Headless / Batch Mode** table in `AGENTS.md` for the correct CLI headless command.

Each worker produces:

1. `.md` report in `reports/`
2. Tracker TSV line in `batch/tracker-additions/{id}.tsv`
3. Result JSON via stdout

## Error Handling

| Error | Recovery |
| ----- | -------- |
| URL unreachable | Mark `failed`, log reason, continue to next URL |
| Free track paywalled | Evaluate as `DON'T DO` (Block G), mark completed |
| Worker crashes | Mark `failed`, continue. Retry with `--retry-failed` |
| Session/rate limit | Mark `paused_rate_limit`, stop. Resume with `--resume-paused` |
| Orchestrator crashes | Re-run → reads state → skip completed |

## After the Batch

Run `node verify-pipeline.mjs` to confirm the tracker is clean after the merge.
