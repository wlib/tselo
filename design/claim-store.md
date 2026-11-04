---
title: "The claim store"
status: proposal
updated: 2026-11-03
---

# The claim store

Across parties the store becomes a distributed, merged store of claims about all known software and hardware, with proofs, trust, partial checks, and privacy as metadata, gossiped with public and private relations mixed, so that no type check, lowering, or analysis is repeated on a fragment anyone has done and shared; a codebase or library is its source plus every relation worth storing; compilation, decompilation, and sharing are one query over edges. The primitive is a certified relation edge between content-addressed fragments; equivalence classes are a derived view. The direction is Daniel's ([User intent](../intent/user-intent.md) §8).

## The primitive: a certified edge, not a class

Equality saturation works for pure term rewriting. With effects, state, resources, time, or approximation the class dissolves: refinement is directed, approximation is not transitive, evolution relates different contracts. So the stored object is an **edge**: fragment A relates to fragment B by a named relation (exact equivalence, refinement, ε-closeness with an error contract, distributional agreement, evolution; [Observers](observers.md)) under a named theory and an assumption set, with evidence of a stated kind. An **e-class** is a derived view: the fragments connected by equivalence edges under one theory whose evidence the reader's trust policy accepts. Different readers with different trust policies see different classes over the same edge set; a withdrawn proof removes an edge and splits a class without touching any other claim. Canonicalization is itself an edge (F ≡ canon(F), certified), not a precondition of storage.

## Four queries, one edge relation

| Query | Input | Answer |
|---|---|---|
| compile | a fragment, a theory, a target description | a lowering whose leaves the target has, reached through accepted edges, with evidence and cost |
| decompile | bytes or a lifted fragment | the fragments it is connected to, with the evidence for each edge |
| share | a claim | propagation to anyone whose fragment is connected to the same fragment under the same assumptions |
| describe | a target | the claims (guaranteed, empirical, wrapper-enforced) that form its self-description |

A stored lowering "S under compiler C with flags F produces bytes B" is an edge from S to B and also a dictionary entry for recognizing B.

## The key

A claim attaches to (fragment hash, theory, assumption set, target class, cost-model version, collection policy) ([Schemas](schemas.md)). Lookup from a different fragment traverses accepted equivalence edges first, which is what makes a stranger's lowering of a library function findable regardless of names, argument order, or surrounding code; syntactic caches (input hashes) miss on all of those. Theories are first-class nodes with identities: a claim under "fp32, left-to-right accumulation" is not a claim under fast-math (Q40, Q43).

## Claim kinds

| Kind | Example | Receiver's cost | Safe to gossip because |
|---|---|---|---|
| certificate | proof, translation-validation witness, equivalence certificate | check with a small kernel | expensive to make, cheap to check |
| reproducible derivation | "inputs H build output O" | recompute, or accept k-of-n independent reproductions | mechanical |
| empirical | profile, benchmark, calibration curve, probed hardware contract | consume with a local worst-case bound and a guard | a poisoned prediction costs one deopt, not correctness |
| assertion | "I trust this" | provenance and reputation | labeled as trusted; downstream claims keep the dependency |

The claim set is monotone and merges as a CRDT by set union. The relation anyone *uses* is a derived view under a trust policy, and that view is not monotone: a wrong proof, a revised cost model, or an exceeded validity domain retracts edges. So the engine under the store is frontier-tagged incremental derivation with invalidation predicates ([Store](store.md)), where deletion is the known expensive case (Q39). What a poisoned claim of each kind can do, and what the kernel, reproducers, and identities must be trusted for, is in [Trust](trust.md).

## Resolution

Resolution is: the cheapest lowering whose leaves exist on the target and whose accumulated error and assumptions fit the contract, following only edges the trust policy accepts. Approximation edges carry error contracts and extraction tracks accumulated error as a budget (Q41). The hardware generator is a node: for any fragment it can create a leaf (a fixed datapath) at a cost, so "fabricate an implementation" is a fourth option beside library, composition, and approximation, and the generator and the mapper are one tool parameterized by binding time: for a static region the fabric configuration is the program and an ASIC is a frozen program ([Chipset family](../hardware/chipset-family.md)). Recognizing that a stored claim applies is itself a cost; canonicalization is recognition.

## What is reusable

A completed lowering is the simplest reusable product and the one most tied to its context: a result about an operation may rest on an arithmetic theory, an aliasing fact, an observer restriction, a workload, and a placement, and another program may satisfy those through a different representation. The store's question is how engineering knowledge stays reusable as representations and contexts change; "the compiler never repeats work" is its consequence for the common case (C57).

| Reusable product | Why it is worth storing |
|---|---|
| completed lowerings and certificates | the Zipf head: reuse by lookup |
| parameterized transformations with their applicability conditions | another fragment meets the conditions through a different representation; recognition, not derivation, is the cost (Q40) |
| failed candidates and counterexamples | prune search; a counterexample is certificate-kind evidence against a claim |
| partial arguments with explicit residual obligations | a conditional claim is reusable wherever the residual can be discharged locally ([Justification](justification.md)) |
| search strategies that paid on related problems | heuristics shared across versions and parties |
| models of when retrieving and adapting a result costs less than re-deriving it | the retention planner's input; a conditional result is worth storing only when recognizing its applicability is cheaper than re-derivation |

## Two halves with different economics

| Half | What is shared | Where the value is | Hard part |
|---|---|---|---|
| **cross-party** | lowerings, certificates, probed contracts, and lifts of fragments many parties hold | the Zipf head: libc, TLS, codecs, matmul, popular libraries; most running code, few distinct fragments; lifting by reproduction turns decompilation of public-source binaries into lookup ([Onboarding](onboarding.md)) | supply: who produces certificates and reproductions, and why; canonicalization keeps hit rates above the head (Q40, Q56) |
| **intra-codebase** | analyses, invariants, partial lowerings, and search decisions across versions of one codebase | every fragment, every build; the compiler never redoes work an edit did not invalidate | this is incremental compilation with semantic rather than syntactic keys: valuable and achievable, with less novelty than the first half |

Daniel's "never repeat the same type check" is exact for the second half; for the first half it is a prediction about fragment-level claims, true where fragments are common, and untested (C57). Version n+1 is a small edit: claims attach to fragments and traverse equivalence edges, so analyses survive edits that preserve the class (rename, reformat, reorder) and are re-derived only where the class changed. Results from version n are speculative claims for n+1, cheaper to recheck than to re-derive. The optimizer's and lifter's *search decisions* are claims too (what is reusable, above). The decompilation side (triangulation, lifting by reproduction) is in [Onboarding](onboarding.md); the seeding of the store from existing toolchains is in [Bootstrap](bootstrap.md).

## Hard parts

1. Monotone claims, non-monotone views: retraction semantics (Q39).
2. Canonicalization and key design: context (fusion, placement) grows fragments until they are unique, which caps cross-party hit rates to a Zipf head, and recognition cost bounds what is worth storing (Q40).
3. Privacy: publishing that a private fragment is connected to a public one leaks that fact without the body; consuming public claims leaks nothing; publication is a per-fragment design-scope decision (Q42).
4. Theory versioning and arithmetic modes (Q43).
5. Supply and verification: who produces certificates and reproductions; checking, not generating, is the scarce resource once agents produce claims in volume ([Trust](trust.md)); markets for claims are the candidate answer for the long tail ([Consequences](consequences.md); Q45, Q56).
6. Retention: claims have storage cost and reuse value; the retention planner decides what to keep where ([Commitment](commitment.md)).
7. Adversaries: a poisoned certificate against a buggy kernel, colluding reproducers, Sybil identities ([Trust](trust.md), Q54, Q55).
8. Licensing of claims about proprietary binaries: a real constraint and not a technical one.

Prior art holds one claim kind under one key each ([Systems](../evidence/systems.md)); the proposed contribution is one edge model, one evidence model, and one gossip layer across them. First test: the shared-store variant of [E5](../experiments/connective-tissue.md).
