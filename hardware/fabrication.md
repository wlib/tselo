---
title: "Fabrication: what needs silicon, the characterization die, and the forks"
status: proposal
updated: 2026-11-03
---

# Fabrication: what needs silicon, the characterization die, and the forks

Most of the hardware thesis is testable in simulation and on programmable logic. Silicon is for the analog-physical curves no other substrate yields, and the first die is an instrument, not a computer. Every approach below stays in flight until a named experiment narrows it; cost and schedule figures must be checked against current shuttle offerings.

## What only silicon gives

| Decidable without silicon | Only silicon |
|---|---|
| area and energy ratios of digital cells (tagged SRAM vs plain, per-flit check vs route table, progress counters vs credits): synthesis and place-and-route in an open process kit settle these to within a few percent | SRAM retention and leakage against voltage: a custom macro and a characterization the foundry does not supply |
| synchronizer mean time between failures: analytical models and programmable-logic measurement | wire-versus-logic energy at the chosen cell pitch |
| bundled-data asynchronous links on programmable logic | power-grid and clock-tree overheads; on-die regulation, level shifters, isolation (the real multi-voltage cost) |
| the participation controller's cost at three granularities (C25): synthesize it | design-for-test and test-time cost, which dominates unit cost at the SIM-card end |
| the whole mapper, model DAG, transition protocol, region graph, and [E2](../experiments/three-realizations.md) | radiation cross-sections under beam |

The energy table the thesis rests on is from a 45 nm process in 2014 ([Physics](physics.md)); a 130 nm die calibrates the method, not the table. The SRAM compiler, not verification, is the critical path at an open process kit (verify the state of open SRAM compilers and foundry macros).

## Approaches kept in flight

| | Approach | Tests | Cost and time (verify) | Risk |
|---|---|---|---|---|
| A | **characterization die**: instrumented cells with knobs, detectors, telemetry, a trivial control path | self-description as a measured artifact; error budgets; asynchronous links; tagged-SRAM overhead | open 130–180 nm shuttle; low five figures or free; six to twelve months | mixed-signal skill for the knobs |
| B | **micro generator instance**: a few cells, optional progress accounting, capability-tagged links, GALS islands, a management sequencer; the generator emits the instance and its self-description | the protocol physically; [E2](../experiments/three-realizations.md) realizations A and B on die | 130 nm shuttle or 65/28 nm multi-project wafer through an institutional program; fifty to a hundred and fifty thousand; twelve to twenty-four months | verification surface; asynchronous logic in open flows; SRAM macros |
| C | **board-level family instance**: a commodity FPGA as a configured-region cell, a microcontroller as a sequencer, external pseudo-static RAM as a storage cell, die A as a component, all behind probed bridges speaking the verbs | protocol and onboarding, not physics | commodity parts | proves nothing about energy |
| D | advanced node for a performance point | a performance claim | six figures and up | pointless before B works |
| E | open embedded FPGA or open coarse-grained array as the "configured reusable datapath" rung | the configured-region cell | folds into B | |
| F | never tape out: programmable logic and energy models only | | | leaves the self-description claim unmeasured |

## Chip 0: physics only

Pairs and triples of identical function so deltas are measured, and nothing digital that synthesis already settles.

| Pair | Measures |
|---|---|
| SRAM macro: plain word · word with version tag and frontier compare · bank with adjustable retention voltage | versioned storage overhead and the retention curve (Q25) |
| MAC pipeline under voltage with timing-error detectors on a separately powered region · bit-serial variant | the voltage–error curve per knob ([Justification](../design/justification.md)) |
| one cell of identical function in three timing disciplines: synchronous · bundled-data asynchronous · quasi-delay-insensitive, if an open asynchronous flow works | energy against voltage at matched throughput, the decision rule for timing discipline ([Timing and analog](timing-and-analog.md), Q28) |
| ring-oscillator randomness source; a tunable-noise comparator p-bit as a stretch | the sampling cell |
| radiation-ready structures where the shuttle allows | cross-sections for the flight library |
| timestamped counters and queue-occupancy taps | that telemetry can be left on |

Control is a serial slave plus scan, no real sequencer. Separate supply pads driven by bench supplies simplify place-and-route but forgo the on-die regulation measurement, which is a known gap. The self-description lives in the store and is loaded by the bridge; the describer cell comes with Chip 2. Timing-speculation detectors at 130 nm measure little, since timing variation is small at that node and the detector presupposes a clock that defines "late"; they are on the die to exercise the method.

Not on the first die: a mesh with real compute; a chosen sequencer; chiplets; p-bits or analog multiply without an analog designer.

## Gates

| Gate | Passes when |
|---|---|
| 0, software only | the generator emits RTL, a self-description, and a mapper target model; an FPGA instance runs [E2](../experiments/three-realizations.md) with realization A as a configured region |
| 1, Chip 0 | the measured description predicts held-out conditions on the same die within its validity domain and refuses outside it; comparing a die to an FPGA proves nothing, since they are different substrates |
| 2, Chip 2 | Gate 1 passed, the phase-0 schemas exist as a formal specification the RTL is verified against, and [E9](../experiments/irregular-cell.md) has chosen the irregular-control cell; Chip 0 does not inform that fork and [E2](../experiments/three-realizations.md), a windowed mean, cannot discriminate sequencer designs |
| 3, advanced node | funding for a performance claim |

## Alternatives in flight

Each is kept because something in the main line is unproved against it; each has a discriminating experiment.

| Alternative | Core idea | Makes cheap | Makes hard | Decided by |
|---|---|---|---|---|
| **spatial everywhere** | no sequencer at any scale; irregular code runs as tagged-token dataflow on the fabric with modern SRAM for the matching store, or with wave-ordered memory for sequential semantics | one artifact kind everywhere, no fetch, natural asynchrony, irregular parallelism without threads | the matching-store cost that killed it in 1990 (SRAM density has moved three orders since, which is why to re-ask); sequential memory semantics; bitstream size on a SIM card; dynamic instantiation | [E9](../experiments/irregular-cell.md) |
| **memory-first** | the cell is a memory bank with a thin logic skirt; irregular control becomes automata over data in memory; processing-in-memory parts have shipped | movement by construction; capacity scales with chips; sparse and pattern workloads | logic in a memory process is slow and area-poor; pointer chasing across banks; anything not automaton-shaped | parser and graph traversal as automaton-in-memory vs block sequencer, energy per symbol or edge |
| **asynchronous-first, event-driven** | the handshake as the only timing primitive, the clock a leased cell, events routed by address; shipped million-core event-driven machines exist, and one vendor's move from asynchronous back to synchronous is negative evidence | variation and temperature tolerance (voltage scaling without margin, a flight advantage), no clock-tree power, free idleness, sparse irregular communication | roughly doubled area for dual-rail logic; dense regular throughput loses to synchronous systolic; tooling; test without a scan clock | the three-discipline cell pair, then one on Chip 0 |
| **time as the fabric** | time-triggered at every scale: every communication a slot in a sparse global time base; dynamic work in slack slots | certification, composability, determinism, replay debugging, hard real time across chips, trivial progress accounting | dynamic classes waste slots; clock precision across a constellation; arbitration at the asynchronous edge remains | energy and utilization against a credit-based packet fabric on a mixed workload with real-time fraction f; find the crossover |
| **die as the cell** | proportions happen in the package: a bill of small dies (SRAM, MAC, sequencer, I/O) at mixed nodes; stacked SRAM-first at the datacenter end | yield, per-die test, mixing nodes and libraries, one SRAM compiler per die type | inter-die energy per bit roughly an order above on-die (verify); latency; nothing to stack at the SIM end | a package-level cost model: where chiplet partitioning beats monolithic by region size and movement intensity, per node; software only |
| **mapper in silicon** | the device ships pre-certified alternative configurations and a hardware selector driven by its measured self-description | adaptation on targets too small or too remote to host a mapper; drift and radiation damage handled by selection; certification per alternative | storage for alternatives; proving the selector picks only certified-safe configurations; selector oscillation | a satellite-class image under injected timing drift: fixed mapping vs eight alternatives plus selector, mission-level loss |

## Forks and their experiments

| Fork | Experiment | Needs silicon |
|---|---|---|
| irregular-serial cell: block dataflow · windowed-speculative · tagged-token · automaton-in-memory | [E9](../experiments/irregular-cell.md) | no; the long pole |
| timing discipline per cell | one cell in three disciplines through an open flow, then Chip 0 | partly |
| storage: SRAM · embedded DRAM · stacked; monolithic · die-as-cell | package-level cost model | no |
| mapper tiering: can a coarse map run on-device in milliseconds | software; defines the coarse fabric's granularity (Q66) | no |
| fabric for mixed real time: time-triggered · credit-based | crossover in real-time fraction | no |
| remote adaptation: fixed image · selector over alternatives | injected drift | no |
| per-cell controller cost (C25) | synthesize the participation controller at three granularities | no |
| derived vs measured self-description (Q61) | Chip 0 over temperature and age against its own derived records | yes |
