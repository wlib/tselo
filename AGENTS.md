# Working in Tselo

This directory is a research and design notebook. Daniel wants a universal, extensible realization stack spanning software, hardware, physical design, production, operation, and evolution. Do not quietly reduce it to a conventional language, ISA, database, or hardware tile.

## Begin with context

Read `README.md`, `intent/user-intent.md`, `intent/status.md`, `design/spine.md`, and `record/positions.md`. Follow links as needed. Positions stated in `intent/user-intent.md` are premises, not assumptions to be rediscovered.

## Preserve meaning and status

- Separate Daniel's stated intent, the design's working positions, proposals, literature results, empirical observations, and unresolved questions. Only `status: user-intent` notes carry authority.
- No implementation language, fixed ISA, universal physical store, mandatory packet format, universal solver, or process node has been selected. The latest synthesis is not an approved architecture.
- Keep guaranteed, believed, and permitted distinct. Keep replacing an implementation under one contract distinct from changing the contract. Similar machinery does not make the underlying mathematics identical.
- A prototype tests the broad architecture; it is not permission to narrow the scope.
- Be maximal about scope and strict about status. Never shrink a claim to make its evidence status read as honest; state the full claim, mark it untested, and name the test (C61). Caution belongs in the status column, not in the claim. Performance is measured against the ideal realization of the intent, not against the program someone could afford to write in C.
- The system's own metadata, control machinery, and runtime remain subject to specialization and elimination.

## Maintain the notebook

- Each fact has one home note. Add to the home; link from elsewhere. Do not re-explain a neighbor's content or restate the README's caveats inside notes.
- Design notes carry no attribution and no history of how they were written. Rejected or qualified positions go in `record/positions.md` with a C-number; prior art goes in `evidence/systems.md` or `evidence/references.md`; nothing in the vault names a conversation, a session, or an assistant.
- Prefer tables, schemas, and concrete examples to abstract prose. Use `templates/` for new notes. Write in third person: *Daniel*, *the design*, *the mapper*. Record conclusions and failures without turning analogy into theorem.
- When researching, check primary sources for the exact claim, assumptions, version, and evidence. `evidence/references.md` is a lead inventory, not a verified bibliography. When a claim fails an experiment, add it to `record/positions.md` with the reason.
- Update `record/open-questions.md` and `intent/status.md` when conclusions change. Do not invent approval requirements for ordinary reversible edits.

Run `npm run check` after structural or link changes.
