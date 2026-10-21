---
name: api-contract-check
description: "Trigger: change endpoint, request or response shape, validation, populate, status code, useResource. Keep the Express API and the React client in sync."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "1.0"
---

## Activation Contract

Load before changing anything that crosses the HTTP boundary: a route, a Zod schema, a controller response, `useResource`, or a per-resource hook.

## Hard Rules

- The code is the contract; `README.md` is stale (it documents PATCH and old paths).
- The wire format is asymmetric: requests send the plain JSON object (`apiClient.post(url, payload)`), responses return `{ data: ... }`. `validateBody` adds `req.body.data` on the server; clients must not send that wrapper.
- The response envelope is produced by the controllers in `backend/src/modules/*/*.controller.ts`; the client unwraps it inside `useResource`.
- Status codes come from `backend/src/utils/http.ts`: create 200, update 201, delete 200.
- Errors are `DomainError` JSON `{ name, code, message, data }`; Prisma codes map in `backend/src/lib/prisma-errors.ts`; the client normalizes them to `ApiError`, whose `code` is the HTTP status.
- Both sides own a Zod schema; change them together (`backend/.../<feature>.schemas.ts`, `frontend/.../schemas/*.schema.ts`).
- Query values arrive as strings: use `z.coerce` on the server; Zod objects strip undeclared params.

## Decision Gates

| Change | Also update |
| --- | --- |
| response field | backend type + frontend `types/*.ts` + rendering |
| new query param | backend query schema + `buildWhereQuery` + `useResource({ params })` |
| new relation | `?populate=` allow-list + include builder |
| new error case | domain error class + client toast path |

## Execution Steps

1. Locate both ends: the backend slice and the frontend hook/callsite.
2. Diff request fields, response shape, status codes, and error payload.
3. Change both sides in the same edit, keeping names identical.
4. Verify with `yarn build` in `backend/` and `yarn lint` in `frontend/`; call the endpoint only if the DB is reachable (see the DB-name mismatch in `AGENTS.md`).

## Output Contract

Return a compact table (method, path, request, response, status) plus changed files and verification results.

## References

- `frontend/src/shared/hooks/useResource.ts`
- `backend/src/middlewares/validate-body.ts`, `backend/src/middlewares/validate-query.ts`
- `backend/src/lib/errors.ts`, `backend/src/lib/prisma-errors.ts`
