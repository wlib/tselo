---
title: "Positions rejected, qualified, and unestablished"
status: open
updated: 2026-11-03
---

# Positions rejected, qualified, and unestablished

Positions the design considered and then withdrew, narrowed, or left without a verdict, with the working treatment that replaced each. Kept so that a rejected position is not re-proposed and so that no analogy quietly becomes a theorem. *Corrected* and *withdrawn* mean no longer held; *rejected as mandatory* means kept as an option, never required; *qualified* and *qualified analogy* mean a narrower working statement is used; *unestablished*, *research lead*, and *research hypothesis* mean no verdict yet. Design notes cite rows by their C-number. Quantitative figures need primary-source verification before use in a design calculation.

## Semantics, types, evidence

| ID | Position | Status | Working treatment |
|---|---|---|---|
| C01 | Prove is a delta posterior; a type is probability one; gradual typing becomes gradual inference; the compiler and a probabilistic-programming engine are one machine | corrected | Entailment, sets, and belief are different objects; the decision layer is decision-theoretic, the semantics not probabilistic. [Justification](../design/justification.md) |
| C02 | Useful type checking requires all search to terminate | corrected | Search may diverge; finite accepted evidence is checked soundly (de Bruijn). |
| C03 | Prove/guard/trust exhausts every optimization | qualified | Operational categories; approximation, refinement, validation, and changed specifications need their own relations. [Commitment](../design/commitment.md) |
| C04 | Every lowering is a lens and must have an inverse | corrected | Partial state translation at designated points; partial lens. |
| C05 | The interpreter is a strictly serializable source of truth | qualified | Reference semantics may be concurrent or nondeterministic; one schedule must not over-specify the contract. |
| C06 | All replacement correctness is bisimulation | qualified | Simulation, refinement, or contextual arguments may suffice; changed contracts need evolution specifications. [Change](../design/change.md) |
| C20 | Access checks, parametricity, and noninterference are one lattice | qualified | Shared observational vocabulary; authorization and information-flow obligations differ. [Observers](../design/observers.md) |
| C21 | Noninterference is always 2-safety | qualified | Depends on the deterministic, nondeterministic, or probabilistic formulation. |
| C28 | Data structures are posteriors; binary search assumes a uniform prior | corrected | Models guide selection; correctness does not require that prior. [Models](../design/models.md) |
| C37 | Rust has no guard mode; Lean is the only extensible compiler and prover | qualified | Broad exclusivity statements are not foundations; inspect mechanisms. |
| C51 | Text is inherently lossy for program structure | corrected | Text can encode structure losslessly; the structured store is motivated by identity and editing projections. [Store](../design/store.md) |
| C55 | The claim store's primitive is the e-class under a theory | corrected | The primitive is a certified relation edge; classes are a derived view under a trust policy. [Claim store](../design/claim-store.md) |
| C62 | The reference interpreter is the universal fallback for every compiled region | corrected | Every region keeps a continuation admissible under its own contract; under a hard deadline drain is inadmissible and the fallback is a resident alternative. [Runtime](../design/runtime.md), [Deadlines](../design/deadlines.md) |
| C71 | A theory without an interpreter and bridges is not loadable; semantic fragmentation is prevented by construction | qualified | Storing, reasoning, and realizing are separate capabilities; the interpreter is required for realization only; whether bridges are adequate is E5's question. [Language](../design/language.md) |
| C72 | Only commits are real | qualified | Only commits are irretractable; speculation costs time and energy and may be observable, so the observer class bounds it. [Runtime](../design/runtime.md) |

## Concurrency, consistency, progress

| ID | Position | Status | Working treatment |
|---|---|---|---|
| C07 | Kahn determinacy and CALM are the same theorem | corrected | Different results; neither bounds buffers or latency. [Irreducibles](../design/irreducibles.md) |
| C08 | Nonmonotonicity, FLP, and metastability are one arbitration theorem | corrected | Each has its own model; a nonmonotone function is not a physical arbitration. |
| C09 | Commutative operations need no coordination | qualified | Invariant confluence: full operations, observations, merge rules, invariants. [Observers](../design/observers.md) |
| C10 | Strict serializability requires a physical central authority | qualified | Logical coordination does not prescribe one machine. |
| C11 | An ordered-parent DAG makes every operation commute | corrected | Deterministic resolution is a chosen semantics. |
| C12 | Skip-like compaction yields arbitrary snapshots in logarithmic time | unestablished | Specify operation algebra, DAG and query class, output size, costs first. |
| C13 | All DBMS state is append-only log derivation as described in the article | qualified | An architectural proposal, not a description of every engine. |
| C14 | Incremental maintenance of arbitrary SQL is solved | qualified | Distinguish supported query classes, semantics, bounds, fallback recomputation. |
| C15 | Every datum carries a version and frontier; branching is free | rejected as mandatory | Metadata and histories cost; they may be compiled away. [Change](../design/change.md) |
| C16 | Router packet minima establish completion | corrected | Producers' retained emission rights and path summaries; a capability to emit is a capability. [Irreducibles](../design/irreducibles.md) |
| C17 | All frontiers, freshness tokens, and version tokens are the same | qualified | Causality, snapshot, progress, freshness need explicit mappings. |
| C22 | All transitions share one atomic publication point, including DNS cutover | corrected | Versioned coexistence and per-session consistency exist; DNS is not an atomic flip. |
| C47 | State is freely copyable; obligations are all linear exactly-once | qualified | A promising split; cancellation, retries, and physical resources need specific semantics. |
| C66 | A time-slotted fabric has zero arbitration | corrected | A slot table is a shared time base; slotting moves arbitration to schedule time. A time base is a leasable cell. [Timing and analog](../hardware/timing-and-analog.md) |
| C76 | Monotone computation is free of clocks and coordination at every scale | qualified | It needs no arbitration for its result; it still contends for finite capacity, a progress obligation (C07). [Irreducibles](../design/irreducibles.md) |

## Authorization and information flow

| ID | Position | Status | Working treatment |
|---|---|---|---|
| C18 | Capability attenuation and all policy narrowing are monotone and coordination-free | corrected | Name the order and the query; attenuation does not revoke; restriction requires revocation. [Irreducibles](../design/irreducibles.md) |
| C19 | Every restriction needs a global revocation arbiter | qualified | Depends on placement, leases, freshness, issued rights, enforcement. |
| C41 | Observed clients define the admissible observer set | corrected | Telemetry informs an intentional contract change; it does not prove other contexts harmless. [Onboarding](../design/onboarding.md) |

## Hardware and physics

| ID | Position | Status | Working treatment |
|---|---|---|---|
| C-v1 | One universal RISC-V plus CHERI tile (scratchpad, DMA, vector unit, timing speculation, telemetry, NoC, GALS) from microcontroller to hyperscaler, with the NIC stack, flash translation, and memory controller as software on it | withdrawn | Shelf parts, not from scratch. An instance and a plausible build path, not the design. [Chipset family](../hardware/chipset-family.md) |
| C-v2 | The first fabricated cells should be the three with no commodity equivalent (versioned storage, progress-tracking routing, self-timed capability-checking links), with whatever sequencer is cheapest that year | withdrawn | The first tape-out is chosen from the store's own cost accounting, and the first die is a physics instrument. [Bootstrap](../design/bootstrap.md), [Fabrication](../hardware/fabrication.md) |
| C23 | All hardware can quiesce, serialize, and resume | rejected as mandatory | Declare drain, checkpoint, restart, and retention capabilities. [Participation](../design/participation.md) |
| C24 | Everything clockless with one packet format; every storage cell a versioned fact store; every message timestamped | rejected as mandatory | Timing and channel representation are design variables; versioned cells and progress accounting are palette options. |
| C25 | A uniform controller per physical cell is free enough by construction | unestablished | Synthesize the participation controller at three granularities; area and energy as a fraction of the cell. [Fabrication](../hardware/fabrication.md) |
| C29 | Analog-to-digital restoration resets accumulated numeric error | corrected | Restoration does not recover information lost to noise, clipping, aliasing, quantization. [Timing and analog](../hardware/timing-and-analog.md) |
| C30 | One error-rate scalar composes all reliability | corrected | Specify fault model, dependence, error semantics, recovery, end-to-end criterion. [Justification](../design/justification.md) |
| C31 | Exactness implies physically zero failure probability | qualified | Semantic guarantees under explicit reliability assumptions. |
| C32 | Landauer prices every source-level discarded distinction | qualified | Not a compiler cost model; the energy table is. [Physics](../hardware/physics.md) |
| C33 | Coherence is universally the most expensive mechanism; tiles always win | unestablished | Workload, architecture, locality, actual costs matter. |
| C34 | Itanium's failure has one cause; the listed accelerators are fully static | research lead | Device-specific sources needed. |
| C35 | Java races make all semantics evaporate like C undefined behavior | corrected | Memory-model claims need language-specific treatment. |
| C36 | Wasm never uses runtime feedback or deoptimization | corrected | V8 uses speculative indirect-call inlining with deopt. [Models](../design/models.md) |
| C38 | Probing a device discovers its complete safe contract | corrected | Empirical absence is not proof; separate guaranteed, empirical, wrapper-enforced. |
| C39 | Binary plus ISA semantics is the complete application | qualified | Include memory, OS, devices, protocols. |
| C40 | Differential tests are a guard for all future legacy executions | corrected | Evidence, not a guard; guards and recovery need their own validity conditions. |
| C56 | No OS as a layer, so nothing is trusted | qualified | No OS layer, but a trusted base (bootstrap, authority enforcement, recovery) exists as a named region with a contract. [Participation](../design/participation.md), [Trust](../design/trust.md) |
| C59 | The chipset's novelty is self-description; little is new in the RTL | qualified | The frozen interface is the extension mechanism and the exchange semantics, and the description vocabulary is unwritten (Q23, Q53). [Chipset family](../hardware/chipset-family.md) |
| C65 | The compiler's region graph is the portable artifact: the same graph everywhere, never the same bits | corrected | Region boundaries are the most target-dependent decision (tile sizes follow memory capacities). The store is the invariant; region graphs are per target class. [Chipset family](../hardware/chipset-family.md) |
| C67 | Three things need a die: error curves, asynchronous timing, and the area of custom digital cells; the first die should hold routers, counters, and links | corrected | Digital area is settled by synthesis; silicon is for analog-physical curves, the SRAM compiler, power delivery, test, and radiation. Chip 0 is physics only; its gate is prediction of held-out conditions on the same die. [Fabrication](../hardware/fabrication.md) |
| C68 | Irregular latency-bound code is served by leasing a commodity out-of-order core | corrected | That exiles the stack's own toolchain from its own silicon. A windowed-speculative sequencer is a legitimate generated cell with a published contract; whether it is competitive is open (Q59). [E9](../experiments/irregular-cell.md) |
| C69 | "No recognizable ISA" holds everywhere on a die | qualified | The management sequencer, where a die has one, is an instruction-driven core, and block sequencers carry an encapsulated ISA behind the mapper. [Chipset family](../hardware/chipset-family.md) |
| C73 | Two fixed cells per die, the describer and the management sequencer | qualified | The describer is fixed; the management sequencer is a palette default absent on the smallest targets, and its necessity has not been derived from the participation requirement. [Chipset family](../hardware/chipset-family.md) |

## Information theory and optimization

| ID | Position | Status | Working treatment |
|---|---|---|---|
| C26 | Shannon separation proves compiler phase-separation optimality conditions | corrected | No theorem transfer; the IR is a lossy channel, as heuristic. [Codecs](../design/codecs.md) |
| C27 | Every minimal upgrade diff is Wyner–Ziv coding | qualified analogy | Identify source model, side information, distortion, block and delay assumptions. |
| C43 | Another search budget yields a known optimality gap | corrected | Need an incumbent and a certified lower bound. [Information economy](../design/information-economy.md) |
| C-store | The store is one physical fact store and one engine | corrected | One meaning, many materializations. [Store](../design/store.md) |
| C57 | The compiler never repeats a shared type check or lowering on any fragment | qualified | Exact within one codebase (semantic-keyed incremental compilation); across parties a prediction about fragment-level claims concentrated in a Zipf head, untested. Daniel's direction stands. [Claim store](../design/claim-store.md) |
| C58 | Beating C follows from the information C destroys, sized against the C program | qualified | The information argument stands; the baseline is corrected in C61. |
| C61 | The honest target against C is "at least C via a trust-mode floor, far beyond C where declaration unlocks search", measured against the C program | corrected | The C program is itself a lowering made under the worst information anyone will have; the baseline is the ideal realization of the intent, and even trivial C programs leave most of the table uncovered. Hand-tuned code stays admissible as a floor; admissibility is not the measure. Shrinking a claim to make its status read as honest is a category error: state the full claim, mark it untested, name the test. [Information economy](../design/information-economy.md) |

## Retention, evolution, identity

| ID | Position | Status | Working treatment |
|---|---|---|---|
| C42 | Hash identity dissolves all dependency and version conflicts | corrected | Shared external state, protocols, and meanings can still conflict. [Store](../design/store.md) |
| C44 | Count plus sum suffices for arbitrary sliding windows | corrected | Removal or window-boundary information is required. [Commitment](../design/commitment.md) |
| C45 | Variance is impossible whenever a fixed mean datapath is used | qualified | Separate retained information from available computation; a retained full window contains more than count plus sum. |
| C46 | Addition laws apply without specifying arithmetic | corrected | Floating-point addition is not associative; integer bounds matter. [Quantities](../design/quantities.md) |
| C48 | Manufacture binding forgets everything; runtime binding retains everything | corrected | Binding and retention are separate dimensions connected by future requirements. |
| C49 | Event sourcing buys every future option | qualified | Only recorded information and available future capabilities support options. |
| C50 | Information hiding, retention planning, and co-design are one theory | qualified analogy | Related ideas with distinct models and purposes. |
| C74 | Time travel is free because the derivation graph is the trace | corrected | Replay reaches only retained inputs, nondeterministic choices, and schedules; retention is a priced decision. [Commitment](../design/commitment.md) |

## Trust, scope, and the project's own claims

| ID | Position | Status | Working treatment |
|---|---|---|---|
| C52 | Arrow and Goodhart are universal impossibility theorems for all design | qualified | Arrow has specific assumptions; Goodhart names several proxy-optimization phenomena. [Irreducibles](../design/irreducibles.md) |
| C53 | Most engineering complexity is connective tissue; model-based systems engineering is only stale documentation | research hypothesis | Investigate real systems and failure cases. [Realization](../design/realization.md) |
| C60 | Connective tissue is the universal part of the stack and the project's claim | qualified | The tissue is infrastructure with its own transfer test; the project rests on four testable bets. [Spine](../design/spine.md) |
| C63 | Trust is an error budget over a named trusted base | qualified | The assumption graph is the primary object; a trust budget is one labeled model over it, valid where independence evidence exists (Q54). [Trust](../design/trust.md) |
| C64 | Three domain bets carry the project and the tissue is not a bet | qualified | The tissue's transfer is the fourth bet, tested by E5. [Spine](../design/spine.md) |
| C70 | Diverse double compilation discharges the trusting-trust problem | qualified | It certifies only that a binary corresponds to its source; the source's own evidence stays a visible dependency. [Bootstrap](../design/bootstrap.md) |
| C75 | Reproduction across toolchains discharges the seed's trust dependency by diversity | qualified | It upgrades an assertion to k-of-n reproduction under independence assumptions; shared tools, environments, and semantic models remain correlated faults. [Trust](../design/trust.md) |

## Where the article's positions are treated

[Article](../intent/article.md) holds Daniel's position unchanged; these rows say where each point the design strengthened or scoped now lives.

| Point | Treatment | Home |
|---|---|---|
| commutativity implies no coordination | invariant confluence; the partitioned-ID trick is an escrow transaction; strict serializability does not imply one physical machine (C09, C10) | [Observers](../design/observers.md) |
| what the DAG gives | history and causality, not serializability, commutation, or log-time materialization; deterministic resolution is a chosen semantics; compaction complexity unestablished (C11–C14) | [Observers](../design/observers.md) |
| kinds of frontier | causal, snapshot, progress, freshness, physical-time estimate, related by explicit mappings (C17) | [Observers](../design/observers.md) |
| envelope fields | observable, invariants, provisional, commit points, recovery; the commit boundary is irreducible | [Schemas](../design/schemas.md) |
| why Erlang hot-updates for free | the program model makes every step a safe point and state a value | [Change](../design/change.md) |
| speculative parallelization | predicates plus runtime conflict detection is the Galois model | [Observers](../design/observers.md) |
| view-update and lenses | edits bubbling up is the view-update problem; a lowering with a backward map at safe points is a partial lens; arbitrary edits are not uniquely invertible | [Commitment](../design/commitment.md), [Store](../design/store.md) |
| the same model for compilation | interpreter as truth, tiers as views, guards as predicates, deopt as branch abandonment | [Store](../design/store.md) |
| keep history | a retention decision with a cost, bounded by deletion authority | [Commitment](../design/commitment.md) |
| the authorizer as derived state | incrementally maintained relations with freshness tokens as frontiers; the new-enemy problem is a glitch | [Justification](../design/justification.md) |

Three seeds the design took from the article: effects as viewpoint-relative distinctions; tracked speculation over a strict core as the model for prove/guard/trust; the derivation graph with frontiers as the model for compilation itself.

## Standing tensions

Tradeoffs the design must keep visible.

- **Universal scope vs tractable methods.** The stack admits every domain; each method needs an applicability class.
- **Shared meaning vs one representation.** Whether a universal IR or translations between theories is the right form is answered provisionally by theories with bridges over one base ([Language](../design/language.md)); the test is E5.
- **Rich semantics vs low overhead.** Tracking everything makes change explainable and can dominate useful work; specialize the stack's own bookkeeping and keep only residual obligations at runtime.
- **Strict consistency vs semantic coordination avoidance.** Explicit strict behavior with opt-in speculation is the stated preference; invariant confluence and escrow may justify less coordination for a stated contract. Neither broad commutativity claims nor silent weakening substitutes for the contract.
- **Future flexibility vs forgetting.** History, spare capacity, compatibility, and generic mechanisms buy options; their value competes with present cost, deletion authority, and physical limits.
- **Automation vs intent.** Agents propose realizations and specifications; intended outcome and authority remain distinct from a model's guess; human disagreement may stay unresolved and represented.
- **Rigor about status vs timidity about scope.** The discipline that no analogy becomes a theorem applies to evidence status, not to ambition. Shrinking a claim so that its status reads as honest is the failure recorded in C61; the correct form is the full claim with its status marked untested and its test named.
- **From-scratch freedom vs ecosystem value.** Existing treaties are optional inputs, yet standards amortize and let strangers evolve independently; model and choose those commitments rather than inherit or reject them categorically.
- **Generation vs checking.** Agents make generation cheap; checking is what bounds the system, and an architecture that minimizes verification surface may beat one that minimizes energy ([Trust](../design/trust.md)).
