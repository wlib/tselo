---
title: "Runtime: regions, three objects, speculation and commit"
status: proposal
updated: 2026-11-03
---

# Runtime: regions, three objects, speculation and commit

Everything at runtime is one of three objects: a fact with a frontier, a derivation with an invalidation predicate, or an obligation that is linear. Threads, locks, callbacks, allocations, processes, and files are lowerings or views of these three. Computation upstream of a commit boundary is retractable and commits are not, so the scheduler's objective is to minimize arbitration points subject to deadlines, then energy. What a region keeps at runtime is its residual obligations ([Change](change.md)) and an admissible continuation.

## Three objects

| Object | Carries | Home |
|---|---|---|
| **fact** | a value at a frontier, with provenance | [Store](store.md) |
| **derivation** | how a fact follows from others, with the predicate that invalidates it | [Store](store.md) |
| **obligation** | something undertaken and not yet discharged; linear: discharged or handed off exactly once | [Change](change.md) |

## Familiar things

| Familiar thing | What it is here |
|---|---|
| a variable | a fact at a frontier |
| a function call | a derivation materialized on demand |
| a thread | a region of derivations the mapper chose to sequence |
| a lock | an arbitration point the program's laws failed to eliminate, counted and shown ([Irreducibles](irreducibles.md)) |
| an allocation | retention of a fact for a declared lifetime; garbage collection, arenas, and manual freeing are three lowerings of one contract, chosen per region |
| an exception | a fact that a guard fired; recovery is a transition with a declared fallback; across regions an error is a channel value, never a control transfer |
| a callback | an obligation held by whoever will discharge it |
| a server | derivations from requests to responses with a commit boundary at the response |
| a process | a lease ([Participation](participation.md)) |
| a file | a named fact under a durability contract; filesystems, caches, and databases are one thing at different retention settings |
| a UI | a derivation to pixels with a commit boundary at the display |
| monitoring | the collection policy under which the system observes itself ([Models](models.md)) |
| networking | channel contracts lowered per link, with exactly the ordering and reliability the admitted interactions require ([Codecs](codecs.md)) |

## Speculation and commit

Everything upstream of an actuator, a transmitted byte, or a displayed frame may be re-derived, abandoned, or run twice. Retractable is not free: speculation costs time and energy and may be observable (a timing side channel), so what a region may speculate is bounded by its observer class and its budget ([Observers](observers.md), C72). Arbitration is paid only at commit boundaries and at the laws' genuine non-monotone points, so the scheduler is a controller derived from the budgets and the target's timing records ([Models](models.md)), with timescales stratified so that per-cycle placement, per-millisecond migration, and per-hour fleet rebalancing do not fight. The arbitration count of a realization is a published number beside its energy, and a realization with zero arbitration is a Kahn network whose only remaining obligations are capacity and progress ([Irreducibles](irreducibles.md)). This is the strict core with tracked speculation ([Article](../intent/article.md)) applied to all computation; [E2](../experiments/three-realizations.md) realization C is the first test.

## The admissible continuation

Every region keeps a continuation it may fall to when a guard fires, and the continuation must be admissible under the region's own contract: the reference interpreter where drain is admissible ([Bootstrap](bootstrap.md)), a resident alternative realization under a hard deadline ([Deadlines](deadlines.md)), a safe state for an actuator. The interpreter is therefore not a universal fallback; it is the fallback of regions that can afford it. A region drops its continuation only under an elimination license backed by certificate-kind evidence ([Change](change.md)), which ties trust to bookkeeping elimination: the continuation stays while evidence is weak, and the right to remove it is earned.

## What each scale receives

| Target | Receives | Runs |
|---|---|---|
| a SIM card | a configuration and its residual guards; description answered on its behalf by the store | no mapper |
| a phone | a small mapper region for its dynamic parts, a bound image for the rest | a coarse mapper on a time budget |
| a datacenter | the store | the full search ladder |
| a spacecraft | pre-certified alternative realizations and a selector driven by its measured self-description | adaptation by selection, not search |

The program is identical; the residue differs ([E2](../experiments/three-realizations.md) applied to the stack's own machinery). Open: a common liveness and resource contract (Q51); the mapper's own tiering ladder (Q66).
