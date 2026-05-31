# Wallora MVP Roadmap

## 1. Delivery Approach
- Docs-first, architecture-first execution.
- Vertical slices over disconnected page-first implementation.
- CI-safe incremental merges via short-lived branches.
- Definition of Done enforced per phase.

## 2. Phase Plan

## Phase 0: Foundation and Governance (Week 1)
Deliverables:
- repo initialization and branch protection rules
- coding standards and lint/format setup
- environment variable contract
- baseline README and contributor guide
- initial issue backlog with labels and milestones

Definition of Done:
- local setup works from clean clone
- CI checks run on pull requests
- branch strategy documented

## Phase 1: Design System + Public Shell (Week 1-2)
Deliverables:
- typography, color tokens, spacing scale
- reusable components (buttons, cards, section blocks)
- responsive navbar/footer/layout primitives
- homepage shell and static sections

Definition of Done:
- mobile + desktop responsive baseline complete
- Lighthouse and Core Web Vitals baseline captured

## Phase 2: Core Public Product Pages (Week 2-3)
Deliverables:
- services list + service detail pages
- gallery + projects listing/detail pages
- contact/consultation page
- reviews section integration

Definition of Done:
- SEO metadata implemented per route
- no broken links/navigation paths

## Phase 3: Lead + Estimator Backend (Week 3)
Deliverables:
- MongoDB integration
- lead creation API with validation
- estimator API and UI flow
- form telemetry and source tagging

Definition of Done:
- lead submissions persist reliably
- estimator returns deterministic range outputs
- basic anti-spam/rate-limit protections enabled

## Phase 4: Admin MVP (Week 4-5)
Deliverables:
- admin auth
- dashboard summary cards
- leads table with status updates
- quotation create/update lifecycle
- services/projects CRUD (minimum viable)

Definition of Done:
- role-protected admin routes
- lead and quotation lifecycle usable end-to-end

## Phase 5: Hardening + Launch (Week 5-6)
Deliverables:
- production deployment (Vercel + Atlas)
- logging/error monitoring integration
- performance optimization pass
- QA and UAT checklist completion
- launch runbook and rollback notes

Definition of Done:
- production smoke tests pass
- key pages indexed-ready with metadata/sitemap
- monitoring active and verified

## 3. Backlog Priorities
### Must Have (MVP)
- Public conversion pages
- Lead capture
- Estimator
- Admin lead and quote management
- Project showcase module

### Should Have (Post-MVP 1)
- Quote PDF generation
- Email notifications
- Rich review source attribution

### Could Have (Post-MVP 2)
- Payment workflow
- WhatsApp API automation
- Customer progress tracking

## 4. Git and GitHub Workflow (Senior Team Model)
Branch model:
- `main`: production-ready
- `develop` (optional if team prefers): integration branch
- feature branches: `feat/<scope>`
- fix branches: `fix/<scope>`
- docs branches: `docs/<scope>`

PR standards:
- one logical change-set per PR
- linked issue/ticket
- checklist: tests, screenshots (if UI), migration notes (if DB)
- at least one review approval before merge

Commit conventions:
- `feat:`
- `fix:`
- `refactor:`
- `docs:`
- `chore:`
- `test:`

Release cadence:
- weekly tagged releases for MVP window
- release notes include features, fixes, and schema/API impacts

## 5. Risks and Mitigations
- Scope creep risk -> enforce must/should/could boundaries.
- Design drift risk -> lock tokenized design system early.
- Data quality risk -> strict server-side validation and status guards.
- Delivery delays -> keep vertical slice milestones and weekly demos.

## 6. Immediate Next Execution Steps
1. Initialize repo scaffolding with Next.js + TypeScript + Tailwind.
2. Add `docs/` governance files (`CONTRIBUTING.md`, `DECISIONS.md`).
3. Create GitHub project board with phases mapped to issues.
4. Start Phase 1 component system implementation.

