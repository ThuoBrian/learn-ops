# Mode: project — Portfolio Project Evaluation

**URL / Description:** {project-url-or-description}
**Legitimacy:** {High Confidence | Proceed with Caution | Suspicious}

Scoring matrix with 6 dimensions (1–5):

| Dimension | Weight | 5 = … | 1 = … |
|-----------|--------|--------|--------|
| Archetype skill signal | 25% | Directly builds a target skill from the learner's archetype | Unrelated to archetype |
| Uniqueness | 20% | Nobody has done this publicly | Very common tutorial clone |
| Demo ability | 20% | Live demo or runnable notebook in 2 min | Code only, not sharable |
| Metrics potential | 15% | Clear metrics (accuracy, latency, cost, detection rate) | No measurable outcome |
| Time to MVP | 10% | 1 week | 3+ months |
| Portfolio story potential | 10% | Rich narrative with trade-offs and decisions | Implementation only |

Load `config/learner-profile.yml` → `learner.archetype_id`, then `config/archetypes.yml`
→ `target_skills` and `portfolio_deliverables` for the archetype. Score "Archetype skill
signal" against those lists.

## Portfolio Deliverable Requirements

For each approved project, the learner should produce:
1. **README / one-pager**: problem statement + architecture + metrics + what was learned
2. **Demo**: live URL, Colab notebook, or 2-min recorded walkthrough
3. **Postmortem**: what worked, what didn't, what would be done differently

Map the project's output to the archetype's `portfolio_deliverables`. A project that
produces a shippable, measurable artifact scores higher than one that yields only a
completion badge.

## 80/20 Plan

- Week 1 → MVP with core metric instrumented
- Week 2 → polish + portfolio writeup

## Verdicts

- **BUILD** → plan with weekly milestones keyed to archetype skill gaps
- **SKIP** → why and what to build instead (suggest a project that fills a bigger gap)
- **PIVOT TO [alternative]** → more impactful variant for the learner's archetype
