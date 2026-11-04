---
title: "Tselo"
status: editorial
updated: 2026-11-03
---

# Tselo

A research notebook for one extensible realization stack: a system that turns a partially specified situation and an intent into software, hardware, plans, actions, or physical systems, with the target, the production process, and future evolution all open to design. Daniel's canonical statement is [User intent](intent/user-intent.md); everything else is a working position, a proposal, or a survey.

No language, ISA, store, packet format, solver, process node, or chipset has been chosen.

## Start here

| Want | Read |
|---|---|
| What Daniel asked for | [User intent](intent/user-intent.md) |
| The argument in five steps, a running example, the design in one page | [Spine](design/spine.md) → [Schemas](design/schemas.md) |
| What an author writes, and what is frozen | [Language](design/language.md) |
| Where things stand | [Status](intent/status.md) · [Open questions](record/open-questions.md) |
| What was rejected or qualified | [Positions](record/positions.md) |
| What to build, in what order | [Roadmap](experiments/roadmap.md) |
| What follows if all of it is true | [Consequences](design/consequences.md) |
| A term | [Glossary](glossary.md) |

## Map

| Folder | Contents |
|---|---|
| [intent](intent/user-intent.md) | Daniel's positions (the only notes with authority), his article distilled, current status |
| [design](design/spine.md) | The design, one note per concern: participation, information economy, commitment, observers, codecs, justification, quantities, store, claim store, language, models, change, runtime, irreducibles, realization, onboarding, bootstrap, trust, deadlines, consequences; the schemas; the cross-domain correspondence table |
| [hardware](hardware/physics.md) | Physics, timing and analog, the chipset-family proposal, what must be fabricated |
| [evidence](evidence/systems.md) | Existing systems as evidence for or against design claims; reference leads and the machine-readable lead catalog |
| [experiments](experiments/roadmap.md) | Nine proposed experiments, evaluation criteria, build order |
| [record](record/positions.md) | Positions rejected, qualified, or unestablished; open questions |
| [templates](templates/concept.md) | Short forms for new notes: [concept](templates/concept.md), [decision](templates/decision.md), [experiment](templates/experiment.md), [research](templates/research.md) |

## Conventions

- **Each fact has one home.** A note states what it owns and links to the rest; it does not re-explain its neighbors. Inline relative links only.
- **Positions, evidence, and record are kept apart.** Design notes state positions without attribution. [Systems](evidence/systems.md) holds prior art. Rejected and qualified positions are in [Positions](record/positions.md), cited by C-number; open questions in [Open questions](record/open-questions.md), cited by Q-number.
- **Qualifications are stated once, here.** Survey figures and prior-art descriptions are from memory and must be verified against primary sources before use in a design calculation. Experiments are proposed and unrun. Guaranteed, believed, and permitted are different things; replacing an implementation under one contract differs from changing the contract; similar machinery does not make theories identical. Notes do not repeat these caveats.
- **Maximal about scope, strict about status.** State the full claim, mark it untested, name the test. Caution belongs in the status column, not in the claim.
- Frontmatter carries `title`, `status`, and `updated`; a one-sentence summary follows the title; tables over prose; third person; relative links.

| Status | Meaning |
|---|---|
| `user-intent` | Daniel's stated direction. Only these notes carry authority. |
| `position` | The design's current working position. Not a decision. |
| `proposal` | Proposed, not tested. |
| `survey` | Literature and landscape from memory; verify before use. |
| `experiment` | Proposed and unrun. |
| `open` | Unresolved. |
| `editorial` | Navigation. |

## Tooling

```bash
npm install
```

```bash
npm run check
```

The checker ([tools/check-vault.ts](tools/check-vault.ts), TypeScript on Node with unified) verifies frontmatter, relative links and heading anchors, that every note is reachable from this page, that cited C- and Q-numbers exist, that glossary homes resolve, and that no conversational provenance has crept back in. [AGENTS.md](AGENTS.md) holds the working rules for assistants.
