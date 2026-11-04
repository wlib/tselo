---
title: "Open questions"
status: open
updated: 2026-11-03
---

# Open questions

Unresolved questions, grouped by the note that would answer them and phrased so an experiment or a reading could close them. Not ranked. Design notes cite these by number.

## Semantics and the store ([Observers](../design/observers.md), [Store](../design/store.md), [Codecs](../design/codecs.md))

- **Q01** What minimal object model connects situation, intent, design scope, capabilities, evidence, and realizations, and what interchange semantics let domain packages exchange it without one universal representation? Proposed answer: theories with interpreters and bridges over one base ([Language](../design/language.md)); Q01, Q02, and Q53 are one question.
- **Q02** If the store holds relations with equational theories and direction is a lowering choice, what minimal core is still tractable to check and lower (Datalog with equality, miniKanren-style, staging)?
- **Q03** How are an author's declared laws checked (proof, test, trust) and fed into the rewrite engine without unsound rewrites leaking?
- **Q04** How do exact equivalence, refinement, ε-closeness (not transitive), distributional agreement, hyperproperties, and evolution relations compose without conflation? What is the end-to-end error rule for chains of approximate lowerings?
- **Q05** Can noninterference-style obligations be checked by the same incremental engine as equivalence-style ones?
- **Q06** Which observer class is admitted, especially for open-world clients? How is unresolved intent and disagreement represented separately from implementation uncertainty?

## Representation and identity ([Store](../design/store.md))

- **Q07** Which identities survive edits, compilation, deployment, and manufacture? Which metadata belongs in artifact hashes and invalidation keys?
- **Q08** How do edits through multiple views declare ambiguity and authority?
- **Q09** What evidence interface supports arbitrary analysis without silently upgrading tests or predictions to proofs, and how do trusted checkers and assumptions themselves evolve?

## Models and control ([Models](../design/models.md), [Information economy](../design/information-economy.md))

- **Q10** What is the protocol by which a slow and a fast controller disagree without the fast one winning by default?
- **Q11** What is the minimal representation of "the policy under which this observation was collected" that makes off-policy evaluation possible for compiler decisions?
- **Q12** Can value-of-information instrumentation be computed cheaply enough to place counters at runtime?
- **Q13** For which lowering problems do certified lower bounds exist cheaply, and for which is the gap permanently "suspected"?
- **Q14** How are search, instrumentation, switching, and retained-flexibility costs included, and how do many controllers avoid oscillation and interference? What can a fleet share without losing specialization context or private information?

## Retention and evolution ([Commitment](../design/commitment.md), [Change](../design/change.md))

- **Q15** What is the language for declaring "the family of schema changes I may want", and how does the planner compute sufficient statistics for a family rather than a point?
- **Q16** When a deletion requirement forbids retaining information a future evolution would need, what is recorded so the later evolution fails informatively?
- **Q17** Is a session-type or typestate discipline enough to track obligations across a transition, or is a runtime ledger needed? How are obligations canceled, transferred, retried, or discharged?
- **Q18** Which updates can be derived from schemas, and which need a new meaning supplied by an author?
- **Q19** What history and operation algebra supports efficient branch, merge, replay, and materialization, and how do envelopes relate to snapshots, invariant confluence, and externally committed effects?

## Transitions ([Change](../design/change.md))

- **Q20** When publication is per session rather than global, how are cross-session invariants protected during the mixture period?
- **Q21** What is the general form of "checkpoint at designated points" for a device that cannot export all physical state? Is "retain old alongside new" always available, and at what cost?
- **Q22** Is the seven-field protocol load-bearing? ([E4](../experiments/transition-contract.md))

## Hardware and physical systems ([Chipset family](../hardware/chipset-family.md), [Timing and analog](../hardware/timing-and-analog.md))

- **Q23** What target vocabulary describes capabilities, timing, resources, faults, and transition support without mandatory per-cell overhead? When can ordering, authority, and dependency information become implicit in configuration or wiring?
- **Q24** Minimal producer–router protocol for outstanding emission rights; for which region sizes does hardware progress accounting beat software?
- **Q25** Cost of a (fact, version, frontier) storage cell relative to a plain one; at what speculation rate does it pay?
- **Q26** Per-flit capability check vs route-configured enforcement: where is the crossover?
- **Q27** How does the generator estimate the cost of optional cells, and how is that validated against fabricated instances?
- **Q28** Interface contracts between a synchronous island and a self-timed region, including metastability budgets; composition of timing and progress contracts across physical regimes.
- **Q29** How do analog and stochastic error contracts compose under correlated faults?
- **Q30** What evidence separates probed behavior from guarantees for foreign components, and how are production, calibration, and maintenance represented alongside the design?

## Scope and ecosystem ([Realization](../design/realization.md))

- **Q31** What representation of a cross-domain coupling lets an instance's consequences be derived and checked from authored domain models rather than wired by hand? ([E5](../experiments/connective-tissue.md))
- **Q32** How does the system represent "who may redraw this boundary", and how does a proposed decomposition become adopted?
- **Q33** With conflicting objectives, what does the stack do: represent, surface, defer to a named authority? What is the interface for an unresolved disagreement?
- **Q34** What is the exact interface by which an agent's proposal enters the derivation graph, and how is its provenance distinguished from a human's?
- **Q35** How do dependency contracts address shared external state and coexisting versions? How does a standard's option value compare with its implementation and transition cost?
- **Q36** How does the stack specialize and improve its own realization process; what is the minimal bootstrap and trusted substrate?

## Legacy ([Onboarding](../design/onboarding.md))

- **Q37** How large a binary can be lifted by Futamura specialization of an ISA interpreter in practice, and what is the uncommitting yield on real software?
- **Q38** What is the schema for a foreign binary's environmental contract, and how is incompleteness represented?

## The claim store ([Claim store](../design/claim-store.md))

- **Q39** What are the retraction semantics for a shared equivalence store: how does a monotone, gossiped claim set support non-monotone trust-policy views when a proof, cost model, or validity domain is withdrawn?
- **Q40** What goes in the claim key (fragment, theory, assumption set, target class, cost-model version, collection policy), and how are equivalence edges traversed at lookup, and what canonicalization keeps hit rates above a Zipf head when fusion and placement grow fragments until they are unique?
- **Q41** How is approximation represented so that a shared store never contains a transitive "approximately equal" class, and how is accumulated error tracked through extraction?
- **Q42** What does publishing class membership leak about a private fragment, and what is the per-fragment publication policy?
- **Q43** How are theories and arithmetic modes versioned as first-class nodes so claims under one theory are never applied under another?
- **Q44** How sound is triangulation across related binaries and compiler versions: when does invariance across lowerings justify a semantic claim, and when is lifting by reproduction available?
- **Q45** Who produces certificates and reproductions at scale, how are empirical claims cross-checked (k-of-n), and how does the retention planner decide which claims to keep where?

## Self-description, profiling, and remaining open lists ([Participation](../design/participation.md), [Models](../design/models.md), [Observers](../design/observers.md), [Irreducibles](../design/irreducibles.md))

- **Q47** Self-description: how are calibration and drift handled, how are descriptions distributed securely, how are non-additive interactions between knobs represented, which lower bounds can a description certify, and what does bridging commodity or future technology cost?
- **Q48** Profiling and control: causal and off-policy evaluation, correlated observations, cold start, stability across timescales, privacy of shared profiles, and a reproducible way to compare adaptive policies including transition overhead.
- **Q49** How do residual obligations stay visible after an effect is handled and after a cross-domain lowering?
- **Q50** Data-structure selection: joint choice across consumers, live migration, drift detection, adversarial inputs, escaping references, memory peaks, and explaining the chosen representation.
- **Q51** Is there a common liveness and resource contract (capacity, credits, reservation, cancellation, fairness, recovery) checkable across circuits, accelerators, streams, and services without importing the most expensive protocol everywhere?

## Bootstrap, trust, deadlines ([Bootstrap](../design/bootstrap.md), [Trust](../design/trust.md), [Deadlines](../design/deadlines.md))

- **Q52** How small can the seed core be while checking every certificate kind the store admits, and how many independent implementations make k-of-n reproduction meaningful?
- **Q53** If what is frozen is the extension mechanism (record encoding, judgment, base theory, bridge form, exchange protocol) rather than the description vocabulary, which parts of that mechanism are the treaty across hardware generations, and how is each priced as a standard?
- **Q54** How is a trust budget composed when faults are correlated (one compiler lineage, one reproducer operator, one kernel), and is treating trust as an error contract a theorem or an analogy?
- **Q55** What identity, reputation, and Sybil-resistance model does the gossip layer need so that k-of-n reproduction is evidence rather than a vote, and what does a poisoned certificate cost against a kernel with a bug?
- **Q56** Who produces certificates and reproductions for the long tail, and at what fragment popularity does intra-codebase reuse dominate cross-party reuse?
- **Q57** How does worst-case execution time become a claim with a validity domain on a self-described target, and how do the mapper's placement and sharing decisions enter the schedulability argument?
- **Q58** Inside closed regions the observer checklist is inferred and only open boundaries need declarations; what fraction of real, lifted codebases is open boundary, and what declaration burden do authors accept in exchange for replaceable collections? ([E7](../experiments/foreign-recovery.md))

## Language, runtime, generator ([Language](../design/language.md), [Runtime](../design/runtime.md), [Chipset family](../hardware/chipset-family.md), [Fabrication](../hardware/fabrication.md))

- **Q59** Can the generator emit an irregular-serial cell (block dataflow, windowed speculation, tagged-token, or automaton-in-memory) competitive with a commodity out-of-order core on the stack's own toolchain, and at what cost? ([E9](../experiments/irregular-cell.md))
- **Q60** Can certificates be kept proportional in checking cost to the artifact rather than to the search that produced them, across the certificate families the store admits, and what does checking throughput bound at fleet scale?
- **Q61** Does a derived self-description drift from the measured one faster than the health loop corrects it, over temperature and age, on the characterization die?
- **Q62** Does the relational core lower irregular, stateful code declaratively, or only by falling to hand-written fragments in cell theories? (The yield question Q37 asked of lifted code, asked of new code; [E2](../experiments/three-realizations.md) realization B.)
- **Q63** Can a compiler IR and a PCB netlist be two theories over one base and share an equivalence checker, with a bridge between them that is derived and checked? ([E5](../experiments/connective-tissue.md))
- **Q64** Who may perform a boundary operation (move, split, eliminate), what evidence it needs, and how authority transfers with it; is Conway's law a transition kind or only an analogy?
- **Q65** Are the article's frontier and a time-triggered slot one object at two scales, or an analogy of the kind C17 warns about?
- **Q66** Can a coarse map run on-device in milliseconds, and what fabric granularity does that fix; what is the mapper's own tiering ladder with deoptimization between rungs?

## Meta

- **Q46** Which unifications are architectural and which are shared bookkeeping? The current answer is in [Positions](positions.md); the experiments are the test.
