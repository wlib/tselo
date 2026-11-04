---
title: "The design in one page"
status: position
updated: 2026-11-03
---

# The design in one page

A system in which every implementation (of a collection, a function, a service, a device, a factory) is a replaceable, inspectable explanation of how a contract is being realized, and in which the bookkeeping that makes replacement possible is itself subject to elimination.

## The argument

Conceptual order; build order is in [Roadmap](../experiments/roadmap.md).

| Step | Claim | Read |
|---|---|---|
| 1 | Conventional engineering keeps the result of a decision and discards why it was made: the assumptions, the alternatives, the information that was missing, the changes anticipated. Each layer boundary is a treaty that hides the cleverness beneath it. | [Information economy](information-economy.md), [Commitment](commitment.md) |
| 2 | The design retains those things in a form the system can use: intent, laws, observers, budgets, commitments with their reasons, evidence with its kind, models with their validity domains. | [Language](language.md), [Observers](observers.md), [Justification](justification.md) |
| 3 | From them a realization is a search with evidence; a transition preserves outstanding obligations when circumstances change; the bookkeeping that makes this possible is specialized away where facts license it. | [Store](store.md), [Models](models.md), [Change](change.md), [Runtime](runtime.md) |
| 4 | The same process reaches hardware and production: targets describe themselves, the generator is a node in the store, a realization includes its own manufacture and calibration. | [Participation](participation.md), [Chipset family](../hardware/chipset-family.md), [Realization](realization.md) |
| 5 | What distinguishes this from a vocabulary is the loop it closes: a decision is made, its consequences are measured, an assumption changes, the relevant knowledge survives, and the next realization is cheaper or better. Four bets, each with a test, say where the loop could fail. | the bets below; [Roadmap](../experiments/roadmap.md) |

## Running example

A sensor-controlled physical system: a sensor sampling a signal, a windowed filter with a threshold (the computation of [E2](../experiments/three-realizations.md)), a radio link, an actuator under a hard deadline, on a board with a chosen processor, enclosure, and power budget, manufactured in volume and updated while operating. Each note contributes one piece; the revealing moments are changes.

| Change | What the design must do | Home |
|---|---|---|
| the deadline tightens | re-derive the schedulability argument; a measured region on the proved path degrades the claim; placement may move to a static region | [Deadlines](deadlines.md) |
| a component becomes unavailable | the substitution invalidates exactly the analyses that depended on it (geometry, signal, thermal) and preserves the rest; admissible substitutions were part of the BOM | [Realization](realization.md), [E5](../experiments/connective-tissue.md) |
| calibration contradicts the model | the derived self-description is challenged by measurement; dependent decisions are invalidated through the graph, not re-authored | [Participation](participation.md), [Models](models.md) |
| a new query needs discarded information (variance after mean) | the retention planner reports an information failure and prices the option retroactively | [Commitment](commitment.md), [E3](../experiments/contract-change.md) |
| authority permits changing the software but not the enclosure | the design scope records which commitments may change and who may authorize; the search stays inside it | [Realization](realization.md), [Change](change.md) |
| the radio channel degrades | the codec is a causal policy judged by task effect, with the deadline kept as a constraint | [Codecs](codecs.md), [E6](../experiments/joint-communication.md) |
| an update while operating | a transition with seven fields; under the deadline, old runs alongside new until the new has met it | [Change](change.md), [Deadlines](deadlines.md) |

## The complaint

Every layer of the stack is a treaty frozen decades ago: the C abstract machine, the ISA, flat coherent memory, files, processes, text as the representation of programs, SQL as the only way to talk to data. Each treaty let two sides evolve independently, and each pushed the real cleverness below the interface where nothing above can see it: out-of-order cores pretending to be sequential, DRAM pretending to be flat, flash hiding a log-structured filesystem, JITs recovering types the language threw away. The question is what the stack looks like if all of it is designed at once, constrained only by fabricability ([User intent](../intent/user-intent.md)).

## Claims and rules

| # | Claim | Rule for the builder | Status | Home |
|---|---|---|---|---|
| 1 | **Almost nothing needs to be fixed.** Not an ISA, address space, clock, byte, file, or process. What must be fixed is how a component participates. | Fix the participation protocol, nothing else. The OS is a region with a contract, not a layer; its trusted base is named. | position | [Participation](participation.md) |
| 2 | **The limit on performance is information, not cleverness.** Every optimization is proven, guarded, or trusted; each layer today picks one mode globally. | Pick prove / guard / trust per property per region. Hand-tuned stays admissible as the floor. "Nothing on the table" means a certified gap. Performance claims name workloads, assumptions, and comparison points. | position | [Information economy](information-economy.md) |
| 3 | **Binding time, retention, and flexibility are one tradeoff.** Every deferred decision is a retained distinction; every retained distinction is a purchased option. | Commit only when an observer depends on it, with a scope and a reason. Retention is a decision bounded by deletion and authority. Standards are ecosystem-scale retention decisions. | position | [Commitment](commitment.md) |
| 4 | **The currency is a distinction relative to an observer.** Types, proofs, effects, security levels, consistency envelopes, error tolerances each say which observer may distinguish what. | One vocabulary, a family of relations with different obligations; never conflate them. Every boundary is a channel with an explicit contract. Observers are inferred inside closed regions and declared at open boundaries. | position | [Observers](observers.md), [Codecs](codecs.md) |
| 5 | **Guaranteed, believed, permitted are different things sharing infrastructure.** A checked certificate, a model with a validity domain, a policy plus evidence. | Keep the three distinct; share their storage and provenance. Error contracts are specific. | position | [Justification](justification.md) |
| 6 | **Programs, contracts, models, evidence, and decisions live in one logical store** that is content-addressed, derived-state, and frontier-tagged. | Separate representation from visualization. Keep semantic, editing, artifact, and instance identity apart. One meaning, many materializations. | position | [Store](store.md) |
| 7 | **Shared across parties, the store is a store of certified relation edges** between content-addressed fragments, so compilation, decompilation, and sharing are one query over edges, in which recognizing where a claim applies is the expensive step; equivalence classes are a derived view. | Claims carry their kind, trust, validity, and privacy; approximation never forms a shared equivalence class. | user intent, proposed shape | [Claim store](claim-store.md) |
| 8 | **The stack already runs models everywhere; they share no representation.** | Models plural, controllers stratified, observations tagged with collection policy. Every probabilistic lowering carries a worst-case bound. The optimizer may conclude optimizing is not worth it. | position | [Models](models.md) |
| 9 | **An implementation and a transition between implementations are separate artifacts.** Replacing under a fixed contract differs from evolving the contract; a running system carries state and obligations. | Transitions are artifacts: seven fields, two kinds, plus boundary operations. Bookkeeping must be able to compile itself away; the runtime is the residual obligations and nothing else. Apply the design to itself. | position | [Change](change.md) |
| 10 | **Some things are irreducible.** Commit boundaries, arbitration, information that must cross, erasure, undecidability, the adversary, misspecification, Arrow, Goodhart, and the latency the compiler cannot know. | Minimize and name them. Capacity, backpressure, cancellation, and progress are first-class. Name the order and the query before invoking monotonicity. | position | [Irreducibles](irreducibles.md) |
| 11 | **Lowering generalizes to realization.** Given a partially specified situation, an intent, a design scope, and capabilities, construct a realization with evidence and continuity. | The target is part of the problem; decomposition is a variable; authority follows boundaries. The purpose is accountable realization. | position | [Realization](realization.md) |
| 12 | **Everything foreign enters by probe or lift.** Observation is not specification. Compilation and decompilation are one relation run in two directions. | Probe what does not describe itself; lift what has semantics; uncommit one commitment at a time; triangulate across related artifacts. | position | [Onboarding](onboarding.md) |
| 13 | **The system bootstraps as an instance of itself.** The seed is an interpreter carrying an assertion-kind claim; the host is a probed cell; the trusted base is the assumption graph on the critical path. | Upgrade the seed's evidence like any claim; every region keeps an admissible continuation; show the assumption graph and label it with models, of which a trust budget is one. | proposal | [Bootstrap](bootstrap.md), [Trust](trust.md) |
| 14 | **A deadline is a contract with evidence kinds.** Proved worst case on a described target, measured with tails, or guarded with a fallback. | Static regions make deadlines proofs; shared sequencers make them models; transitions under hard deadlines retain old alongside new. | proposal | [Deadlines](deadlines.md) |
| 15 | **What is frozen is an extension mechanism, not a vocabulary.** A record encoding, one judgment, a base theory, a bridge form. | Every vocabulary, including the hardware's, is a theory record; a theory can be stored and reasoned about before it has an interpreter and bridges, but nothing is realized in it until it does. An author writes shapes, laws, observers, budgets, and examples, plus scoped commitments wherever they choose to constrain the mapper. | proposal | [Language](language.md) |
| 16 | **Computation upstream of a commit boundary is retractable; commits are not.** Everything at runtime is a fact, a derivation, or a linear obligation. | Pay arbitration only at commit boundaries and genuine non-monotone points; speculation still costs time and energy and may be observable, so the region's observer class bounds it; publish the arbitration count; every region keeps a continuation admissible under its own contract. | proposal | [Runtime](runtime.md) |
| 17 | **Numbers and time are intents.** A real with a tolerance, an integer with no width, a timestamp with an uncertainty. | Representation, width, and clock are lowerings with evidence; exactness is the expensive requirement. | proposal | [Quantities](quantities.md) |

## The bets

The connective tissue (identity, provenance, incremental derivation, evidence, transitions) is infrastructure. Four claims carry the project, each with a test:

| Bet | Claim | Test |
|---|---|---|
| the tissue transfers | identity, provenance, derivation, evidence, and transition services built for one domain serve an alien domain unchanged, and the per-instance consequences of one coupling between them are derived from authored domain models and checked, never wired by hand | [E5](../experiments/connective-tissue.md) |
| search over laws | lowering as search over declared equational laws beats fixed pass pipelines on a broad program class, with hand-tuned code admissible as the floor | [E1](../experiments/adaptive-collection.md), [E4](../experiments/transition-contract.md) |
| control in production | plural models and stratified controllers adapt a running system without oscillation, with bookkeeping that compiles away where unneeded | [E2](../experiments/three-realizations.md), [E1](../experiments/adaptive-collection.md) |
| generated silicon | a palette generator with optional cells yields hardware competitive with hand-designed accelerators and with commodity cores for the same described workloads | [E9](../experiments/irregular-cell.md), [Roadmap](../experiments/roadmap.md) phases 6–7 |

A failed candidate mechanism is not a failed thesis. If the two domains need different checkers yet exchange checked claims and invalidate shared assumptions correctly, or the transition planner needs more than the commit boundary and the error contract to differ, the candidate is revised and the row goes to [Positions](../record/positions.md). The thesis fails if retained intent, evidence, and commitments do not make the next realization cheaper or better than redoing it, or if the bookkeeping cannot be specialized away where unneeded ([E2](../experiments/three-realizations.md)). Universality means domains share the process while keeping their own semantics and methods; it does not mean one checker, one planner, or one runtime ontology.

## The questions every domain answers

| Concern | Shared question | Keep distinct |
|---|---|---|
| Intent | What outcome matters, to whom? | Intent vs a model of intent |
| Design scope | Which commitments may change? | Feasibility vs authorization |
| Representation | Which distinctions must survive? | Equivalence, refinement, tolerance, information flow |
| Retention | Which future interactions must stay possible? | Information retained vs ability to compute from it |
| Binding time | When does a choice become fixed? | Manufacture, configuration, deployment, admission, execution |
| Evidence | Why may a claim be relied on? | Proof, assertion, test, prediction, physical assumption |
| Optimization | Which admissible realization is preferable? | Feasibility, estimated cost, certified bounds |
| Channels | What must cross a boundary? | Coding, communication complexity, computation, authority |
| Consistency | Which observations belong together? | Causality, snapshot, invariant, serializability, progress |
| Evolution | What must survive a change? | Same-contract replacement vs changed-contract evolution |
| Physical realization | How does the design come to exist? | Model, plan, manufactured instance, measurement |
| Ecosystem | Which stable interfaces buy future flexibility? | Local performance vs shared lifecycle value |

The connective tissue shared by every domain is identity, provenance, dependencies, evidence, models, orchestration, and transitions ([Correspondences](correspondences.md)). Domain semantics stay explicit; similar graph shapes are implementation opportunities, not proofs that theories coincide. The field lists are in [Schemas](schemas.md); what follows if every row is carried to its end is in [Consequences](consequences.md).

## Hardware and first build

Not a universal tile: a generator whose palette holds storage, arithmetic, routing, conversion, sampling, sequencing, and checking cells, with versioned storage, progress accounting, capability-checked links, and speculation as options instantiated only where a region's admitted interactions need them ([Chipset family](../hardware/chipset-family.md)); what must be fabricated to learn anything is in [Fabrication](../hardware/fabrication.md). Bootstrap from a seed interpreter on a probed commodity host ([Bootstrap](bootstrap.md)); build the connective tissue as a library and test it on two alien domains with one coupling; then the three realizations as the cheapest kill shot, the adaptive collection, and a contract change with information loss ([Roadmap](../experiments/roadmap.md)).
