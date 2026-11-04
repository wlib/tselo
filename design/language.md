---
title: "The language that is not a language: records, theories, judgments"
status: proposal
updated: 2026-11-03
---

# The language that is not a language: records, theories, judgments

There is no program text and no fixed vocabulary. Four things are frozen: a record encoding with its hash, one judgment the kernel checks, one base theory the seed interprets natively, and the form of a bridge between theories. Every vocabulary in this notebook, including the hardware description vocabulary, the numerics, the effect algebras, and a PCB netlist, is a theory record loaded through that mechanism. An author writes five kinds of thing; direction, representation, order, placement, schedule, and precision are not written by default and are constrained, where wanted, by scoped commitments. The shapes are in [Schemas](schemas.md); the argument is here.

## What is frozen

| Frozen | Varies |
|---|---|
| the record encoding and its hash | every kind of record, including the kinds listed in [Schemas](schemas.md) |
| the judgment shape the kernel checks | every theory, law, relation, and evidence kind |
| the base theory the seed interprets natively | every other theory, reached through a chain of interpreters |
| the bridge form between theories | which theories exist and how they relate |
| the exchange protocol by which a device receives records and delivers its description ([Participation](participation.md)) | the vocabulary inside it |

Q01, Q02, and Q53 are one question, and this is the answer proposed: freeze the extension mechanism, not the vocabulary. A new concept arrives as a theory with its interpreter and bridges attached, so vocabularies grow without a treaty renegotiation. Three capabilities are kept apart (C71). A theory may be *stored* with its signature alone: a partially understood device, an incomplete physical model, a specification with no known execution strategy can enter the store and be investigated before anyone knows how to realize it. It may be *reasoned about* once it has laws and bridges. Nothing is *realized* in it until it has an interpreter, since a lowering must end in a theory the target interprets. The dialect failure of layered compiler infrastructures, many vocabularies and no shared semantics ([Systems](../evidence/systems.md)), is addressed by that realization rule, not prevented by construction: whether bridges are adequate and compose usefully is what [E5](../experiments/connective-tissue.md) tests.

## Theories are the extension mechanism

A theory record is a signature, its laws, an interpreter for its terms written in a theory the system already interprets, and bridges to other theories. Relations, programs, netlists, Datalog rules, floorplans, and work orders are terms in some theory, and the store does not pretend they share one. Terms are a special case of relations, which is what lets one store hold a compiler IR and a netlist without pretending they share a theory, and still share an equivalence checker over the base ([E5](../experiments/connective-tissue.md) is the test). Names do not exist at this level; a name is a view-local alias with its own record ([Store](store.md)).

## The judgment and the kernel

```text
under theory T and assumptions Σ:   A  R  B   by evidence E
```

The trusted base is a certificate checker for a logical framework, a few thousand lines, in which a theory is a signature, a law is an axiom, and a proof is a term the checker types. A logical framework is preferred over a rewriting kernel because it makes theories first-class data: an equality saturation, a solver run, or a model checker produces a chain of justified steps, and the chain is checked rather than the tool trusted ([Justification](justification.md), the de Bruijn criterion). The kernel is itself a region with a contract. Under a trust policy that accepts reproductions, checking can be specialized away in production and re-enabled on demand; that is the first self-application test ([Bootstrap](bootstrap.md)). Checking throughput, not generation, is the scarce resource once agents produce claims in volume, so certificates must be sized so that checking costs time proportional to the artifact rather than to the search that produced it, and the hottest certificate families get a hard-wired checker cell ([Chipset family](../hardware/chipset-family.md), [Trust](trust.md)).

## Five things an author writes

| The author writes | It is | Example |
|---|---|---|
| **shape** | a relation with a theory | `Map K V` is a relation on `(K, V)` functional in `K` |
| **law** | an equation, ordering, or refinement in that theory | `lookup(insert(m, k, v), k) = v` |
| **observer** | which distinctions must survive at which boundary ([Observers](observers.md)) | the client sees lookup results only, not order, capacity, or timing |
| **budget** | error, latency, energy, retention, with a workload model ([Justification](justification.md), [Models](models.md)) | p99 lookup under workload W1 within 200 ns; minimize energy |
| **example and preference** | samples, counterexamples, tie-breaks | ten thousand traces; prefer deterministic over fast when within 5% |

Direction, representation, evaluation order, placement, scheduling, and precision are not written by default; they are edges the mapper adds, each with evidence, and an author constrains any of them with a scoped commitment ([Commitment](commitment.md)), which is the gradual-control requirement. A sort is `permutation(in, out) ∧ sorted(out)` plus an observer; if the observer does not distinguish the order of equal keys, stability is not a property the realization pays for. A log is an effect with the law `emit(a); emit(b) = emit(a · b)` and an observer; if no admitted observer reads it within the deadline, the log is eliminated under a license naming that observer ([Change](change.md)). Numbers and time are written as intents with tolerances, never as representations ([Quantities](quantities.md)). There is no foreign-function interface: foreign code is a lowered artifact, probed and lifted into edges like any binary ([Onboarding](onboarding.md)).

Text exists only as views; a theory ships its projections ([Store](store.md), views and the editor).

## Lowering is a query

```text
edge   A  --refines-->  B    under theory T, assumptions Σ, target class G, cost model v
```

Compiling is a query, not a pass pipeline. A realization is a path from the intent records to a fragment whose theory is the target's own configuration theory; the mapper searches for the cheapest path under the budgets, reusing any stored edge whose key matches, and each step becomes a new edge with its evidence kind ([Claim store](claim-store.md), resolution). The binary is the last fragment on the path. Distribution is distributing records: a device extracts its own realization against its own description, and the extraction is a cached edge for every device with the same description hash. Run backward, the same relation decompiles ([Onboarding](onboarding.md)).

## Packages are policies

| Familiar object | What it is here |
|---|---|
| a package | a publication policy over a set of records plus a trust policy for consuming them |
| importing | accepting claims from a provenance under a trust policy |
| a dependency | the assumption set a consumer's edges rest on; the dependency graph is the assumption graph ([Trust](trust.md)) |
| a version | a frontier ([Change](change.md)) |
| a namespace | view-local naming |
| a registry | unnecessary: gossip plus identity, and identity is the one piece with no design yet (Q55) |

## Tests

Whether a compiler IR and a netlist can both be theories over one base and still share an equivalence checker ([E5](../experiments/connective-tissue.md)); whether a declared observer eliminates a real cache without the author naming it ([E2](../experiments/three-realizations.md), the discovery sequence); whether certificate size stays proportional to the artifact on [E1](../experiments/adaptive-collection.md)'s rewrites (Q60). The likeliest failure is that the relational core lowers irregular, stateful code only by falling to the floor of hand-written fragments in cell theories, in which case the project has built a very good linker (Q37).
