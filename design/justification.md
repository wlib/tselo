---
title: "Justification: guaranteed, believed, permitted"
status: position
updated: 2026-11-03
---

# Justification: guaranteed, believed, permitted

A proof, a prediction, and a permission are different kinds of justification. They share storage, dependency tracking, provenance, and extension mechanisms; they keep distinct meanings. The type checker is one checker among many; probability enters in three roles; authorization is `policy + evidence ⊢ request`; reliability is a contract as specific as any other.

| Object | Example | Justifies |
|---|---|---|
| semantic contract | membership queries return the exact answer | which behaviors are acceptable |
| established fact | this representation is sorted while generation *g* is valid | a transformation within that scope |
| predictive model | most queries are negative | choosing among *legal* implementations |
| authority or policy | this component may use 64 MiB and run background work | which actions are permitted |
| explicit relaxation | this result may carry a stated error | an expanded set of acceptable behaviors |

A wrong prediction makes an implementation *unattractive*; a wrong correctness assumption makes it *incorrect* ([E1](../experiments/adaptive-collection.md)). Every claim carries assumptions, scope, provenance, evidence kind, checking cost, validity conditions, and invalidation dependencies.

## Guaranteed: the de Bruijn criterion

Unbounded, untrusted search produces a certificate; a small, bounded, trusted kernel checks it. This resolves Daniel's "who cares if the type checker terminates": the *search* need not terminate, the *check* must (C02). The decidability obsession comes from types-as-proofs, where soundness needs termination; here types are checks run at compile time and the kernel keeps that sound. Nontermination of search is not unsoundness; a timeout is an outcome, not evidence a claim is false; a million passing tests are not a proof; fuel and quotas manage cost without settling semantics; "small checker" is an aim, not a theorem that every property has a cheap certificate.

Checkers have the interface in [Schemas](schemas.md). Downstream guarantees retain the dependency on whichever output they used, so one can always ask what rests on a proof, a runtime check, a device contract, or an unchecked assertion; authors may trust an assertion explicitly and the dependency stays visible; tests cannot silently license semantics-changing rewrites; check-each-output (translation validation) rather than prove-the-pass is the default for user-supplied lowerings. Checking throughput is the scarce resource once agents generate in volume, so a certificate is sized so that checking it costs time proportional to the artifact rather than to the search that produced it ([Trust](trust.md), Q60). The judgment format and kernel are proposed in [Language](language.md). Open: extension isolation and cancellation, compositional assumptions, evolution of the trusted base, reconciling incompatible analysis vocabularies (Q09).

## Believed: models with validity domains

A model predicts behavior conditional on its circumstances and says where it lacks evidence; several per resource, not a ladder; one confidence number discards too much; observations record their collection policy; measurements never silently become guarantees. The requirements are stated once under self-description in [Participation](participation.md); their use is in [Models](models.md).

## Permitted: policy + evidence ⊢ request

ACLs, roles, capabilities, and their combinations are all `trusted policy + validated evidence ⊢ this request is permitted`, differing in what counts as evidence (identity plus ACL; identity plus role plus role policy; an authentic capability; combinations). The authorization-logic calculus (principals make statements; some are trusted for particular decisions; authority delegates) is the formal language; proof-carrying authorization is the de Bruijn criterion applied to permission. *Acquiring* authority (policy explains why it could be issued) is split from *exercising* it (a capability makes it explicit and portable): Alice authenticates and an ACL establishes that she may read; the service issues her a read capability; she hands a restricted copy, "read until noon", to a worker; the worker presents it; whether a later policy change invalidates the copy depends on the expiration and revocation rules the capability carries. The access-control matrix (ACLs as columns, capability lists as rows) unifies a snapshot but misses transfer, attenuation, revocation, and per-invocation selection; object capabilities bind reference to authority.

**Composition.** A policy describes a set of requests (subject, action, resource, context including presented capabilities); sets are enumerations, attribute predicates, graph relationships (`∃t. member(u,t) ∧ owns(t,d)`), capability validations, or context predicates, composed with ∪, ∩, ∖, with recursion for nesting and inheritance: an AND/OR graph with conditions and exclusions. Evaluation returns **yes / no / a remaining Boolean expression** (`mfa ∧ before_expiry`), preserving *which* condition remains. What "no" means (no grant, forbid, not applicable, evaluator error, missing information) is a combining-rule choice, and the same question recurs across the design: whether a failed guard falls back or aborts, whether a missing invariant is a glitch or a violation, whether a checker's `unknown` is a rejection or a residual; permissive-OR with restrictive-AND and "layers only narrow" are two existing disciplines, and XACML's four-valued results with explicit combining algorithms are a related but not identical structure ([Systems](../evidence/systems.md)).

**In Tselo** an authorization result is evidence with dependencies and a validity condition: cacheable; specializable (a region exclusively assigned to a principal with paths fixed at configuration needs no per-operation checks, since topology enforces the restriction); invalidated under a defined protocol. The system knows whether authority was checked at admission, holds for a lease, or must be current at each effect; specializing checks away requires a policy-change transition ([Change](change.md)). A conditional result is a residual obligation like a cast or a JIT guard ([Change](change.md)); a denial policy and a fallback path differ in semantics. Across an operating system, a database, and application libraries the remaining work is mapping subjects, resources, and decisions consistently across enforcement points; the systems that exist each cover one point ([Systems](../evidence/systems.md), authorization). Permitted interactions are not inferable information ([Observers](observers.md)); attenuation is coordination-free but restriction requires revocation ([Irreducibles](irreducibles.md)); a freshness token is evidence for one particular guarantee. **Agents** fit here: an agent's output is a candidate certificate, a proposed model, or a proposed interpretation of intent, never itself a guarantee; checkers decide. Tested by [E8](../experiments/authorization-change.md).

## Three sources of probability

1. **Randomness the program's semantics require.** A sampler must preserve the requested distribution.
2. **Uncertainty about workload or machine behavior.** A predictor can be wrong while the program stays correct: the believed column.
3. **Physical noise and failures.** A noise model participates in a reliability argument.

Preserving one does not preserve the others; conflation lets a wrong workload model look like a correctness bug, a sampler be "optimized" into a different distribution, or physical noise masquerade as semantic randomness. The idea that a type is the probability-one case of a distribution and gradual typing becomes gradual inference is withdrawn as semantics (C01): a type is a set, a proof a derivation under assumptions, a posterior a belief inside a model; probability one is not necessity. What survives: the *decision* layer is decision-theoretic (choose among legal implementations by expected cost with worst-case bounds); programmable inference is a strategy installed per scope like a mapper or a handler; profiles, property-test samples, and author hints are observations, samples from the intent model, and priors with provenance. Programmable inference yes, probabilistic semantics no.

## Error budgets

Hardware exposes knobs with error curves nobody can program against. Reliability becomes a contract that flows through the program like an effect; hardware publishes its curves; the mapper solves "minimize energy subject to end-to-end error ≤ budget" per data path. A tensor tolerating 10⁻³ gets no ECC, low refresh, FP4, weak FEC; the pointer beside it propagates an exactness requirement to the voltage rail; graded or reliability-typed disciplines (EnerJ, Rely) compose a probability of correctness through the program, Rely by a union bound over sequenced operations. Numbers and time as intents with tolerances are in [Quantities](quantities.md).

| Knob | Trades |
|---|---|
| DRAM refresh interval | energy ↔ bit error rate (Flikker) |
| supply voltage; timing margin | energy or frequency ↔ error rate (Razor) |
| NAND cell levels; read-retry count | density ↔ error rate and latency |
| FEC strength per link | error rate ↔ latency and bandwidth |
| analog precision | energy ↔ effective bits (≈ log₂(1+SNR)) |
| redundancy (TMR, duplicate execution) | area and energy ↔ coverage |
| checkpoint interval | overhead ↔ expected wasted work (Daly's formula, under its failure model) |
| quantum code distance | physical qubits ↔ logical error (below threshold the logical error falls roughly as (p/p_th)^((d+1)/2) in the distance d); quantum compilers already take a budget and solve for the distance |

The error-contract shape is in [Schemas](schemas.md). Absolute error, relative error, bias, detected failure, undetected corruption, deadline violation, and task-level loss are different specifications and one scalar error rate does not compose (C30); redundant computations sharing a power rail or a systematic bias are not independent (N-version programming's dissimilar redundancy); "exact" is an explicit reliability requirement under a stated fault model, not zero failure probability (C31); a restoring boundary recovers the digital interpretation, not numerical information lost in an analog stage; compression, approximation, aggregation, GC, and rounding discard distinctions with different physical consequences; knobs interact and are not independently controllable per logical object. The exactness treaty is already broken in practice: fleet studies at Google and Meta found cores producing wrong arithmetic at rates on the order of one per thousand, and the mainstream stack has no types to express that; quantum error correction is the existence proof that budget-driven compilation works as a discipline. Natively probabilistic hardware is in [Timing and analog](../hardware/timing-and-analog.md).
