---
title: "Boundaries as channels and the codec framework"
status: position
updated: 2026-11-03
---

# Boundaries as channels and the codec framework

Every boundary in the stack is a channel whose contract says which distinctions must cross; codec vocabulary maps onto compilation vocabulary; and Daniel's codec question resolves to joint source–channel coding as constrained stochastic control, which is the shape of every mapper in the design.

## Boundaries are channels

At any boundary (register↔SRAM↔HBM↔die↔rack, storage through time, analog↔digital, old↔new version, author↔reader): what must cross, in what representation, by when, how reliably, and can it be recomputed, summarized, or avoided? If a remote consumer only needs to know whether a count exceeds a threshold, sending the records is a choice; often the largest optimization is discovering that most intermediate information never needed to exist outside its producer.

| Boundary | Channel cost | Code |
|---|---|---|
| memory-hierarchy levels | the energy table | a tile is a codeword size under the pebble bound |
| storage over time | refresh, retention, wear | DRAM ECC and NAND LDPC are channel codes; refresh interval is channel quality |
| analog ↔ digital | restoration loses what aliasing and clipping destroyed | the restoring boundary is an envelope for signal integrity |
| old ↔ new version | running old state is side information at the decoder | a minimal upgrade diff is a conditional code (an analogy to Wyner–Ziv, not a theorem, C27) |
| author ↔ reader | parsing cost, no side information | text is a costly codec for programs, though it *can* encode structure losslessly |
| instruction stream | the most expensive channel in a general-purpose chip | loops, SIMD, tiles, systolic arrays are compressed control |

**Codec vocabulary → compilation vocabulary.** Compression removes distinctions no observer needs (specialization, dead-code elimination, dedup, content addressing). Protection adds redundancy so needed distinctions survive a lossy boundary (ECC, TMR, checkpoints, guards). A checksum matters exactly when detection changes what happens next, which is the definition of a guard. Framing, resets, and state boundaries limit failure propagation (a consistency envelope; deopt granularity). ANS's fragility, where one uncorrected error corrupts everything after it because decoder state is tightly coupled, is the blast radius of deeply specialized code: efficient, fragile, needs framing. Erlang's supervision strategies are the policy for damaged input, and "let it crash" is detection changing what happens next: a guard.

**Functional compression.** When the receiver computes an answer rather than reconstructing the source, functional compression and conditional graph entropy apply rather than plain rate–distortion. This licenses the compiler operation *push consumer requirements backward through the program* and discover what each boundary must carry, which can change algorithm, layout, placement, codec, and physical computation together and sometimes eliminates the boundary.

**Shannon separation does not transfer to compilers** (C26); resemblance between pipelines does not carry a theorem. Within coding itself the result is conditional: with long blocks, a known channel, and a point-to-point link, separately designed compression and channel coding approach the optimum; joint design wins for short messages, tight latency, imperfect channel knowledge, and when some reconstruction errors are more acceptable than others, which is the usual case in the stack. What survives as a heuristic with testable content: the IR between layers is a channel, and cross-layer design pays exactly when that IR is lossy about distinctions the other layer needs (LLVM IR losing Rust's aliasing facts; a generic IR losing XLA's shapes).

**Other channel facts.** Colocated workloads on shared caches, NUMA, and links make the fleet scheduler a multiple-access problem; concurrent signals require a model of who controls what. A schedule can be average-feasible and peak-infeasible (clipping, thermal, dark silicon) because hardware constraints are local in time and amplitude. Encoder and decoder observe different things, so a design requiring the receiver to know something undecoded is invalid; AOT, JIT, hardware speculation, and fleet profiling are one causal policy acting with different observations at different moments.

## The codec framework

Daniel's question: model an analog–digital system as a composite state (source, channel, codec) transitioned by signals, aware of the channel's real properties, and solve for the codec that unifies ECC and compression, exact and lossy, in a rate–distortion sense, where the error-correction rate accounts for the true data rate and the actually acceptable loss, under any given state size, compute, latency, and throughput. The answer: **joint source–channel coding formulated as constrained stochastic control**. The codec is a *causal policy*.

| Piece | Describes |
|---|---|
| state and dynamics | source, channel, hardware, codec memory, buffers, and how they evolve |
| observations | what each endpoint can know at each moment |
| actions | transform, quantize, compress, protect, transmit, request retransmission, reconstruct, discard |
| objective | reconstruction or task quality, delivery, latency, energy, throughput, compute |
| constraints | physical limits, deadlines, memory, feedback availability, allowed failure behavior; kept as constraints, not folded into a weighted cost |

Offline design chooses the policy and representations; runtime executes and adapts where allowed. Lossless and lossy compression, ECC, checksums, framing, synchronization, resets, scheduling, modulation, and multiplexing are candidate operations inside the policy, judged by end-to-end effect. A practical implementation is a graph of stages plus a controller, each stage declaring I/O representation and state, distortion behavior, resource needs, and behavior on damaged input; "compress → checksum → ECC → modulate" is one restricted instance.

What the state-transition picture alone misses:

- Source state (what makes data predictable), channel state (noise, interference, drift, echoes), and codec state (algorithm memory) are different kinds; the receiver cannot observe true channel state, so the core model is *P(measurements | transmitted, channel history)*.
- An ADC gives measurements, not symbols: aliasing, clipping, quantization, jitter, inter-symbol interference, synchronization. Sixteen converter bits are not sixteen reliable bits, so bandwidth, transmit power, converter behavior, and synchronization belong in the optimization.
- Compression and protection have different jobs even when implemented together; combining machinery is not automatically better.
- "Probability of error" is insufficient: bit vs message failure, detected vs undetected corruption, average vs catastrophic distortion, typical latency vs hard deadline. For a program binary one wrong bit ruins the transfer; for audio a small amplitude error is imperceptible while a dropped interval is obvious. Controlled distortion and feedback change the best design completely.
- Larger codec state can improve the model while making inference and decoding cost explode; more compute cannot recover information the channel destroyed; longer blocks improve coding efficiency while violating latency limits.
- Concurrent signals require a model of who knows and controls what.
- The combined state is not jointly available: the encoder knows the source, the decoder infers it, neither sees the channel. The optimization variable is therefore a causal strategy (what to send next, when to measure the channel, how much to buffer, whether to request retransmission, when to commit to a reconstruction), not a representation.
- "True data rate" need not be a fixed intermediate: a joint design maps source information directly into channel inputs, protecting the broad shape heavily and letting detail degrade, so there may be no single ECC rate.
- Hardware constraints are local in time and amplitude; a compact state preserving everything relevant to future decisions is hard; learning the model consumes observations and airtime.
- Storage is communication through time; information lost before observation is not recoverable without side information, and digital restoration does not recover numerical information lost in an analog stage (C29).
- The optimum is computationally prohibitive, rare failures are expensive to evaluate, and there is a Pareto set, not one optimum. Phrasing a task as a partially observed stochastic process does not supply a solver.

**Why it matters here.** Every mapper in the design (JIT tiering, placement, index selection, fleet scheduling, retention planning) has this shape: partially observed state, stratified observations, actions with resource costs, a Pareto objective, hard constraints, and a causal policy respecting who knows what when ([Models](models.md)). Tested by [E6](../experiments/joint-communication.md).
