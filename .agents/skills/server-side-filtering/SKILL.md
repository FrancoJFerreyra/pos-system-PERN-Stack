---
name: server-side-filtering
description: "Trigger: filter, search, list query, populate, sort, pagination. Implement list filtering on the Express and Prisma side, not in React."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "1.0"
---

## Activation Contract

Load when adding or changing how a collection endpoint is queried, filtered, or displayed.

## Hard Rules

- Declare accepted params in the module's Zod query schema (`backend/src/modules/<feature>/<feature>.schemas.ts`), using `z.coerce` for numbers and booleans; Zod objects drop undeclared params.
- Apply them in the repository's `buildWhereQuery`; `backend/src/modules/products/product.repository.ts` is the reference.
- Relations are fetched only through `?populate=<name>`, allow-listed per module with `createPopulateQuerySchema` and converted by `buildIncludeQuery`.
- The client passes filters as `useResource({ params })`; never fetch everything and filter in React.
- Do not copy `backend/src/modules/categories/category.repository.ts`: it returns `{ where: { where: … } }` and breaks `?name=` (known bug).
- There is no pagination yet. If you add it, define the response envelope on both sides in the same change.

## Decision Gates

| Need | Where |
| --- | --- |
| free-text search | `contains` + `mode: "insensitive"` |
| range filter | `gte` / `lte` on the same field |
| relation filter | filter on the FK scalar (`categoryId`), not the relation |
| unsupported param | do not add it silently; the schema strips it |

## Execution Steps

1. Read the target module's query schema and `buildWhereQuery`.
2. Add the param to the schema, the query `types`, and the where builder.
3. Mirror the type on the frontend if the client sends the param.
4. Verify `yarn build` in `backend/`, then call the endpoint with the filter if the DB is reachable.

## Output Contract

Return the param name and type, the schema/builder files changed, and the observed query result or the reason it could not be exercised.

## References

- `backend/src/common/validations/common.schemas.ts`
- `backend/src/common/http/api-queries.ts`
- `frontend/src/shared/hooks/useResource.ts`
