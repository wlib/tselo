---
title: "Correspondences across domains"
status: proposal
updated: 2026-11-03
---

# Correspondences across domains

The thesis in one table: a dozen domains run the same incremental-derivation discipline with frontiers, guards, transitions, and authority, differing in which relation and which cost model plug in. The database, JIT, and accelerator rows and the facts, derivation, frontier, and guard columns rest on the derived-state mapping and the transition table in [Store](store.md) and [Change](change.md); the remaining cells are extrapolations to check. Shared shape is an implementation opportunity, not a proof that theories coincide.

| Domain | Facts / source of truth | Derivation / view | Frontier | Guard / residual | Transition dominated by | Commit boundary | Authority |
|---|---|---|---|---|---|---|---|
| Database | commit DAG | tables, indices, materialized views | logical time; snapshot | query invalidation predicate | divergence (barrier or log replay); reclamation (reader lifetimes) | externally observed query results | schema-change permission, budget |
| Compiler / JIT | reference semantics; profiles; cost models | compiled tiers, specializations, lowerings | guard set; model version; established facts | guard with deopt target | state translation (frame reconstruction) | effects already performed by optimized code | engine-internal |
| Accelerator mapping | program + target description | kernel placement, instance versions | kernel boundary | double-buffering, drain | quiescence (a systolic array cannot stop mid-wave) | emitted outputs | lease on the device |
| Authorizer | relation tuples, policies | userset rewrites, cached grants | zookie (freshness); policy epoch | conditional result (`mfa ∧ before_expiry`) | revocation of issued grants | an admitted request | the policy |
| Type checker | constraints, declared laws | solved types, residual casts | fuel; dependence on trusted assertions | residual cast | re-elaboration | none | trusted assertions |
| Profiler / fleet model | observations with collection policy | input models, workload posteriors | staleness; drift | exploration on a fraction of executions | model-version switch with hysteresis | none | collection policy |
| Index / data-structure selection | workload and hardware models | chosen representation with provenance | model frontier | prediction invalidation vs correctness invalidation | all seven (the adaptive collection) | published query results | memory budget |
| Codec / link | source, channel, decoder state | reconstruction | framing, resets | checksum (detection changes action) | reset points | transmitted symbols | spectrum, power |
| Reactive UI | signals, proposals | rendered views | glitch-free wave; logical time | pending indicator on a proposal | re-render of the minimal delegated region | user-visible output | component ownership |
| Fleet rollout | version DAG, running state | deployed mixture | per-session version pin | compatibility check (schema-evolution rules) | publication (expand/contract) | served responses | deploy permission |
| Hardware fabric | configuration, self-description | configured datapaths, routes | progress frontier (no outstanding emission right below t) | timing-speculation detector, capability check on a link | reconfiguration | emitted physical signal | capability on the link |
| Physical product | shared entities, decisions, measurements | BOM, geometry, procedures, tests | as-built measurement frontier | acceptance test | occupancy, in-progress products, accepted orders | manufactured, shipped, installed | who may redraw a boundary |

## Mappings

| From | To |
|---|---|
| interpreter / reference semantics | source of truth (may itself be concurrent or nondeterministic; one schedule must not over-specify the contract, C05) |
| compiled tier · inline-cache feedback · guard · deopt · OSR | materialized view · input stream · invalidation predicate · abandoning a speculative branch · catching up to a frontier mid-iteration |
| skip-list snapshots (article) | cached specializations at different assumption levels |
| fleet profile aggregation | fleet-scale inputs to the same graph |
| proof-carrying authorization | de Bruijn criterion applied to permission |
| conditional permission · residual cast · residual program · JIT guard · checksum | one shape: an unresolved predicate becomes a runtime check where the missing information arrives |
| permissive-OR / restrictive-AND (Postgres RLS, Landlock) | commitments compose as restrictive layers |
| Zanzibar zookie · Timely capability-to-emit · causal frontier · snapshot | kinds of frontier, related by explicit mappings, not interchangeable |
| ACL vs capability list | one relation indexed by object vs by subject: a representation choice |
| compression · protection · checksum · framing | specialization and dedup · ECC, TMR, checkpoints, guards · a guard · an envelope or deopt granularity |
| a tile | the codeword size for the SRAM↔HBM channel under the pebble bound |
| a data structure | a codec for the key→position channel under a source model |
| a memory model · transaction conflict rules · tile-movement semantics | equational theories of the memory, storage, and placement effects (related inputs, not automatically one theory) |
| a handler | a lowering: installing one chooses placement or scheduling for a scope |
| HFT · avionics · game engines · factories and cities | binding-time extremism · the obligation-and-evidence corner (assurance cases) · views plus data-oriented layout plus hot reload · digital twins and multi-party intent |
| Erlang supervision; "let it crash" | the policy for damaged input; detection changing what happens next, i.e. a guard |
| content-addressed definitions | source coding of program space: identical meaning, one code |
| security labels propagating through a database | information-flow labels crossing a boundary |
| a die boundary, a board, a rocket, a constellation, a datacenter | regions of one instance whose boundaries are channel contracts with worse latency and partial failure |

What stays one: compatible meanings, provenance, frontier tagging, exchange protocols between controllers. What need not be one: the physical store, the engine instance, access to the same facts, the wire format.
