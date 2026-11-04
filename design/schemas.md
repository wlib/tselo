---
title: "Schemas"
status: proposal
updated: 2026-11-03
---

# Schemas

The design stated as data shapes: the field lists every note refers to, in one place, so they can be frozen (roadmap phase 0) and argued about precisely. Each shape names its home note; the home note carries the argument. Fields are proposals until an experiment confirms them.

## Record ([Language](language.md))

```text
record  = hash(body)
body    = kind · theory · payload · deps[hash…] · meta
kind    ∈ { theory, shape, law, observer, budget, example, edge, evidence,
            target, transition, policy, view }          (the kinds are themselves a theory and can change)
theory  = hash of the theory record whose terms the payload uses
deps    = hashes this record is meaningless without
meta    = provenance, trust, validity domain, retention, publication scope
```

## Theory ([Language](language.md))

```text
signature    sorts, operations, relations
laws         equations, orderings, refinements, with the evidence for each
interpreter  for the theory's terms, written in a theory the system already interprets
bridges      relations to other theories (embedding, refinement, approximation with error contract)
```

A theory is storable with its signature alone; laws and bridges let it be reasoned about; an interpreter is required before anything is realized in it.

## Judgment ([Language](language.md))

```text
under theory T and assumptions Σ:   A  R  B   by evidence E
```

## Author inputs ([Language](language.md))

```text
shape      a relation with a theory
law        an equation, ordering, or refinement in that theory
observer   which distinctions must survive at which boundary
budget     error · latency · energy · retention, each with a workload model
example    samples, counterexamples, tie-breaks, preferences
```

Not written by default, constrained by commitments where wanted: direction, representation, evaluation order, placement, schedule, precision, width, clock.

## Participation verbs ([Participation](participation.md))

```text
describe    publish a contract and self-description (below)
lease       accept configuration, budget, time base, metered energy, and an observation envelope
exchange    send and receive with backpressure; ordering information only where an admitted interaction needs it
report      expose observations tagged with their collection policy
transition  declare supported ways to be changed: drain | finish | checkpoint-at-points | retain-old-alongside-new | restart-under-new-contract
```

## Self-description ([Participation](participation.md), [Chipset family](../hardware/chipset-family.md))

```text
transformations   supported operations; cost as a function of operand shapes and formats
hierarchy         levels, capacities, bandwidths, latencies, concurrency needed to saturate
topology          links, route classes, whether routing is deterministic, congestion model
arbitration       every point where two requesters can contend, with its worst-case policy
knobs             voltage, frequency, refresh, FEC strength, precision, redundancy: each with an error curve
timing            discipline and assumptions; time bases available for lease and their precision
observers         which observers each cell exposes: timing, power, electromagnetic, shared state
faults            failure behavior, fault model, correlations (shared rails), radiation cross-sections where relevant
health            measured deviation from the shipped curves; repair map of spared or disabled cells
transitions       which of the five the component supports
validity          domain where evidence exists; calibration provenance; revision
property kinds    guaranteed | empirical | wrapper-enforced   (per property)
evidence kinds    derived (from the netlist by analysis) | measured (characterization) ; disagreement invalidates the generator's cost model
```

## Implementation package ([Change](change.md))

```text
implements    a semantic contract
requires      assumptions, capabilities, resources
establishes   facts available to callers and later lowerings
evidence      why the implementation satisfies its contract
models        cost and failure predictions, with applicability
observations  measurements it can expose
transitions   supported ways to enter, leave, or replace it
continuation  the admissible fallback it keeps, or the license under which it dropped one
```

## Transition ([Change](change.md))

```text
1 quiescence     when state is translatable (safepoint, message boundary, transaction, kernel boundary), or which of drain/finish/checkpoint/retain/restart applies
2 translation    partial map old → new at those points
3 divergence     mutations arriving mid-transition: stop-the-world | barrier-captured | log-replay
4 publication    which observers see which version when; need not be one global instant
5 reclamation    when the old representation may go: grace period, epoch, hazard pointer, activation count
6 commit         externally observed effects that cannot be retracted; bounds what 2 may undo
7 authority      who may perform the transition and what it may consume
kind             implementation-replacement (same contract) | software-evolution (changed contract) | boundary-operation (move, split, eliminate; transfers authority)
obligations      accepted requests, sessions, pending effects, durability promises, callbacks, scheduled physical actions: each translated, finished under old code, or adapted
```

## Commitment ([Commitment](commitment.md))

```text
what          address | order | layout | synchronization point | numeric representation | schedule | placement | direction of a relation | ...
scope         the region it constrains
kind          hard constraint | preference | trusted assumption | temporary experiment
source        who or what made it, and on what evidence
purpose       the observer that depends on it, or the fact that licenses it
dependencies  commitments and facts it rests on
forecloses    the alternatives it removes (shown by the editor)
revision      who may lift it and under what evidence; conditional permission allowed
```

## Checker ([Justification](justification.md))

```text
input    a claim about a region + facts, models, and authority in scope
process  arbitrary (solver, SMT, tests, observation, simulation, search, agent) bounded by fuel
output   certificate | counterexample | conditional claim (residual predicate) | statistical evidence (+ collection policy) | unknown
size     checking cost proportional to the artifact, not to the search that produced the certificate
```

Downstream claims retain the dependency on whichever output they used.

## Claim and key ([Claim store](claim-store.md))

```text
edge   fragment A  --relation R (equivalence | refinement | ε-closeness + error contract | distributional | evolution)-->  fragment B
       under theory T, assumption set Σ
key    (fragment hash, theory T, assumption set Σ, target class G, cost-model version v, collection policy p)
kind   certificate | reproducible derivation | empirical | assertion
body   proof, build inputs, measurements, or statement
meta   provenance, trust, validity domain, privacy/publication scope, retention value
```

The claim set merges monotonically by set union; an e-class is a derived view (fragments joined by equivalence edges the reader's trust policy accepts) and may retract.

## Package ([Language](language.md))

```text
publication policy   which records are published, to whom, under what privacy scope
trust policy         which provenances and claim kinds a consumer accepts
assumption set       what the consumer's edges rest on; the dependency graph is this graph
frontier             the version
```

## Consistency envelope ([Observers](observers.md))

```text
observable    what outsiders can see
invariants    which hold at those observations
provisional   what may remain unsettled inside
commit        where external effects become committed
recovery      what remains possible afterward
```

The family of relations an envelope or a lowering may claim, with each one's composition rule, is tabulated in [Observers](observers.md).

## Situation ([Realization](realization.md))

```text
situation      entities, relations, state, available models
intent         required outcomes, preferences, examples, unresolved choices
design scope   what may change, what must remain, who may authorize changes
capabilities   resources, transformations, tools, services, production processes
realizations   answers, artifacts, actions, plans, adaptive policies
evidence       assumptions, certificates, measurements, predictions, evaluations
continuity     outstanding commitments and allowed transition paths
```

## Coupling ([Realization](realization.md))

```text
source, target   concepts in two domains, with units
relation         exact | conservative | empirical | heuristic; partial models allowed if their limits are visible
applicability    conditions
evidence         why the relation holds
invalidation     predicates that re-trigger analysis
composition      across domains may be cyclic; iterative or fixed-point methods
```

## Realization package, physical ([Realization](realization.md))

```text
software and firmware · circuit and board design · geometry · fabrication instructions · BOM with acceptable substitutions
assembly and calibration procedures · tests and acceptance criteria · deployment, migration, operation, maintenance policies
measurements connecting the manufactured instance to its model
```

## Error contract ([Justification](justification.md))

```text
quantity     absolute error | relative error | bias | detected failure | undetected corruption | deadline violation | task-level loss
fault model  distribution, correlations, common causes; metastability failure probability for asynchronous inputs
recovery     what happens on detection
criterion    end-to-end, not per component
```
