# Mode: learn-pipeline — Course URL Inbox

Process free course/cert URLs stored in `data/learning-inbox.md`. The learner adds URLs
at any time, then runs `/learn-ops learn-pipeline` to evaluate them all.

## Availability sweep

Run `node check-liveness.mjs --file <tmpfile>` over all `## Pending` URLs before the
per-URL loop. Drop dead/unavailable entries to `## Processed` as
`- [x] ~~URL | Provider | Course~~ — unavailable (availability sweep)`. Do not evaluate them.

## Workflow

1. Read `data/learning-inbox.md` → `## Pending` `- [ ]` items. Run the availability sweep first.
2. For each surviving URL:
   a. `node reserve-report-num.mjs` → NNN.
   b. Extract the course page (WebFetch; Playwright fallback if available).
   c. Execute `modes/course.md` (A-G eval → report → verdict → learning plan).
   d. PDF: skip by default (learning plans are markdown); generate on demand via `learnplan`.
   e. Move to `## Processed`: `- [x] #NNN | URL | Provider | Course | Score/5 | Plan ✅/❌`.
3. For 3+ pending URLs, launch parallel single-pass agents (one per URL).
4. Summary table: `| # | Provider | Course | Score | Plan | Recommended action |`.

## Format of learning-inbox.md

```
## Pending
- [ ] https://www.kaggle.com/learn/python
- [ ] https://portswigger.net/web-security/sql-injection | PortSwigger | SQL injection | free
## Processed
- [x] #001 | https://... | Kaggle | Intro to ML | 4.2/5 | Plan ✅
## Skipped (not free / not eligible)
- [!] https://... — paid only / geo-restricted / unavailable
```

## Automatic numbering

`node reserve-report-num.mjs` to claim NNN; `node reserve-report-num.mjs --release NNN`
after the report is written.