# Elephant Samurai – Event Ticketing System

A React + Vite based event ticketing platform built in 3 sprints following Scrum. This README summarizes goals, sprint outcomes, setup, workflows, and contribution guidelines. See detailed retrospective: `docs/Scrum.md`.

## 🧩 Tech Stack
- Vite + React + React Router
- TailwindCSS
- ESLint + Prettier
- LocalStorage (mock persistence)
- PNPM for package management

## ✅ Core Features (By Sprint)
Sprint 1 (Foundation): Project scaffolding, routing, auth context, static info pages, header/footer, initial design system & linting.
Sprint 2 (Booking & Payment): Seat grid selection, cart context, checkout & payment form, card modal, reservation storage, toast + validation, E2E purchase flow.
Sprint 3 (User & Admin): Dashboard, profile edit, reservations list, logout, admin CRUD (events/venues), responsive polish, unit tests, accessibility/performance review.

## 🗂 Project Folder
```
FinalProject-4thMonth/
  ├─ README.md                # Main project overview
  ├─ docs/                    # Documentation & design assets
  │   ├─ Scrum.md             # Sprint retrospective notes
  │   └─ DesignGuide_*.png    # UI design guide images
  └─ elephant-samurai/        # Application source
      ├─ index.html           # Vite entry HTML
      ├─ package.json         # Dependencies & scripts
      ├─ public/              # Static files served as-is
      └─ src/                 # Source code root
          ├─ assets/          # Images, fonts, logos
          ├─ components/      # Reusable UI components
          │   ├─ admin/       # Admin panel widgets
          │   ├─ auth/        # Authentication UI parts
          │   ├─ common/      # Generic display components
          │   ├─ icons/       # Icon components (SVG wrappers)
          │   └─ layout/      # Layout + seat selection grouping
          │       └─ SeatCompo/ # Seat selection module
          ├─ pages/           # Page-level React components
          │   ├─ admin/       # CRUD pages (shows, users, venues, reservations)
          │   └─ auth/        # Login and related pages
          ├─ hook/            # Custom React hooks (e.g. useAuth)
          ├─ mock/            # Mock API/data helpers
          ├─ utils/           # Utility helpers (toast, etc.)
          └─ route.jsx        # Central routing definitions
```
Enter app folder:
```
cd elephant-samurai
```

## 🎨 Design System (Preview Images in docs/)
- Colors: docs/DesignGuide_Color.png
- Elements: docs/DesignGuide_Element.png
- Header & Footer: docs/DesignGuide_Header & Footer.png
- Logo: docs/DesignGuide_Logo.png
- Typography: docs/DesignGuide_Typography.png

## 🚀 Setup & Run
Install deps:
```
pnpm install
```
Dev server:
```
pnpm dev
```
Build:
```
pnpm build
```
Preview build:
```
pnpm preview
```

## 🧪 Testing (Planned / Partial)
- Unit tests (≥3) for critical components (SeatGrid, AuthContext, Reservation logic).
- E2E purchase flow (seat select → pay → confirmation).
Run (if configured):
```
pnpm test
```

## ♿ Accessibility & Performance Goals
- Keyboard navigation for seat selection & modals.
- Semantic landmarks (header, nav, main, footer).
- Alt text for non-decorative images (Logo, design tokens when in UI).
- Lighthouse pass thresholds: Performance >80, Accessibility >90.

## 🔄 Workflow (GitHub Issues & Branching)
- Each task tracked as an Issue (labels: feat, bug, ui, refactor, docs).
- Optional GitHub Project board: Backlog → In Progress → Review → Done.
- Branch naming: `feat/<scope>`, `fix/<issue#>`, `chore/<scope>`.
- PR checklist: Description, linked issue, screenshots (UI), self-review.
- Priority: Merge ready PRs before starting new large tasks.

## 🤝 Contributing
1. Open an Issue (describe context & acceptance criteria).
2. Create branch from latest main.
3. Commit following Conventional Commits (e.g. `feat: add seat grid focus ring`).
4. Open PR early (draft) for feedback.
5. Address review comments promptly; keep PR small.

## 📦 Useful Scripts
| Script | Purpose |
|--------|---------|
| pnpm dev | Start dev server |
| pnpm build | Production build |
| pnpm preview | Preview production build |
| pnpm lint | Lint code (if configured) |
| pnpm test | Run tests |

## 🧭 Retrospective Highlights (Condensed)
- Improved communication from Sprint 1 → 3.
- Need stronger shared code comprehension & earlier review cycles.
- Standardizing component patterns reduced merge friction.
- Action Items: Increase pair/vibe coding, clarify ownership before starting.

## 👥 Team
- Scrum Master / Dev: Shintaro
- Designer / Dev: Aiya
- Developer: Daiki

## 📄 License
TBD.

---
For full sprint notes see `docs/Scrum.md`. Feel free to open issues for enhancements or questions.