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
- MongoDB

## Setup
1. Install dependencies:
```bash
npm install
```
2. Create `.env.local`:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wallora
MONGODB_DB=wallora
```
3. Run development server:
```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables
- `MONGODB_URI`: required for lead capture persistence.
- `MONGODB_DB`: optional database name, defaults to `wallora`.

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

## Current Feature Status
Implemented after the foundation scaffold:
- Lead capture form at `/contact`
- Server-side lead validation
- MongoDB connection layer with development-safe cached client
- `POST /api/leads` for public lead submission
- `GET /api/leads` for admin lead retrieval
- Admin lead visibility at `/admin/leads`
- Admin lead status updates from `/admin/leads`
- `PATCH /api/leads/[id]/status` for lifecycle state changes
- Cost estimator form at `/estimator`
- Deterministic estimator rules in `src/lib/estimator`
- `POST /api/estimator` for indicative price and timeline estimates
- Estimator CTA prefill into `/contact`
- Static MVP service catalog in `src/features/services`
- SEO-ready service listing and dynamic service detail pages
- `GET /api/services` and `GET /api/services/[slug]` for service data
- Static MVP project case-study catalog in `src/features/projects`
- Project listing, dynamic case-study pages, and grouped gallery proof
- `GET /api/projects` and `GET /api/projects/[slug]` for project data

## Not Implemented Yet (Intentional)
- Authentication/session logic
- Form validation schemas and full business rules
- Quotation workflow and CRUD business services
- Estimator result persistence
- MongoDB-backed service CRUD
- MongoDB-backed project CRUD and image uploads
- Production observability and analytics wiring

## Next Implementation Steps
1. Add admin auth and role-protected routes.
2. Build quotations and project publishing workflows.
3. Add MongoDB-backed content CRUD after admin auth is in place.
4. Replace placeholder visual blocks with real optimized media assets.
