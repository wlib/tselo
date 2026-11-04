---
title: "E3: a contract change with information loss"
status: experiment
updated: 2026-11-03
---

# E3: a contract change with information loss

Force the retention planner to exist by evolving a contract that needs information the old implementation discarded.

**Setup.** Version 1: integer samples; retains count and sum; answers mean queries exactly (accumulator bounds declared). Version 2 adds historical variance. `[0, 2]` and `[1, 1]` yield identical v1 state and different variances. No migration function is correct for both.

**The system must** (1) detect at planning time that the admitted evolution's sufficient statistic is not derivable from the retained state, and report it as an information failure, not a tooling failure; (2) offer the choices explicitly, each with its cost and effect on observers for historical and future queries: retrieve history from elsewhere (a log, a replica, a client); begin the statistic at the upgrade boundary with the output type carrying "since t₀"; introduce an explicit approximation or unknown; (3) respect bounds: deletion requirements and authority can forbid retention even when it would have been valuable; (4) price the option retroactively: show what retaining sum-of-squares (or the raw window for N days) would have cost in v1, so the author can decide whether to buy similar options for the declared family of future evolutions.

**Variants.** Declare the family of future schema changes up front; the planner chooses minimal sufficient statistics for the family. Run the evolution against realizations A, B, C of [E2](three-realizations.md); A must report "impossible in place". Add a deletion requirement mid-way; verify retention shrinks. Contrast count/sum-only state, a retained complete window, and a replay log.

**Failure.** The system invents discarded history, or confuses retained information with reconfigurable computation. Concepts: [Commitment](../design/commitment.md), [Change](../design/change.md).
