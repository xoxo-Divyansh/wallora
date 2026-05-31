# Wallora Database Design

## 1. Database Strategy
- Primary database: MongoDB Atlas.
- Model design optimized for:
  - lead/quote operational queries
  - content retrieval for public pages
  - admin filtering and status workflows
- Use indexes on high-frequency filters.

## 2. Core Collections

## `users`
Purpose: Admin authentication and access control.

Fields:
- `_id`
- `name` (string, required)
- `email` (string, required, unique)
- `passwordHash` (string, required)
- `role` (enum: `super_admin`, `admin`, `editor`)
- `isActive` (boolean, default true)
- `createdAt`, `updatedAt`

Indexes:
- `email` unique
- `role`

## `leads`
Purpose: Customer enquiries from forms and estimator CTA.

Fields:
- `_id`
- `name` (string, required)
- `phone` (string, required)
- `email` (string, optional)
- `city` (string, required)
- `address` (string, optional)
- `serviceType` (string, required)
- `propertyType` (string, optional)
- `areaSize` (number, optional)
- `budgetRange` (string, optional)
- `preferredDate` (date, optional)
- `message` (string, optional)
- `status` (enum: `new`, `contacted`, `survey_scheduled`, `quoted`, `converted`, `rejected`)
- `source` (string, e.g. `home`, `service_page`, `estimator`, `campaign`)
- `sourceDetail` (string, optional)
- `assignedTo` (ObjectId -> users, optional)
- `createdAt`, `updatedAt`

Indexes:
- `status`
- `createdAt` desc
- `city`
- compound: `status + createdAt`
- optional dedupe helper: `phone + serviceType + city`

## `quotations`
Purpose: Cost and scope proposal management.

Fields:
- `_id`
- `leadId` (ObjectId -> leads, required)
- `quoteNumber` (string, required, unique)
- `customerSnapshot` (object: name, phone, email, city)
- `serviceType` (string, required)
- `areaSize` (number, optional)
- `qualityTier` (enum: `basic`, `standard`, `premium`)
- `labourCost` (number, required)
- `materialCost` (number, required)
- `otherCharges` (number, default 0)
- `discount` (number, default 0)
- `tax` (number, default 0)
- `totalAmount` (number, required)
- `currency` (string, default `INR`)
- `scopeNotes` (string, optional)
- `status` (enum: `draft`, `sent`, `accepted`, `rejected`)
- `validUntil` (date, optional)
- `pdfUrl` (string, optional)
- `createdBy` (ObjectId -> users)
- `createdAt`, `updatedAt`

Indexes:
- `quoteNumber` unique
- `leadId`
- `status`
- `createdAt` desc

## `projects`
Purpose: Execution/case-study representation after quote conversion.

Fields:
- `_id`
- `quotationId` (ObjectId -> quotations, optional)
- `title` (string, required)
- `slug` (string, required, unique)
- `city` (string, required)
- `serviceType` (string, required)
- `propertyType` (string, optional)
- `timeline` (string, optional)
- `problem` (string, optional)
- `solution` (string, optional)
- `materialsUsed` (array of string)
- `beforeImages` (array of string URLs)
- `afterImages` (array of string URLs)
- `resultSummary` (string, optional)
- `status` (enum: `planned`, `in_progress`, `inspection`, `completed`)
- `isFeatured` (boolean, default false)
- `isPublished` (boolean, default false)
- `publishedAt` (date, optional)
- `createdAt`, `updatedAt`

Indexes:
- `slug` unique
- `city`
- `serviceType`
- `isPublished + publishedAt`

## `services`
Purpose: Manage service definitions and content.

Fields:
- `_id`
- `title` (string, required)
- `slug` (string, required, unique)
- `category` (string, required)
- `shortDescription` (string, required)
- `description` (string, required)
- `startingPrice` (number, optional)
- `timelineText` (string, optional)
- `heroImage` (string, optional)
- `features` (array of string)
- `faqs` (array: question/answer)
- `seo` (object: title, description, keywords)
- `isActive` (boolean, default true)
- `sortOrder` (number, default 0)
- `createdAt`, `updatedAt`

Indexes:
- `slug` unique
- `category`
- `isActive + sortOrder`

## `reviews`
Purpose: Display customer trust content.

Fields:
- `_id`
- `customerName` (string, required)
- `rating` (number, required, min 1 max 5)
- `reviewText` (string, required)
- `city` (string, optional)
- `serviceType` (string, optional)
- `source` (string, e.g. Google/manual)
- `reviewDate` (date, optional)
- `isPublished` (boolean, default true)
- `createdAt`, `updatedAt`

Indexes:
- `rating`
- `isPublished`
- `reviewDate` desc

## 3. Optional Collections (Post-MVP)
- `blogPosts`
- `mediaAssets`
- `notifications`
- `auditLogs`

## 4. Data Integrity Rules
- Every accepted quotation should map to one project record.
- Lead status transitions should be validated server-side.
- Quote totals must be computed by server logic, not client input.
- Published projects/reviews require moderation flag and timestamp.

## 5. Migration and Versioning
- Use schema version key for backward compatibility in iterative releases.
- Keep migration scripts idempotent.
- Document breaking schema changes in release notes.

