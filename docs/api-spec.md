# Wallora API Specification (MVP)

## 1. API Conventions
- Base path: `/api`
- Content-Type: `application/json`
- Validation: request schema validated server-side
- Error format:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error message"
  }
}
```
- Success format:
```json
{
  "data": {}
}
```

## 2. Public Endpoints

## `GET /api/services`
Returns active service list.

Query params:
- `category` (optional)
- `limit` (optional)

## `GET /api/services/:slug`
Returns one service detail by slug.

## `GET /api/projects`
Returns published projects/case studies.

Query params:
- `city` (optional)
- `serviceType` (optional)
- `featured` (optional boolean)
- `page`, `pageSize` (optional)

## `GET /api/projects/:slug`
Returns project detail page payload.

## `GET /api/reviews`
Returns published reviews.

Query params:
- `city` (optional)
- `serviceType` (optional)
- `limit` (optional)

## `POST /api/leads`
Creates a lead from consultation/contact/estimator forms.

Request body:
```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "city": "string",
  "serviceType": "string",
  "propertyType": "string",
  "areaSize": 1200,
  "budgetRange": "string",
  "preferredDate": "2026-06-20",
  "message": "string",
  "source": "home"
}
```

## `POST /api/estimator`
Returns indicative estimate range and timeline.

Request body:
```json
{
  "propertyType": "2BHK",
  "serviceType": "interior_painting",
  "qualityTier": "standard",
  "areaSize": 1200
}
```

Response body:
```json
{
  "data": {
    "estimateMin": 65000,
    "estimateMax": 85000,
    "currency": "INR",
    "timelineDays": "3-5",
    "recommendedPackage": "standard"
  }
}
```

## 3. Admin Auth Endpoints

## `POST /api/admin/auth/login`
Admin login endpoint.

## `POST /api/admin/auth/logout`
Invalidates current session/token.

## `GET /api/admin/auth/me`
Returns current authenticated admin profile.

## 4. Admin Lead Endpoints

## `GET /api/admin/leads`
Returns paginated/filterable leads.

Query params:
- `status`
- `city`
- `source`
- `assignedTo`
- `page`, `pageSize`

## `PATCH /api/admin/leads/:id`
Updates lead status/assignment/notes.

Request body example:
```json
{
  "status": "contacted",
  "assignedTo": "user_id"
}
```

## 5. Admin Quotation Endpoints

## `POST /api/admin/quotations`
Creates new quotation for a lead.

## `GET /api/admin/quotations`
Returns quotations with filters.

## `GET /api/admin/quotations/:id`
Returns one quotation detail.

## `PATCH /api/admin/quotations/:id`
Updates quotation fields/status.

Status transitions:
- `draft -> sent -> accepted|rejected`

## 6. Admin Services Endpoints

## `POST /api/admin/services`
Create service.

## `PATCH /api/admin/services/:id`
Update service.

## `DELETE /api/admin/services/:id`
Soft delete/deactivate service.

## 7. Admin Projects Endpoints

## `POST /api/admin/projects`
Create project/case study draft.

## `PATCH /api/admin/projects/:id`
Update project status/content/media.

## `POST /api/admin/projects/:id/publish`
Publish project for public visibility.

## 8. Authorization Model
- Public endpoints: no auth.
- Admin endpoints: authenticated admin only.
- Role checks:
  - `editor`: content updates, not auth/user management.
  - `admin`: full operations except super admin controls.
  - `super_admin`: all permissions.

## 9. Validation Rules (Key)
- Phone required for lead creation.
- Service type must be from allowed taxonomy.
- Estimator area must be positive numeric.
- Quotation totals computed server-side.
- Status transitions must follow allowed lifecycle.

## 10. Versioning Strategy
- Keep MVP under `/api`.
- Introduce `/api/v2` only for breaking changes.
- Maintain changelog for client impact.

