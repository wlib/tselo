---
title: "Onboarding: probe, lift, uncommit, triangulate"
status: position
updated: 2026-11-03
---

# Onboarding: probe, lift, uncommit, triangulate

Anything that does not describe itself is described by probing; anything whose semantics are available is lifted, then uncommitted one commitment at a time; related artifacts triangulate meaning and reproduction certifies lifts. Agents are a search strategy, not a source of truth. Observation is not specification. Compilation and decompilation are one relation run in two directions. The triangulation section is a proposal.

Daniel's requirement: an OS that reinterprets existing binaries like a decompiler, with agentic rewriting of parts onto the new stack; any part of the system replaceable by future technology or commodity parts; AI changing the economics of reverse-engineering and reimplementing everything worth running ([User intent](../intent/user-intent.md) §2, §4, §8).

## Hardware: probe

The decompiler for hardware exists under other names: uops.info characterizes every x86 instruction's latency, throughput, and port usage by automated microbenchmark; litmus tooling discovers which reorderings a memory model permits; pointer chasing recovers cache hierarchies. Pointed at any part, this yields a contract marked *empirical, validity domain = these conditions*, used with guards until measurement tightens it. A bridge labels each property **guaranteed** (documentation, formal description), **empirical** (calibration), or **wrapper-enforced** (the bridge makes it true) ([Participation](participation.md)). Failing to observe a behavior does not prove the device cannot exhibit it (C38); unknown features and physical conversion costs may remain limitations of the bridge. The dominant cost of onboarding a commodity part is the bridge, not the probe: a DRAM controller with its PHY, a PCIe stack and driver, a GPU runtime. Bridge cost is a step function along the custom-to-commodity scale, and bridges are palette items with design cost ([Chipset family](../hardware/chipset-family.md)). On a commodity CPU whose replacement policies and prefetchers are undocumented the cost model cannot be published, so there the stack is a very good conventional compiler with an empirical cost model, a real floor worth stating.

## Software: lift, then uncommit

1. **Environmental contract.** Instruction behavior plus memory, OS, device, and external-protocol interactions, explicit. ISA semantics alone are not the application (C39, Q38).
2. **Lift.** Run the ISA's interpreter (written in the store's language, from a machine-readable architecture specification such as Arm's or a Sail model) over the binary and specialize: the first Futamura projection, which Truffle and PyPy do deliberately and Rosetta 2 and Transmeta did for real. The result is the program in the store, correct by construction, with every commitment the original compiler made still in place.
3. **Uncommit**, one commitment at a time, in the three modes ([Information economy](information-economy.md)): **prove** the commitment incidental (type and pointer recovery, alias analysis); **guard** (run the uncommitted version differentially against the lifted original on recorded workloads; translation validation on small regions); **conjecture** (an agent proposes uncommitments; the de Bruijn criterion makes this safe because checkers decide). Bansal and Aiken's binary translation via superoptimization is the precedent: candidate search, execution tests, and equivalence checking as separate steps.
4. **Re-lower** onto whatever cells exist.

Evidence that there is something on the table: Dynamo re-optimized native binaries at runtime for gains up to roughly a fifth, and Apple added a hardware TSO mode so Rosetta 2 could borrow a guard from the fabric ([Systems](../evidence/systems.md)).

**Observation is not specification** (C41). A legacy binary's real contract is not narrower than its ISA semantics merely because timing, addresses, padding, and iteration order were never observed. "No observed client depended on this" informs a decision to *change* a contract; it does not prove no admitted client depends on it, and differential testing is evidence, not a runtime guard for every future execution (C40). Uncommitting beyond the established compatibility contract is software evolution even when an agent discovers it, and is presented as one of: *a proven representation change; a guarded specialization; a proposed behavior change with the evidence for believing it acceptable* ([Change](change.md)). Effects cannot be duplicated merely to compare two implementations; guarded execution checks assumptions before irreversible consequences or uses a valid recovery protocol.

## Compilation and decompilation are one relation

A lowering is a relation between fragments in two theories ([Language](language.md)); extraction runs it forward and lifting runs it backward. Forward is nearly deterministic once a cost model is fixed. Backward is search, and triangulation below is exactly the constraint set that makes backward search tractable: a second lowering of the same source fixes what varied, version series fix what changed, and reproduction fixes the whole answer when it hits. There is no separate lifter: every rewrite rule the optimizer learns is a recognition pattern for the lifter, and the shared analyses Daniel asked for ([User intent](../intent/user-intent.md) §8) are a property of the representation rather than a design goal. [E7](../experiments/foreign-recovery.md) tests this if it lifts by running the store's own lowering edges backward rather than with a separate decompiler.

## Triangulation and reproduction (proposal)

Related binaries are different lowerings of nearly the same classes: versions of one project, programs linking one library, one source through several compilers and flags. What is invariant across lowerings approximates the semantics; what varies was an incidental commitment, which is exactly the uncommit target. Differential lowering is a *detector* of non-semantic commitments: if two compilers choose different iteration orders for one source, order was not specified by that source. Variation shows non-specification; invariance does not prove specification.

- **Lifting by reproduction.** If the store holds compilers as content-addressed functions and builds reproduce, finding source S, compiler C, and flags F with C(S, F) = B is an exact, checkable certificate that B implements S, modulo trust in C: a compiler in the store is a trusted assertion unless verified or cross-checked, and the dependency stays visible downstream. For binaries derived from public source (libc, TLS libraries, compression, media codecs, game engines) this covers large fractions by lookup in a table of all known lowerings of all known functions; reproducible-builds infrastructure is the same machinery pointed the other way.
- **Partial matches** (function signatures, call-graph alignment, learned binary-similarity embeddings) are evidence, not equivalence; they enter as empirical or assertion claims to be upgraded by differential testing or proof, since a similarity accepted as equivalence would poison every consumer of the shared store at once.
- **Version series** of a binary align with version series of source and changelogs; the aligned diff localizes what changed, and unchanged fragments inherit the previous version's claims.
- **Shared search provenance.** The optimizer's and the lifter's decisions (which rewrites paid off, which hypotheses about a binary held) are claims that make the *directions* shared, not just the destinations ([Claim store](claim-store.md)).
- **Hardware triangulates the same way.** A die generation's description is a prior for the next; measured deltas isolate what changed; probed contracts of related microarchitectures (uops.info across generations) are the hardware analog of related binaries.

Lifting is thereby a shared commons: claims about popular binaries accumulate from many parties and the binary is lifted fragment by fragment, so over time all software is progressively decompiled, refactored, reimplemented, and reoptimized (Q44).

## Everything else lifts the same way

Source code in a committed language is a lowered artifact with more retained than a binary: a C program fixed its algorithm class, layout, order, and sharing at authoring, so lifting source and uncommitting those decisions is the same operation as lifting a binary, cheaper because names and structure survive ([Information economy](information-economy.md), beating C). The existing corpus of source is not a reference to preserve; it is the largest body of lowered artifacts to re-derive from. File formats are parsers, which are languages (LangSec): lift as a grammar with a decoder relation; data becomes facts with provenance. Wire protocols likewise. Databases are fact stores with worse contracts, lifted by schema inference. Package ecosystems are sources and binaries to lift; once lifted, content addressing applies across them. Onboarding preserves provenance and uncertainty instead of treating an inferred schema as authoritative intent.

## Agents and bootstrapping

At every stage agents may infer interfaces, recognize algorithms, propose representations, locate hidden state, generate transformations or certificates; checkers decide ([Justification](justification.md)). Day one the store runs on commodity hardware behind probed contracts; the compiler and mapper live in the store, so it is self-hosting immediately; existing software enters by lifting, so there is no empty-ecosystem problem; agents participate through the same checkers as everything else. Tested by [E7](../experiments/foreign-recovery.md). Open: Q37, Q38, Q44.
