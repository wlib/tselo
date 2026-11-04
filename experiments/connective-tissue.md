---
title: "E5: the connective-tissue library and one cross-domain coupling"
status: experiment
updated: 2026-11-03
---

# E5: the connective-tissue library and one cross-domain coupling

Build the shared services by driving one concrete case (the running example in [Spine](../design/spine.md)) through two deliberately alien domain packages with one coupling, letting the case force identity, evidence, invalidation, and transition machinery into existence; the table below is what must exist by the end, not the build order. If the tissue is not shared across two alien domains, it is not shared ([Realization](../design/realization.md)).

| Service | Minimum content |
|---|---|
| identity | represented-artifact, editing, optimized-artifact, semantic, and instance identities with their relations |
| provenance | who or what asserted a fact, under which policy, at which frontier |
| derivation | incremental, demand-driven, frontier-tagged; invalidation predicates; glitch-freedom within an envelope |
| evidence | certificate, counterexample, conditional claim, statistical evidence, unknown; with dependencies and validity |
| models | plural per resource; validity domains; collection policy; lower-bound providers |
| retention planner | sufficient statistics for a declared family of future contracts; deletion and authority bounds |
| transitions | seven fields; two kinds; obligations ledger |
| views | projections keyed by editing identity; decision explanations |

**Two alien domains.** A compiler IR (a small SSA with a lowering to a toy target): regions, lowerings, guards, profiles. A PCB netlist: components, connections, geometry, a BOM with substitutions, a thermal model.

**One coupling.** "This software timing requirement constrains this component choice." Candidate realizations: a commodity processor, programmable logic, a custom datapath, each with cost models depending on workload, memory, timing discipline, power, and interfaces. Change the timing requirement, then invalidate a measured component assumption: selection must be invalidated through the derivation graph with provenance; BOM, geometry, and thermal check must follow; the editor must show why and which artifacts remain valid.

**Success.** No domain-specific code in the library · the instance's cross-domain consequences are derived from the packages' models and checked; what is authored is the models, never the per-instance wiring (a shared UI over manually synchronized files fails) · both domains use the same transition planner for "replace this implementation" and the same evidence types for proven / believed / permitted · deleting the thermal model's history is refused while a declared future re-analysis admits it · the proposed design, manufacturing instructions, and measured as-built instance stay distinct. **Partial success.** Two theories that need different checkers but exchange checked claims and invalidate shared assumptions correctly reject the one-checker candidate, not the tissue; record it as such.

**Variant: the shared claim store.** Two independent parties, one certified equivalence edge, one certified lowering for one target description shared by gossip and consumed without recompilation; a revised cost model that must invalidate it on both sides; a lifted fragment recognized by reproduction against the shared table ([Store](../design/store.md)).

Do not attempt an EDA suite first. The test is whether identity, provenance, dependencies, evidence, and choices are reusable across two different theories.
