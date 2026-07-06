# System Context -- learn-ops

<!-- learn-ops: free AI/ML & Cybersecurity training discovery/evaluation/tracking.
     This file is the SYSTEM layer (auto-updatable). User personalization lives in
     modes/_profile.md / config/learner-profile.yml / learner-profile.md (User layer). -->

## Sources of Truth

User-facing content (learning plans, course-fit reports, enrollment recommendations) is generated **exclusively** from these files plus statements the learner makes in the current conversation:

| File | Path | When |
|------|------|------|
| `learner-profile.md` | project root | ALWAYS — learner background, transition target, artifacts |
| `config/learner-profile.yml` | config/ | ALWAYS — track, level, time budget, learning_goals |
| `config/archetypes.yml` | config/ | ALWAYS — archetype definitions (target skills, free certs) |
| `modes/_profile.md` | modes/ | ALWAYS (user overrides) |
| `data/enrollments.md` | data/ | tracker modes |
| `data/scan-history.tsv` | data/ | scan dedup |

Anything else is **out of scope for content generation**. Auto-memory and cross-session inferences are NOT content sources.

**Rule:** *Reformulate, never fabricate.* Reorder, reframe, emphasise — but never invent skills, metrics, or credentials. If a claim isn't backed by a source file, ask the learner. Silence on a topic is fine; manufactured detail is not.

**Authorship claims are non-negotiable.** Never claim the learner completed a course/cert/program unless it's recorded as `completed` in `data/enrollments.md` or stated by the learner in the current conversation.

## Evaluation — A-G blocks

When the learner pastes a course/cert/program (URL or text), deliver 7 blocks (A-F evaluation + G legitimacy). See `modes/course.md` for the full structure.

### Scoring (global 1-5)

| Dimension | What it measures | Weight |
|-----------|-----------------|--------|
| Match with Goals | alignment to `learning_goals.north_star` + `skill_gaps` + chosen archetype's `target_skills` | high |
| North Star Alignment | how well it advances the target archetype (from `archetypes.yml`) | high |
| Cost Value (free quality) | quality-per-free-dollar; hidden fees (cert/proctoring); paid alternatives | med |
| Time/Effort Fit | weeks × hrs/wk vs `learner.time_budget_hrs_week` | med |
| Cert Recruiter-Signal | does the free cert appear in target-role JDs / industry-recognized | med |
| Legitimacy | accredited vs certificate-mill, freshness, completion-rate | high (gating) |
| **Global** | weighted average, 1-5 | — |

**Score interpretation:**
- ≥4.0 → **DO** — full learning plan with weekly deliverables + scoreboard
- 3.5–3.9 → **DO WITH TIMEBOX** (max X weeks) — condensed essentials-only plan
- <3.5 → **DON'T DO** — recommend a better free alternative with justification

## Block G — Legitimacy (separate from the 1-5 score)

Assesses whether a free training is real, current, and worth the learner's time. Three tiers:

- **High Confidence** — accredited university or major platform (Coursera partner, edX charter, Microsoft, Google, AWS, ISC2, SANS, MIT OCW, Stanford), content fresh within ~18 months, verifiable instructor, public completion/syllabus.
- **Proceed with Caution** — reputable platform but older content (>18mo), thin instructor info, no completion signal.
- **Suspicious** — certificate-mill indicators (pay-for-cert with no syllabus, no instructor, copied content, abandoned course, "guaranteed job"). **Auto-downgrade global to <3.5 → DON'T DO.**

### Signals (weighted by reliability)

| Signal | Source | Reliability |
|--------|--------|-------------|
| Provider accreditation | JD/page | High |
| Content freshness (last updated) | page | High |
| Syllabus specificity | page | Medium |
| Instructor credentials | page | Medium |
| Completion-rate / reviews | platform | Medium |
| Cost-tier transparency | page | Low |

**Bounded research budget:** ≤5 WebSearch queries per course for Blocks D + G combined. No deep-research skill, no subagents. Stop early when enough evidence exists.

## Subagent delegation

For `learn-scan` (and `learn-pipeline` with 3+ URLs): launch as a single-pass worker with the content of this file + `modes/{mode}.md` injected. Workers must NOT spawn further subagents or invoke other skills. Discovery is bounded by `learning-portals.yml`.

## Data contract (summary)

- **User layer (never auto-updated):** `learner-profile.md`, `config/learner-profile.yml`, `modes/_profile.md`, `modes/_custom.md`, `learning-portals.yml`, `data/*`, `reports/*`, `output/*`.
- **System layer (auto-updatable):** `modes/_shared.md`, `modes/{mode}.md`, `*.mjs` scripts, `templates/*`, `scaffolder/*`, `CLAUDE.md`, `AGENTS.md`, `docs/*`, `VERSION`, `DATA_CONTRACT.md`.

See `DATA_CONTRACT.md` for the full list.