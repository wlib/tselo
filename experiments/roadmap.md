---
title: "Roadmap"
status: proposal
updated: 2026-11-03
---

# Roadmap

The order in which to build so each step tests a claim and nothing depends on silicon until the software model has survived. Not a committed plan.

| Phase | Build | Tests |
|---|---|---|
| 0 Vocabulary | Freeze the field lists in [Schemas](../design/schemas.md): record, theory, judgment, verbs, implementation package, transition, checker output, situation object, claim edge and key. Write the target self-description vocabulary as a theory and exercise it against a probed commodity CPU, an FPGA fabric, and a simulated generator instance. Schemas, not prose. | precision of the contracts; whether the extension mechanism, not the vocabulary, is the treaty (Q53) |
| 1 Seed and tissue | The seed interpreter and flat record store, probed host as first cell ([Bootstrap](../design/bootstrap.md)); then [E2 Three realizations](three-realizations.md) and [E5 Connective tissue](connective-tissue.md) developed together on the running example ([Spine](../design/spine.md)): the windowed filter is the computation, the board is the alien domain, the timing requirement is the coupling, and the services exist because the case demanded them rather than because the list did; then the shared-store variant. | first fixed point; the tissue transfers; a claim is shareable; two theories share one checker |
| 2 Elimination | Complete [E2 Three realizations](three-realizations.md) with its discovery sequence: one source description, three design scopes, licenses discovered rather than named. The cheapest kill shot: if bookkeeping cannot compile away for a windowed mean, nothing later matters. | bookkeeping compiles away, and the system knows why |
| 3 Collection and retention | [E1 Adaptive collection](adaptive-collection.md) on the library; then across a device boundary; then with an approximate operation; certificate size measured on its rewrites (Q60). [E3 Contract change](contract-change.md). | transitions under concurrency; prediction vs correctness invalidation; retention is planned; checking stays proportional to the artifact |
| 4 Transitions at scale | [E4 Transition contract](transition-contract.md) against a tiering interpreter, the collection, a simulated accelerator; then a version DAG with composable transitions and a fleet running a version mixture. | is the protocol load-bearing |
| 5 Boundaries and onboarding | [E6 Joint communication](joint-communication.md), [E7 Foreign recovery](foreign-recovery.md) lifting by the store's own edges and measuring boundary surface, [E8 Authorization change](authorization-change.md). | information boundaries; evidence kinds; authority during change; declaration burden (Q58) |
| 6 Hardware generator, in software | [E9 Irregular cell](irregular-cell.md) first, since it decides the sequencer and nothing in silicon can. A generator whose palette includes the optional cells; the mapper targets generated instances in simulation and on FPGA; self-description derived by the generator and challenged by measurement; the mapper's own tiering ladder; the first custom cell chosen from the store's own cost accounting. Gate 0 of [Fabrication](../hardware/fabrication.md). | the generator's cost model; the fourth bet begins |
| 7 Silicon | Chip 0, the physics-only characterization die, on a cheap shuttle at a mature node; Gate 1 is prediction of held-out conditions on the same die. The micro generator instance only after Gate 1 and after E9 has chosen the cell. Chiplets after. | fabricability; derived vs measured self-description (Q61) |

Standing rules: every performance claim names workloads, assumptions, and comparison points; every decision has provenance and a worst-case bound; every claim that fails an experiment goes to [Positions](../record/positions.md) with the reason; pick one cross-domain experiment and one evolution experiment before choosing any implementation framework. Criteria in [Evaluation](evaluation.md).
