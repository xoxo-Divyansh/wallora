# Wallora Product Specification

## 1. Product Overview
Wallora is a premium home painting and interior finishing platform built to convert visitors into qualified leads and enable internal teams to manage enquiries, quotations, and project showcases through one system.

Wallora is not a brochure site. It is a service-commerce workflow product with:
- conversion-focused public pages
- estimator-assisted lead qualification
- admin-led quote and pipeline management
- project proof via gallery and case studies

## 2. Product Goals
- Generate qualified leads for painting/interior services.
- Reduce friction from discovery to consultation booking.
- Standardize lead-to-quote workflow for operations teams.
- Build trust with visual proof, transparent process, and social proof.
- Create an SEO-ready content foundation for city + service growth.

## 3. Non-Goals (MVP)
- End-customer account dashboard.
- Full ERP for workforce payroll/inventory.
- Complex multi-vendor marketplace model.
- Native mobile apps.

## 4. Primary Users
- Homeowners planning painting/interior updates.
- Rental and property owners needing refresh work.
- Office/commercial decision makers.
- Wallora sales/operations admins managing enquiries and quotes.
- Content admins managing services, projects, and marketing pages.

## 5. Core Service Categories
- Interior Painting
- Exterior Painting
- Texture & Stencil Designs
- Wallpaper
- Waterproofing
- Wood Polish/Coating
- False Ceiling
- Deep Cleaning (optional by city/ops)

## 6. Customer Value Proposition
- Free site visit and consultation.
- Transparent quotation model.
- Quality and process confidence (proof-based trust sections).
- Design inspiration from real projects.
- Faster decision support via cost estimator.

## 7. Functional Scope (MVP)
### Public Web
- Home page
- Services listing
- Service detail pages (SEO friendly slugs)
- Gallery and featured transformations
- Project case studies
- Cost estimator
- Contact / Book consultation
- Reviews/testimonials

### Lead & Estimation
- Lead form submission with validation
- Estimator submission and result rendering
- Lead source tagging (page, campaign, referrer where available)

### Admin
- Admin authentication
- Dashboard summary
- Leads table + status update
- Quotation creation + status tracking
- Services CRUD
- Projects/Gallery CRUD

## 8. Quality Attributes
- Scalable information architecture (modular domain structure).
- Maintainable code boundaries (UI, domain, data, infra separation).
- SEO-first rendering and metadata strategy.
- Secure handling of lead data and admin access.
- Performance targets for Core Web Vitals and image optimization.

## 9. Success Metrics
- Lead conversion rate from key landing pages.
- Estimator completion rate.
- Consultation booking submission rate.
- Quote acceptance rate (admin pipeline).
- Organic traffic growth for service/city pages.
- Time-to-first-response on new leads.

## 10. Constraints and Assumptions
- MVP uses one full-stack web application.
- Internal ops can initially run on a single admin role set.
- Pricing estimator is directional, not legally binding quotation.
- Project media is stored externally (Cloudinary/ImageKit/S3 class).

## 11. Release Strategy
- Phase-driven release with docs-first planning.
- MVP release on Vercel with production DB.
- Post-MVP iterations for quote PDFs, notifications, and payments.

