---
title: "The information economy: prove, guard, trust, and certified gaps"
status: position
updated: 2026-11-03
---

# The information economy: prove, guard, trust, and certified gaps

The limit on a program's performance is a property of information (what is known, when, at what price), not of the program. Every optimization is proven, guarded, or trusted, and the design picks the mode per property per region. "Nothing on the table" is well defined only as a certified optimality gap. The honest target against C is at least C everywhere and far beyond C wherever declaration unlocks search.

## Where dynamic information lives

With full knowledge of the inputs the optimal program is a constant (Futamura's endpoint). The real limit is set by when information arrives and what acquiring it costs. Each layer fixes one answer and none can read another's ledger: the compiler cannot see the predictor, the author cannot see the profile, the profile cannot invalidate the author's choice of `HashMap`.

| Layer | Buys certainty at | With |
|---|---|---|
| type checker | author time | author effort, compile time |
| AOT optimizer | compile time | analysis, proof |
| JIT | runtime | profiling, guards, deoptimization |
| branch predictor, cache | nanoseconds | silicon, energy |
| fleet profiling | hours to days | telemetry |
| author choosing a data structure | once, by hand | never updated |

## Prove, guard, trust

| Mode | Meaning | Software | Hardware |
|---|---|---|---|
| **prove** | a solver or type system establishes the property | ownership proving `noalias`; polyhedral dependence analysis; totality checkers | the ISA contract |
| **guard** | assume, check cheaply, fall back if wrong | inline caches and deopt; introsort's depth guard | speculation with replay; Razor timing speculation |
| **trust** | the author asserts it; being wrong is undefined | `restrict`, `unsafe`, `__builtin_assume` | hints |

Classic language tradeoffs exist because each language picks one mode globally per property. The design picks per property per region (the article's strict core with tracked speculation, applied to lowering). A compiler never *has* to prove something to lower it; the question is which mode is affordable given what is known and what a wrong guess costs. The three are operational categories, not an exhaustive semantics; approximation, refinement, validation, and intentional specification change need their own relations ([Observers](observers.md)). "AOT or runtime?" is answered per region ([Physics](../hardware/physics.md)).

## Certified gaps

"Nothing on the table" is undefined as hindsight optimality (identical histories can diverge so that opposite choices were best) and false as "the search budget bounds the gap" (search produces no lower bound, and a bound inside a cost model does not show the model describes the machine). It is well defined as `0 ≤ U − C* ≤ U − L` for incumbent U and certified lower bound L. **Lower-bound providers** are pluggable participants beside candidate generators, cost models, checkers, and transition planners; sources of L: communication lower bounds (red–blue pebble, communication-avoiding algorithms), capacity and bandwidth limits from the self-description, critical paths, optima within restricted spaces (a superoptimizer proving optimality within its space), LP relaxations of placement and scheduling. Bounds change with the algorithm, the required answer, and allowed recomputation. Gaps are **certified**, **suspected** (model without a bound), or **unknown** (Q13).

Concretely: exclude no useful implementation by construction, so hand-tuned stays admissible as the floor; expose the cost of every commitment; search where worthwhile and stop when not; certify closeness where possible and say so when not; keep feasibility, best candidate found, empirical improvement, robustness guarantee, and certified optimality within a stated class separate; include search, instrumentation, switching, interference, and retained-option costs; name workloads, assumptions, and comparison points in every performance claim.

## Beating C

The baseline is not the C program. A C program is already a lowering, performed by a human at authoring time with the least information anyone will ever have about the program: no profile, no target description, guessed sizes, and the pressure to write what C makes easy rather than what the problem is. Daniel's observation is that even trivial C programs leave most of the table uncovered for this reason, so "beat C" means beat the realization a human could afford to write, measured against the ideal realization of the same intent ([User intent](../intent/user-intent.md) §1).

| What the C author committed to | Why | What a declared intent retains |
|---|---|---|
| the algorithm class | the convenient one is linear; hash maps and trees are a chore | the operations and invariants; the structure is derived ([Models](models.md)) |
| layout (`struct`, arrays of structs) | the only layout C can spell | relations with laws; layout is a region decision |
| evaluation order and sequential loops | what can be written | dataflow; order is a commitment made when an observer needs it ([Commitment](commitment.md)) |
| copying and coarse synchronization | ownership and fine-grained sharing are inexpressible or frightening | effects with equations; the reorder license is the program's own laws ([Observers](observers.md)) |
| aliasing unknown | the language has no way to say otherwise | `noalias` as a fact (Fortran beat C on numerics for decades on it) |
| no specialization to data, no fusion across functions, hand-rolled caches | there is no profile and no budget | derived state over a workload model ([Store](store.md)) |
| I/O shaped around syscalls | the treaty | channels with contracts ([Codecs](codecs.md)) |

Every row is a commitment bound at authoring with nothing retained, so no one can ever re-derive the better program; in the notebook's own terms a C program is maximal early binding. Source code in a committed language is therefore a lowered artifact like a binary, with more retained, and uncommitting applies to it ([Onboarding](onboarding.md)). Compilers that beat C today (declarative array languages, Datalog engines, query compilers; [Systems](../evidence/systems.md)) do so by owning the dataflow for a class, and the C they beat is the C someone could afford to write.

Two rules hold as method, not as a smaller claim. Hand-tuned implementations stay *admissible* so no useful realization is excluded by construction; admissible is not the same as being the measure. And every performance claim names its intent, workload, target, and comparison point, because a claim that cannot be falsified cannot teach the project anything. Optimal scheduling, placement, layout, and allocation are NP-hard and the input distribution is unknowable, so "the absolute ideal" is defined relative to a target model and an input model that are supplied, measured, or learned ([Models](models.md)), and the gap to it is certified or suspected, never assumed closed. The claim is large and its status is untested; [E1](../experiments/adaptive-collection.md) and [E2](../experiments/three-realizations.md) are the first measurements, not the size of the claim (C58, C61). The unit in which the claim is assessed is not cycles per program but joules and seconds per distinction delivered to the observer that required it ([Observers](observers.md)): compression removes distinctions nobody needs, computation produces the ones they do, communication moves them, and all three are priced in one unit from the energy table.

## The affordability lever

Compilers are budgeted in seconds per build on one machine. With content-addressed programs and compilation as derived state, the optimal lowering of a fragment for a target and cost model is a cacheable fact shared by everyone who uses it, and superoptimization becomes economical when it runs once for the fleet ([Store](store.md), [Claim store](claim-store.md)).
