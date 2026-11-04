---
title: "Daniel's article, distilled"
status: user-intent
updated: 2026-11-03
---

# Daniel's article, distilled: "Towards a More Useful Model of Distributed System State"

Programs are state machines with pure functions inside; everything is derived state; consistency takes center stage with strict serializability as the core and weaker models as tracked, opt-in speculation; the database should dissolve into a distributed commit DAG with incremental derivations and consistency envelopes. Full text: the original [gist](https://gist.githubusercontent.com/wlib/1a8ed2af0a5a00241697182e4a83b101/raw/4bda3c8680a3e25523c7ffe4e4daae00cf593f22/Towards%2520a%2520More%2520Useful%2520Model%2520of%2520Distributed%2520System%2520State.md). The article is a proposal, not a description of every DBMS.

## The position

| Topic | Daniel's statement |
|---|---|
| Program model | State machines with pure functions inside, composing hierarchically or as actor networks (Erlang/OTP is one instance). Abstraction works by using the least powerful construct that solves the problem. |
| Effects | An effect is a state-machine transition relative to a viewpoint; a machine that resets before yielding is pure from outside. Resource use is an implicit effect however effects are tracked. |
| Glitches | A, B = 2A, C = A + 1, D = B + C: if D reads the new B with the old C it transiently reads 6 instead of 7. Fix: topologically ordered update waves, or logical time on every value so a derivation waits for a common frontier or deliberately mixes and converges. |
| Consistency | Strict serializability is the only acceptable level for non-commutative transactions; every weaker model is opt-in and explicitly speculative. Databases use weaker models only to improve performance, at the cost of inexplicable edge-case bugs that most business use tolerates because users reload and resubmit. Eventual consistency belongs on top of a strict core as a latency optimization, the gradual-typing move. The conclusion came from two talks on consistency ([one](https://www.youtube.com/watch?v=5ZjhNTM8XU8), [two](https://www.youtube.com/watch?v=dS9jtih4dI4&t=1881s)). |
| Edits bubble up | Each layer (browser, app server, database) bets on which changes will be accepted and may act optimistically: submit instantly with a "saving" indicator; let the search index carry the new entry tied to an in-flight proposal; finalize or drop on confirmation. CMS visual editing: components declare scoped control and conditional delegation predicates ("heading is opaque unless empty") so edits re-render only the minimal region. |
| It is all derived state | Every service stores data in one place and derives representations elsewhere, inside a DBMS (WAL → tables → indices → views) and across machines. Signals, Convex, Zero, Materialize, Feldera rediscover ThingLab-era ideas and will stay scoped without a deeper unified model. Databases should turn inside out, separating **durability, authority, and synchronization**. |
| Critique of the DBMS | Linear WAL with concurrency control hacked on: row snapshots marked with logical time to isolate transactions, append-only until vacuumed, periodic materialization letting the log drop old entries; history treated as garbage (no checkout, revert, branch, merge); data structures owned by the DBMS with plugin-only extension; conflict handling limited to detecting overwrites. |
| Commit DAG | Pijul-inspired: commits are sets of operations with commutativity predicates; parents form an ordered antichain, a frontier; replay to any frontier, resolve conflicts deterministically by frontier order, surface them. Branching serves concurrent transactions (a more powerful MVOCC) and VCS-style development alike. The DAG is distributed; speculative stacks are implicit branches. |
| Skip-list snapshots | Store a compacted operation when it is at most about half the size of what it summarizes; repeat for log-time materialization at any frontier; per-object indexes; true deletion by compacting deletion operations. |
| Queries | Operations have conflict predicates, queries have invalidation predicates; derivations via differential dataflow, DBSP, or custom functions with tracked subscriptions; every derivation tracks its frontier. |
| Consistency envelopes | Fragments of the cross-machine derivation graph that update out of step internally but expose consistency at their boundaries. |
| Authority | CRDT operations need no authority; operations with predicates imply a central authority, so consensus makes replicas one logical machine per object; shard along lines of rare interaction; partitioned ID ranges for uniqueness. |
| Wants | Feldera-class incrementality first-class in the database with logical time exposed; edits bubbling up from arbitrary derivations; queries as arbitrary code with constraint libraries rather than SQL plus a separate planner; envelopes in signal libraries (bruh); trivial schema migration with cheap branching on live data; transactions encoding arbitrary precision like gradual types. |

## How the notebook treats it

The article is Daniel's position and is read as such. Where the design strengthened, scoped, or extended it (invariant confluence over commutativity, what the DAG does and does not give, kinds of frontier, envelope fields, why Erlang hot-updates for free, view-update and lenses, the same model for compilation, history as a retention decision, the authorizer as the same architecture), the treatment lives in the design notes and is indexed in [Positions](../record/positions.md) under "Where the article's positions are treated".
