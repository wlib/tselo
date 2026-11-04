---
title: "Participation: the only fixed interface"
status: position
updated: 2026-11-03
---

# Participation: the only fixed interface

When everything is designed at once, what must be fixed for the parts to be replaceable is a participation protocol, not an ISA, address space, clock, byte, file, or process. A component describes itself, leases resources, exchanges with backpressure, reports tagged observations, and declares how it can be changed. There is no OS as a layer.

## Why these five

An ISA is a treaty about control; an address space a treaty about location; a clock a consensus protocol on the value of time; files, processes, syscalls, and page sizes treaties about how an OS and a program ignore each other. None is necessary for replaceability. What is necessary is that a component can be described, budgeted, connected, observed, and changed ([Schemas](schemas.md)).

| Verb | Content | Consequence |
|---|---|---|
| **Describe** | a contract: transformations, protocols, capacity, timing assumptions, failure behavior, resource use, error curves per knob, transition support, and a validity domain saying where evidence is lacking | alien hardware is programmable without trial and error; the description is the root of the model DAG ([Models](models.md)) |
| **Lease** | configuration, budget, and an envelope of what may be observed of the component; physical time with error bars and metered energy are leased resources like any other | where authority meets resources; a process is a lease; a region with a deadline leases a time base ([Deadlines](deadlines.md)) |
| **Exchange** | send and receive with backpressure; ordering information (timestamps, frontiers) travels only where an admitted interaction needs it | a logical channel may lower to a wire, a scheduled slot, a bounded queue, or an authenticated connection; shared semantics does not require a shared wire format |
| **Report** | observations tagged with the policy under which they were collected | telemetry is an input to the same derivation graph as compilation |
| **Transition** | which of drain, finish, checkpoint at points, retain old alongside new, restart under a new contract the component supports | no uniform quiesce/serialize/resume: some resources cannot export physical state or be interrupted arbitrarily (C23; [Change](change.md)) |

Two restrictions the protocol does not make: it does not require every message timestamped or every storage cell a versioned fact store (C24; ordering and version information survive only where needed and are otherwise implicit in schedule and wiring, [Change](change.md)); and it forbids no clock, only an *architectural global* clock ([Timing and analog](../hardware/timing-and-analog.md)).

## Self-description

Hardware ships its cost model as a typed, queryable, revisable object with the contents in [Schemas](schemas.md). Today that knowledge lives in kernel authors' heads, which is why every tile DSL is hand-tuned. Embryos exist: a constraint-logic database of hardware topology queried at runtime for placement, a runtime's machine model, compiler target descriptors, roofline models, the energy table, and probed instruction contracts ([Systems](../evidence/systems.md)). Requirements on the object:

- A bandwidth number is insufficient. The useful object predicts behavior *conditional on* access pattern, concurrency, temperature, competing workloads, placement, and device state, and says where it lacks evidence. A table of constants is one approximation of it.
- Several models of one resource coexist and need not form a ladder: a cheap bound for pruning, an analytical model for routine decisions, an empirical model calibrated to this installation, a detailed simulator for expensive searches, and measurements that can challenge any of them. A detailed model can be miscalibrated and a coarse bound robust.
- Observations record the policy under which they were collected. More samples do not establish safety outside the validity domain.
- Every property is labeled **guaranteed** (documentation, formal description), **empirical** (calibration), or **wrapper-enforced** (the bridge makes it true). Measurements never silently become guarantees.
- Descriptions may live outside the component and be specialized into compact deployment artifacts. There is no requirement that every gate run a description protocol; a common logical interface admits many physical encodings and unknown properties.
- Life cycle: calibrated at boot, re-calibrated periodically, challenged by telemetry; revisions are versioned facts; a changed description invalidates the decisions that depended on it.
- For generated hardware the description is derived and measured, never written: timing, energy, and error records are derived from the netlist by analysis and checked against a characterization die by measurement, two evidence kinds for one property, and a disagreement invalidates the generator's cost model. What each die's own characterization then does (per-die binning, repair maps, aging) is in [Chipset family](../hardware/chipset-family.md).
- Something must answer `describe` before any configuration exists: an immutable describer on the die, the store on the device's behalf for targets too small to hold one ([Runtime](runtime.md)).

The target of a description may be an existing component, a space of manufacturable components, a service, or a mixed deployment, so target design is itself a co-design variable ([Realization](realization.md)). Components that do not describe themselves are described by probing ([Onboarding](onboarding.md)). Open: an interoperable target-model vocabulary (Q23); calibration and drift; secure distribution of descriptions; non-additive interactions; which lower bounds a description can certify; the cost of bridging commodity or future technology (Q47).

## Consequences for familiar objects

- A CPU is a commodity to lease, not the thing the system is built on. Its ISA is part of its published contract and may differ by vendor or generation.
- A GPU is a pattern of arithmetic, storage, and routing cells; a NIC is routing plus a sequencer; an SSD is storage plus sequencer plus conversion running its translation layer as ordinary code. No cell type is privileged ([Chipset family](../hardware/chipset-family.md)).
- A future technology enters by speaking the verbs. A commodity part enters through a bridge that probed it and speaks on its behalf.

## The OS is a region, not a layer

The lineage from policy/mechanism separation through exokernels to library operating systems ([Systems](../evidence/systems.md)) ends here: there is no OS layer between programs and hardware. There is the store, a hierarchy of mappers at every timescale, pluggable checkers, the transition engine, the onboarding engine, and a **trusted base**: the bootstrap, authority enforcement, interruption, and recovery that the specializer itself depends on and so cannot specialize away ([Trust](trust.md), [Bootstrap](bootstrap.md)). Processes are leases. Files are named facts with durability contracts. Drivers are probed contracts. Syscalls are messages to cells one holds authority over. Threads are regions of a dataflow graph the mapper chose to sequence. None are primitives; all are views, and a POSIX view can be generated for whoever wants one. Isolation comes from capabilities and types.

Saying "no OS layer" removes no responsibility: resource allocation, authority enforcement, interruption, recovery, device interaction, and lifecycle management are realized by composable policies and mechanisms, and the trusted base is a region with a contract like any other, minimized, named, and shrunk over time by the same evidence upgrades as every other claim. A universal semantic model need not have one universal physical store ([Store](store.md)). Physical topology, authority boundaries, failure domains, dependency structure, and control responsibilities overlap and do not form one hierarchy; a shared power rail couples components in different software and authorization regions. Open: minimal bootstrap, trusted substrate, recovery when the optimizer itself fails, contracts between fast local control and slow global adaptation (Q36, Q10).
