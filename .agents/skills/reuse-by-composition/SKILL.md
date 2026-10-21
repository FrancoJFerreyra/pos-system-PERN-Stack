---
name: reuse-by-composition
description: "Trigger: duplicate className, copy JSX, shared layout, repeated markup, module boundary. Compose instead of pasting in this codebase."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "1.0"
---

## Activation Contract

Load before pasting markup, Tailwind clusters, hooks, or helpers into a second place.

## Hard Rules

- Search `frontend/src/shared/components` before writing another copy of a visual block.
- Domain-blind UI (button, card, container, form field, text) belongs in `frontend/src/shared/components/<name>/` as `<Name>.tsx` plus `<Name>.variants.ts`.
- Domain-bound UI stays inside its module. If a boundary blocks the import, move the piece to `shared/` instead of inlining a copy.
- Backend equivalent: cross-module logic goes to `backend/src/common/` or `backend/src/lib/`, never copied between modules.
- Compose with `children` and props; do not duplicate structure and then let the copies diverge.
- Do not create an abstraction for a single use — this rule triggers at the second use.

## Decision Gates

| Situation | Do |
| --- | --- |
| 2nd use, domain-blind | extract to `shared/components` |
| 2nd use, domain-specific | extract inside the module's `components/` |
| import crosses a module boundary | move the shared piece, then import |
| variants differ | add a `tv` variant; do not fork the component |

## Execution Steps

1. Search the shared and sibling components for the block.
2. If it exists, extend it with a variant or prop instead of copying.
3. If not, extract it and update every callsite in the same change.
4. Run `yarn lint` in `frontend/` and check the touched screens for visual regressions.

## Output Contract

Return the extracted component, the callsites updated, and why crossing that boundary was safe.

## References

- `frontend/src/shared/components/`
- `backend/src/common/`
