---
title: "E1: an exact collection chooses and changes its representation"
status: experiment
updated: 2026-11-03
---

# E1: an exact collection chooses and changes its representation

Demanding but bounded: one artifact exercises semantic freedom, extensible analysis, profiling, cost models, derived state, resource constraints, consistency envelopes, and state migration.

**Specification.** The author declares membership and range queries, updates, snapshot behavior (what a reader in progress sees), identity and order observations, resource objectives, and optionally workload expectations (a prior with provenance). The author never chooses a hash table, tree, filter, or sort.

**Candidates.** Hash table; sorted storage with an update buffer; ordered tree; a filter rejecting definite misses with exact verification of possible matches; learned index; query-specific materializations. The system considers the whole workload, including whether one ordering benefits several consumers.

**The hard part.** Change the workload during execution under concurrent access. The system must (1) decide whether expected benefit over the horizon justifies another representation, minus search, measurement, migration, and interference costs, with hysteresis, and sometimes decline; (2) construct it while capturing concurrent writes; (3) publish the new representation *together with compatible query code*; (4) keep existing readers valid; (5) retire the old representation respecting reader lifetimes.

**Must demonstrate.** The difference between invalidating a performance prediction (more writes than expected: sorted representation unattractive, still correct) and a correctness assumption (binary-search code published against unsorted data) · all seven transition fields concretely ([Change](../design/change.md)) · decisions with provenance visible in a view: which model chose this, under what frontier, what switching would cost · a worst-case bound beside every expected-cost choice.

**Traces.** Skewed reads, write bursts, adversarial keys, short-lived workloads, repeated reversals.

**Failure.** Performance drift confused with correctness invalidation; a transition violating a snapshot; oscillation.

**Extensions, in order.** The same protocol across a device boundary (part of the collection on an accelerator or remote node); an explicitly approximate operation (Bloom-style membership with a declared false-positive distortion): does the abstraction survive relaxation; then [E3](contract-change.md) ([E2](three-realizations.md) precedes this experiment in the roadmap). If the protocol does not survive a hash table becoming a sorted buffer under concurrent writes, it will not survive an accelerator. Concepts: [Models](../design/models.md), [Justification](../design/justification.md).
