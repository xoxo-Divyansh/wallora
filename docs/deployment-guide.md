# Wallora Deployment Guide

## Purpose

This guide prepares Wallora for production deployment on Vercel with MongoDB Atlas, Resend email delivery, admin authentication, public quote sharing, and PDF quotation downloads.

## Required Services

- GitHub: source repository and Vercel deployment source.
- Vercel: Next.js hosting and environment variable management.
- MongoDB Atlas: production database for leads and quotations.
- Resend: quotation email delivery provider.

## Required Environment Variables

Configure these in Vercel Project Settings -> Environment Variables for Production, Preview, and Development as needed.

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wallora
MONGODB_DB=wallora
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=$2b$10$replace_with_a_bcrypt_hash
JWT_SECRET=replace_with_a_long_random_secret
RESEND_API_KEY=re_replace_with_resend_api_key
QUOTE_EMAIL_FROM="Wallora <quotes@yourdomain.com>"
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
```

Do not commit real values to Git.

## Generate Admin Password Hash

Run this locally after installing dependencies:

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('your-admin-password', 10).then(console.log)"
```

Use the printed hash as `ADMIN_PASSWORD_HASH`. Keep the plain password out of Git and chat logs.

## MongoDB Atlas Setup Notes

- Create a MongoDB Atlas project and cluster.
- Create a database user with a strong password.
- Allow Vercel outbound access. For MVP, Atlas network access can temporarily allow `0.0.0.0/0`, but a stricter approach is preferred when operationally possible.
- Use the database name configured in `MONGODB_DB`, defaulting to `wallora` if omitted.
- The app creates indexes for leads and quotations through repository access.
- The health endpoint intentionally does not check MongoDB to stay fast and avoid leaking infrastructure status.

## Resend Setup Notes

- Create a Resend account.
- Verify the sending domain or sender address.
- Create an API key and set `RESEND_API_KEY` in Vercel.
- Set `QUOTE_EMAIL_FROM` to a verified sender, for example `Wallora <quotes@yourdomain.com>`.
- Quote emails are sent by the protected route `POST /api/quotations/[id]/send-email`.
- Quote emails include a secure token link, not the internal lead id.

## Vercel Deployment Steps

1. Confirm the GitHub repository is pushed: `https://github.com/xoxo-Divyansh/wallora.git`.
2. Create a new Vercel project from the GitHub repository.
3. Keep the framework preset as Next.js.
4. Add all required environment variables.
5. Deploy the project.
6. Open the deployment URL and run the production smoke-test checklist.

## Domain and App URL Configuration

- Add the production domain in Vercel if using a custom domain.
- Set `NEXT_PUBLIC_APP_URL` to the final public origin, without a trailing slash.
- Example: `https://wallora.example.com`.
- Quote emails and share links use `NEXT_PUBLIC_APP_URL`, so this must match the customer-facing domain.

## Admin Login Setup

- `ADMIN_EMAIL` must match the email used on `/admin/login`.
- `ADMIN_PASSWORD_HASH` must be generated with `bcryptjs`.
- `JWT_SECRET` must be long, random, and different from development.
- In production, the admin session cookie is `httpOnly`, `sameSite=lax`, and `secure`.

## Quote Email Setup

- Create a lead with an email address.
- Create a quotation from that lead.
- Click `Send Email` in `/admin/quotations`.
- If the quote is `draft`, successful email delivery updates it to `sent`.
- Accepted, rejected, and expired quotes are blocked from email sending.

## Public Quote Link Setup

- Each quotation receives a `publicShareToken`.
- Existing quotations are lazily backfilled with a token when loaded through the quotation repository.
- Customer links use `/quote/share/[token]`.
- Customers can accept or reject only when the quotation status is `sent`.

## PDF Route Notes

- Public PDF download by id: `/api/public/quotations/[id]/pdf`.
- Token PDF download: `/api/public/quotes/[token]/pdf`.
- PDF generation uses `pdf-lib` in a server route.
- PDFs use sanitized public quotation fields only.
- PDFs are generated on demand and are not stored in the repository.

## Health Endpoint

Use this route for a lightweight deployment check:

```text
GET /api/health
```

Expected envelope:

```json
{
  "success": true,
  "message": "Wallora API is healthy",
  "data": {
    "app": "Wallora",
    "environment": "production",
    "timestamp": "2026-06-04T00:00:00.000Z"
  }
}
```

## Visual QA Script

Run locally while the app is available at `http://localhost:3000`:

```bash
npm run screenshots
```

Optional quote captures:

```bash
VISUAL_QA_QUOTE_ID=replace_with_id npm run screenshots
VISUAL_QA_QUOTE_TOKEN=replace_with_token npm run screenshots
```

Generated screenshots are ignored by Git.

## Common Deployment Issues and Fixes

- Missing `MONGODB_URI`: lead, admin, and quote routes that touch the database will fail. Add the variable in Vercel and redeploy.
- Wrong `ADMIN_PASSWORD_HASH`: admin login fails. Regenerate the bcrypt hash and update Vercel env vars.
- Weak or missing `JWT_SECRET`: admin session signing fails. Set a long random value.
- Wrong `NEXT_PUBLIC_APP_URL`: email quote links point to the wrong domain. Update it to the production origin.
- Unverified Resend sender: quote email sending fails. Verify the sender/domain in Resend and update `QUOTE_EMAIL_FROM`.
- MongoDB Atlas network blocked: database routes time out or fail. Check Atlas network access and credentials.
- Build passes but runtime email fails: confirm `RESEND_API_KEY`, `QUOTE_EMAIL_FROM`, and sender verification.
