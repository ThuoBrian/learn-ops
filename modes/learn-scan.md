# Mode: learn-scan — Free Training Discovery

Scans configured free-learning providers (Coursera, Kaggle, PortSwigger, …) listed in
`learning-portals.yml`, filters by topic relevance, and adds new free trainings to the
inbox (`data/learning-inbox.md`) for subsequent evaluation via `course` / `learn-pipeline`.

## Recommended Execution

Execute as a worker/subagent to avoid consuming the main interactive context:

```
Agent(subagent_type="general-purpose", prompt="[this file + _shared.md + data]", run_in_background=True)
```

The subagent is a **single-pass worker**: it runs the scan directly with the
providers/APIs/WebSearch named below. It must NOT spawn further subagents or invoke
other skills. Discovery is bounded by `learning-portals.yml`.

## Zero-token scanner (Level 0 + Level 2)

Run `node scan.mjs` at the start. This covers HTTP-scrape / catalog providers in a
single zero-token step and returns which sources succeeded. Flags:

| Flag | Meaning |
|------|---------|
| `--dry-run` | Preview without writing files |
| `--company <Name>` | Scan a single source only |

`scan.mjs` reads `learning-portals.yml` (`tracked_companies` + `title_filter` acting as
the topic filter). Each provider only returns free / free-via-aid / scholarship items, so
no cost filter is needed at the scan layer. New items are appended to
`data/learning-inbox.md` and `data/scan-history.tsv`.

## Level 3 — WebSearch handoff

Sources `scan.mjs` can't hit (no provider adapter) are discovered via the `search_queries`
in `learning-portals.yml` (Fast.ai, DeepLearning.AI, TryHackMe, ISC2 CC, MIT OCW, Stanford,
scholarships). Run them via WebSearch. For each hit extract: title, provider, URL, cost tier,
duration, level. Discard paid-only and non-AI/ML/cybersecurity results.

## Dedup

Dedup against `data/scan-history.tsv` + `data/learning-inbox.md` (URL + provider::title).
Only genuinely new free trainings are appended to `## Pending` in the inbox:
`- [ ] {url} | {provider} | {title} | {cost_tier}`.

## Output

Return a concise summary: sources scanned, items found, filtered, duplicates skipped,
new trainings added (bulleted: provider — title — cost tier), sources not covered, errors.
Discovery only — do NOT evaluate (that's `course` / `learn-pipeline`).