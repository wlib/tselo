---
title: "E6: joint communication design under information boundaries"
status: experiment
updated: 2026-11-03
---

# E6: joint communication design under information boundaries

Test the codec framework as a mapper: a bounded codec family with source and channel models and an end-to-end task objective, where the optimization variable is a causal policy ([Observers](../design/observers.md)).

**Setup.** A small source model, a channel model with memory and noise, two endpoints with different observations, and a task objective (reconstruction quality or a downstream decision) rather than a bitrate. Candidate operations: quantization, exact and lossy compression, FEC, checksums, framing, resets, retransmission, decoder state management.

**Vary.** Framing, compression, protection, feedback availability, decoder state, and the task objective. Compare a fixed "compress → checksum → ECC → modulate" pipeline against a jointly chosen policy.

**Must demonstrate.** No policy uses information unavailable at its endpoint (encoder cannot see the channel; decoder cannot see the undecoded source) · hard constraints (deadline, memory) stay constraints rather than folding into a weighted cost · protection and compression decisions are judged by end-to-end task effect, with explicit failure semantics (detected vs undetected, average vs catastrophic).

**Failure.** A policy that assumes jointly available state; local bitrate or error-rate metrics that mispredict task behavior; a stateful compressor whose corruption propagation was not framed.
