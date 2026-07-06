# Mode: deep — Provider / Platform Deep Research

Research a training provider or course platform in depth before committing time to it.
Use this when the learner wants a full picture of a provider before enrolling (catalog
breadth, free-tier honesty, cert recognition, lab quality, update cadence).

## Usage

```
/learn-ops deep <provider-name-or-URL>
```

Example: `/learn-ops deep "Coursera"` or `/learn-ops deep https://academy.cloudflare.com`

## Context Loading

This mode is standalone — it does NOT load `_shared.md`.

Load before starting:
- `config/learner-profile.yml` → archetype_id, target_track, learning_goals
- `config/archetypes.yml` → target_skills and recommended_free_certs for the archetype
- `learning-portals.yml` → whether the provider is already tracked and its known free offerings

## Research Budget

Hard cap: **8 WebSearch queries** across all 6 axes. Prefer targeted multi-answer queries.
Do not spawn subagents or invoke the `course` mode inline. If specific course URLs surface,
suggest them for follow-up with `/learn-ops course <url>`.

## Step 1 — Provider Profile

Identify the provider and build a baseline:

| Field | Value |
|-------|-------|
| Provider name | |
| URL | |
| Parent org / owner | |
| Primary focus | AI/ML / Cybersecurity / Cloud / Broad |
| Free-tier model | fully-free / free-audit / financial-aid / freemium |
| Founded / last major update | |
| TL;DR | one sentence |

## Step 2 — Six Research Axes

### Axis 1 — Catalog Breadth for the Learner's Track

Map what the provider offers against the learner's archetype `target_skills`:

| Target skill (from archetype) | Provider coverage | Free? |
|-------------------------------|------------------|-------|
| … | … | … |

Gaps: skills not covered or covered only in paid tiers.

### Axis 2 — Free-Tier Honesty

- Is the free track genuinely free, or is the cert/graded assignment paywalled?
- Are labs included for free or subscription-only?
- Are there time-limited trials masquerading as "free"?
- Any hidden costs discovered? (proctoring fees, lab credits, upgrade prompts)

**Flag** any provider that obscures paid requirements as "Proceed with Caution."

### Axis 3 — Certificate Industry Recognition

- Are the certificates listed in target-role job postings? (Search or infer from JD language)
- Are they listed in the archetype's `recommended_free_certs`?
- Are they accepted by employers, or are they purely self-improvement signals?
- Any industry body accreditation (CompTIA, ISC2, Google, Microsoft, AWS)?

### Axis 4 — Hands-On Lab Quality

- Are there labs, guided projects, or capstone exercises?
- Are labs browser-based (no local setup) or require VMs?
- Do projects produce a shareable artifact (GitHub, live demo, writeup)?
- How do learner reviews describe the practical depth?

### Axis 5 — Content Freshness

- When was the curriculum last updated?
- Is the technology stack current (e.g. TensorFlow 2.x, Python 3.10+, current cloud APIs)?
- Are there community reports of stale content?
- Is the provider actively adding new courses or maintaining existing ones?

### Axis 6 — Community & Support

- Is there an active learner forum or Discord?
- Are instructors responsive to questions?
- Learner completion-rate signals (where available)?
- How do learners rate the platform on independent review sites?

## Step 3 — Archetype Fit Score

Score the provider 1–5 for the learner's specific archetype:

| Dimension | Score | Notes |
|-----------|-------|-------|
| Target-skill coverage | /5 | |
| Free-tier completeness | /5 | |
| Certificate recognition | /5 | |
| Lab / hands-on quality | /5 | |
| Content freshness | /5 | |
| Community & support | /5 | |
| **Overall** | **/5** | weighted average |

Weighting: target-skill coverage 30%, free-tier completeness 20%, cert recognition 20%,
labs 15%, freshness 10%, community 5%.

## Step 4 — Verdict and Recommendations

**EXPLORE** (≥4.0) — recommend 2–3 specific courses to evaluate next with `/learn-ops course`.

**SELECTIVE** (3.0–3.9) — identify the 1–2 strong areas and flag the gaps. Worth exploring
for specific topics only.

**SKIP** (<3.0) — explain why. Suggest a better provider for the same track.

## Step 5 — Output Report

Save to `reports/deep-{provider-slug}-{YYYY-MM-DD}.md` with:
- Provider Profile table (Step 1)
- Six-axis summary (Step 2)
- Fit score table (Step 3)
- Verdict + top course recommendations (Step 4)
- `**Legitimacy:** {High Confidence | Proceed with Caution | Suspicious}` header

## Source-of-Truth Boundary

Claims about the learner's background come ONLY from `config/learner-profile.yml`,
`config/archetypes.yml`, and `learner-profile.md`. Reformulate, never fabricate.
Claims about the provider come from WebSearch and the provider's own site — cite sources.
