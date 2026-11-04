---
title: "E4: the smallest implementation-and-transition contract"
status: experiment
updated: 2026-11-03
---

# E4: the smallest implementation-and-transition contract

Can one contract serve a JIT specialization, a live index migration, and an accelerator mapping? The proposed answer is that the seven-field protocol is architectural, which field is expensive differs, and the semantics that still differ are confined to the commit boundary and the error contract. This experiment checks that by implementation.

| Field | JIT specialization | Live index migration | Accelerator mapping |
|---|---|---|---|
| quiescence | safepoint | transaction boundary | kernel boundary (cannot stop a systolic array mid-wave); **dominates** |
| state translation | frame reconstruction; **dominates** | mechanical (rows → new structure) | instance versioning |
| divergence policy | trivial (single owner) | barrier-captured or log-replay; **dominates** | double-buffering, drain |
| publication | frame rewrite, code pointer flip | table rename, version pointer | descriptor swap |
| reclamation | no live activations | no readers hold a reference; **dominates** | DMA complete, buffers released |
| commit boundary | effects already performed by optimized code | externally observed query results | emitted outputs |
| authority | engine-internal | schema-change permission, budget | lease on the device |

**Build.** A single `Transition` abstraction with the seven fields and three instantiations: a toy tiering interpreter with deopt; the adaptive collection's representation switch ([E1](adaptive-collection.md)); a simulated accelerator region with non-interruptible kernels. Measure whether the abstraction is load-bearing (one planner schedules all three) or nominal (three implementations behind one interface).

**Expected.** Shared: the planner, provenance, cost accounting, the obligations ledger. Different: the commit-boundary model and the error contract. If more than those two differ, the "architectural" claim is overstated and [Change](../design/change.md) is revised.
