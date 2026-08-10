# Review ID & Changelog Registry

Every meaningful element on the site (each component, plus repeatable/variable content
inside it) carries a unique, stable `data-review-id`. This lets anyone — the user or any
coding agent, in this session or a future one — refer to "`xc-contractx.workflow-step-05`"
and have that resolve, unambiguously, to a file, a description, and a full history.

## The three files

- **`ids.ts`** — the only place ID strings are written by hand. A nested `const` object,
  namespaced by section, with plain string values for one-off elements and factory
  functions (`(n) => \`xc-hero.trust-statement-${pad(n)}\``) for repeated content, so
  adding a 6th trust statement never means editing this file.
- **`registry.json`** — flat map, keyed by the exact ID string (or, for repeated content,
  by the pattern with a trailing `*`, e.g. `"xc-hero.trust-statement-*"`). Each entry has
  `component`, `file`, `description`, `specRef` (pointer back to the relevant part of
  `XCogni_AI_Final_Website_Visual_Interaction_Spec.md`), and a `changelog` array.
- **`validate-registry.mjs`** (in `/scripts`) — cross-checks the two stay in sync.

## ID format

`xc-{section}` for a component root, `xc-{section}.{element}` for content inside it.
Kebab-case, zero-padded two-digit suffixes for repeats (`-01`, `-02`, ...).

## The rule

1. **Adding a new reviewable element**: add its ID (or factory) to `ids.ts`, add a
   matching entry to `registry.json` with a first changelog entry, then use
   `data-review-id={IDS.section.element}` in the JSX. Never write a `data-review-id`
   string literal directly in a component.
2. **Editing an element that already has a review ID**: append a new dated entry to that
   ID's `changelog` array in `registry.json` describing what changed and why. Do not
   overwrite or delete prior entries — the changelog is a history, not a status field.
3. **Before considering a task done**, run:
   ```
   npm run validate:registry
   ```
   This fails if: an ID/pattern in `ids.ts` has no `registry.json` entry, a
   `registry.json` entry has no corresponding ID/pattern in `ids.ts`, an ID defined in
   `ids.ts` is never referenced in any component, or two IDs in `ids.ts` collide.

## Why this exists

So that a future change request like "make `xc-invoicex.confidence-ring` animate faster"
can be resolved by one `grep` of `registry.json` for the file and description, and one
read of its `changelog` for what's already been tried — without re-deriving context from
scratch, and without two agents (or two sessions) drifting out of sync on what an ID
refers to.
