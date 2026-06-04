# Deployment Readiness Checklist

Use this checklist before promoting Wallora to production.

## Repository

- [ ] GitHub repository is pushed and current: `https://github.com/xoxo-Divyansh/wallora.git`.
- [ ] Latest work is committed on the intended deployment branch.
- [ ] No generated screenshots or PDF files are committed.
- [ ] No real secrets are committed.
- [ ] `.env.example` is complete and contains placeholders only.

## Local Validation

- [ ] Dependencies are installed with `npm install`.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Optional: `npm run screenshots` passes locally.

## Environment Variables

- [ ] `MONGODB_URI` is ready.
- [ ] `MONGODB_DB` is set or intentionally omitted to use `wallora`.
- [ ] `ADMIN_EMAIL` is set.
- [ ] `ADMIN_PASSWORD_HASH` is generated with bcrypt.
- [ ] `JWT_SECRET` is long, random, and production-only.
- [ ] `RESEND_API_KEY` is ready.
- [ ] `QUOTE_EMAIL_FROM` is a verified Resend sender.
- [ ] `NEXT_PUBLIC_APP_URL` is set to the final production origin.

## MongoDB Atlas

- [ ] Atlas cluster is created.
- [ ] Database user is created with a strong password.
- [ ] Network access allows Vercel to connect.
- [ ] Connection string has been tested locally or in preview.

## Resend

- [ ] Sending domain or sender is verified.
- [ ] API key is scoped appropriately.
- [ ] Sender address matches `QUOTE_EMAIL_FROM`.
- [ ] Test quote email is sent successfully in preview or production.

## Vercel

- [ ] Vercel project is connected to GitHub repository.
- [ ] Production environment variables are configured.
- [ ] Preview environment variables are configured if preview testing is required.
- [ ] Deployment succeeds.
- [ ] Custom domain is configured if applicable.
- [ ] `NEXT_PUBLIC_APP_URL` matches the final customer-facing domain.

## Production Smoke Test

- [ ] `docs/production-smoke-test.md` has been completed.
- [ ] Admin login works.
- [ ] Contact form creates lead.
- [ ] Quotation workflow works.
- [ ] Secure quote share link works.
- [ ] PDF download works.
- [ ] Quote email delivery works.
- [ ] Customer accept/reject works.
