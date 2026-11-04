---
title: "Glossary"
status: editorial
updated: 2026-11-03
---

# Glossary

Terms as used in this notebook, each with its one home note. Where a term has a standard meaning elsewhere, the entry says how the usage here relates. Terminology is provisional; record meaning changes in notes rather than silently redefining.

| Term | Meaning here | Home |
|---|---|---|
| **Accountable realization** | the purpose of the stack: every realization carries its intent, authority, evidence, and transition obligations so it can be inspected, contested, and undone. | [Realization](design/realization.md) |
| **Admissible continuation** | the fallback a region keeps for when a guard fires, admissible under the region's own contract: the interpreter where drain is allowed, a resident alternative under a hard deadline, a safe state for an actuator. | [Runtime](design/runtime.md) |
| **Arbitration** | resolving a non-monotone decision between near-simultaneous inputs; unbounded worst case. Consensus, revocation, mutex, clock edge are instances. | [Irreducibles](design/irreducibles.md) |
| **Arbitration count** | the number of arbitration points in a realization, published beside its energy and minimized like it. | [Runtime](design/runtime.md) |
| **Assumption graph** | the assertion-kind claims on a realization's critical path and what rests on each; the dependency graph of a realization; the primary object of trust. | [Trust](design/trust.md) |
| **Base theory** | the one theory the seed interprets natively; every other theory reaches it through a chain of interpreters. | [Language](design/language.md) |
| **The bets** | the four claims the project rests on: the connective tissue transfers across alien domains; search over declared laws beats fixed pipelines; stratified control runs in production with bookkeeping compiled away; a palette generator yields competitive silicon. | [Spine](design/spine.md) |
| **Binding time** | when a decision becomes fixed: manufacture, configuration, deployment, admission, execution. | [Commitment](design/commitment.md) |
| **Block sequencer** | a cell executing dataflow blocks with explicit operand slots and a movement prologue; its encoding is an encapsulated ISA behind the mapper. | [Chipset family](hardware/chipset-family.md) |
| **Boundary** | any place information crosses between components, levels, versions, or representations; treated as a channel with a contract. | [Codecs](design/codecs.md) |
| **Boundary operation** | a transition kind that moves, splits, or eliminates a boundary between regions and transfers the authority over what it separated. | [Change](design/change.md) |
| **Bridge** | a relation between two theories (embedding, refinement, approximation with an error contract); part of a theory record; without bridges a theory can be stored but no claim under it reaches another theory. | [Language](design/language.md) |
| **CALM** | a monotone logic program is eventually consistent without coordination; related to but not the same as Kahn determinacy. | [Irreducibles](design/irreducibles.md) |
| **Causal policy** | a strategy choosing actions from the information its actor actually has at that point; the shape of every mapper and codec. | [Codecs](design/codecs.md) |
| **Cell** | a physical resource in the generator's palette: storage, arithmetic, routing, conversion, sampling, sequencing. | [Chipset family](hardware/chipset-family.md) |
| **Certified relation edge** | the store's cross-fragment primitive: fragment A relates to fragment B (equivalence, refinement, ε-closeness with an error contract, distributional agreement, evolution) under a named theory and assumption set, with evidence of a stated kind. | [Claim store](design/claim-store.md) |
| **Characterization die (Chip 0)** | the first fabricated die: pairs of instrumented cells of identical function, measured for the analog-physical curves synthesis cannot predict; an instrument, not a computer. | [Fabrication](hardware/fabrication.md) |
| **Checker** | a pluggable participant that evaluates a claim and returns a typed result: certificate, counterexample, conditional claim, statistical evidence, unknown. | [Justification](design/justification.md) |
| **Checker cell** | a hard-wired kernel for the hottest certificate families that gates configuration loading on a die. | [Chipset family](hardware/chipset-family.md) |
| **Claim** | a statement in the store with a semantic key, a kind (certificate, reproducible derivation, empirical, assertion), and metadata (provenance, trust, validity, privacy). | [Claim store](design/claim-store.md) |
| **Claim kinds** | certificate (check with a small kernel), reproducible derivation (recompute or accept k-of-n reproductions), empirical (consume with a worst-case bound and a guard), assertion (trusted, provenance kept). | [Claim store](design/claim-store.md) |
| **Collection policy** | the conditions under which an observation was gathered (workload, placement, versions, sampling, competitors); recorded with every measurement so off-policy use is visible. | [Models](design/models.md) |
| **Commit boundary** | externally observed effects that cannot be retracted. Field 6 of a transition. | [Change](design/change.md) |
| **Commitment** | a scoped, reasoned constraint on the set of acceptable implementations; not necessarily irreversible. | [Commitment](design/commitment.md) |
| **Connective tissue** | what every domain shares: identity, provenance, versioning, incremental dependency, search orchestration, evidence, transitions. | [Realization](design/realization.md) |
| **Consistency envelope** | a region exposing declared observations and invariants at its boundary while possibly provisional inside; names its commit points and recovery. | [Observers](design/observers.md) |
| **Contract** | admitted interactions and required behavior under stated assumptions; what an implementation realizes. | [Change](design/change.md) |
| **Coupling model** | an explicit, checkable relation explaining dependencies across domains. | [Realization](design/realization.md) |
| **de Bruijn criterion** | untrusted search produces a certificate; a small trusted kernel checks it. | [Justification](design/justification.md) |
| **Deadline evidence** | the justification of a deadline claim: proved worst case on a described target, measured with tails under a collection policy, or guarded with a declared fallback. | [Deadlines](design/deadlines.md) |
| **Derived state** | state computed from other state with tracked dependencies and a frontier, invalidated by predicates. | [Store](design/store.md) |
| **Describer** | the immutable cell on a die that answers `describe` before any configuration exists; the root of the instance's identity. | [Chipset family](hardware/chipset-family.md) |
| **Design scope** | which changes are permitted, which commitments remain fixed, and who may authorize changes. | [Realization](design/realization.md) |
| **Discovery sequence** | the protocol in which elimination licenses are discovered by the system from shapes, laws, observers, and budgets, never named by the author. | [E2](experiments/three-realizations.md) |
| **Distinction** | something an observer can tell apart; the unit of the currency. | [Observers](design/observers.md) |
| **E-class** | a derived view: the fragments joined by certified equivalence edges under one theory whose evidence the reader's trust policy accepts; never a stored fact. | [Claim store](design/claim-store.md) |
| **Elimination license** | an established fact that lets a piece of bookkeeping be compiled away for a region. | [Change](design/change.md) |
| **Error contract** | the specific reliability specification of a result: quantity, fault model, recovery, end-to-end criterion. | [Justification](design/justification.md) |
| **Escrow** | partitioning an invariant's budget so replicas act locally without coordination. | [Observers](design/observers.md) |
| **Established fact** | a property known to hold within a scope ("sorted while generation g is valid"); justifies a transformation. | [Justification](design/justification.md) |
| **Evidence** | support for a scoped claim, with dependencies and validity conditions. Proof, assertion, test, prediction, and authority remain distinct. | [Justification](design/justification.md) |
| **Evolution (software)** | an authorized transition between different contracts. Contrast *implementation replacement*. | [Change](design/change.md) |
| **Extension mechanism** | what is frozen instead of a vocabulary: the record encoding, the judgment, the base theory, the bridge form, the exchange protocol. | [Language](design/language.md) |
| **Fragment** | a content-addressed record or connected set of records that an edge relates; the unit a claim attaches to. | [Claim store](design/claim-store.md) |
| **Frontier** | a model-specific boundary in time, history, or progress (antichain of parents in the DAG; "at least this fresh" for authorization; "no outstanding right to emit below t" in progress tracking). Kinds are not interchangeable. | [Observers](design/observers.md) |
| **Generator (hardware)** | a program producing a family of differently proportioned instances from one palette. | [Chipset family](hardware/chipset-family.md) |
| **Guard** | a cheap runtime check paired with a specified fallback or continuation. The middle of prove/guard/trust. | [Information economy](design/information-economy.md) |
| **Identity (represented artifact / editing / optimized artifact / semantic / instance)** | five notions kept apart. | [Store](design/store.md) |
| **Implementation package** | what an implementation declares: implements, requires, establishes, evidence, models, observations, transitions. | [Change](design/change.md) |
| **Implementation replacement** | a different realization of the same contract. | [Change](design/change.md) |
| **Information economy** | the frame in which the performance limit is a property of what is known, when, at what price. | [Information economy](design/information-economy.md) |
| **Intent** | required outcomes, preferences, examples, unresolved choices; always a model, inspectable independently of implementation. | [Realization](design/realization.md) |
| **Invariant confluence** | operations, invariants, and merge together determine coordination-freedom. | [Observers](design/observers.md) |
| **Judgment** | the one statement the kernel checks: under theory T and assumptions Σ, A relates to B by evidence E. | [Language](design/language.md) |
| **Lease** | a configuration, budget, and observation envelope granted to a component; where authority meets resources. | [Participation](design/participation.md) |
| **Lifting by reproduction** | finding source, compiler, and flags that regenerate a binary's bytes, as an exact certificate of the lift modulo trust in the compiler. | [Onboarding](design/onboarding.md) |
| **Logical framework kernel** | the proposed trusted base: a small type checker for a dependently typed signature language in which theories are signatures, laws are axioms, and proofs are terms. | [Language](design/language.md) |
| **Lower-bound provider** | a participant certifying L so U − L is a meaningful optimality gap. | [Information economy](design/information-economy.md) |
| **Lowering / realization** | constructing something that satisfies a contract under a design scope; generalizes compilation to synthesis, planning, control, inference, experimentation. The relation claimed must be stated. | [Realization](design/realization.md) |
| **Management sequencer** | the instruction-driven core running a die's fast control loop; a palette default, present where a die hosts its own loop and absent on the smallest targets. | [Chipset family](hardware/chipset-family.md) |
| **Mapper** | the pluggable policy deciding placement, scheduling, and representation (a runtime's term); any installable strategy of that shape. | [Models](design/models.md) |
| **Model (predictive)** | a prediction with a validity domain and a collection policy; several per resource. | [Models](design/models.md) |
| **Model DAG** | the target, input, semantic, and intent models above the hardware self-description, each derived state with a frontier and a collection policy. | [Models](design/models.md) |
| **Obligation** | a commitment a running system has undertaken: accepted request, session, pending effect, durability promise, callback. Discharged or handed off under an explicit protocol. | [Change](design/change.md) |
| **Observer** | a party, program, or device whose ability to distinguish states determines what the implementation may change. | [Observers](design/observers.md) |
| **Open boundary** | a region edge where a future or foreign consumer may appear, so the observer must be declared; inside closed regions it is inferred. | [Observers](design/observers.md) |
| **Option (retained)** | information or mechanism kept so a future decision remains possible; a cost now, a possible value later. | [Commitment](design/commitment.md) |
| **Package** | a publication policy over records plus a trust policy for consuming them; a dependency is the assumption set a consumer's edges rest on. | [Language](design/language.md) |
| **Palette** | the set of cell types a generator instantiates in varying proportions; options are parameters of a type. | [Chipset family](hardware/chipset-family.md) |
| **Partial lens** | a lowering with a backward map at designated safe points; what replaces "every lowering has an inverse". | [Commitment](design/commitment.md) |
| **Participation verbs** | describe, lease, exchange, report, declare transitions. | [Participation](design/participation.md) |
| **Probe / lift** | describing a foreign component by measurement; bringing a foreign artifact into the store by specializing an interpreter of its semantics to it. | [Onboarding](design/onboarding.md) |
| **Property kinds** | each described property is guaranteed (documentation, formal description), empirical (calibration), or wrapper-enforced (a bridge makes it true); measurements never silently become guarantees. | [Participation](design/participation.md) |
| **Prove / guard / trust** | the three justification modes of an optimization. | [Information economy](design/information-economy.md) |
| **Record** | the one frozen unit of the store: a hash of a body consisting of kind, theory, payload, dependencies, and metadata. | [Language](design/language.md), [Schemas](design/schemas.md) |
| **Region** | the unit of lowering: derivations with a declared boundary contract, whose internal activity stays local while the boundary carries little information; the scope at which justification mode, binding time, licenses, and continuation are chosen. | [Physics](hardware/physics.md), [Runtime](design/runtime.md) |
| **Region graph** | what the compiler emits for a target class: regions with boundary contracts, channels with contracts, and per-region binding-time budget, residual obligations, licenses, and continuation; placeable, not placed, and not the portable artifact. | [Chipset family](hardware/chipset-family.md) |
| **Relaxation (explicit)** | a declared expansion of acceptable behaviors (approximation error, sampling). | [Justification](design/justification.md) |
| **Residual obligation** | what remains to be checked or maintained at runtime after everything static has been discharged. | [Change](design/change.md) |
| **Restoration** | the regeneration of a signal at a digital boundary that stops error accumulating; it recovers the digital interpretation, not information lost in an analog stage. | [Timing and analog](hardware/timing-and-analog.md) |
| **Retention** | keeping information or mechanisms for admitted future interactions; a decision with a cost. | [Commitment](design/commitment.md) |
| **Retention planner** | the participant that chooses sufficient statistics for a declared family of future contracts under deletion and authority bounds. | [Commitment](design/commitment.md) |
| **Seed** | the smallest independently reimplementable interpreter of the core from which the system rebuilds itself; carries an assertion-kind claim until reproduced. | [Bootstrap](design/bootstrap.md) |
| **Self-application** | the design applied to its own store, controllers, IR, and bookkeeping, all specializable and eliminable. | [Change](design/change.md) |
| **Self-description** | a device's published, revisable cost, error, and transition model with a validity domain. | [Participation](design/participation.md) |
| **Situation** | entities, relationships, state, and available models of a design problem. | [Realization](design/realization.md) |
| **Store** | the logical home of programs, contracts, models, evidence, histories, decisions; physically distributed, summarized, sometimes absent. | [Store](design/store.md) |
| **Sufficient statistic** | the minimal retained information that answers a declared family of future queries. | [Commitment](design/commitment.md) |
| **Target class** | the set of targets for which one region graph and one cost model apply; a component of the claim key. | [Chipset family](hardware/chipset-family.md) |
| **Theory** | a record holding a signature, its laws, an interpreter written in an already-interpreted theory, and bridges to other theories; the unit of vocabulary. An equivalence claim names the theory it holds under (fp32 left-to-right, fast-math, integer mod 2⁶⁴). | [Language](design/language.md), [Claim store](design/claim-store.md) |
| **Three buckets** | future physics not fabbable at scale; buildable now but mostly unbuilt; actually built. The gap between the last two is what a from-scratch design exploits. | [Physics](hardware/physics.md) |
| **Time base** | a clock or counter leased with a stated precision; what replaces the architectural global clock where a region needs time. | [Quantities](design/quantities.md), [Chipset family](hardware/chipset-family.md) |
| **Transition** | the seven-field artifact that moves a running system from one implementation or contract to another. | [Change](design/change.md) |
| **Treaty / standard** | a retained interface distinction across parties and time; priced by option value and amortization. | [Commitment](design/commitment.md) |
| **Triangulation** | using related lowerings (versions, shared libraries, different compilers, die generations) to separate semantics from incidental commitment. | [Onboarding](design/onboarding.md) |
| **Trust budget** | one model labeling the assumption graph: the composed probability that the assertions on a path are wrong under a correlated fault model; valid where independence evidence exists. | [Trust](design/trust.md) |
| **Trusted base** | the roots of the assumption graph: seed, checker kernel, hash, probed contracts, reproducers, authority enforcement, recovery, the describer and management sequencer; a named region, minimized and shrunk by evidence upgrades. | [Trust](design/trust.md) |
| **Uncommitting** | establishing that a commitment in a lowered artifact had no observer, so it may be removed. | [Onboarding](design/onboarding.md) |
| **Validity domain** | conditions under which a model, evidence object, or claim applies. | [Justification](design/justification.md) |
| **View** | an observer-specific projection of the store, declared as metadata, used for editing as well as reading. | [Store](design/store.md) |
| **Windowed-speculative sequencer** | a generated core whose speculation window, predictor, and misspeculation cost are published contract; the candidate for irregular serial code. | [Chipset family](hardware/chipset-family.md) |
