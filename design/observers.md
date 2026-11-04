---
title: "Observers: distinctions, relations, effects, envelopes"
status: position
updated: 2026-11-03
---

# Observers: distinctions, relations, effects, envelopes

The common currency across types, effects, security, consistency, compression, and compilation is a distinction relative to an observer. The unification is a parameterized family (one representation of states and evidence, a different relation plugged in), not one equivalence. Effects are equations; a consistency envelope is a declared observer with named commit points.

## Instances

The seed is the article's observation that an effect is a state transition as seen from a viewpoint; a machine that mutates internally but resets before yielding is pure from outside.

| Thing | Observer and distinction |
|---|---|
| a type | the distinctions a value may exhibit; a refinement is fewer; a proof is none |
| parametricity | an observer of an abstract type *cannot* distinguish implementations: the mapper's freedom |
| noninterference | a low observer *may not* distinguish high inputs: security |
| a consistency envelope | a declared observer: what outsiders see, which invariants hold, where effects commit |
| ownership; region privileges | observer rights on mutation, aliasing, regions |
| Spectre | observer mismatch: the microarchitecture exposed timing distinctions the ISA said no observer had |
| decompilation, uncommitting | proving a distinction (address, order, layout) had no observer |
| a view in the editor | an observer-specific projection of the store |
| compression; error correction | removing distinctions no receiver needs; adding redundancy so needed distinctions survive a lossy boundary ([Codecs](codecs.md)) |

**The observer checklist.** Whether a collection's implementation may be replaced depends on far more than its element type: can anyone observe iteration order, escaping references, identity across updates, a version mixture, intermediates, exactness vs bounds vs samples, progress or deadline guarantees, timing, cancellation, authority? The answers decide whether the system may sort, shard, batch, duplicate, compress, speculate, or move. This is the formal reason a high-level language can out-optimize C: C commits to address, order, and representation at the point of writing; parametricity is the license to defer commitment until an observer depends on it ([Commitment](commitment.md)).

**Inferred inside, declared at the boundary.** Inside a region where the compiler sees every consumer, the observer is computed by pushing consumer requirements backward ([Codecs](codecs.md), functional compression); declaration is needed only where the region is open, where a future or foreign consumer may appear. The declaration burden is therefore proportional to open boundary surface, not to program size: a satellite is almost entirely closed and needs almost no observer declarations; a public library is all boundary and needs them everywhere, which is right because its boundary is a standard ([Commitment](commitment.md)). The usability bet becomes measurable by counting open boundaries in lifted codebases (Q58, [E7](../experiments/foreign-recovery.md)). The same criterion places boundaries: a boundary belongs where the information that must cross it is smallest ([Physics](../hardware/physics.md), the region with a low-information boundary), and moving, splitting, or eliminating one is a transition kind with authority attached ([Change](change.md)).

**Hardware exposes observers too.** A side channel is an observer the contract said did not exist, so a cell's self-description declares which observers it exposes (timing, power, electromagnetic, shared state; [Schemas](schemas.md)), constant-time becomes an elimination license for regions whose observer class excludes timing, and differential privacy is an approximation edge whose error contract is ε ([Consequences](consequences.md)).

**The future matters.** State is information retained for possible future interactions; two states are interchangeable only if no *admitted future interaction* distinguishes them in a way the contract cares about, so equal output now is insufficient. Observed clients are not all admitted clients ([Onboarding](onboarding.md)).

## A family of relations

| Relation | Typical use | Composition |
|---|---|---|
| exact observational equivalence | representation replacement | equivalence; state the observer class |
| refinement | implementing an underspecified contract | preorder; directed, not invertible |
| ε-closeness | numeric or perceptual tolerance | reflexive, symmetric, **not transitive**; needs an explicit error-composition rule |
| distributional agreement | sampling, probabilistic semantics | marginals may miss dependence |
| information-flow condition | restricting what an observer learns | a 2-safety hyperproperty over pairs of runs, not a single-trace property; deterministic, nondeterministic, and probabilistic formulations differ (C21) |
| evolution relation | changing a contract | states which old commitments survive |

Representation independence and noninterference share the relational vocabulary and differ in quantifier structure and obligations (two implementations under one observer vs one implementation under two inputs; C20). Per-message authority checks do not establish information-flow properties: repeated permitted aggregate queries can reveal forbidden records. Equational theories license rewrites only under their hypotheses (floating-point addition is not associative). "Preserve distinctions" is a modeling question parameterized by one of these relations, not a universal proof rule. No single calculus has been chosen; candidates are relational models, transition systems, contextual refinement, assume/guarantee contracts, hyperproperties (Q04, Q05). A shared store never holds a transitive "approximately equal" class; approximation edges carry error contracts ([Claim store](claim-store.md)). "What can this observer distinguish" fixes at once what the mapper may move and what an attacker cannot see, so security stops being a layer and becomes an envelope, with the caveat that its obligation is a hyperproperty with its own composition rule.

## Effects are equations

Algebraic effects are algebraic because they come with equations (state: get-get commutes, put-put absorbs; reader is idempotent; nondeterminism is a semilattice). Each equation says two programs are indistinguishable, i.e. the compiler may rewrite one into the other; they are the same kind of object as the commutativity predicates in the article's commit DAG. Read this way, a memory model is the equational theory of the memory effect (OCaml's local data-race freedom says which equations survive a race), transaction conflict rules are the equations of the storage effect with invariant confluence adding the invariant, and tile-movement semantics are the equations of the placement effect. One fact (associativity and commutativity of `+`) lets a datapath pipeline, a local implementation reorder under late arrival, and a replicated service avoid coordination ([E2](../experiments/three-realizations.md)).

Handlers are lowerings: a handler for `move(tile, VMEM)` chooses the placement policy for that scope, one for suspend/resume chooses the scheduler (the control-flow version of a pluggable mapper). Typed effects (row types with evidence passing; capability passing resolved statically) let the compiler know which handler applies and compile dispatch away; handlers are not free by default and concurrency models are not interchangeable. Without an equational theory the compiler has only trivial rewrites; with user-declared equations and a checker that can verify or test them, the search space is defined by the program's own laws.

Qualifications: naming an effect does not establish its algebra; laws need evidence and scope. Memory effects, region privileges, transaction rules, and explicit movement are related inputs to optimization, not automatically one theory. Ordering, liveness, failure, and interference may need trace or operational semantics beyond equations. Open: which laws are primitive and which are library declarations (Q03 for how declared laws are checked), and how residual obligations stay visible after handling and cross-domain lowering (Q49).

## Consistency envelopes

A region of the derivation graph that may be internally out of step but exposes itself as consistent at its boundary, with the required fields in [Schemas](schemas.md). The **commit boundary** is irreducible: an emitted physical action or externally observed response is not retracted by deleting a speculative branch; compensation is a new action with its own semantics.

**The glitch generalizes.** The article's A, B, C, D example reappears whenever two decisions derive from one model and update out of step: not a slow system but a wrong one ("sort here" and "binary-search there" from a stale workload model). Across asynchronous boundaries ordering alone is insufficient; a consumer needs a policy for compatible versions and allowed provisional combinations; unchanged dependencies need not carry identical timestamps to be valid for a snapshot.

**The optimistic edit, made executable.** The article's bio edit is a *proposal*: a speculative index entry refers to the proposal and may be visible only to the proposer; acceptance promotes it, rejection removes it or invokes a declared conflict policy; the browser shows provisional state with a distinguishable pending status. To execute it one must state which reads may include the proposal and combine it with other versions, whether external actions may depend on a provisional result and what happens after rejection, how concurrent edits are rebased and who owns that policy, and when the old entry and proposal history may be reclaimed. The authoritative transaction and the speculative view have different contracts.

The same object appears as glitch-freedom in reactive signals, transaction isolation and MVCC snapshots, deopt granularity, codec framing, the restoring digital boundary, the authorization freshness token (the new-enemy problem is a glitch with permissions as the derived signal), and a fabric region with a frontier predicate ([Correspondences](correspondences.md)). **Kinds of frontier**, related by explicit mappings and not interchangeable (C17): a causal or version frontier naming history positions; a consistent snapshot with defined read semantics; a progress frontier ruling out future events ("no outstanding authority to emit below t"); a freshness token imposing a lower bound on a read; a physical-time estimate.

**Consistency levels.** Daniel's position (a strict core with opt-in, tracked speculation; [Article](../intent/article.md)) is strengthened: coordination-freedom is governed by **invariant confluence**, not commutativity (two replicas each approving a withdrawal of seven from ten commute and break the balance invariant; return values, preconditions, and observations are part of an operation's semantics); escrow partitions an invariant's budget so operations proceed locally (the article's partitioned ID ranges); strict serializability does not imply one physical central machine (C09, C10). Operations with commutativity predicates and runtime conflict detection are also the Galois model for speculative parallelization of irregular algorithms, so the DAG doubles as a parallel execution model.

**What the DAG gives.** History and causality. It does not by itself establish serializability, make conflicting operations commute, or give logarithmic materialization; deterministic conflict resolution is a chosen semantics; a full snapshot costs at least the size of the result and the skip-compaction complexity depends on the operation algebra, requested view, DAG structure, and retained information; deletion and compaction must account for retained snapshots, replicas, derived views, and evidence dependencies, and branching and rollback are not physically free (C11–C14, Q19).
