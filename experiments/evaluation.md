---
title: "Evaluation criteria"
status: proposal
updated: 2026-11-03
---

# Evaluation criteria

Evaluate whether shared infrastructure improves the whole lifecycle, not only steady-state throughput. Report baselines, workload distribution and sequence, target conditions, and which costs were included. A measured win is not a dominance theorem; a lower-bound gap is meaningful only within its stated model and class.

| Area | Criteria |
|---|---|
| Semantics and evidence | contract satisfaction under stated environment and fault models · correct distinction among proof, test, prediction, assumption, and permission · preservation or discharge of accepted obligations during change · correct handling of missing historical information |
| Resource and adaptation cost | search, compilation, observation, and model-maintenance costs · steady-state latency, throughput, energy, memory where meaningful · tail behavior and stated robustness assumptions · migration pauses, temporary resource peaks, recovery cost · metadata overhead removed by specialization vs overhead that remains |
| Usability and scope | can an author inspect and override a local decision without rewriting the system · can independent domain packages share evidence and identity with meaningful coupling · can a change invalidate only the claims and artifacts that depend on it · does the representation preserve access to hand-tuned implementations · are unresolved intent and model uncertainty visible rather than silently decided |
