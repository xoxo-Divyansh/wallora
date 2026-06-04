# Production Smoke-Test Checklist

Use this checklist after every production deployment or major environment variable change.

## Public Pages

- [ ] Homepage loads at `/`.
- [ ] Services page loads at `/services`.
- [ ] Interior painting detail page loads at `/services/interior-painting`.
- [ ] Exterior painting detail page loads at `/services/exterior-painting`.
- [ ] Texture painting detail page loads at `/services/texture-painting`.
- [ ] Projects page loads at `/projects`.
- [ ] Project detail page loads at `/projects/calm-2bhk-interior-refresh`.
- [ ] Gallery page loads at `/gallery`.
- [ ] Contact page loads at `/contact`.
- [ ] Admin login page loads at `/admin/login`.
- [ ] Health endpoint returns success at `/api/health`.

## Estimator

- [ ] Estimator page loads at `/estimator`.
- [ ] Enter valid estimator inputs.
- [ ] Submit estimator form.
- [ ] Estimate result card appears.
- [ ] `Book Free Site Visit` CTA opens `/contact` with expected context.

## Lead Capture

- [ ] Submit `/contact` form with valid customer details.
- [ ] Success message appears.
- [ ] Lead is created in MongoDB.
- [ ] Lead appears in `/admin/leads` after login.

## Admin Auth and Protection

- [ ] Logged-out user visiting `/admin/dashboard` redirects to `/admin/login`.
- [ ] Logged-out user visiting `/admin/leads` redirects to `/admin/login`.
- [ ] Admin login succeeds with `ADMIN_EMAIL` and password matching `ADMIN_PASSWORD_HASH`.
- [ ] After login, `/admin/dashboard` loads.
- [ ] After login, `/admin/leads` loads.
- [ ] Logout clears session if tested through the logout API/UI path.

## Lead Management

- [ ] Admin leads table loads submitted leads.
- [ ] Lead status dropdown updates a lead.
- [ ] Updated status persists after reload.

## Quotation Workflow

- [ ] Create quotation from an existing lead.
- [ ] Quotation appears in `/admin/quotations`.
- [ ] Quotation status dropdown works.
- [ ] Moving quotation to `sent` updates linked lead to `quoted`.
- [ ] Public id quote preview opens at `/quote/[id]`.
- [ ] Secure token quote preview opens at `/quote/share/[token]`.
- [ ] Token share page does not expose `leadId`.
- [ ] Copy share URL action copies a usable link.

## PDF Quotation

- [ ] PDF download works from `/quote/[id]`.
- [ ] PDF download works from `/quote/share/[token]`.
- [ ] PDF contains customer-safe quote fields.
- [ ] PDF does not expose `leadId` or admin metadata.

## Customer Quote Actions

- [ ] Sent quote shows `Accept Quote` and `Reject Quote` buttons on `/quote/share/[token]`.
- [ ] Accept quote changes quotation status to `accepted`.
- [ ] Accepted quote updates linked lead to `converted`.
- [ ] Accepting the same quote again is blocked.
- [ ] Reject quote changes quotation status to `rejected` on a separate sent quote.
- [ ] Draft, accepted, rejected, or expired quotes do not allow customer actions.

## Quote Email Delivery

- [ ] `RESEND_API_KEY`, `QUOTE_EMAIL_FROM`, and `NEXT_PUBLIC_APP_URL` are configured in Vercel.
- [ ] Create quotation with `customerEmail` present.
- [ ] Click `Send Email` in `/admin/quotations`.
- [ ] Email is delivered to the customer inbox.
- [ ] Email link opens `/quote/share/[token]`.
- [ ] Draft quote becomes `sent` after successful email delivery.
- [ ] Accepted/rejected/expired quote email sending is blocked.

## Visual QA

- [ ] Run local dev server with `npm run dev`.
- [ ] Run `npm run screenshots` locally.
- [ ] Confirm screenshots are generated under `visual-qa/screenshots/`.
- [ ] Review mobile, laptop, and laptop-large screenshots manually.
- [ ] If a quote is available, run with `VISUAL_QA_QUOTE_TOKEN` and review secure quote screenshot.
