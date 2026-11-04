---
title: "The chipset family: a generator, not a tile"
status: proposal
updated: 2026-11-03
---

# The chipset family: a generator, not a tile

Not a universal tile repeated from SIM card to hyperscaler, but a hardware-family generator whose palette is taxonomized by physics and whose optional cells (versioning, progress accounting, capability-checked links, speculation, caching) are instantiated only where a region's established properties call for them. The generator and the mapper are one tool parameterized by binding time. The portable artifact is the store; the compiler's region graph is a per-target-class lowering of it. Rejected: one rich tile, and mandatory versioned cells, timestamps, progress-computing routers, and one packet format everywhere (C-v1, C15, C16, C23, C24); whether a per-cell controller is cheap enough is unestablished (C25). What must be fabricated to learn anything, and the alternatives kept in flight, are in [Fabrication](fabrication.md).

## Requirements

From [User intent](../intent/user-intent.md) §5: fabbable; one family from micro-embedded through every chip in a phone to an HPC/AI datacenter to hard-real-time rocket, satellite constellation, and ground systems; no ISA recognizable as an ISA required; the same software on a sliding scale from fully custom to almost entirely commodity parts; software greenfield with zero shackles on the hardware; any part replaceable by future technology or commodity parts; not an assembly of shelf parts; grounded in what a compiler engineer would ideally generate per program class and what a hardware engineer would ideally build to reach physical limits, held together. From the design: binding time is the central dimension ([Commitment](../design/commitment.md)); do not impose the richest semantics on the simplest operations ([Change](../design/change.md)); declare transition possibilities rather than mandate one; compose timing disciplines ([Timing and analog](timing-and-analog.md)); progress tracking needs producer capabilities ([Irreducibles](../design/irreducibles.md)); topology, authority, failure domains, dependency, and control do not form one hierarchy.

## Three wishes from the compiler's side

The target is a model with validity domains, not a manual. Nothing is hidden: any adaptive mechanism is a configurable cell the mapper chose, with observable state. The connective-tissue operations (move, frontier, guard, lease, report) are uniform across cell types. The premise behind all three is that almost everything expensive in a modern chip recovers information the program could not state ([Physics](physics.md)).

## What the compiler emits

```text
region graph   nodes: regions with declared boundary contracts
               edges: channels with rate, latency, ordering, and reliability contracts
               per region: binding-time budget (what may still be decided at install or run time),
                           residual obligations (guards, leases, progress, deadlines),
                           elimination licenses, admissible continuation
```

The region graph is placeable, not placed. It is a process network with channel contracts plus logical regions with privileges plus hierarchical dataflow with explicit memories plus compositional timing contracts, which is to say known pieces combined ([Systems](../evidence/systems.md)). It is not the portable artifact: region boundaries are the most target-dependent decision there is, because tile sizes come from memory-level capacities under the pebble bound, and a SIM card and a datacenter do not share a partition. The invariant is the store (program, equational facts, elimination licenses, declared priors); the region graph is the first class-specific lowering, recomputed per target class, and "the same software everywhere" means the same records, never the same bits ([Language](../design/language.md)). The last lowering onto an instance happens at install time by a mapper holding the instance's self-description, or ahead of time elsewhere for targets too small to host a mapper ([Runtime](../design/runtime.md), what each scale receives). Still needed in the artifact: placement-neutral naming of state (logical regions with privileges, since the design has no address space), dynamic instantiation (recursion, routing among experts, ragged shapes; scopes or dynamic launch, accepting that this reintroduces runtime resource management), shape-parametric regions with an on-device instantiation step, errors as channel values rather than control transfers across regions, I/O as event channels with pin-to-handler latency in the contract, and a distributed checkpoint protocol for debugging.

## Mechanisms indexed by established property

The mapper picks mechanisms from the facts a region carries, not from a workload label: a parser sits inside a streaming pipeline inside a real-time loop at sub-function granularity, so program classes are not a partition.

| Established property | Mechanism | Needs from the palette |
|---|---|---|
| static schedule, known shapes | spatial schedule; operators pinned to arithmetic cells; buffers sized by the pebble bound; movement on a timetable; no instruction stream | configurable datapaths, local SRAM, configured point-to-point wiring; no arbitration on the hot path |
| known rates, variable arrival | the same graph with credit flow control; buffer capacities from rate contracts; backpressure declared | credit links, cheap queue-occupancy telemetry, framing and conversion cells at the edges |
| irregular, parallel | blocks of dataflow with explicit operand slots and a memory-movement prologue; many resident blocks so latency is hidden by switching | a block sequencer, decoupled access and execute, explicit movement with completion events, mapper-chosen context count |
| irregular, serial, latency-bound | open: the latency gap is irreducible at compile time ([Irreducibles](../design/irreducibles.md)), so something at runtime absorbs it | a windowed-speculative sequencer whose window, predictor (a model), and speculation (guard mode) are published contract; decided by [E9](../experiments/irregular-cell.md) |
| speculation admitted | guards with a deopt continuation; versioned state with frontier-advance commit and discard-above-frontier abort; counters placed by value of information | optional versioned storage, a cheap guard, telemetry free when unused |
| non-monotone decisions | monotone parts as coordination-free merges; arbitration explicit on arbiter cells with published settling behavior; timestamps only where a frontier is admitted | arbiter and atomic cells; a leasable time base |
| hard deadline | a static timetable across cells and links; worst case by construction under a stated metastability failure probability; redundancy placed by the compiler (three cells and a voter, the voter itself hardened) | a static-timed fabric mode, physical partitioning by lease or certified budgeted sharing, per-region time bases, ECC and configuration scrubbing as scheduled operations ([Deadlines](../design/deadlines.md)) |
| error tolerance | precision, redundancy, and refresh per data path against an error budget; `sample` lowered to a sampling cell | published error curves per knob; sampling and conversion cells behind restoring boundaries |
| lifted, commitments intact | a fat sequencer region running the lifted program, then uncommitting | a commodity-shaped cell, possibly an actual commodity core behind a bridge ([Onboarding](../design/onboarding.md)) |

Configuration bits are state with load time, size, and reconfiguration energy, so "zero instructions" is a configuration amortized over N uses and the crossover N is a mapper decision; a sixteen-bit block instruction from a one-kilobyte local store is not the scalar fetch that dominates Hameed's gap ([Physics](physics.md)).

## The palette

Few cell types, many proportions, since design, verification, and characterization cost is per type, per process node, and per library (a radiation-hardened variant is a new library). Options such as versioning, progress accounting, capability tags, and speculation are parameters of a type, cheap in RTL and expensive in physical design: a tagged SRAM macro is a new macro, compiler run, margining, and test insertion.

| Cell | What it is | What it publishes | What it makes unnecessary |
|---|---|---|---|
| **storage** | SRAM, DRAM, NVM, multi-level cells; ports and latency declared; no cache by default | capacity, ports, latency, retention curve, ECC | coherence protocols; the cache controller is itself a cell type instantiated where an observer needs latency under an unpredictable workload |
| *versioned storage* (option) | (fact, version, frontier) with frontier-advance commit and discard-above-frontier abort | overhead relative to plain | software logs where speculation is dense (Q25) |
| **arithmetic** | digital MAC arrays, bit-serial, stochastic, analog crossbars, photonic meshes; declared formats from FP4 to FP32 and block formats | throughput and error per precision; error curve over voltage, temperature, age; drift and calibration cost for analog | software precision emulation; exact-by-default energy |
| **routing** | configured point-to-point wiring for static regions; a switched fabric whose topology is chosen per instance for dynamic regions | route latency and bandwidth per class; whether routing is deterministic; congestion model | arbitration-heavy buses |
| *progress accounting* (option) | aggregates producers' outstanding emission rights per region | | software progress protocols; specialized away for static schedules (Q24) |
| *capability-checking links* (option) | messages carry capabilities and the router checks them | per-flit cost | per-operation software checks; specialized away where paths are fixed at configuration (Q26) |
| **arbiter** | an explicit contention point | policy and worst-case settling | hidden nondeterminism elsewhere |
| **time base** | a clock or counter leased with a stated precision | precision, drift | an architectural global clock |
| **conversion** | ADC and DAC, ECC and FEC encode and decode, PHYs (serial links, memory interfaces, radio, contact) | channel contracts in physical units | driver stacks; the restoring boundaries, made leasable |
| **sampling** | physical randomness, p-bits, sensors | distribution and rate | software random-number generation |
| **block sequencer** | small core executing dataflow blocks, exposed pipeline, no hidden state | exact cycle timing per block class | timing side channels in that region; its encoding is an encapsulated ISA behind the mapper, never a target above it |
| **windowed-speculative sequencer** | a core with a speculation window and a predictor, both published | window, predictor model, misspeculation cost | leasing a commodity out-of-order core for the stack's own compiler, collector, parsers, and UI loops |
| **checker** | hard-wired kernel for the hottest certificate families (hash verification, rewrite chains) that gates configuration loading | its proof of correspondence to the kernel's logic | a software trusted base on the configuration path ([Trust](../design/trust.md)) |
| **describer** (fixed) | immutable ROM or one-time-programmable memory that answers `describe` before any configuration exists; root of identity and crypto | the instance's identity and shipped curves | |
| **management sequencer** (default, not derived) | an instruction-driven core running a die's fast loop: voltage and frequency, error knobs, local remapping, hysteresis; lockstep with a watchdog and a certified fallback image in flight; absent where the store or a host answers on the die's behalf (the SIM-card row below) | its contract | nothing: where present it is the one place on a die where a recognizable ISA remains; whether a die with its own fast loop can do without it is for [E2](../experiments/three-realizations.md) and the generator's cost model to show (C73) |
| **power and clock domain** | per-cluster voltage and frequency with timing-error detectors; on-die regulation, level shifters, isolation | the curves other cells are indexed by | fixed rails; practical count is on the order of ten domains per die, so "per cell" means per cluster |
| **infrastructure** | debug and trace, thermal sensors, telemetry counters readable cheaply enough to leave on, built-in self-test, repair maps, boot path | | separate test logic |
| **bridge** | a probed commodity part speaking the verbs on the device's behalf | a probed, validity-domained contract | |

A cache, a branch predictor, or a coherence protocol is a controller realized on the fabric where an admitted observer needs it, carrying a collection policy that can later remove it. Hand-tuned code is a fragment in a cell's own theory with a refinement edge of assertion kind, which is what inline assembly always was ([Language](../design/language.md)).

## Cross-cutting choices

- **Memory.** No global coherence. Remote access is a message, never a load, so cost is visible; coherence is a library (ownership transfer with hardware-assisted owner tags) for regions that declare they need it. References are region identities plus offsets bound by scoped bindings that specialize to wires ([Physics](physics.md)). SRAM pools on their own chiplets at a mature node; memory tiles can do simple near-memory operations.
- **Interconnect.** Common semantics across scales (die, chiplet link, copper then optics between packages, Ethernet-class between nodes, optical circuit switching at the rack); common semantics do not require one wire format; ordering is a channel property one pays for. Topology is a generator parameter: static regions get wires, dynamic regions get a switched fabric, and Rent's exponent favors hierarchical topologies for locality-rich workloads ([Physics](physics.md)).
- **Timing.** Composable disciplines; local synchronous islands; self-timed where it pays; no architectural global clock, with time bases as leasable cells. A slotted fabric moves arbitration to schedule time; it does not remove it ([Timing and analog](timing-and-analog.md)).
- **Error knobs.** Per-cluster voltage and frequency, timing-speculation detectors, ECC and refresh per region, published error curves ([Justification](../design/justification.md)).
- **Self-description.** Derived and measured, never written ([Participation](../design/participation.md)). Each die's test-time characterization is its own description: binning is per-die curves; a defective cell is a cell with a worse curve the mapper routes around; the describer publishes the repaired topology; health records are refreshed over the device's life so the mapper follows aging and radiation damage; telemetry doubles as built-in self-test, and repair maps are the yield mechanism.
- **Control plane.** The management sequencer runs the fast loop; die, package, node, rack, and fleet controllers operate on contracts and budgets at slower timescales, consuming the self-description ([Models](../design/models.md)). Remote or tiny targets get a selector over pre-certified alternative configurations instead of a mapper.
- **Thermal and power.** A full fabric is power-limited; the mapper does thermal placement against dark-silicon fractions in the cost model; thermal peak limits are not replaceable by average-energy constraints.
- **Flight.** Configuration is state and is scrubbed on a schedule; radiation-hardened library variants with cross-sections in the generator's cost model; voters hardened; management in lockstep ([Deadlines](../design/deadlines.md)).
- **Certification** is a property of a cell that a transition invalidates. The cost to certify a new cell type belongs in the generator's cost model beside area and energy ([Trust](../design/trust.md)).

## Scales

| Scale | Storage | Arithmetic | Sequencers | Routing | Management | Binding physical limit |
|---|---|---|---|---|---|---|
| SIM card | a few KB plus secure NVM and one-time-programmable memory | minimal | one minimal block sequencer, or none | one link | absent; the store answers on its behalf | leakage, I/O, test time per unit |
| phone | MB of SRAM, DRAM behind a bridge | mixed cells | a few fat ones for lifted code and UI loops | a switched fabric on die | one per die | SRAM leakage, DRAM refresh |
| datacenter | SRAM chiplets, HBM cells | dense | few, for control and routing among experts | fabric, chiplet links, optics, optical circuit switching | one per die; fleet controllers above | memory bandwidth, optical energy per bit |
| flight | ECC always, scheduled scrubbing | as needed | small, static-timed, lockstep | slotted and partitioned, leased time base | lockstep with watchdog | radiation, power |

The sliding scale from custom to commodity is one seam: program-shaped silicon bound at manufacture; a generated die with generic proportions bound at configuration; a commodity FPGA as one large configured-region cell whose bitstream is the lowering; a commodity CPU or GPU as a fat sequencer cell with hidden caches treated as guard mode, coherence as a cost, and its ISA part of its contract targeted only by the backend; commodity memory, radios, and sensors behind bridges. The bridge, not the probe, is the dominant cost at the commodity end ([Onboarding](../design/onboarding.md)). Seen whole, a die, a board, a rocket, a constellation, and a datacenter are regions of one instance whose boundaries are channel contracts with worse latency and partial failure, so the scale table collapses into partitioning; the standing warning against transparent distribution is answered by putting failure and latency into the contracts ([Correspondences](../design/correspondences.md)). Self-describing cells can be chiplets from different vendors assembled per workload class, so the family is a protocol rather than a product and the generator fabricates only what no vendor covers ([Consequences](../design/consequences.md)).

## What is frozen

"No ISA recognizable as an ISA" cannot mean nothing is fixed. The frozen interface moves up a level to the extension mechanism ([Language](../design/language.md)); the description vocabulary inside the exchange protocol is a theory and can grow.

| Frozen across generations | Varies per generation | What the compiler emits |
|---|---|---|
| the record encoding and judgment; the exchange semantics (channel contract, backpressure, capability check); the *shape* of a cell contract; the participation verbs; the describer's existence | cell proportions and counts; sequencer encodings; wire formats; timing disciplines; error knobs and their curves; the description vocabulary | configurations for spatial regions (datapaths, routes, static schedules); block programs for sequencer cells against their published per-generation contract; a deployment artifact binding both to a described instance |

The description vocabulary should be written as a theory and exercised against three described targets, a probed commodity CPU, an FPGA fabric, and a simulated generator instance, before any silicon decision ([Roadmap](../experiments/roadmap.md) phase 0; Q23, Q53).

## What is new, and what is open

Little in the RTL: a union of known pieces. The novelty is that it refuses to hide anything, describes itself well enough for software to do its job, and makes the hardware generator a node in the same store as the software it runs (C59). The hard parts are the mapper and its tiering ladder, the model DAG, the transition protocol, and the generator's cost model, which is the rest of this notebook. A plausible build path (vector core, capability-extended RISC-V, open NoC platform, FPGA prototype, cheap shuttle at a mature node, chiplets after) is an instance, not the design.

Narrowed without silicon: the portable artifact is the store and region graphs are per target class; generator and mapper are one tool; one fixed cell, the describer, with the management sequencer a default where a die runs its own fast loop; topology is a generator parameter and static regions get wires; no architectural clock plus leasable time bases; flight variants scrub configuration and use hardened libraries. Open: the forks tabulated in [Fabrication](fabrication.md), each with its discriminating experiment (Q59, Q28, Q27, Q66, Q61, C25); the generator's cost model and its validation against fabricated instances; the producer–router progress protocol (Q24); versioned storage cost (Q25); per-flit check versus route-configured enforcement (Q26); what evidence separates probed behavior from guarantees (Q30).
