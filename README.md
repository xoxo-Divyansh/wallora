# Wallora

Wallora is a Next.js App Router scaffold for a premium home painting and interior finishing platform.

This repository currently implements the **foundation phase** aligned with the documentation in `docs/`:
- `docs/product-spec.md`
- `docs/architecture.md`
- `docs/user-flow.md`
- `docs/database-design.md`
- `docs/api-spec.md`
- `docs/mvp-roadmap.md`

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Setup
1. Install dependencies:
```bash
npm install
```
2. Run development server:
```bash
npm run dev
```
3. Open [http://localhost:3000](http://localhost:3000)

## Current Scaffold Status
Implemented in this phase:
- Public route foundations:
  - `/`
  - `/services`
  - `/services/[slug]`
  - `/gallery`
  - `/projects`
  - `/projects/[slug]`
  - `/estimator`
  - `/contact`
- Admin route foundations:
  - `/admin/login`
  - `/admin/dashboard`
  - `/admin/leads`
  - `/admin/quotations`
  - `/admin/services`
  - `/admin/projects`
- API placeholder routes:
  - `/api/leads`
  - `/api/services`
  - `/api/projects`
  - `/api/quotations`
  - `/api/auth`
- Reusable UI/layout components:
  - `Navbar`
  - `Footer`
  - `SectionHeading`
  - `Button`
  - `ServiceCard`
  - `ProjectCard`
- Module boundaries and placeholders:
  - `src/features/*`
  - `src/lib/db`, `src/lib/auth`, `src/lib/validations`, `src/lib/estimator`
  - `src/models/*`
  - `src/types/*`
  - Lifecycle constants in `src/config/lifecycle.ts`

## Not Implemented Yet (Intentional)
- Database connection and persistence
- Authentication/session logic
- Form validation schemas and full business rules
- Estimator calculation logic
- CRUD business services and repository layer
- Production observability and analytics wiring

## Next Implementation Steps
1. Implement validation schemas and request contracts for all API routes.
2. Add MongoDB models/repositories and connect persistence.
3. Build lead submission + estimator vertical slice.
4. Implement admin auth and role-protected routes.
5. Build quotations and project publishing workflows.
