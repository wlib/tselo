---
title: "Trust: the assumption graph, the trusted base, and the adversarial store"
status: proposal
updated: 2026-11-03
---

# Trust: the assumption graph, the trusted base, and the adversarial store

A gossiped store of claims that end up compiled into binaries is a supply-chain attack surface. The primary object is the **assumption graph**: the assertion-kind claims on a realization's critical path and what rests on each. The trusted base is that graph's roots; a trust budget is one labeled model over the graph, useful where independence evidence exists; the threats to the store are listed by claim kind.

## What is trusted, and how trust is reduced

| Trusted thing | Why it must be trusted | How its trust shrinks |
|---|---|---|
| checker kernel | every certificate's meaning rests on it | small by design (de Bruijn, [Justification](justification.md)); independent reimplementations; a second kernel before any shared store goes live; certificates checked through several kernels on critical paths |
| seed interpreter and hash | the store's identity and the first compiler | reproduction and k-of-n ([Bootstrap](bootstrap.md)) |
| probed contracts | the host's behavior is observed, not specified | guaranteed where a formal model exists; wrapper-enforced where a bridge can make a property true ([Onboarding](onboarding.md)) |
| reproducers | k-of-n reproduction is evidence only if the n are independent | independence evidence (different operators, toolchains, hosts); reputation as a model with a validity domain |
| authority enforcement and recovery | the specializer depends on them | kept as a named region with a contract; specialized away only under elimination licenses with certificate-kind evidence ([Participation](participation.md)) |
| the immutable describer and the management sequencer on a die | they answer `describe` before any configuration exists and run the fast control loop | the describer is fixed; the management sequencer, where present, has a published contract ([Chipset family](../hardware/chipset-family.md)) |
| identities in the gossip layer | provenance is meaningless without them | key management, attestation, and Sybil resistance (Q55) |

## The assumption graph and its models

The dependency graph of a realization is its assumption graph: a dependency is the set of assumptions a consumer's edges rest on ([Language](language.md), packages). The editor shows it, and the standing question for every node is why it is still an assertion. Models label the graph; none replaces it:

| Model over the graph | What it says | Where it holds |
|---|---|---|
| **trust budget** | the composed probability that the assertions on a path are wrong, under a fault model with correlations: two compilers from one lineage, two reproducers run by one operator, two kernels sharing a parser are not independent, the shared-rail problem of hardware reliability ([Justification](justification.md), error budgets) | where independence evidence exists; otherwise a bound, not an estimate (Q54) |
| **reputation** | a believed-kind model of a reporter or reproducer | within its collection policy |
| **price** | what a certificate or reproduction would cost to obtain, and what it is worth | where a market for claims exists ([Consequences](consequences.md)) |

Diversifying compilers is redundancy against the fault "the compiler lied"; N-version programming, diverse double compilation, and triple modular redundancy are one mechanism under one fault model, and the mapper can minimize trusted surface as it minimizes energy. Whether that composition is a theorem or an analogy with a useful shape is open (Q54).

## Checking is the scarce resource

Once agents generate cells, contracts, lowerings, and certificates in volume, checking throughput bounds the system, not generation. Three consequences: certificates are sized so checking costs time proportional to the artifact rather than to the search that produced it (Q60); the cost to certify a new cell type or a new theory belongs in the generator's cost model beside area and energy ([Chipset family](../hardware/chipset-family.md)); and architectures that minimize verification surface, few cell types with compositional timing contracts, may beat architectures that minimize energy.

## The adversarial store

| Claim kind | What a poisoned claim does | Defense |
|---|---|---|
| empirical | a wrong prediction; one deopt, bounded by the local worst-case bound | the worst-case-bound rule ([Models](models.md)) |
| reproducible derivation | a wrong lowering accepted because k reproducers agreed | independence evidence for the k; recompute locally for critical paths; reproducers are claims with reputation |
| certificate | a wrong lowering accepted because the kernel has a bug or the certificate exploits an unstated assumption | kernel minimality and diversity; theories and assumptions as first-class nodes so a certificate is never applied under another theory ([Claim store](claim-store.md)) |
| assertion | whatever the asserter wants | provenance kept downstream; the editor shows the assertion on the critical path; the budget prices it |

Three further leaks sit outside the claim kinds. Publishing that a private fragment connects to a public one leaks membership without the body (Q42). Profiles shared across a fleet leak workload information ([Models](models.md), Q48). Identity is the root: without Sybil resistance, k-of-n is a vote by whoever runs the most reproducers, and independence has to be worth more than collusion, which is what paying reproducers for independence is for (Q55, Q56).

## Relation to the other justifications

Trust is the residue the other three justifications stand on: a certificate is guaranteed *relative to* a kernel; a prediction is believed *relative to* a collection policy and a reporter; a permission is granted *relative to* a policy's authority. The de Bruijn criterion minimizes the residue; it does not remove it. Information-flow obligations ([Observers](observers.md)) say what an observer may learn; trust says whose word about the system is being taken, and on what critical path. Open: Q52, Q54, Q55, Q60.
