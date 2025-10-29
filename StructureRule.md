src/
  app/                # Application shell (Router, Providers, GlobalLayout)
    routes/           # Route definitions
    providers/        # Contexts / error boundaries
    index.jsx
  features/           # Feature-based modules (easier to maintain than pure DDD/Atomic)
    todos/
      components/
      hooks/
      api/            # Fetch/SDK/RTK Query, etc.
      model/          # Types/schemas (e.g., Zod)
      index.ts
  components/         # Shared UI across features (Button, Modal, etc.)
  hooks/              # Shared custom hooks
  lib/                # Utilities: dates, formatters, client factories
  services/           # Cross-cutting services (auth, storage, logging)
  styles/             # Global CSS/Tailwind layers
  assets/             # Images / icons / fonts
  types/              # Project-wide types (for TypeScript)
  main.jsx
  index.css