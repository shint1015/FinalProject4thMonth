# React Project Structure Guidelines

Scope

- React + Vite (JS/TS). Works for CRA/Next with minor tweaks.

Principles

- Feature-first organization over layer-first.
- Co-locate code: components, styles, tests, stories, schemas in the same folder.
- Keep nesting shallow (≤3 levels).
- Define clear public API per feature via barrel exports (index.ts).
- Use absolute imports with an alias (e.g., @/).
- Avoid deep imports into other features’ internals.

Top-level layout (src/)

```
src/
  app/                # App shell: Router, Providers, GlobalLayout
    routes/           # Route definitions
    providers/        # Contexts / Error boundaries
    index.jsx
  features/           # Feature-based modules (auth, todos, profile, etc.)
    todos/
      components/
      hooks/
      api/            # Fetch/SDK/RTK Query
      model/          # Types/Schemas (e.g., Zod), constants, selectors
      index.ts        # Public API for the feature
  components/         # Shared UI (Button, Modal, Input)
  hooks/              # Shared custom hooks
  lib/                # Utilities, formatters, client factories (e.g., axios)
  services/           # Cross-cutting services (auth, storage, logging)
  styles/             # Global CSS/Tailwind layers and tokens
  assets/             # Images, icons, fonts
  types/              # Project-wide types (TS)
  main.jsx
  index.css
```

Feature module layout (example: features/todos/)

```
features/todos/
  components/         # TodoList, TodoItem
  pages/              # Route-level screens for this feature (optional)
  hooks/              # useTodos, useCreateTodo
  api/                # getTodos, createTodo, RTKQ endpoints
  model/              # types.ts, schema.ts, selectors.ts, constants.ts
  index.ts            # export public components/hooks only
```

Naming

- Components: PascalCase (UserCard.tsx).
- Hooks: camelCase with use prefix (useUser.ts).
- Files: kebab-case or camelCase consistently; folders kebab-case.
- Tests: same-file-name.test.ts(x) co-located.
- Stories: same-file-name.stories.ts(x) co-located.
- CSS Modules: same-file-name.module.css/scss, or Tailwind in JSX.

Imports and boundaries

- Import across features only via the feature’s index.ts (public API).
- Do not deep-import internal files of other features.
- Shared pieces live in components/, hooks/, lib/, or services/ to avoid duplication.
- Use @/ alias for src root; avoid ../../../ chains.

Routing and code-splitting

- Define routes in app/routes.
- Keep pages thin: compose feature components.
- Lazy-load route-level pages or large feature entries.

State and data

- Local UI state stays in the component.
- Feature domain state in the feature (model/).
- Global app state/providers live in app/ (or services/ for cross-cutting).
- API base clients live in lib/ or services/; feature endpoints in feature/api/.

Styling

- Prefer Tailwind or CSS Modules; globals only for reset/tokens.
- Do not override global styles from features; keep styles scoped.

Testing

- Co-locate tests with code; mock at public API boundaries.
- Integration tests at page/route level; unit tests for pure logic.

Tooling (recommended)

- Absolute imports:
  - jsconfig/tsconfig paths: @/_ → src/_
  - Vite resolve.alias: { '@': path.resolve(\_\_dirname, 'src') }
- ESLint: import order, no cross-feature internal imports, unused exports.
- Prettier: consistent formatting.

Examples

jsconfig.json (JS) or tsconfig.json (TS)

```json
{
    "compilerOptions": {
        "baseUrl": "src",
        "paths": {
            "@/*": ["*"]
        }
    },
    "exclude": ["node_modules", "dist"]
}
```

vite.config.ts/js

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
});
```

Do / Don’t

- Do: export only what consumers need from each feature’s index.ts.
- Do: keep files focused (one responsibility).
- Don’t: import from another feature’s internal folders.
- Don’t: create deep nesting or giant “utils” dumping grounds.
