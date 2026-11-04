---
title: "E7: foreign implementation recovery"
status: experiment
updated: 2026-11-03
---

# E7: foreign implementation recovery

Lift a small binary or protocol with an explicit environmental contract, propose a rewrite using search or an agent, and keep four outcomes separate: tested similarity, checked equivalence, guarded specialization, and intentional contract change ([Onboarding](../design/onboarding.md)).

**Setup.** A small binary with a known ISA model and a declared environmental contract (memory, OS interactions, devices, protocols). Lift by specializing the ISA interpreter to the binary. Then uncommit one commitment in each mode: prove (type or pointer recovery), guard (differential execution on recorded workloads; translation validation on a region), conjecture (an agent-proposed rewrite checked by the same checkers).

**Must demonstrate.** The lifted program is correct by construction with every original commitment intact · each uncommitment is presented as a proven representation change, a guarded specialization, or a proposed behavior change with evidence · hardware probing yields a contract labeled guaranteed, empirical, or wrapper-enforced per property.

**Lift by running the store's own edges backward.** The lowering relations in the store, run in reverse with triangulation as the constraint set, are the lifter; a separate decompiler is a failure of the representation ([Onboarding](../design/onboarding.md)).

**Extension: boundary surface.** On each lifted codebase, count the open boundaries where an observer must be declared against the closed regions where it is inferred ([Observers](../design/observers.md)). The ratio is the measured declaration burden and the test of whether real systems are mostly boundary (Q58).

**Failure.** Test coverage reported as proof; side effects duplicated during comparison; an agent's proposal treated as a guarantee; an unobserved behavior treated as impossible; a separate lifter that shares nothing with the optimizer.
