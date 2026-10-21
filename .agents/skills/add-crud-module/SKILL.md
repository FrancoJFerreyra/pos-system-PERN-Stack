---
name: add-crud-module
description: "Trigger: add module, new resource, new entity, CRUD, new table, new endpoint. Add a complete backend module plus the React feature slice in this modular monolith."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "1.0"
---

## Activation Contract

Load before adding a domain resource that needs persistence, REST endpoints, and UI (product/category-shaped work).

## Hard Rules

- Backend slice: `backend/src/modules/<feature>/` with `routes`, `controller`, `service`, `repository`, `schemas`, and `types` as separate `.ts` files, mirroring `backend/src/modules/products/`.
- Mount the router in `backend/src/index.ts` under `/api/<feature>`.
- Prisma model goes in `backend/prisma/schema.prisma` with an explicit `@@map("<snake_case_plural>")` and an index on relation foreign keys.
- Only the repository touches Prisma, through `prisma` imported from `@/lib/prisma.js`. Never construct `PrismaClient`.
- Controllers read validated input only: `const { data } = req.body` after `validateBody`, and `req.validatedQuery` after `validateQuery`.
- Update is `PUT /:id`, not PATCH.
- Frontend slice: `frontend/src/modules/<area>/<feature>/{types,schemas,hooks,components,pages}`; the hook wraps `useResource` (`frontend/src/shared/hooks/useResource.ts`).
- Register pages in `frontend/src/router.tsx` and put user-facing text in `frontend/public/locales/{en,es}/<namespace>.json`.

## Decision Gates

| Need | Do |
| --- | --- |
| expose a relation | `?populate=<name>` allow-listed via `createPopulateQuerySchema` |
| list filters | Zod query schema (with `z.coerce`) applied in `buildWhereQuery` |
| shared logic | `backend/src/common/` or `backend/src/lib/`, never another module's internals |
| new i18n namespace | add it to `ns` in `frontend/i18next.ts` |

## Execution Steps

1. Read `backend/src/modules/products/` and `frontend/src/modules/catalog/products/` end to end; copy the shape, not the content.
2. Add the model, then from `backend/`: `npx prisma migrate dev --name <change>` and `npx prisma generate`; commit the regenerated `backend/src/generated/prisma`.
3. Backend: schemas → types → repository → service → controller → routes → mount in `src/index.ts`.
4. Verify: `yarn build` in `backend/`, then exercise the endpoint.
5. Frontend: types → schema → `use<Feature>` hook → form/components → page → route.
6. Verify: `yarn lint` and `yarn build` in `frontend/` (the build has a known pre-existing failure in `ProductUpdate.tsx`).
7. Add the en/es locale keys and remove any keys the change orphaned.

## Output Contract

Return the files created/modified, the migration name, the endpoint list with request/response shape, and every command run with its observed result.

## References

- `backend/src/modules/products/` — canonical backend slice.
- `frontend/src/modules/catalog/products/` — canonical frontend slice.
- `AGENTS.md` — repo-wide conventions and known failures.
