---
title: "References"
status: survey
updated: 2026-11-03
---

# References

References grouped by topic, with the question each bears on here and what to check before relying on it. A lead inventory: author, venue, and year are unverified unless the lead appears in the primary-source list below. The machine-readable leads with IDs and the question each raises are in [catalog.json](catalog.json).

## Primary sources checked

Each supports a specific result, not the whole proposal. Use the [research template](../templates/research.md) for a deeper reading.

| Source | Bears on |
|---|---|
| [Censi, A Mathematical Theory of Co-Design](https://arxiv.org/abs/1512.08055) | functionality/implementation/resource relations, composition, Pareto fronts; which assumptions survive mixed software/physical design |
| [Hayden, Magill, Hicks, Foster, Saxe: dynamic software update correctness](https://www.cs.cmu.edu/~smagill/papers/dsu-submission.pdf) | application-specific evolution requirements vs type safety and reachability; what carries to physical transitions |
| [Flückiger et al., speculation and deoptimization](https://arxiv.org/abs/1711.03050) | explicit assumptions and continuation/state translation; the smallest reusable transition relation |
| [V8 Wasm speculative optimizations](https://v8.dev/blog/wasm-speculative-optimizations) | feedback, guarded inlining, deopt after effects; what metadata is necessary where |
| [Bailis, when does consistency require coordination](https://www.bailis.org/blog/when-does-consistency-require-coordination/) | invariant confluence; how an envelope exposes that contract |
| [CALM](https://arxiv.org/abs/1901.01930); [bounded process-network scheduling (Ptolemy)](https://ptolemy.berkeley.edu/publications/papers/99/HMAD/html/pn.html) | separating consistency from progress and finite resources |
| [Timely dataflow progress tracking](https://timelydataflow.github.io/timely-dataflow/chapter_5/chapter_5_2.html) | retained emission capabilities and path summaries; which parts can be specialized or accelerated |
| [Clarkson & Schneider, Hyperproperties](https://www.cs.cornell.edu/fbs/publications/Hyperproperties.pdf) | properties beyond single traces; which proposed contracts need this |
| [Zanzibar](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/) | causal consistency of authorization and content; freshness dependencies as reusable evidence |
| [Hong & Kung, red–blue pebble game](https://perso.ens-lyon.fr/loris.marchal/docs-data-aware/hong_kung_red_blue_pebble_game_STOC81.pdf) | I/O lower bounds with explicit computational assumptions |
| [Functional compression](https://arxiv.org/abs/2209.00283) | preserving answers with receiver side information; consumer requirements driving boundary representation |
| [Bennett on Landauer](https://arxiv.org/abs/physics/0210005) | physical erasure vs compiler metaphor |
| [Asynchronous-circuit verification, Cambridge TR-587](https://www.cl.cam.ac.uk/techreports/UCAM-CL-TR-587.pdf) | actual timing assumptions and verification models |
| [Bansal & Aiken, binary translation by superoptimization](https://theory.stanford.edu/~sbansal/pubs/osdi08_html/index.html) | candidate search, fast tests, equivalence checking as separate steps |
| [Solar-Lezama, program synthesis course](https://people.csail.mit.edu/asolar/SynthesisCourse/Lecture1.htm) | specifications beyond complete programs; intent and candidate construction |
| [Abadi, Burrows, Lampson, Plotkin, A Calculus for Access Control](https://homepages.inf.ed.ac.uk/gdp/publications/Calculus_for_Access_Control.pdf); [Pfenning, proof-carrying authorization talk](https://www.cs.cmu.edu/~fp/talks/wits05-talk.pdf); [Miller et al., Capability Myths Demolished](http://erights.org/elib/capability/duals/myths.html) | the authorization logic, proof-carrying authorization, and why the access matrix misses transfer and revocation |
| [Budiu et al., DBSP, VLDB 2023](https://www.vldb.org/pvldb/vol16/p1601-budiu.pdf); [Kleppmann, turning the database inside out](https://martin.kleppmann.com/2015/11/05/database-inside-out-at-oredev.html) | incremental view maintenance; durability, authority, and synchronization separated |
| [OpenFGA modeling language](https://openfga.dev/docs/configuration-language); [SpiceDB schema and caveats](https://authzed.com/docs/spicedb/concepts/schema); [XACML 3.0](https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html); [Cedar decision semantics](https://docs.cedarpolicy.com/); [Biscuit](https://www.biscuitsec.org/); [Landlock](https://docs.kernel.org/userspace-api/landlock.html); [PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) | the composition algebra, residual results, and the enforcement points an integration must map across |

## Physics and architecture limits

| Lead | Question here | Check |
|---|---|---|
| Horowitz, "Computing's Energy Problem", ISSCC 2014; Horowitz et al., "The Future of Wires", Proc. IEEE 2001 | the energy table; wires not scaling | process and date context before comparing modern systems |
| Hameed et al., "Understanding Sources of Inefficiency in General-Purpose Chips", ISCA 2010 | the ~500× gap; instruction overhead dominates | process and workload context |
| Landauer 1961; Bennett (physics/0210005); reversible and adiabatic computing | scope of the erasure bound; finite-time costs | no direct price per compiler deletion |
| Hong & Kung 1981; Ballard, Demmel, Holtz, Schwartz | communication lower bounds for specified computational models | |
| Rent's rule (Landman & Russo 1971); Little's law; Dennard scaling; Esmaeilzadeh et al., "Dark Silicon", ISCA 2011 | geometry, concurrency, power, resource constraints | these have different status: empirical, identity, scaling model |
| Chaney & Molnar 1973; Lamport, "Buridan's Principle"; Fischer, Lynch, Paterson 1985 | distinct limits with distinct models | do not merge physical arbitration, consensus, and nonmonotonicity into one theorem |
| Razor (Ernst et al., MICRO 2003); Flikker (Liu et al., ASPLOS 2011); Daly 2006 | timing speculation with recovery; partial refresh; optimal checkpoint interval | applicability of one interval formula |
| Hochschild et al., "Cores that don't count", HotOS 2021; Dixit et al., "Silent Data Corruptions at Scale", 2021 | the exactness treaty is already broken | rates, populations, detection methods |
| quantum threshold theorem; Azure Quantum Resource Estimator | budget-driven compilation in practice | technology-specific assumptions |
| Shannon 1937; von Neumann 1956 | restoration and composition of unreliable components | |

## Cores, memory, interconnect, substrates

| Lead | Question here | Check |
|---|---|---|
| OoO execution, renaming, µop caches, x86 TSO; Transmeta Crusoe; NVIDIA Denver | distinguish instruction semantics, scheduling, speculation, microcode | |
| VLIW, Itanium; Cell SPEs | static vs dynamic scheduling tradeoffs | reject one-cause histories |
| Dennis 1974; Arvind tagged-token; Papadopoulos & Culler, Monsoon, ISCA 1990; Swanson et al., WaveScalar, MICRO 2003; Burger et al., EDGE, IEEE Computer 2004; Gebhart et al., TRIPS evaluation, ASPLOS 2009; Smith, decoupled access/execute, ISCA 1982; Ham et al., DeSC, MICRO 2015; Plasticine (ISCA 2017), Spatial (PLDI 2018), SambaNova; Groq TSP (ISCA 2020); the Mill (Godard) | dataflow and spatial execution; the irregular-control candidates and their history ([E9](../experiments/irregular-cell.md)); the firehose talk | Mill identification unresolved; EDGE's weakness on small blocks |
| Dlugosch et al., Micron Automata Processor, TPDS 2014; Lee et al., HBM-PIM, ISCA 2021; UPMEM | processing in memory; the memory-first alternative | programming model beyond automata |
| Martin, MiniMIPS 1997; Fulcrum (Intel 2011); Furber et al., SpiNNaker, Proc. IEEE 2014; Davies et al., Loihi, IEEE Micro 2018; Achronix's return to synchronous design; Yale ACT; Tiempo | asynchronous-first and event-driven machines; the tooling and test walls | dual-rail area ~2×, clock-tree power 20–40% of dynamic, both to verify |
| Kinniment, synchronizer and metastability models; Yun & Donohue, pausible clocks, 1996; Mullins & Moore 2007; dual-clock FIFOs with budgeted MTBF | mixed-timing interfaces and their failure probability ([Deadlines](../design/deadlines.md), Q28) | industrial uptake of pausible clocks |
| Kopetz, time-triggered architecture, Proc. IEEE 2003; TTEthernet; Vestal, RTSS 2007 | time as the fabric; partition vs budgeted sharing for mixed criticality | |
| Lee & Messerschmitt, synchronous dataflow, 1987; Waldo et al., A Note on Distributed Computing, 1994 | the region graph's lineage; the warning against transparent distribution | |
| SKY130, GF180, IHP SG13G2 open process kits; OpenROAD; OpenRAM; FABulous eFPGA; Europractice and MUSE multi-project wafers; the 2025 shuttle landscape | the characterization die's route to fabrication ([Fabrication](../hardware/fabrication.md)) | current offerings, SRAM macro availability, costs |
| UCIe energy per bit; Cerebras spare cores; on-die regulator efficiency; scan and self-test area; voltage domains per die | the die-as-cell alternative and the hardware-engineer objections | every figure to verify |
| Pulte et al., "Simplifying ARM Concurrency", POPL 2018; Apple TSO mode; Intel TSX; CHERI, Morello; Spectre (Kocher et al. 2018) | hardware accommodating software treaties; capability hardware; observer mismatch | why specific deployments succeed or fail |
| Martin (Caltech) CHP→QDI; Sutherland, "Micropipelines", CACM 1989; Fulcrum; Achronix; GALS; Cambridge TR-587 | asynchronous and mixed timing | state timing and isochronic assumptions explicitly |
| Jouppi et al., "TPU v4", ISCA 2023; NVL72/NVLink; TPU ICI; Tenstorrent; UCIe; Bunch of Wires; HBM, LPDDR, TSVs, SRAM chiplets, monolithic 3D; HBM-PIM; UPMEM; Cerebras | topology as a variable; packaging; processing in memory; wafer scale | numeric specs unverified |
| Chisel/FIRRTL; Rocket Chip; Berkeley agile hardware; Columbia ESP; OpenPiton; Ara; CHERI-RISC-V | generators as a method; build-path parts | not foundations |
| uops.info (Abel & Reineke); litmus tooling (herd, diy) | empirical hardware characterization | |
| RSFQ, AQFP; Lightmatter photonics; memristor crossbars; p-bits (Camsari et al.); thermodynamic sampling; stochastic computing; spiking codes; FP8, FP4, MX, posits, stochastic rounding | alternative substrates and encodings | cooling and conversion cost; calibration; no unsupported brain-efficiency comparisons |

## Tiles and the tile lineage

Irigoin & Triolet, "Supernode Partitioning", POPL 1988 · BLAS-3 (1988); GotoBLAS · Sequoia (Fatahalian et al., SC 2006) · CUTLASS (2017); CuTe · Triton (Tillet et al., 2019) · FlashAttention (Dao et al., 2022; verify variants before using numbers) · TileIR/cuTile; Pallas; CuTeDSL. Question: why the model lagged the knowledge; distinguish tiles' useful scope from universality.

## Compilers, IRs, search

| Lead | Question here | Check |
|---|---|---|
| Feautrier 1991; Bondhugula et al., Pluto, PLDI 2008; Tiramisu; Tensor Comprehensions; MLIR affine | dependence reasoning and affine schedules; legality separated from search and cost | boundaries at irregular shapes |
| Willsey et al., egg, POPL 2021; Cranelift ægraphs; egglog (Zhang et al., PLDI 2023) | alternatives and conditional equalities; saturation budgets, extraction, effects, invalidation | |
| Lattner et al., MLIR, CGO 2021; Mojo; Halide (PLDI 2013); Exo (PLDI 2022); TACO (OOPSLA 2017) | dialects, staged compilation, lowering composition; algorithm/schedule/layout separation | missing shared semantic obligations |
| Denali (PLDI 2002); STOKE (ASPLOS 2013); Souper | superoptimization in bounded domains | original scale claims |
| Alpa (OSDI 2022); Megatron | joint sharding and placement under cost models | |
| Futamura projections; Jones, Gomard, Sestoft; Amin & Rompf, "Collapsing Towers", POPL 2018; Truffle/Graal (Würthinger et al.); PyPy | interpretation, specialization, compiler construction; exposable controls | cost and semantic assumptions |
| Terra (DeVito et al., PLDI 2013); LMS (Rompf & Odersky, GPCE 2010); MetaOCaml; Julia `AbstractInterpreter`; GPUCompiler.jl | compilation as programmable operations; staging; alternative targets | |
| Flückiger et al., POPL 2018; V8 Wasm blog | partial state translation; feedback on typed inputs | |
| Harper, Honsell, Plotkin, A Framework for Defining Logics, 1993; Twelf; Dedukti (Assaf et al.) | the logical-framework kernel and theories with bridges ([Language](../design/language.md)) | checking cost; encoding effects and approximation |
| RetroWrite and related binary rewriters | rewriting without source ([Onboarding](../design/onboarding.md)) | |
| Dynamo (Bala, Duesterwald, Banerjia, PLDI 2000); Bansal & Aiken, OSDI 2008; Alive2; CompCert; Retypd (Noonan, Loginov, Cok, PLDI 2016); Sail; Arm machine-readable spec; LangSec (Sassaman, Patterson, Bratus) | re-optimization of binaries; translation validation vs verified compilation; type recovery; ISA semantics; formats as languages | performance and causal claims |
| JAX (jaxpr, `grad`, `vmap`, `shard_map`, `jit`), XLA, Pallas; CUDA | transformations, shapes, effects, placement, author control over kernels | |
| Sisal; SaC; Futhark (PLDI 2017); Soufflé; Ngo, Porat, Ré, Rudra, PODS 2012; Neumann, HyPer, VLDB 2011 | declarative compilation vs tuned implementations under named workloads | |

## Engines and estimators

V8 (Ignition, Sparkplug, Maglev, TurboFan/Turboshaft, Liftoff); JavaScriptCore (LLInt, Baseline, DFG, FTL/B3); SpiderMonkey (Warp): tier names as of 2026, verify · inline caches (Deutsch & Schiffman, POPL 1984; Hölzle, Chambers, Ungar 1991) · Android cloud profiles; AutoFDO (Chen et al., CGO 2016); BOLT (Panchenko et al., CGO 2019): reuse across installations; applicability and privacy are separate questions · TAGE (Seznec); perceptron predictors (Jiménez & Lin) · Bao (Marcus et al., SIGMOD 2021); System R (Selinger et al., 1979) · value of information; active learning; off-policy evaluation · Borg Autopilot (Rzadca et al., EuroSys 2020) · J. L. Hellerstein, Diao, Parekh, Tilbury, *Feedback Control of Computing Systems*, 2004 (not J. M. Hellerstein of CALM).

## Incremental and derived computation

rustc query system; Salsa; Adapton (Hammer et al., PLDI 2014); Nix (Dolstra) · Timely and Differential Dataflow (McSherry et al.); Naiad (Murray et al., SOSP 2013) · DBSP (Budiu et al., VLDB 2023); Feldera; Materialize (verify supported operator scope and costs) · TC39 Signals; ThingLab (Borning 1979); Convex; Zero (Rocicorp); bruh (Daniel's signal library, https://github.com/Technical-Source/bruh); Sanity visual editing · Kleppmann, "Turning the database inside-out", 2015 · GumTree (Falleri et al., ASE 2014).

## Distributed systems and consistency

Lamport clocks; Jepsen consistency models · Pijul (patch theory); MVCC/MVOCC; WAL (deterministic resolution is not automatic commutativity) · CRDTs (Shapiro et al. 2011); Paxos; Raft · Hellerstein & Alvaro, "Keeping CALM", CACM 2020; Ameloot et al.; Bloom, Hydro, LVars · Kahn 1974; Parks 1995; Geilen & Basten; Ptolemy process networks · Bailis et al., "Coordination Avoidance in Database Systems", VLDB 2015; O'Neil, "The Escrow Transactional Method", TODS 1986 · Galois (Pingali et al., PLDI 2011) · Zanzibar (Pang et al., USENIX ATC 2019).

## Transitions, evolution, dependencies

Clark et al., "Live Migration of Virtual Machines", NSDI 2005; gh-ost; pt-online-schema-change; RCU (McKenney); epochs; hazard pointers; Baker's incremental copying GC (1978) · Erlang/OTP `code_change/3`; Kitsune; Jvolve; Hayden, Magill, Hicks, Foster, Saxe · Kubernetes rolling deployment; DNS cutover; expand/contract; Avro; Protocol Buffers · Di Cosmo et al. (EDOS); Russ Cox, "Version SAT" (not every restricted resolver is equally hard) · Elm's mechanical semver; cargo-semver-checks; crater · Unison; Hazel; JetBrains MPS; Enso; React Fast Refresh (examine identity assumptions rather than copying positional rules).

## Languages, types, effects

Bracha, "Pluggable Type Systems", 2004; Chang, Knauth, Greenman, "Type Systems as Macros", POPL 2017; TypeScript; gradual typing (distinguish TypeScript behavior from formal gradual-typing guarantees) · Lean 4 (de Moura & Ullrich); F*; Idris 2 (QTT); Koka (Leijen; Perceus); Effekt (Brachthäuser et al.); Granule (Orchard et al.); Liquid Haskell; Zig comptime; Mike Acton, "Data-Oriented Design and C++", CppCon 2014 · de Bruijn criterion; LCF (Milner 1972); Proof-Carrying Code (Necula, POPL 1997) · Reynolds 1983; Mitchell, "Representation Independence and Data Abstraction", POPL 1986; Goguen & Meseguer 1982; Clarkson & Schneider 2010 · Plotkin & Power; Plotkin & Pretnar; Dolan, Sivaramakrishnan, Madhavapeddy, "Bounding Data Races in Space and Time", PLDI 2018; OCaml 5 effects (PLDI 2021); Eio; OxCaml modes and unboxed layouts · Rust ownership and LLVM `noalias`; RefCell; Legion/Regent (Bauer, Treichler, Slaughter, Aiken); Legate; Chapel locales; PGAS · Bluespec (Hoe & Arvind); Aetherling (PLDI 2020); Filament (PLDI 2023); Dahlia (PLDI 2020); Calyx (ASPLOS 2021) · lenses and view-update (Foster, Pierce et al.); session types (Honda); typestate · Parnas 1972; Dijkstra 1968; Haskell IO; SPARK/Ada (named in the article; not selected languages).

## Data structures, approximation, probability

Kraska et al., "The Case for Learned Index Structures", SIGMOD 2018; Sleator & Tarjan 1985 (dynamic optimality open) · SETL (Schwartz 1975); Rice, "The Algorithm Selection Problem", 1976; RelC (Hawkins, Aiken, Fisher, Rinard, Sagiv, PLDI 2011; bibliographic details to check); Cozy (Loncaric, Torlak, Ernst); Idreos et al., Data Calculator, SIGMOD 2018; database cracking; Chameleon (Shacham, Vechev, Yahav, PLDI 2009) · Mitzenmacher & Vassilvitskii, "Algorithms with Predictions", 2020; Introsort (Musser 1997); hash flooding (Crosby & Wallach 2003); SipHash; Bloom filters; learned Bloom filters with backup; universal hashing; skip lists · RaML (Hoffmann et al.); Ngo, Carbonneaux, Hoffmann, PLDI 2018 · Gen (Cusumano-Towner et al., PLDI 2019); Hakaru; Monniaux · EnerJ (Sampson et al., PLDI 2011); Rely (Carbin, Misailovic, Rinard, OOPSLA 2013); Avizienis, N-version programming; TMR.

## Channels and codecs

Joint source–channel coding; constrained stochastic control; POMDPs · rate–distortion; Shannon separation and finite-blocklength caveats (no theorem about compiler phase ordering follows) · Slepian–Wolf; Wyner–Ziv (establish knowledge placement before applying to updates) · functional compression; conditional graph entropy (Orlitsky–Roche; arXiv 2209.00283) · ANS (framing and resets are design variables) · ADC/DAC: sampling, aliasing, quantization, jitter, clipping · ECC, FEC, LDPC, NAND read-retry · checksums, framing, retransmission, multiplexing (separate authenticity from accidental-error detection).

## Authorization

Abadi, Burrows, Lampson, Plotkin, "A Calculus for Access Control in Distributed Systems", 1993; Lampson's access-control matrix; Appel & Felten, proof-carrying authorization; Pfenning's talk; Miller et al., "Capability Myths Demolished" · Zanzibar and zookies; OpenFGA (userset rewrites; SDKs); SpiceDB (schema, caveats); XACML 3.0 · PostgreSQL row-level security; sepgsql · Melange (verify condition support and maintenance) · Landlock and its Rust crate · Cedar · Casbin · Biscuit.

## Operating systems

Hydra; Mach; Exokernel (Engler, Kaashoek, O'Toole, SOSP 1995); MirageOS (Madhavapeddy et al., ASPLOS 2013); Barrelfish (Baumann et al., SOSP 2009) and the System Knowledge Base (Schüpbach et al.); Singularity (Hunt & Larus); Theseus (Boos et al., OSDI 2020); Cloudflare Workers; Deno Deploy; io_uring; libdispatch; NixOS; Fuchsia.

## Design, systems engineering, scope

Censi 2015; Solar-Lezama's synthesis course · SysML/MBSE; interface control documents; DOORS traceability; digital twins; ISA-95/MES (blanket claims that models are mere documentation need evidence) · Goal Structuring Notation (Kelly); DO-178C (evidence management is not automatic assurance) · Conway's law (the authority reading is a research lead, not a theorem) · Arrow's theorem (preserve its assumptions) · Goodhart's law · real options; lifecycle economics; standardization.

## Bootstrap, trust, real time

Thompson, "Reflections on Trusting Trust", 1984; Wheeler, "Fully Countering Trusting Trust through Diverse Double-Compiling", 2009; Guix full-source bootstrap, stage0, Mes (verify current seed size and chain); in-toto; Sigstore · aiT WCET analysis (AbsInt); Wilhelm et al., "The Worst-Case Execution-Time Problem", TECS 2008; Vestal, mixed-criticality scheduling, RTSS 2007; Kopetz, time-triggered architecture; PREEMPT_RT; DO-178C. Question: which deadline evidence kinds a self-described target can support; whether trust composes as an error budget (Q54, Q57).

## Daniel's own

"Towards a More Useful Model of Distributed System State", distilled with a link to the full text in [Article](../intent/article.md); the glitch example draws on a [dev.to article on derivations and glitches](https://dev.to/this-is-learning/derivations-in-reactivity-4fo1) · bruh (signal library) · the codec and authorization formulations, answered in [Codecs](../design/codecs.md) and [Justification](../design/justification.md).
