# Codex Guide

Learn-ops supports Codex through the same shared router used by the other CLI integrations.

## How Codex maps to learn-ops

- `AGENTS.md` is the shared instruction source.
- Root `CODEX.md` is the thin Codex wrapper that imports `AGENTS.md`.
- This file is the human-facing guide for running learn-ops workflows from Codex.

## Interactive Codex

Start Codex in the repository root:

```bash
cd learn-ops
codex
```

Codex may not expose a native `/learn-ops` slash command. When it does not, ask for the same workflow in plain language:

```text
Evaluate this course with learn-ops: https://provider.com/courses/example
Run the learn-ops learn-scan mode and summarize new free trainings found.
Run the learn-ops learn-pipeline mode for data/learning-inbox.md.
Run the learn-ops learnplan mode to generate my learning roadmap.
Run the learn-ops tracker mode and summarize my current enrollment statuses.
```

## One-shot workers

For single commands or batch workers, use `codex exec`:

```bash
codex exec "Evaluate this course with learn-ops: https://provider.com/courses/example"
codex exec "Run learn-ops learn-scan mode in this repo and summarize new free trainings."
codex exec "Run learn-ops learn-pipeline mode for data/learning-inbox.md."
codex exec "Run learn-ops learnplan mode to generate my learning roadmap."
codex exec "Run learn-ops tracker mode and summarize my current enrollment statuses."
```

## Notes

- If your Codex environment exposes slash commands, the shared `/learn-ops` router semantics still apply.
- If it does not, use the same mode names through prompts or `codex exec`.
- Browser-heavy flows such as `scan`, `pipeline`, and `apply` still depend on Playwright browser tools being available in the active agent setup.
