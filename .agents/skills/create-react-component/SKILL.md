---
name: create-react-component
description: "Trigger: new component, variants, form field, page UI, styling. Build React components that match this repo's structure and theme."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "1.0"
---

## Activation Contract

Load before creating, moving, or restyling a React component in `frontend/`.

## Hard Rules

- Domain component → `frontend/src/modules/<area>/<feature>/components/`; reusable component → `frontend/src/shared/components/<name>/`.
- Styling uses `tailwind-variants`: export a `tv({...})` config from a sibling `<Name>.variants.ts` and share its variant types (see `shared/components/button/Button.variants.ts`).
- Use theme tokens from `frontend/src/css/theme.css` (`bg-ui-primary`, `text-ui-primary-foreground`, `border-ui-error-border`, …). No raw hex values and no JS Tailwind config — v4 is CSS-first.
- Forms use `react-hook-form` + `zodResolver` + the `shared/components/form` wrappers (`FormInput`, `FormInputCurrency`, `FormInputRate`). Never a bare `<input>` for a form field.
- Every user-facing string goes through `useTranslation("<namespace>")`; keys live in `frontend/public/locales/{en,es}/`.
- Import with the `@/` alias. Match neighboring files on writing the `.tsx` extension — the repo mixes both because `allowImportingTsExtensions` is on.
- Take font weight, spacing, radius, and shadows from existing components; do not invent a parallel scale.

## Decision Gates

| Need | Do |
| --- | --- |
| new variant or prop | extend the `tv` config, not inline `className` conditionals |
| currency or percent input | `FormInputCurrency` / `FormInputRate` |
| toast feedback | `shared/utils/toast.utils` plus an i18n key |
| new page | register it in `frontend/src/router.tsx` |

## Execution Steps

1. Search for an existing component that already does most of it.
2. Read a sibling component and its `.variants.ts`.
3. Create the component and variants files; wire the page/route.
4. Add en/es locale keys.
5. Run `yarn lint` in `frontend/` and fix every finding.

## Output Contract

Return files created/modified, variant names, i18n keys added, and the lint result.

## References

- `frontend/src/shared/components/` — reusable component patterns.
- `frontend/src/css/theme.css` — available design tokens.
- `frontend/i18next.ts` — namespaces.
