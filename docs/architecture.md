# Wallora Architecture

## 1. Architecture Principles
- Domain-oriented modularity over page-oriented coupling.
- Server-rendered SEO surfaces for discoverability and performance.
- Clear separation: presentation, application logic, data access.
- Explicit contracts for APIs and validation.
- Operational simplicity first, extensibility second.

## 2. Recommended Stack (MVP)
- Frontend + Backend: Next.js (App Router, TypeScript preferred)
- Styling: Tailwind CSS
- Motion: Framer Motion (minimal, purposeful use)
- Database: MongoDB Atlas
- ORM/ODM: Mongoose (or Prisma with Mongo if team standardizes)
- Auth: NextAuth/Auth.js (credentials/provider for admin users)
- Media Storage: Cloudinary/ImageKit
- Deployment: Vercel

## 3. High-Level System Diagram
```text
[ Browser ]
    |
    v
[ Next.js Web App ]
  |        |         |
  |        |         +--> [ Media Provider ]
  |        |
  |        +--> [ API Routes / Server Actions ]
  |                    |
  |                    v
  |               [ Application Services ]
  |                    |
  |                    v
  +---------------> [ MongoDB Atlas ]
```

## 4. Application Layers
### Presentation Layer
- App Router pages/layouts
- Reusable UI components
- Form components with client-side validation hints
- Server components for SEO/content-heavy pages

### Application Layer
- Use-case modules:
  - lead intake
  - estimate calculation
  - quotation workflow
  - content management
- Request/response schema validation
- Authorization guards for admin scopes

### Data Layer
- Repository-style data access wrappers over models
- Query helpers for filtering/pagination/search
- Soft constraints and indexes for scalable retrieval

## 5. Proposed Project Structure
```text
src/
  app/
    (public pages)
    admin/
    api/
  components/
    ui/
    layout/
    sections/
  features/
    leads/
    estimator/
    services/
    projects/
    quotations/
    reviews/
    admin/
  lib/
    db/
    auth/
    validation/
    analytics/
  models/
  types/
  config/
  styles/
```

## 6. Domain Boundaries
- `leads`: enquiry capture, status lifecycle, source tracking
- `estimator`: pricing/timeline estimation rules
- `services`: service content definitions and metadata
- `projects`: case studies, galleries, before/after assets
- `quotations`: draft/send/accept/reject workflow
- `admin`: auth, role checks, dashboard aggregations

## 7. Security and Compliance Baseline
- Secure admin auth with hashed credentials and session protection.
- Role-based route protection for admin modules.
- Input validation on every mutating endpoint.
- Rate limiting and anti-spam on public forms.
- Audit fields (`createdBy`, `updatedBy`, timestamps) for admin changes.
- Secret management via environment variables only.

## 8. Scalability Decisions
- SSR + static generation split by content volatility.
- Image transformations via external media provider/CDN.
- Indexed lead/project queries for dashboard performance.
- Feature modules to avoid monolithic service code.
- Forward-compatible event hooks for notifications/workflows.

## 9. Observability and Operations
- Request logging for API routes (sanitized).
- Error reporting (Sentry or equivalent) for server/client boundaries.
- Health checks and DB connectivity checks in deployment pipelines.
- Simple admin KPIs exposed in dashboard aggregates.

## 10. Future Architecture Evolution
- Move estimator and quotation into dedicated services if traffic grows.
- Add queue-based notification pipeline (email/WhatsApp/SMS).
- Introduce background jobs for PDF generation and media processing.
- Add caching layer for read-heavy public endpoints.

