---
name: i18n
description: "Trigger: i18n, translation, locale, user-facing string, namespace, language. Add or change localized copy in the React app."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "1.0"
---

## Activation Contract

Load when adding, changing, or removing user-facing text, or when touching language handling.

## Hard Rules

- Locale files: `frontend/public/locales/{en,es}/{common,products}.json`. Keep `en` and `es` in sync.
- Namespaces are declared in `frontend/i18next.ts` (`ns: ["common", "products"]`, `defaultNS: "common"`). A new namespace must be added there or its strings never load.
- Components read copy with `useTranslation("<namespace>")`; no hardcoded user-facing strings.
- Form validation uses i18n keys as messages (`{ message: "required" }`) resolved by `getFieldError(t, errors, field)` from `frontend/src/shared/utils/form.utils.ts`.
- The language preference is persisted in localStorage under `language` (`frontend/src/shared/lib/storage.ts`); do not invent another key.
- Remove orphaned keys in the same change that removes their usage.
- No test runner exists; verify by switching language in the running app.

## Decision Gates

| String type | Location |
| --- | --- |
| shared chrome (buttons, labels, nav) | `common.json` |
| products page and form | `products.json` |
| new domain | new namespace, registered in `i18next.ts` |

## Execution Steps

1. Search existing keys for the same meaning before adding one.
2. Add the key to every locale file of that namespace.
3. Reference it with the fully qualified key (`form.fields.name.label`).
4. Search for now-unused keys and delete them.
5. Run `yarn lint` in `frontend/`.

## Output Contract

Return the keys added/removed, the files touched, and how you verified the copy renders.

## References

- `frontend/i18next.ts`
- `frontend/public/locales/`
- `frontend/src/shared/utils/form.utils.ts`
