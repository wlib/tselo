---
title: "Daniel's intent: the canonical statement"
status: user-intent
updated: 2026-11-03
---

# Daniel's intent: the canonical statement

Everything Daniel has said about what this project is, organized by topic, in his voice and barely rephrased. Where the design reads a phrase in a particular way, the reading is noted in italics and never substituted for the position. This is the only note whose content carries authority; everything else in the notebook is a working position, a proposal, or a survey.

## 1. The diagnosis

My background is programming-language theory, especially functional and declarative programs that lower in various ways; I am weak on hardware. What prompted this is watching TPUs with JAX and Pallas, NVIDIA GPUs with their tile languages, Mojo, and purpose-built heterogeneous hardware scaling to datacenters with every kind of model of tiered networking, memory, storage, and compute. Hardware potential is ahead of our languages and general approaches, and hardware in turn is built mostly constrained by software that targets old paradigms. Software moves faster than hardware and still lags what hardware could do. Even a single consumer CPU is radically different from the C abstract machine; memory works wildly differently from how we treat it, storage too, and so does every other part of a phone. Compilers take code pretending to target the C abstract machine and emit machine code that also pretends to be roughly C, and then the microarchitecture does its own thing underneath. It is hacks on top of hacks, and I am stepping back to think about the ideal.

This is not laziness or incompetence. I know how much momentum and pressure there is to work on one slice of the stack at a time. My argument is that if we increase the scope to the literal entire stack at once, then there is no excuse, other than not having put in enough effort yet, for anything less than the theoretical limit for any code. "Theoretical limit" includes the tradeoffs: latency, time, memory, size, and their dynamics. There is a massive amount that everyone already knows and nobody does because it is too much work or too much momentum to go against.

The baseline is already wrong. Look at basically any C program, even a trivial one: it leaves most of the table uncovered because C is a terrible language to express the actual program in, so people write the program that is easy to express in C instead of what it ideally should be, which is a very abstract form. "Beat C" is measured against the ideal realization of the intent, not against the program someone could afford to write.

## 2. The stance: from scratch, with zero shackles

We are designing all hardware and software from nothing. The only constraint is that we can actually fab it. The hardware, the "OS", and all programs are in scope. Think way, way out of the box compared to anything that might seem practical.

Two framings of the same stance:

- As a language designer: what if I did not have to worry about any of the classic programming-language design tradeoffs?
- As a compiler and engine engineer: what if I never had to worry about whether I could or should prove something in order to do a lowering I want to do?

For the hardware thought experiment in particular, assume it is economically guaranteed that the software side gets built at least to an MVP, and that every piece of software targeting this hardware is greenfield, written for this system without compromise. There are zero shackles on the hardware design from the software side. AI is changing the economics of everything, including the ability to brute-force reverse-engineer or reimplement just about everything worth running, so everything really is in scope. This field has existed for less than a human lifetime and has always been prone to worse-is-better, backward compatibility, and short-term tradeoffs in every aspect. The economics are about to flip completely, and we can literally redo everything. Do not be conservative about the scope or the degree of the overhaul; be strict about what has been shown.

The result should be general enough that, with enough engineering effort, we could replace almost any part of it with an arbitrary future technology or with random current commodity parts and leave nothing on the table. *(The design reads "nothing on the table" as a certified optimality gap, not hindsight optimality; see [Information economy](../design/information-economy.md), certified gaps.)*

## 3. The language, which eventually is not a language

Programs should not be represented as text. Something like Unison: an abstract, distributed database of code representations. The editor is a mix of structural and textual, in the spirit of Enso. Authors and readers declare as metadata the *views* each part of a program is seen through: abstract, file-like groupings that can be partially dynamic, and the syntax and visualization used to display and edit specific code. Separating representation from visualization is what makes everything below reasonable.

Type systems are poor overall when TypeScript is unironically the best mix of practical sophistication outside research. The type checker should be generalized with property tests and other tests, and every aspect of it should be something an author hooks into. You opt into type representations and constraint solving the way you call a library, picking how you want to double-check properties of your program. We have to get over the obsession with perfect type systems that reject useful checks because they cannot be proven to terminate. If it does not type-check in reasonable time it is bad anyway. That conservatism comes from the type system being entwined with the language, which is entwined with the syntax. *(Resolved by the de Bruijn criterion: unbounded search, bounded checking; see [Justification](../design/justification.md), the de Bruijn criterion.)*

Authors should use the compiler and optimizer like a library. As with gradual typing with custom resolution, custom lowerings and checks are unified with the type system. Instead of hints, if the language supports it, you can gradually control any aspect of compilation on any part of the code to any degree. Highly declarative, FP-style programs must still lower to the absolute ideal mix of where what data goes when and what happens to it, and must retain access to hand-tuned implementations.

Eventually the "language" is no longer a language. It is one software stack, bootstrapped, that targets any arbitrary deployment system. Be creative about how to bootstrap it elegantly: because of the way we model lowering and targets, bootstrapping should fall out of the model rather than be a special process. *(Taken up in [Bootstrap](../design/bootstrap.md).)*

## 4. Runtime, dynamics, and the OS

Ignoring platform portability, the ideal system runs interpreted while you debug and decides when and how much to compile which parts, deoptimizing as needed based on what the rest of the hardware and the OS are doing. The sophisticated tradeoff-with-heuristics model of JS and Wasm engines is the interesting one, though those engines fight against the limits of their language and environment. Tradeoff management does not have to be assigned to the hardware, the OS, or the engine; it can happen in mixed ways and dynamically. How much lowering happens ahead of time versus at runtime, and how much runtime information the OS can have insight into, is a central question.

OS design is calcified and in scope. Mirage's "entire OS as a library" is roughly related. Obvious things are hacked on: io_uring, libdispatch, executables as databases, NixOS, Fuchsia. The OS should be capable of reinterpreting existing binaries almost like a decompiler, possibly with agentic rewriting of aspects of them onto the new stack.

## 5. The hardware

I want to think about how hardware ideally works to reach the absolute theoretical limit without abstraction layers in between: how it actually works versus how it pretends to work for a roughly-C abstract machine. Start from first-principles limits, constraints, and tradeoffs, from the physics up, and distinguish the hardware we could make in the future, the hardware we could make now, and the hardware we actually make now. *(I vaguely remember a talk on first-principles core design with instructions as a firehose.)*

Think all the way down to fully asynchronous computation and data movement, not necessarily measured in bytes or even bits (analog of different types), without clocks that make much sense. From there, work up to abstract program representations, mostly declarative constraints, that lower to the ideal placement and movement of data. We should beat C at literally everything with a high-level language that is simply better than any existing compiler can afford to be, targeting hardware that is alien tech by comparison.

To make the hardware thought experiment a little narrower to think about, while everything stays in scope, the target is a chipset family we can actually get fabbed. It must be general enough to go from micro-embedded (a SIM card) through every chip in a phone, to an HPC and AI datacenter, to multiple separate chips and peripherals under hard real time in a rocket and in a satellite constellation and the ground systems that talk to them. It need not have an ISA recognizable as an ISA. It should be a fully variable architecture in what workloads it handles. The same software must run on hardware anywhere along a sliding scale from fully custom to almost entirely commodity, or at least trivially fabricable, components and designs.

Do not answer this by assembling RISC-V, CHERI, and parts off the shelf. Think from scratch. Keep multiple approaches in flight and narrow them carefully, toward something that can actually be taped out. Ground the design in two perspectives held at once: what a compiler engineer would ideally generate for every class of computation, action, or program, and what a hardware engineer would ideally build to reach the physical limits. Think holistically across both rather than in those silos; the perspectives are for grounding, not for separation.

## 6. Models, search, and probability

Self-describing hardware was the first idea in this project I had not already had, and I want it extended into all profile-guided work. Think in terms of models: many different classes of model for the same thing, with different degrees of automatic search that optimizers can do to build them, where today we rely on authors to do this implicitly. If we think about this right, probabilistic programming falls out naturally, with data structures and operations done specifically with statistics in mind. You should never have to implement a binary search, a skip list, or a Bloom filter, or decide how sorting works, or that something needs to be sorted here for performance there. And "probabilistic" should go all the way down to the hardware doing crazy things while accounting for error-correction rates.

## 7. Ecosystem and evolution

The entire software ecosystem and its evolution are in scope: dependencies, how they update, and ideally automatic hot live update of an application from any version to the latest with the minimal diff and the best state preservation.

## 8. One store: software, hardware, compilation, decompilation, and sharing

If implementations are content-addressed and equivalences live in e-graphs, then everything can be structured as one giant, distributed, merged store (a CRDT) of all known software and hardware: a store of claims, with proofs, trust, partial checks, and privacy as metadata, gossiped between parties with public and private relations mixed. Everything lowers into targets; targets have models and are themselves implemented in different ways; implementations fall into equivalence classes along several comparability dimensions. Resolution is a search: a general matrix multiply has many implementations, and if the target has a direct hardware implementation of a function we resolve to it automatically; otherwise we resolve to another implementation that lowers to some combination of what actually exists on that target, as close to exact as the target permits.

The consequence I want: the compiler never repeats the same type check, the same lowering, or the same optimization pass on any fragment of the graph that anyone has already done and shared. A codebase is no longer just its source; it is the source plus every relation worth storing: partial lowerings, analyses, evidence. Libraries are the same kind of thing, so if someone finds that a library function has a really good lowering when used a certain way on a certain target and shares it, anyone can find it and apply it automatically.

The same store serves reverse engineering. To run a legacy binary I can find someone's full re-implementation or partial emulation; over time all software gets progressively decompiled, refactored, reimplemented, and reoptimized fragment by fragment. Compilation and decompilation share analyses: what drives the optimizer's search also drives the lifter's. Related binaries (versions of one project, programs sharing a library, the same code through different compiler versions) triangulate meaning. As a codebase evolves through ordinary development, its analyses and partial lowerings carry back and forth across versions instead of being redone. Software and hardware, compilation and decompilation, and code sharing are one unified thing. *(Taken up, with its hard parts, in [The claim store](../design/claim-store.md).)*

## 9. The scope is literally everything

The single stack should take our not-a-language and target any arbitrary deployment system. The program can be a chess board with the target being the next move. It can be a very complex application with a specification of how you would like it ported to a web app. It can be compiled all the way to an ASIC, or to a made-up system that is part custom ASIC and part commodity parts, where the PCB and the instructions for a 3D printer are compiled too. Think about everything computable, or aided in any way by a deterministic, probabilistic, or AI-driven process. Think about every domain people use software or hardware for: logistics, HFT, game engines, video editors, CAD, web UI, databases, rocket and satellite control, compiling blueprints for an entire factory, an apartment complex, a city itself.

We want to lower to arbitrary things that have arbitrary degrees of freedom in which parts of the target may change. There are meta-considerations: cost to implement, logistics, and packaging, which motivate standardization and commodification, and backward and forward compatibility of specific things. *(The design reads this as not meaning that every domain shares one solver or one runtime; see [Realization](../design/realization.md).)*

## 10. Earlier work that belongs here

- **My article on distributed system state:** programs as state machines with pure functions inside, using the least powerful construct that works; effects as state transitions relative to a viewpoint; strict serializability for non-commutative transactions with weaker models opt-in and explicitly speculative; edits bubbling up through derivations with tracked bets at each layer; everything is derived state and the database should dissolve into durability, authority, and synchronization; a commit DAG with commutativity predicates and frontiers; consistency envelopes. Distilled, with a link to the full text, in [The article, distilled](article.md).
- **Codecs:** model an analog-digital system as a composite state (source, channel, codec) transitioned by signals, aware of the real properties of the channel, and solve for the ideal codec that unifies ECC and compression, exact and lossy, in a rate–distortion sense, where the error-correction rate accounts for the true data rate and the actually acceptable loss and corruption, under any given state size, compute, latency, and throughput. I want the generic framework for when and how to use compression, error correction, checksums, and how to process a codec in a given system. Answered in [Codecs](../design/codecs.md).
- **Authorization:** a unified view of access control and capabilities as composition from yes/no/conditional over sets defined in different ways, with a graph behind it, and how to merge that with Linux, Postgres, and application libraries in TypeScript and Rust. Answered in [Justification](../design/justification.md), permitted.

## 11. How I want this worked on

Go deeper and broader on whatever is interesting, but start from the physics. Mine everything already named for connections, unifications, and extensions; aim for the full, grand, interconnected understanding of how literally everything mentioned fits together. Inch toward a description of the chipset family. Keep this notebook clear, terse, and high-signal, with no visible history of how it was made. Reread this note before proposing a boundary; positions stated here are not new assumptions to be discovered later. Be maximal about scope and strict about status: state the full claim, mark it untested, and name the test; never shrink a claim to make its status read as honest.
