---
title: "E9: the irregular-control cell"
status: experiment
updated: 2026-11-03
---

# E9: the irregular-control cell

Decide which cell runs the code the stack itself is made of (its compiler, collector, parsers, and interface loops) without leasing a commodity out-of-order core, and name what the compiler cannot know at compile time. Software only; this is the long pole of the hardware program, and [E2](three-realizations.md) cannot decide it ([Chipset family](../hardware/chipset-family.md), [Fabrication](../hardware/fabrication.md)).

**The kernels.** An interpreter dispatch loop, a garbage-collector mark phase, a recursive-descent parser, and a hash join: irregular, pointer-chasing, control-dependent, with serial sections and parallel sections.

**The candidates**, each with an equal SRAM budget and a published contract.

| Candidate | What absorbs runtime latency | Known history |
|---|---|---|
| block-dataflow sequencer | switching among resident blocks (needs parallelism) | reached rough parity with out-of-order cores and was weakest exactly where blocks are smallest, which is irregular code |
| windowed-speculative sequencer | a speculation window with a predictor as a published model | the commodity answer; whether the generator can emit one competitive with commodity is the open question |
| tagged-token dataflow on the fabric | fine-grained parallelism; a matching store | killed in 1990 by the matching-store cost; SRAM density has moved three orders since |
| automaton-in-memory | processing at memory bandwidth | shipped for pattern matching; unproved for anything not automaton-shaped |

Decoupled access and execute is a component of several candidates with known limits on control-dependent addresses.

**Measure.** Energy per operation, latency, area, and the distribution tails of latency, in simulation against the same memory model with row conflicts and contention; the self-description each candidate would publish; how much of each kernel the mapper could place statically and how much remained guard-mode.

**Must demonstrate.** That the latency gap is irreducible at compile time and is absorbed by resident contexts, speculation, or slack, each priced; that a generated cell's contract exposes its window, predictor, and misspeculation cost as records the mapper can use; that the stack's own toolchain runs on a generated cell at a stated cost relative to the commodity floor.

**Failure.** No generated candidate approaches the commodity floor on serial sections, in which case the palette admits the commodity core as a leased cell for that class and the "nothing on the table" claim is marked false for it. Concepts: [Irreducibles](../design/irreducibles.md), [Physics](../hardware/physics.md).
