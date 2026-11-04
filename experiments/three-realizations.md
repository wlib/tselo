---
title: "E2: one computation, three realizations"
status: experiment
updated: 2026-11-03
---

# E2: one computation, three realizations

Take one computation through a fixed physical datapath, an adaptive local implementation, and a live-updatable distributed service, and identify exactly which information and obligations survive in each. If the common model produces all three without imposing the service's bookkeeping on the datapath, the architecture is real.

**The computation.** A windowed mean over a sample stream with a threshold query, and an *admitted evolution*: "later, also variance". Specify window semantics (expiration, input ordering, removal information) and arithmetic (floating-point reassociation, integer overflow) exactly. The equational facts (associativity and commutativity of `+`, the window as a sufficient statistic) license all three realizations: one fact, three freedoms.

| | A. Fixed datapath | B. Adaptive local implementation | C. Live-updatable distributed service |
|---|---|---|---|
| contract and laws | yes, the only thing that must | yes | yes |
| retained state | the sufficient statistic as registers | window plus bounded raw history to allow switching back | durable log for N days under a retention policy bounded by cost, value, deletion authority |
| timestamps | implicit in schedule position | explicit when arrival is irregular (the window is undefined without them) | explicit, plus per-client freshness tokens |
| authority | wiring: only the sensor writes, only the comparator reads | checked at admission, cached as a lease | per-request evidence with caching and a revocation protocol |
| history and versions | none | two generations during a representation switch | version mixture during rollout; per-session pinning |
| outstanding obligations | none; discharged by construction each cycle | pending queries | durability promises, subscriber callbacks, in-flight sessions |
| transition possibilities | restart under a new contract, or a spare programmable region bought at manufacture | drain, translate, publish; a guard on overflow switches exact → approximate under a declared relaxation | expand/contract, dual-write, per-session version consistency, adapters |
| evolution to variance | impossible in place; the option was never bought | begins at the upgrade boundary with an explicit "since t₀" | replay from the log if within retention, else "since t₀": a new distinction in the output type |

**Elimination licenses.** Each absent piece of bookkeeping in A corresponds to an established fact: periodic arrival → no timestamps; single writer by wiring → no authority checks; no admitted contract change → no history; statically scheduled → no progress tracking. B's representation switch is implementation replacement; the move to variance is software evolution. C's obligations behave as linear resources; its state is ordinary.

**The discovery sequence.** The licenses must be discovered by the system, not named by the author ([Language](../design/language.md)).

1. The author writes the shape, the laws, the observer, and the budget for each scope, with no mention of timestamps, authority, history, or progress.
2. The system derives A, B, and C and names each eliminated piece of bookkeeping with the license that eliminated it.
3. Admit a second writer in A. The system must derive an admissible mechanism, a runtime authority check or a topology that authorizes both writers by wiring, name the fact that licenses it, and add cost nowhere else.
4. Change B's deadline evidence from measured to proved. The system must prove the deadline with the mechanisms it retains, eliminate those the proof makes unnecessary and name the license, or report which fact it lacks; keeping timestamps while proving the deadline is admissible.
5. Withdraw a license's evidence: a probed property of the host is contradicted by measurement. The bookkeeping must be reinstated by invalidation through the derivation graph, not by re-authoring.

A declared observer eliminating a real cache that the author never named is the same test in the hardware direction ([Chipset family](../hardware/chipset-family.md)).

**Success.** The same source description, with three design scopes and capability sets, produces A, B, and C, and A contains no runtime object merely because the semantic model contains one. **Failure.** The fixed path inherits service bookkeeping without a semantic need, or the system confuses retained information with reconfigurable computation. Concepts: [Commitment](../design/commitment.md), [Change](../design/change.md), [Chipset family](../hardware/chipset-family.md).
