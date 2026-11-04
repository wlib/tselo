---
title: "Bootstrap: the seed, the host, and the shrinking trusted base"
status: proposal
updated: 2026-11-03
---

# Bootstrap: the seed, the host, and the shrinking trusted base

Bootstrapping is not a special process; it falls out of how lowering and targets are modeled ([User intent](../intent/user-intent.md) §3). The seed is the first claim whose evidence kind is "assertion"; shrinking the trusted base is uncommitting pointed at the seed; the host enters as a probed cell; every region keeps an admissible continuation; existing toolchains and the existing ecosystem are the store's first population. No step introduces a mechanism the design does not already have.

## The seed is a claim

| Artifact | Initial claim kind | Upgraded by |
|---|---|---|
| seed binary of the core interpreter | assertion ("this toolchain's output implements the core") | self-specialization and comparison (reproduction); independent reimplementations (k-of-n); a verified kernel (certificate) |
| hash function | assertion | independent implementations agreeing (reproduction); a certified implementation |
| probed host contract | empirical, per property | documentation or a formal model where one exists (guaranteed); a bridge that makes a property true (wrapper-enforced) |
| checker kernel | assertion | reimplementation and cross-checking; a second independent kernel before any shared store goes live; eventually self-verification within a stated trusted base |

Thompson's trusting-trust problem becomes rows in the store with provenance. Diverse double compilation is k-of-n reproduction, and it certifies only that a binary corresponds to its source; it says nothing about whether the source is right, so the dependency on the source's own evidence stays visible ([Claim store](claim-store.md), [Trust](trust.md)).

## The seed is an interpreter

The reference semantics of the core is written as an interpreter in the core. The first compiler is that interpreter specialized to each program (the first Futamura projection); the second projection yields the compiler itself ([Systems](../evidence/systems.md): collapsing towers, Truffle, PyPy). The seed binary comes from any untrusted toolchain and carries an assertion claim. Running it on the interpreter applied to itself yields a second binary; agreement is a reproduction claim; repeating across host toolchains and hosts upgrades the seed's claim from assertion to k-of-n reproduction under the assumptions diverse double compilation makes explicit: the reproducers' tools, environments, and semantic models must be independent, and whatever they share stays a correlated fault in the assumption graph (C70, C75; [Trust](trust.md)). The full-source bootstrap chain that Guix maintains, from a seed of a few hundred bytes through successive compilers, is the exemplar and is imported as the store's first provenance history ([References](../evidence/references.md)).

## Boot order

The seed is a single record: the kernel's logic as an assertion-kind claim plus, where a checker cell exists, its correspondence proof ([Chipset family](../hardware/chipset-family.md)). A host cell receives flat records over the exchange protocol in this order: theories, the relational language's interpreter as a sequencer program, the device's own description, then the intent records ([Language](language.md)). The interpreter runs the mapper; the mapper produces a better realization of the mapper for this device by specialization; from there the device is a participant. The boot is a transition log and can be replayed, audited, and specialized like any other derivation.

Two self-application tests: whether checking can be specialized away under a trust policy that accepts reproductions and re-enabled on demand ([Language](language.md)), and whether the first mapper the mapper produces beats the interpreter under the device's own budgets.

## The host is the first cell

Day one the system runs on commodity hardware. Probe it for an empirical self-description; lift its instruction set from a machine-readable specification into an interpreter in the store ([Onboarding](onboarding.md)). The host is then a sequencer cell with a published contract and the generator palette's first entry: commodity sequencer, probed. The greenfield premise ([User intent](../intent/user-intent.md) §2) is untouched because it is about the target, not the development path.

| The lifted interpreter of the host instruction set is | Used for |
|---|---|
| the lifting tool | legacy binaries enter the store by specialization |
| the emulator | old code runs on new hardware once the interpreter is specialized to the new target |
| the oracle | differential testing of compiled code against the reference |
| the cell description | the host's contract in the palette |

## The admissible continuation

Every compiled region keeps a backward map at safe points ([Commitment](commitment.md), partial lens) to the admissible continuation of [Runtime](runtime.md). Daniel's "interpreted while debugging, compiled as it learns" ([User intent](../intent/user-intent.md) §4) is the same mechanism seen from the author's side.

## The durable core is a set of hashed records

The merge of the claim set is set union, which needs no coordination. Equivalence views, trust views, indices, and derivation caches are derived state; the system can be lost and rebuilt from the flat claim set and the seed interpreter ([Store](store.md)). The first view is a canonical textual form, so no structural editor is needed to begin and every existing text tool works.

## The existing world is the first population

| Import | As | Yields |
|---|---|---|
| existing toolchains | content-addressed functions with assertion-kind lowering claims | every binary they produce becomes a reproducible-derivation edge; lifting by reproduction certifies public-source binaries by lookup ([Onboarding](onboarding.md)) |
| reproducible-builds and full-source bootstrap chains | reproduction edges with their existing cross-checks | a provenance history older than the store |
| package ecosystems | sources and binaries to lift | content addressing across them |

Because the connective tissue is roughly an incremental build system with semantic keys and shared provenance, the first usable product is a cross-party build and lowering cache for languages people already use. That populates the claim store before the new language exists and tests the cross-party half of [Claim store](claim-store.md) on real traffic.

## Hardware enters data-driven

The palette starts as probed commodity cells plus an FPGA fabric described as a target whose cells are lookup tables. Custom silicon is the "fabricate a leaf" option, and the store's own cost accounting says which fragment class is hot and poorly served, so the first tape-out is chosen by evidence rather than taste ([Fabrication](../hardware/fabrication.md)). The chip design is a lowering to a foundry process kit treated as a target description; the characterization die is a measurement that revises the self-description and invalidates the generator's cost-model claims ([Chipset family](../hardware/chipset-family.md)).

## Sequence

| Stage | Build | Claim it tests |
|---|---|---|
| 1 | seed interpreter for a tiny certificate-checking core, implemented independently several times | the core is small enough to reimplement (Q52) |
| 2 | flat hashed records with set-union merge | the durable core needs nothing else |
| 3 | probe the host, lift its instruction set, publish it as the first cell | probe and lift suffice to onboard a target |
| 4 | run the derivation engine under the seed interpreter, specialize it to itself, reach the first fixed point | self-hosting by specialization |
| 5 | import existing toolchains and bootstrap chains; populate by reproduction | the cross-party half of the claim store |
| 6 | mapper and model DAG on the host; the three realizations and the adaptive collection | [E2](../experiments/three-realizations.md), [E1](../experiments/adaptive-collection.md) |
| 7 | generator with commodity and FPGA palettes; first custom cell from store statistics | the fourth bet ([Spine](spine.md)) |

Open: Q52, Q53, Q56.
