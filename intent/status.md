---
title: "Current status"
status: editorial
updated: 2026-11-03
---

# Current status

Tselo is a concept and research project with organized design notes. There is no prototype, chosen language, formal core, hardware, benchmark, or deployment.

## Clear (user intent)

- The entire realization stack and its ecosystem are in scope; the target and the decomposition are design variables.
- Representation and observation, evidence and authority, runtime adaptation, and continuity are the central concerns.
- Hardware mechanisms and the stack's own bookkeeping must be optional and specializable.
- For the hardware design, software is greenfield with zero shackles on the hardware; no ISA recognizable as an ISA is required; one chipset family spans SIM card to datacenter to spacecraft on a sliding scale from fully custom to commodity.
- One distributed store of claims unifies software and hardware, compilation and decompilation, and code sharing; no analysis or lowering is repeated once shared.
- Bootstrapping should fall out of how lowering and targets are modeled, not be a special process.
- Be maximal about scope and strict about status.

## Working positions (not decided)

| Position | Home |
|---|---|
| The participation protocol is the only fixed interface | [Participation](../design/participation.md) |
| Prove / guard / trust chosen per property per region | [Information economy](../design/information-economy.md) |
| Binding time = retention = options | [Commitment](../design/commitment.md) |
| Distinctions relative to observers, as a family of relations; observers inferred inside closed regions | [Observers](../design/observers.md) |
| Guaranteed, believed, permitted kept distinct over shared infrastructure | [Justification](../design/justification.md) |
| Implementation and transition as separate artifacts; replacement vs evolution vs boundary operation | [Change](../design/change.md) |
| Plural models, stratified controllers, collection-policy-tagged observations | [Models](../design/models.md) |
| Compilation and decompilation as one relation in two directions | [Onboarding](../design/onboarding.md) |
| A hardware-family generator rather than a universal tile; generator and mapper one tool | [Chipset family](../hardware/chipset-family.md) |

## Proposed (untested)

| Proposal | Tested by / home |
|---|---|
| What is frozen is an extension mechanism: record, judgment, base theory, bridge; a logical-framework kernel; five author inputs | [Language](../design/language.md), [E5](../experiments/connective-tissue.md) |
| Everything at runtime is a fact, a derivation, or a linear obligation; only commits are irretractable; the arbitration count is published | [Runtime](../design/runtime.md), [E2](../experiments/three-realizations.md) |
| Numbers and time are intents with tolerances | [Quantities](../design/quantities.md) |
| The seven-field transition protocol is load-bearing | [Transition contract](../experiments/transition-contract.md) |
| The situation object is the primary interchange object | [Realization](../design/realization.md) |
| A retention planner and lower-bound providers as participants | [Commitment](../design/commitment.md), [Information economy](../design/information-economy.md) |
| The connective-tissue library is the first build and its transfer is a bet | [Connective tissue](../experiments/connective-tissue.md) |
| The claim store is the concrete form of the store, with the certified relation edge as its primitive; packages are policies | [Claim store](../design/claim-store.md) |
| Bootstrapping is uncommitting pointed at the seed; the host is the first cell; every region keeps an admissible continuation | [Bootstrap](../design/bootstrap.md) |
| The assumption graph is the primary object of trust; checking is the scarce resource | [Trust](../design/trust.md) |
| A deadline is a contract with proved, measured, or guarded evidence | [Deadlines](../design/deadlines.md) |
| The portable artifact is the store; region graphs are per target class; the describer is the one fixed cell and the management sequencer a palette default | [Chipset family](../hardware/chipset-family.md) |
| The first die is a physics instrument; the irregular-control cell is decided in software | [Fabrication](../hardware/fabrication.md), [E9](../experiments/irregular-cell.md) |
| What dissolves and what inverts if every position is carried to its end | [Consequences](../design/consequences.md) |

## Candidates and non-selections

Candidates with what remains unresolved. Not a decision record; do not promote a row without an explicit choice and rationale.

| Candidate | Attraction | Unresolved |
|---|---|---|
| structured semantic and artifact store of hashed records | identity, shared views, reusable derivations | canonicalization, privacy, semantic vs editing identity |
| federated physical materializations | no central bottleneck, no embedded overhead | coherent interchange, explicit consistency contracts |
| incremental relational and equality infrastructure (Datalog, e-graphs, incremental view maintenance) | reuse dependencies and facts | fit for different logics, effects, continuous models, liveness |
| a logical-framework kernel over theories with bridges | theories as data; one checker for many vocabularies | whether two alien theories really share a checker (E5); certificate size (Q60) |
| plural controllers and solvers | match method to scale and problem | stability, interference, decision authority, cost |
| implementation plus transition objects | activation and evolution explicit | minimal common fields; domain-specific obligations |
| retention planner | price future adaptability | future demand, deletion, information vs capability |
| hardware-family generator | vary granularity and binding time | physical feasibility, toolchain, the irregular cell, the generator's cost model |
| alternatives to the generator main line: spatial everywhere, memory-first, asynchronous-first, time as the fabric, die as the cell, mapper in silicon | each cheapens something the main line pays for | each has a discriminating experiment in [Fabrication](../hardware/fabrication.md) |
| markets for claims | supply of certificates and reproductions for the long tail | mechanism design, independence vs collusion |
| accountable realization substrate | inspect intent, evidence, authority, continuity | what can be checked vs merely recorded |

**Not selected:** one universal solver, one physical database, compulsory global timestamping, a universal serializer, one packet format, one clock discipline, one ISA, one rich tile, RISC-V/CHERI as a conceptual foundation (acceptable as a build path), any implementation language, any process node, the sequencer cell.

## Next work

Write the target description vocabulary as a theory over the base and exercise it against three described targets; it is the first artifact that tests whether the extension mechanism is the treaty (Q53). Freeze the field lists as [schemas](../design/schemas.md). Bootstrap from a seed on a probed host; drive the running example ([Spine](../design/spine.md)) through the three realizations and the connective tissue together, so the case forces the services into existence; then the adaptive collection, and one cross-domain and one evolution experiment before choosing an implementation framework ([Roadmap](../experiments/roadmap.md)). Run [E9](../experiments/irregular-cell.md) before any silicon decision. Before imposing an MVP boundary, reread [User intent](user-intent.md). Before repeating a theorem analogy, reread [Positions](../record/positions.md).
