---
title: "E8: authorization during policy change"
status: experiment
updated: 2026-11-03
---

# E8: authorization during policy change

Cache a conditional grant, then change the relevant policy or data epoch, and test which requests may complete and when new ones must consult fresh evidence ([Justification](../design/justification.md)).

**Setup.** An illustrative read policy: `(direct_reader OR member_of_owner_team OR valid_read_capability) AND satisfies_conditions AND NOT blocked`. Evaluation yields true, false, or a residual such as `mfa ∧ before_expiry`, depending on policy, relationship state, token validity, context, and requested freshness.

**The change.** Revoke team membership while a cached grant and an in-flight read exist. The contract must say which already-admitted work may finish, which requests need new evidence, and when old grants stop being usable. Attenuating a newly delegated token does not revoke earlier tokens.

**Two enforcement regimes.** Dynamic: per-request checks with caching and a revocation protocol. Specialized: configuration establishes exclusive authority for a region so repeated checks disappear; reconfiguration must then preserve the authority contract. Test both.

**Must demonstrate.** An authorization result as evidence with dependencies and a validity condition · the distinction between a fallback compiler path and an authorization-denial policy despite shared machinery · that per-request checks do not by themselves establish noninterference across query histories.

**Failure.** Local token attenuation mistaken for revocation of existing authority; a stale grant honored after the policy epoch moved without a declared freshness contract.
