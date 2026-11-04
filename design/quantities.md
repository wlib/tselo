---
title: "Quantities: numbers and time as intents"
status: proposal
updated: 2026-11-03
---

# Quantities: numbers and time as intents

An author states a real number with a tolerance, or an integer with no width, and the representation is a lowering with an approximation edge. There is no global clock, so a timestamp is a measurement claim with an uncertainty, logical order is a frontier, and simultaneity is a consistency envelope. This is the concrete form of "pin its numerical semantics" ([Commitment](commitment.md)) and the reason exactness becomes the expensive option ([Consequences](consequences.md)).

## Numbers

| Author states | Lowering | Evidence for the approximation edge |
|---|---|---|
| a real with a tolerance | floating point, fixed point, block formats, analog multiply, stochastic rounding | an error contract derived by interval or affine arithmetic where provable, by sampling under a collection policy where not ([Justification](justification.md)) |
| an integer with no width | a machine word | a proof that the value fits, or a guard that fires into a wider representation |
| exact | the representation that meets a zero tolerance under the stated fault model | "exact" is a reliability requirement, not zero failure probability (C31) |

Reassociation is licensed by the real-number theory and priced by the error budget rather than forbidden by the floating-point theory; a claim under one arithmetic theory is never applied under another ([Claim store](claim-store.md), Q43). The pointer beside the tensor is the only thing that declared a zero tolerance, and it is what forces the voltage rail up. The error knobs and their composition rules are in [Justification](justification.md); hardware whose primitive is "approximately" is in [Timing and analog](../hardware/timing-and-analog.md).

## Time

| Familiar thing | What it is here |
|---|---|
| a timestamp | a measurement claim with an uncertainty and a collection policy |
| logical order | a frontier ([Observers](observers.md), kinds of frontier) |
| simultaneity | a consistency envelope |
| a deadline | a contract with evidence kinds ([Deadlines](deadlines.md)) |
| a sensor-to-actuator loop | a channel contract with latency as a hard constraint ([Codecs](codecs.md)) |
| a clock | a leasable cell with a stated precision, never an architectural global ([Chipset family](../hardware/chipset-family.md)) |
| "what time is it" | a query against a model with a validity domain |

Open: the interface contracts between timing disciplines (Q28); whether frontier and time-triggered slot are one object at different scales or an analogy of the kind C17 warns about (Q65).
