---
name: code-quality-defaults
description: "Trigger: implement, refactor, simplify, types, duplicate, cleanup. Apply this repo's quality bar before writing or reshaping code."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "1.0"
---

## Activation Contract

Load for any implementation, refactor, or cleanup in `backend/` or `frontend/`.

## Hard Rules

- Make the smallest change that satisfies the request; search before adding a helper.
- Reuse existing primitives: `frontend/src/shared/**`, `backend/src/common/**`, `backend/src/lib/**`.
- One component per file; styles live in a sibling `*.variants.ts` built with `tailwind-variants`.
- No `any`, no non-null `!` used to silence a real null risk, and no fallbacks that hide missing data — fix the type or the producer.
- Backend relative imports keep the `.js` extension (NodeNext); `@/*` maps to the app's `src/`.
- Match existing file naming: `*.repository.ts`, `*.service.ts`, `*.controller.ts`, `use<Resource>.ts`.
- Do not reformat untouched files. Prettier rewrites staged files on commit (`lint-staged`), so keep diffs scoped.

## Decision Gates

| Situation | Do |
| --- | --- |
| same markup or Tailwind in 2+ files | extract to `shared/components` and compose |
| helper needs another module's internals | move it to `shared/` (frontend) or `common/`/`lib/` (backend) |
| new dependency | justify it; the repo already has zod, react-query, react-hook-form, dinero.js |
| tests | none exist; state the verification you actually ran |

## Execution Steps

1. Read the nearest existing implementation of the same shape.
2. Write the smallest diff that matches it.
3. Run the focused check (`yarn build` or `yarn lint`) and report the literal result.

## Output Contract

Return changed files, the patterns you reused, and the commands run with their outcome. Do not restate these rules as prose.

## References

- `AGENTS.md` — commands, conventions, pre-existing failures.
- `frontend/src/shared/components/button/Button.variants.ts` — variant-file pattern.
