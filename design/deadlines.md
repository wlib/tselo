---
title: "Deadlines: hard real time as contract and evidence"
status: proposal
updated: 2026-11-03
---

# Deadlines: hard real time as contract and evidence

Hard real time is in the intent (rocket, satellite constellation, ground systems; [User intent](../intent/user-intent.md) §5). A deadline is a contract; meeting it is a claim with the same three evidence kinds as everything else; schedulability is a property of a placement, so the mapper's decisions are inside the argument; and transitions under hard deadlines have one safe mode.

## A deadline claim and its evidence

| Evidence kind | What establishes it | What it needs from the target |
|---|---|---|
| **proved** | worst-case execution time on a described target by static analysis, plus a schedulability argument (response-time analysis, or a static schedule that is its own proof) | a self-description with *guaranteed* timing properties: pipeline, memory latencies, arbitration bounds, no undisclosed speculation ([Participation](participation.md)) |
| **measured** | observed execution-time distribution with tails under a stated collection policy | empirical properties; a validity domain (temperature, contention, inputs); tails, not means ([Models](models.md)) |
| **guarded** | a deadline monitor with a declared fallback (degraded mode, last good output, safe state) | a timer, an interruption path, and a fallback that itself meets a weaker deadline |

Mixing kinds is the normal case: a proved budget for the control loop, measured for telemetry, guarded for everything else. Each region's envelope names its kind ([Observers](observers.md)); the end-to-end criterion composes them the way error contracts compose ([Justification](justification.md)), and a measured region on the critical path of a proved deadline degrades the whole claim to measured.

## Schedulability is a placement property

Worst-case execution time is not a property of code. It is a property of code on a described target under a sharing pattern, so every mapper decision (placement, co-location, batching, tier) changes the schedulability argument. Three consequences:

- **Static regions make deadlines proofs.** A configured datapath or a statically scheduled region ([Chipset family](../hardware/chipset-family.md)) has a schedule implicit in its configuration; the deadline claim is a certificate and progress tracking is eliminated ([Irreducibles](irreducibles.md)). This is the realization-A column of [E2](../experiments/three-realizations.md).
- **Shared sequencers make deadlines models.** Interference through caches, links, and arbitration turns the claim empirical; the self-description must publish arbitration bounds or the claim cannot be proved at all. Hardware without such bounds is admissible only for measured or guarded deadlines.
- **The mapper must not move what it cannot re-prove.** An adaptive controller relocating work ([Models](models.md)) invalidates deadline claims by changing contention; a region with a proved deadline carries an elimination license against adaptation, or every move re-runs the analysis before publication ([Change](change.md)).

Mixed criticality is regions with different evidence kinds sharing a target, and the sharing is the design problem. Two options, both legitimate: partition (separate cells and routes, interference-free by construction, cheap to certify, wasteful of idle high-criticality capacity) and budgeted sharing (interference bounded and certified, efficient, costly to certify). Isolation by wiring is the hardware form of "paths fixed at configuration eliminates per-operation checks".

Three physical facts bound every proved deadline. Any asynchronous input (a ground command, a fault line) crosses a synchronizer with a probabilistic mean time between failures, so a proved deadline is "worst case under a stated metastability failure probability", which the error-contract machinery already expresses. Distributed hard real time across chips (a rocket, a constellation) needs a synchronized time base, so real-time regions lease one with a stated precision ([Participation](participation.md); [Quantities](quantities.md)); the design abolishes the architectural global clock, not leased time. Configuration memory in a spatial fabric is state, and upsets in configuration bits are the dominant failure mode of programmable logic in orbit, so a configured datapath is more radiation-exposed than a sequencer with protected instruction memory unless the configuration is scrubbed on a schedule ([Chipset family](../hardware/chipset-family.md)).

## Transitions under deadlines

A transition is itself a scheduled obligation: quiescence, translation, and publication consume time on the critical path ([Change](change.md), the seven fields). Under a hard deadline, drain and stop-the-world are inadmissible, so the interpreter is not an admissible continuation there; *retain old alongside new* with a timed cutover is the only generally safe mode, and the region's fallback is a resident alternative realization ([Runtime](runtime.md)). A satellite keeps the old controller running until the new one has met its deadline for a declared number of cycles, and a flight update is a transition whose commit boundary is a fired thruster. Remote targets are re-flashed, constrained by bandwidth and recertification, so the requirement is a selector over pre-certified alternatives plus small certified deltas, not immutability. Communication deadlines between spacecraft and ground are channel contracts with latency as a hard constraint, which the codec framework already keeps as a constraint rather than a weighted cost ([Codecs](codecs.md)).

## What exists

Static WCET analysis tools, response-time analysis, mixed-criticality scheduling theory, time-triggered architectures, real-time Linux variants, and certification regimes such as DO-178C are the corners the stack must let share tissue rather than reinvent ([Systems](../evidence/systems.md), [References](../evidence/references.md)). Assurance cases are evidence graphs already ([Realization](realization.md)). Open: Q57; the interface contracts between timing disciplines (Q28); the common liveness and resource contract (Q51).
