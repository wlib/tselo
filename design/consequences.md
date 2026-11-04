---
title: "Consequences: what dissolves, what inverts, where it goes"
status: proposal
updated: 2026-11-03
---

# Consequences: what dissolves, what inverts, where it goes

What follows if every idea in the design is carried to its end. Each row is a proposal whose status is untested; the test, where one exists, is named in the home note.

## What dissolves

| Today | Here | Home |
|---|---|---|
| tests, specs, docs, implementations | one relation seen from four directions: the specification is the relation with no direction, an implementation runs it forward, a property test runs it backward over samples, documentation is a view. There is no test suite, only accepted evidence; continuous integration is the derivation graph re-running the checkers an edit invalidated; a flaky test is an empirical claim with a wrong collection policy | [Language](language.md), [Justification](justification.md) |
| versions, lockfiles, vendoring, the diamond problem | edits, frontiers, transitions; a dependency pins a contract and a trust policy; semantic versioning was a human approximation of a signature diff, now computed | [Change](change.md), [Store](store.md) |
| deploy, rollback, blue-green, canary, feature flags | a transition with seven fields and particular settings of its publication and divergence fields; rollback is possible exactly when the commit boundary allows | [Change](change.md) |
| the debugger | a provenance query: every decision carries the model that made it, the frontier it was made at, and the facts it rested on; replay reaches as far back as inputs, nondeterministic choices, and schedules were retained, which is a retention decision ([Commitment](commitment.md), C74); the question is "why does this decision still exist" | [Store](store.md), the editor |
| serialization formats, the network stack | channel contracts: the wire format is derived per link; schema evolution is codec state with the old version as side information; each logical channel gets the ordering and reliability its admitted interactions require | [Codecs](codecs.md), [Runtime](runtime.md) |
| security review, constant-time discipline | observer declarations: a side channel is an observer the contract said did not exist; hardware declares which observers each cell exposes; constant-time becomes an elimination license; differential privacy is an approximation edge whose error contract is ε | [Observers](observers.md), [Chipset family](../hardware/chipset-family.md) |
| code review | certificate checking: a pull request is a transition proposal with evidence; the human reviews intent and the assertions, not the diff | [Justification](justification.md) |

## What inverts

| Today | Here | Home |
|---|---|---|
| exact by default, approximation a technique | exactness is an explicit requirement that costs energy; the power delivery network is compiler-controlled per region per phase | [Quantities](quantities.md) |
| hardware sold as a SKU | hardware sold as measured: each die's characterization is its self-description, binning is per-die curves, a defective cell is a cell with a worse curve the mapper routes around, and the description is recalibrated over the device's life | [Chipset family](../hardware/chipset-family.md) |
| binaries, app stores, "build for ARM" | distributing claims; a device extracts its own realization against its own description, cached for everyone with the same description hash | [Language](language.md), [Claim store](claim-store.md) |
| a chipset as a product | a chipset family as a protocol: self-describing cells can be chiplets from different vendors, assembled per workload class from the store's demand statistics; the generator fabricates only what no vendor covers | [Chipset family](../hardware/chipset-family.md) |
| procurement separate from compilation | the slowest binding time on one ladder with branch prediction; capacity planning is optimization at the month scale; commodity self-descriptions are crowd-sourced across the fleet | [Commitment](commitment.md), [Models](models.md) |
| production separate from experiment | exploration is a budgeted fraction of the fleet; canaries, A/B tests, chaos engineering, and profiling are one mechanism: controlled alternative execution under a collection policy | [Models](models.md) |
| arbitration implicit | a global metric counted and minimized like energy; "how much of this system is monotone" is a number | [Irreducibles](irreducibles.md), [Runtime](runtime.md) |
| cycles per program | joules and seconds per distinction delivered to an observer, the one unit in which compression, computation, and communication are priced; this is the metric that makes "beat C at everything" assessable | [Information economy](information-economy.md), [Observers](observers.md) |
| identity absolute | identity observer-relative: semantic identity is class membership under a trust policy; attribution and licensing become evidence problems | [Claim store](claim-store.md) |

## Where it goes

- **Humanity's software becomes a dictionary.** Lift the corpus and triangulate across it; functions cluster into classes, and the long tail is mostly a few thousand ideas wearing different commitments. Writing a program becomes choosing contracts and declaring observers. The store must be self-describing enough that a future system can lift the store itself, since a building or a spacecraft outlives any format ([Onboarding](onboarding.md)).
- **Markets answer the supply question.** Who produces certificates and reproductions for the long tail is answered by paying for them: bounties priced by the value of the information, reputation as a believed-kind model, reproducers paid for independence. Mechanism design enters the stack as a participant, and independence has to be worth more than collusion ([Trust](trust.md), Q56).
- **Organizations are realizations.** A business process is a program whose cells include people, with contracts for capability, latency, and error rate, and whose authority is real authority; a reorganization is a boundary move with authority transfer ([Change](change.md)); regulation enters the permitted column and a building code is a checker over geometry ([Realization](realization.md)).
- **The human's job becomes intent, observation, and authority.** Authors write contracts, laws, examples, tolerances, and preferences, then curate the fronts the system grows; agents propose, checkers decide, humans authorize boundary moves and resolve the disagreements the store can represent but not dissolve. The primary interface is the explanation surface ([Store](store.md)).
