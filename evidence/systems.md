---
title: "Systems as evidence"
status: survey
updated: 2026-11-03
---

# Systems as evidence

Existing systems with the mechanism that matters here, the design claim each is evidence for, and where it hits a wall. Bibliographic leads are in [References](references.md).

## Compilers, IRs, and search

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| JAX / XLA / Pallas | trace a pure, statically shaped array program to a jaxpr; `grad`, `vmap`, `shard_map`, `jit` as interpreters over it (collapsing towers in production) | narrowing: purity and static shapes make every transformation a pure derivation ([Commitment](../design/commitment.md)) | dynamism re-entering (ragged batches, MoE routing, variable KV caches) as padding and bucketing: guard mode creeping back; XLA a black box with no author dial, Pallas the pressure valve |
| polyhedral compilation (Feautrier, Pluto, Tiramisu, Tensor Comprehensions, MLIR affine) | static-control loop nests as polyhedra; dependences as exact ILP; tiling, skewing, fusion as affine maps | proof mode for loop transformations | affine regions only; the cost model choosing among legal transforms is a heuristic bolted onto an exact engine; dies at sparse, gather, dynamic shapes |
| e-graphs, equality saturation (egg, Cranelift ægraphs, egglog) | keep every equivalent rewrite; extract by cost; egglog adds Datalog so profile facts enter the same base | lowering as search over a fact base; the structural bet of the [Store](../design/store.md) | AC rewrites explode; extraction is NP-hard; side-conditioned and effectful rewrites need extensions; deletion is costly |
| MLIR, Mojo | IR as library, dialects, progressive lowering; comptime staging over dialects | infrastructure for compiler-as-library; the failure the realization rule in [Language](../design/language.md) addresses | dialect proliferation without shared semantics; thin debug information across dialect boundaries, i.e. a weak backward map; ad hoc lowering paths; pass pipelines are phase ordering, not search |
| LF-family logical frameworks (Twelf, Dedukti) | a dependently typed signature language in which a theory is a signature and a proof is a term; Dedukti bridges several provers' theories into one checker | the kernel and the theory-with-bridges proposal in [Language](../design/language.md) | checking cost on large certificates; theories with effects or approximation need encoding (Q60) |
| Terra; LMS; MetaOCaml; Julia `AbstractInterpreter`, GPUCompiler.jl | the compiler literally called as a library; staging via `Rep[T]` or quotation; lowering a language to PTX from user code | compiler as library exists in pieces | dials held by implementers |
| Halide, Exo, TACO | algorithm/schedule split; user-schedulable equivalence-preserving rewrites; algorithm/format split for data | gradual commitment patterns ([Commitment](../design/commitment.md)) | per-domain |
| Zig, data-oriented design | layout is the program: SoA, `u32` handles instead of pointers (small, relocatable, serializable, and the reason executables-as-databases feel natural there), arenas, comptime `MultiArrayList` | trust mode everywhere with *legible* cost; the floor | layout baked into source rather than a lowering choice; TACO fixes this for tensors; in Tselo AoS/SoA, tiling, and sharding are views chosen per region |
| Rust | ownership as a static proof of aliasing (`noalias` LLVM had bugs around because no language exercised it) | a mainstream language carrying resource facts in types; proof mode plus `unsafe` as trust mode | little guard mode for memory; compile time is the information economy made concrete; placement not in types |
| F* (`Tot`/`Dv`), Idris 2 (QTT), Koka (effects, Perceus), Effekt, Granule, Liquid Haskell, Lean 4, Alive2 vs CompCert | mode per function; erasure in the type; typed effects compiled to zero cost; graded modalities; extensible elaborator over a small kernel; check-each-output vs prove-the-pass | the pieces of [Justification](../design/justification.md) already exist | scattered; none in one system; different soundness and runtime contracts |
| Bracha's pluggable types; Turnstile | optional, multiple type systems with no effect on runtime semantics; type systems as macros | Daniel's checker position | |
| TypeScript recursion limit; Zig comptime branch quota | fuel instead of termination proofs | fuel manages cost without settling semantics | |
| superoptimization (Denali, STOKE, Souper) | exhaustive or stochastic search for optimal code in the small; SAT-proved optimality | a lower-bound provider; optimality within a space | tops out around ten instructions; the economic fix is fleet-amortized search over content-addressed fragments |
| Bluespec, Aetherling, Filament, Dahlia, Calyx | schedule, space–time, and resource in the type; hardware IR | where schedule-in-type lives first | hardware-only so far |
| Alpa | inter-operator placement by DP plus intra-operator sharding by ILP against a cost model | declarative placement matching hand-tuned configurations; locality in the program means locality in the decision graph | restricted class |
| Sisal, SaC, Futhark, Soufflé, HyPer, worst-case-optimal joins | functional arrays matching Fortran; beating hand-written CUDA on some kernels; Datalog beating hand-written analyzers; queries compiled through LLVM; a theory result beating forty years of planners | declarative systems beat C where the compiler owns the dataflow ([Commitment](../design/commitment.md)) | specifics to verify |
| Futamura projections; collapsing towers; Truffle/Graal; PyPy | write the interpreter, derive the compiler, deopt on demand; `@CompilationFinal`, `Assumption`, `transferToInterpreterAndInvalidate` | the embryo of the author's speculation dial; lifting by specialization ([Onboarding](../design/onboarding.md)) | the dial is held by the language implementer with tier-up policy baked in |

## Engines and estimators

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| V8 (Ignition → Sparkplug → Maglev → TurboFan/Turboshaft); JavaScriptCore (LLInt → Baseline → DFG → FTL/B3); SpiderMonkey (Warp) | tier ladders driven by inline caches, invocation counts, and feedback stability; deoptimization reconstructs interpreter frames | the engine's price model; deopt as state translation ([Models](../design/models.md)) | most engineering recovers information the language destroyed |
| Wasm in V8 (Liftoff, TurboFan) | speculative indirect-call inlining with deopt even on a statically typed input | static typing does not eliminate runtime feedback (C36) | |
| Transmeta Crusoe; NVIDIA Denver | software JIT pretending to be a CPU | lukewarm because they redid at runtime what out-of-order does with no more information | |
| inline caches; TAGE and perceptron predictors | per-site shape models; online learners in silicon | every layer already runs a model | |
| AutoFDO, BOLT, Android cloud profiles | fleet profiles aggregated across machines and shipped with binaries | the datacenter is already the profiler; the loop is not closed into one derivation graph | offline, ad hoc |
| System R interesting orders; Bao | tracking a property across operators; contextual bandit over plan hints with exploration on a fraction of queries | "sort here for performance there" automated; explicit exploration | |
| NAND LDPC with read-retry | belief propagation on every read | inference inside the storage stack | |
| Borg Autopilot | hysteresis, dwell times, timescale separation | adaptation as control ([Models](../design/models.md)) | a reference, not proof of a universal controller |

## Incremental and derived computation

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| rustc query system; Salsa; Adapton | demand-driven derivation with red-green dependency tracking | compilation as derived state ([Store](../design/store.md)) | activation still has effects |
| Nix, NixOS | input- vs content-addressed derivations; reproducible systems | the same idea for the OS layer; the artifact-identity distinction | |
| Timely and Differential Dataflow; Naiad | logical time; progress tracking with retained emission capabilities and path summaries | progress needs capabilities ([Irreducibles](../design/irreducibles.md)) | |
| DBSP, Materialize, Feldera | incremental view maintenance for SQL | the article's incrementality; one derivation discipline | supported query classes and bounds to verify (C14) |
| TC39 signals; ThingLab; Convex; Zero; bruh; Sanity visual editing | reactive derivations, glitch-freedom, browser sync, in-place editing | the article's examples | ancient ideas rediscovered in limited scopes |
| Kleppmann, "turning the database inside out" | separate durable history, authority, synchronization | the article's dissolution of the database | |

## Distributed systems and consistency

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| Pijul | patches with explicit dependencies; a DAG instead of a stream | the article's commit DAG; upgrade as a path | deterministic resolution is a chosen semantics (C11) |
| CRDTs; Paxos; Raft | merge without coordination; consensus making replicas one logical machine | "minimize arbitration points" | |
| CALM; Bloom; Hydro; LVars | monotone programs are coordination-free; Hydro compiles whole distributed programs with placement chosen by the compiler | monotone needs no arbitration; placement as a compiler decision | neither bounds buffers nor latency (C07) |
| Kahn networks; Parks; Ptolemy | deterministic stream networks; bounded scheduling | determinism without a clock | deadlock under finite buffers |
| invariant confluence; escrow transactions | operations, invariants, merge considered together; partitioned invariant budgets | the correction to commutativity ([Observers](../design/observers.md)) | |
| Galois | speculative parallelization with runtime conflict detection | the DAG as a parallel execution model | |
| Zanzibar; zookies | relationship tuples with userset rewrites; freshness tokens | the authorizer as derived state; the new-enemy problem as a glitch | a zookie is one kind of frontier (C17) |
| Jepsen consistency models; Lamport clocks | the consistency zoo; logical time | the article's position on strict serializability | |

## Transitions, evolution, dependencies

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| Baker's incremental GC; RCU; epochs; hazard pointers | concurrent transition, publication, reclamation | fields 3–5 of a transition ([Change](../design/change.md)) | |
| VM live migration; gh-ost; pt-online-schema-change | dirty-page tracking; captured divergence; table rename as publication | the seven fields in production | |
| Erlang/OTP hot code loading, `code_change/3` | explicit process state; message loop as free quiescence point | why the article's program model makes hot update tractable | |
| Kitsune; Jvolve; dynamic-update correctness research | state transformers; update points; application-specific correctness beyond type safety | two kinds of transition | |
| React Fast Refresh | preserves hook state by position | the failure mode of positional identity ([Store](../design/store.md)) | breaks when hooks reorder |
| Kubernetes rolling deploys; DNS cutover; expand/contract; Avro and protobuf evolution rules | version mixtures; per-session consistency; schema compatibility checks | fleet reality; DNS is not atomic (C22) | |
| EDOS; Version SAT | dependency resolution is NP-complete | resolution as a pluggable solver | |
| Elm version analysis; cargo-semver-checks; crater | the bump computed from the signature diff; the ecosystem built against a change | semver as a claim to check | signatures do not prove semantic compatibility |
| Unison; Hazel; JetBrains MPS; Enso | content-addressed definitions; typed holes; projectional and mixed editing | the structured store and views ([Store](../design/store.md)) | |

## Languages, memory models, effects, placement

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| OCaml 5 memory model (local DRF) | a race on one location cannot poison unrelated locations (C11 gives SC-for-DRF only globally); cheap barrier on non-atomic stores on weak hardware | a memory model is the equational theory of the memory effect; one strong model at small flat cost where Tselo wants it per region; make movement explicit and the happens-before edge is the dataflow edge | the claim that Java races likewise evaporate all semantics was overbroad (C35) |
| OCaml 5 effect handlers; Eio | parallelism (domains) separated from concurrency (effects); one-shot fibers as stack swaps; the scheduler is a library | handlers as lowerings ([Observers](../design/observers.md)) | effects untyped |
| Koka, Effekt, Unison abilities | row-typed or capability-passing effects compiled to zero cost | typed handlers let dispatch compile away | |
| OxCaml modes and unboxed layouts | locality, uniqueness, portability, contention, representation as modes | placement and representation in the type system of a shipping FP language | |
| Sequoia; Legion/Regent/Legate; Chapel | the hierarchy as a tree; logical regions with privileges and a pluggable runtime mapper, with Regent = Terra (compiler as library) + region types + the Legion mapper in one loop; locales | the mapper as the shape of every installable strategy; instance versioning as transition bookkeeping | placement in types of a mainstream language is still missing |
| Triton, Pallas, cuTile/TileIR, CuTeDSL, CUTLASS, CuTe, FlashAttention | the block as the program unit with explicit placement; layout algebra; IO-aware tiling | data movement is the program ([Physics](../hardware/physics.md)) | five-plus years of lag behind the hardware |
| Arm multicopy atomicity (2017); Apple TSO mode for Rosetta 2; Intel TSX | hardware accommodating software treaties; a hardware guard borrowed by a translator; HTM shipped and disabled | treaties shape silicon; something is on the table for lifted code | |
| Dynamo; Bansal & Aiken | runtime re-optimization of native binaries; binary translation via superoptimization with separate test and equivalence steps | uncommitting yields gains; the three-step discipline ([Onboarding](../design/onboarding.md)) | |
| Sail; Arm machine-readable spec; Retypd; LangSec; uops.info; litmus tooling | formal ISA semantics; type recovery; formats as languages; probed instruction contracts; probed memory models | lift and probe | probing yields empirical, not guaranteed, contracts (C38) |

## Data structures, approximation, probability

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| SETL; Rice's algorithm selection; RelC; Cozy; Data Calculator; database cracking; Chameleon | automatic representation selection, 1975 to now | the lineage and its five blockers ([Models](../design/models.md)) | each failed on budget, workload model, hardware model, specification, or drift |
| learned indexes; splay trees; interpolation search; Bloom filters; universal hashing; skip lists | a fitted CDF; distribution-adaptive trees; priors on keys; lossy membership; randomizing against an unknown source | data structures as codecs | a structure is not a posterior (C28); dynamic optimality is open |
| learning-augmented algorithms (ski rental with predictions, caching with predictions, learned search trees with a fallback); introsort; SipHash | near-optimal when the prediction is right, bounded when wrong; depth guard; randomized hashing against flooding | every probabilistic lowering carries a worst-case bound | the consistency–robustness tradeoff is the finite-blocklength caveat of this field |
| RaML; expected-cost analysis | cost-carrying types; probabilistic cost bounds | proof mode for bounds | |
| Gen; Hakaru; probabilistic abstract interpretation | inference strategies as installable transformations | programmable inference per scope ([Justification](../design/justification.md)) | not a probabilistic semantics for everything (C01) |
| EnerJ; Rely; Flikker; Razor | approximation and reliability types; partial DRAM refresh driven by annotations; circuit-level timing speculation | error budgets as an effect | |
| quantum threshold theorem; resource estimators | budget in, code distance out | budget-driven compilation as a discipline | technology-specific assumptions |

## Authorization

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| ABLP calculus; access-control matrix; proof-carrying authorization; object capabilities | principals, trust, delegation; ACLs as columns and capabilities as rows; portable proofs of access; reference bound to authority | `policy + evidence ⊢ request` ([Justification](../design/justification.md)) | the matrix misses transfer, attenuation, revocation |
| OpenFGA; SpiceDB (caveats) | union, intersection, exclusion, traversal; conditional results when context is missing | the composition algebra; the residual predicate | |
| XACML | Permit / Deny / NotApplicable / Indeterminate with explicit combining algorithms | what "no" means is a combining-rule choice | a four-valued result, related to but not identical with a residual predicate |
| PostgreSQL RLS; sepgsql; Landlock | permissive OR, restrictive AND; OS policy inside the database; layers that only narrow, descendants inherit restrictions | restrictive composition; attenuation vs revocation | RLS has a superuser bypass; sepgsql shares the OS security model with the database but gives no row-level enforcement; Landlock's vocabulary is OS resources only |
| Melange; Cedar; Casbin; Biscuit | graph policies compiled into SQL functions; embedded evaluation with forbid overriding permit; configurable combining; signed Datalog with attenuation on delegation | compiling a policy is a lowering; evidence with attenuation portable across services; one plausible stack is graph policies over existing data, one embedded evaluator shared by the Rust and TypeScript sides, and attenuable tokens between services | storing authorization data in a database does not enforce access to application tables; mapping subjects, resources, and decisions consistently across enforcement points is the remaining work |

## Operating systems

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| Hydra, Mach; exokernels; MirageOS | policy/mechanism separation; policy in a library OS; the application links exactly the OS it needs | the lineage ending in "no OS as a layer" ([Participation](../design/participation.md)) | |
| Barrelfish and its System Knowledge Base | a constraint-logic database of hardware topology queried at runtime for placement | an embryo of self-description | |
| Singularity; Theseus | the type system replaces hardware protection | OS boundaries as compile-time facts | |
| Cloudflare Workers; Deno Deploy | the engine is the OS, the isolate the process | historical comparison | not a claim that OS functions disappear |
| io_uring; libdispatch; Fuchsia | queue-based scheduling interfaces; capability-based OS | Daniel's "obvious things hacked on" | |

## Hardware

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| TPU v4 with optical circuit switches; Groq TSP; Cerebras; Tenstorrent | topology reconfigured per job; compiler schedules every cycle including the network; wafer-scale with memory on-chip; Ethernet everywhere | the network is a lowering target; fully static is buildable for the right program class ([Physics](../hardware/physics.md)) | figures to verify |
| HBM over TSVs; UCIe and Bunch of Wires; HBM-PIM and UPMEM | vertical memory; chiplet standards; processing in memory | the beachfront problem and its exits | PIM is niche |
| CHERI, Morello, CHERI-RISC-V; Ara; ESP; OpenPiton | capability hardware; vector core; open NoC platforms | a plausible build path, not the design (C-v1) | |
| Chisel/FIRRTL, Rocket Chip | hardware generators | generators as a method ([Chipset family](../hardware/chipset-family.md)) | not a mandated toolchain |
| Caltech CHP→QDI; micropipelines; Fulcrum; Achronix; GALS | local handshakes; mixed timing | clockless is possible; tooling is the barrier ([Timing and analog](../hardware/timing-and-analog.md)) | isochronic-fork assumptions |
| Dennis dataflow; tagged-token machines; Monsoon; WaveScalar; TRIPS/EDGE; Plasticine and Spatial; SambaNova | dataflow and spatial execution; EDGE blocks with explicit operand slots | out-of-order is windowed dataflow; the spatial revival; the block sequencer and the tagged-token alternative in [E9](../experiments/irregular-cell.md) | the token-matching store cost (SRAM density has moved three orders since); EDGE reached rough parity and was weakest where blocks are smallest |
| decoupled access/execute; DeSC | address generation split from execution | a component of the irregular-control candidates | control-dependent addresses |
| Micron Automata Processor; UPMEM; HBM-PIM | automata at memory bandwidth; shipped processing-in-memory | the memory-first alternative in [Fabrication](../hardware/fabrication.md) | logic in a memory process is slow and area-poor; anything not automaton-shaped |
| SpiNNaker; Loihi; Caltech MiniMIPS; Fulcrum; Achronix | shipped million-core event-driven GALS machines; asynchronous microprocessors; an async FPGA vendor that later returned to synchronous design | the asynchronous-first alternative; the tooling and test walls | dual-rail area; dense throughput; test without a scan clock |
| time-triggered architecture; TTEthernet | a sparse global time base as the correctness argument across chips | time as the fabric; distributed hard real time leases a time base ([Deadlines](../design/deadlines.md)) | dynamic work wastes slots; precision across a constellation |
| synchronous dataflow (Lee & Messerschmitt); Ptolemy | process networks with static rate contracts | the region graph is this plus logical regions plus timing contracts ([Chipset family](../hardware/chipset-family.md)) | dynamic instantiation |
| open process kits and shuttles (SKY130, GF180, IHP SG13G2); OpenROAD; OpenRAM; FABulous eFPGA; Yale ACT | open fabrication and asynchronous flows | the characterization die ([Fabrication](../hardware/fabrication.md)) | SRAM compilers are the long pole; the shuttle landscape shifted in 2025 |
| Cerebras spare cores and repair maps | every instance different; the compiler targets this chip | self-description as the yield mechanism | verify |
| Mill; Cell SPEs; Itanium | first-principles core design (Godard talks); exposed scratchpads; VLIW | the firehose idea; programmers revolted; the VLIW lesson | single-cause histories to verify (C34) |
| RSFQ/AQFP; photonic meshes; memristor crossbars; p-bits and thermodynamic computing | future substrates | the first bucket | cooling, calibration, maturity |
| FP8, FP4, MX formats, posits, stochastic rounding | reduced and alternative numerics | "not bits" is already here informally | |

## Real time

| System | Mechanism | Evidence for | Wall |
|---|---|---|---|
| static WCET analysis (aiT-class tools) | abstract interpretation over a precise processor timing model | proved deadline evidence needs a guaranteed timing self-description ([Deadlines](../design/deadlines.md)) | models exist only for simple, documented cores |
| response-time analysis; mixed-criticality scheduling (Vestal) | schedulability from per-task bounds; several assurance levels on one processor | schedulability as a placement property; regions with different evidence kinds | interference bounds on shared hardware |
| time-triggered architecture (Kopetz) | a global static schedule as the correctness argument | static regions make deadlines proofs | inflexible; the schedule is the architecture |
| PREEMPT_RT, Xenomai | bounded-latency kernels measured, not proved | measured and guarded deadline evidence | tails under contention |
| DO-178C; assurance cases | evidence management for certification | evidence graphs already exist in the obligation-and-evidence corner ([Realization](../design/realization.md)) | evidence management is not automatic assurance |

## Claim-store prior art

Each holds one claim kind under one key; the proposed contribution is one key, one evidence model, and one gossip layer across them ([Store](../design/store.md)).

| System | Key | Claim kind |
|---|---|---|
| Nix and Bazel caches; ccache | input hash | reproducible derivation |
| PyPI wheels; Android cloud profiles | platform | artifact; empirical |
| Unison | AST hash | definition identity |
| mathlib; Metamath | statement | certificate |
| uops.info; Sail | instruction | empirical contract; formal contract |
| Ghidra FunctionID; IDA FLIRT; BinDiff | signature | binary identification (evidence, not equivalence) |
| Software Heritage | content hash | all public source |
| Trustix | build output | k-of-n cross-checked reproduction |
| TASO; Souper; Alive2 | rewrite | verified rewrites, not shared |
| reproducible-builds projects (Debian and others) | source + toolchain | reproduction (lifting by reproduction, pointed the other way) |
| Guix full-source bootstrap; stage0, Mes | a seed of a few hundred bytes + successive compilers | a reproduction chain from an auditable seed ([Bootstrap](../design/bootstrap.md)) |
| Wheeler, diverse double compilation | compiler | k-of-n reproduction against trusting trust; certifies binary↔source only (C70) |
| in-toto; Sigstore | artifact | signed provenance attestations: assertion-kind claims with identity |
| RetroWrite and binary rewriters | binary | rewriting without source, a lift with commitments intact ([Onboarding](../design/onboarding.md)) |
