# AGENTS.md

POS system (PERN stack) built as a **modular monolith**. This is a public portfolio repo used to show engineering skill to recruiters: code is read by humans, so prefer clear, consistent, well-named code over clever code. `README.md` is the recruiter-facing document; this file is for agents working in the repo.

## Layout

- `backend/` — Express 5 + TypeScript + Prisma 7 (Postgres). Entry: `src/index.ts`.
- `frontend/` — React 19 + Vite + TypeScript + Tailwind v4. Entry: `src/main.tsx`.
- `docker-compose.yml` (+ `docker-compose.override.yml`, auto-applied) — postgres, backend, frontend.
- Three separate yarn projects: root (husky only), `backend/`, `frontend/`. Install each one independently.
- No CI config exists; all verification is local.

## Commands (verified)

- root: `yarn install` — installs the husky hooks (`.husky/pre-commit`).
- backend: `yarn dev` (`tsx watch src/index.ts`; the server boots without Postgres but every query fails until the DB is reachable) · `yarn build` (`tsc && tsc-alias`) · `yarn knip` (unused-export check, currently fails, see below).
- backend/prisma: `npx prisma generate` · `npx prisma migrate dev` (run from `backend/`; config is `backend/prisma7.config.ts`).
- frontend: `yarn dev` (Vite, `strictPort`, port from `VITE_PORT`) · `yarn lint` (ESLint flat config) · `yarn build` (`tsc -b && vite build`, currently fails, see below).
- docker: `docker compose up --build` → dev (frontend :5173, backend :3000, pg :5432) · `docker compose -f docker-compose.yml up --build -d` → prod (nginx :80) · `docker compose exec backend npx prisma migrate dev` → create a migration.
- Pre-commit runs **prettier only** (`lint-staged`) in `backend/` and `frontend/`. Nothing lints or typechecks in the hook, so format your own files or the hook will rewrite them.

## Pre-existing failures — do not attribute these to your change

- `backend` `yarn knip` exits 1: many unused exports inside the generated Prisma client (`src/generated/prisma/*`) plus a config hint.
- No test runner exists in either app; `backend`'s `yarn test` is a stub that exits 1. There is nothing to run — never claim tests pass.

## Backend conventions

- Module slice: `src/modules/<feature>/{routes,controller,service,repository,schemas,types}.ts`. Routers are mounted in `src/index.ts` under `/api/<resource>` (`/api/products`, `/api/categories`). Keep a module's data access inside its own repository; do not query another module's model directly.
- Validation middleware mutates the request: `validateBody` puts the parsed result on `req.body.data` (controllers destructure `const { data } = req.body`), `validateQuery` stores it on `req.validatedQuery`. Never read raw `req.body` fields.
- Relations are opt-in per resource via `?populate=category` (comma-separated). Allowed names are declared per module (`createPopulateQuerySchema`) and converted to a Prisma `include` by `buildIncludeQuery`.
- Errors: throw `DomainError` subclasses from `src/lib/errors.ts`; Prisma codes are translated in `src/lib/prisma-errors.ts` (P2002→409, P2003→400, P2025→404); `src/middlewares/error-handler.ts` must remain the last middleware.
- `module: NodeNext` → relative imports must keep the `.js` extension. `@/*` maps to `src/*` and is rewritten at build time by `tsc-alias`.
- Prisma 7: the `datasource` block in `prisma/schema.prisma` has **no** `url` — it comes from `DATABASE_URL` via `prisma7.config.ts` (which dotenv-loads `backend/.env`). The client is generated to `backend/src/generated/prisma` (the `prisma-client` provider) and **is committed to git**: regenerate and commit it after any schema change, because the prod image copies the repo over the generated output and would otherwise ship a stale client.
- Use the shared client from `src/lib/prisma.ts` (driver adapter `@prisma/adapter-pg`); never instantiate `PrismaClient` elsewhere.
- The update verb is **PUT** (`router.put("/:id")`), although the README says PATCH. The code is the contract; the README is stale.
- Status codes come from `src/utils/http.ts`: create → 200, update → 201, delete → 200.

## Frontend conventions

- Feature folders: `src/modules/catalog/<feature>/{pages,components,hooks,types,schemas,utils}`; reusable UI in `src/shared/components`, each component keeping its styles in a sibling `*.variants.ts` built with `tailwind-variants`.
- All server data goes through `src/shared/hooks/useResource.ts` (React Query v5 + axios). Expose one hook per resource following `.../hooks/useProducts.ts`. It calls `/api/${resource}`, expects/returns the `{ data }` envelope, and normalizes failures into `ApiError`.
- Routing is centralised in `src/router.tsx`; register new pages there.
- i18n: locale JSON lives in `frontend/public/locales/{en,es}/`; the namespaces `common` and `products` are declared in `frontend/i18next.ts` — a new namespace must be added there or its strings never load. No hardcoded user-facing strings.
- Tailwind v4 is CSS-first: theme tokens are in `src/css/theme.css` (e.g. `bg-ui-primary`, `text-ui-primary-foreground`), `@apply` classes in `src/css/components.css`. There is no JS tailwind config.
- Money: currency is EUR; the API and database store **integer cents**, while the product form works in decimal euros. `toCents(euros)` converts to cents (accepts a number or a decimal string) and `formatToCurrency(cents)` renders minor units via dinero.js.

## Runtime and env gotchas

- `backend/.env` points at database `pos-system`, while docker compose creates database `postgres` (`POSTGRES_DB`). Running the backend on the host against the compose DB requires creating that database or editing the URL.
- The dev container command is `npx prisma generate && npx prisma migrate deploy && yarn dev`, so migrations apply automatically on container start.
- `frontend/.env`: `VITE_API_URL=http://localhost:3000`, `VITE_PORT=5173` (also in the root `.env`, consumed by the compose override).
- The API currently allows CORS `origin: "*"`.

## Known rough edges (verified in code — don't copy the pattern)

- `backend/src/modules/categories/category.repository.ts` builds `{ where: { where: … } }`, so `GET /api/categories?name=…` sends an invalid Prisma filter.
- The frontend category screens are stubs, and the router exposes category create/update at the root paths `/create` and `/update/:id`.
- `src/middlewares/validate-query.ts` still contains a leftover `console.log(req.query, "QUEYYY")`.
- The README drifts from the code (backend paths, PATCH vs PUT). Trust the code.

## Project skills (`.agents/skills/`)

Load the matching `SKILL.md` before the work it covers:

- `add-crud-module` — new resource: backend slice, migration, frontend feature.
- `api-contract-check` — anything crossing the HTTP boundary (Express ↔ `useResource`).
- `code-quality-defaults` — implementation/refactor quality bar.
- `create-react-component` — components, variants, form fields.
- `i18n` — locale keys and namespaces.
- `reuse-by-composition` — before duplicating UI or helpers.
- `server-side-filtering` — list filters, `populate`, query params.
- `frontend-design` — generic aesthetic guidance (third-party; see its `LICENSE.txt`).

## Local AI assets (not part of the application)

- `backend/generated/` is a stale, gitignored Prisma output; import from `@/generated/prisma/*`.
- `.atl/` is local runtime state — ignore it.
