# Wallora User Flow

## 1. Primary Public User Journey
```text
Landing -> Service Discovery -> Trust Validation -> Action (Estimator/Consultation) ->
Lead Submission -> Sales Follow-up -> Survey -> Quotation -> Decision ->
Project Execution -> Completion -> Review/Case Study
```

## 2. Detailed Customer Flow
1. User lands on homepage or SEO service page.
2. User explores services and transformations.
3. User validates trust signals (warranty, ratings, reviews, process).
4. User starts estimator or opens consultation form.
5. User submits details (contact + requirement inputs).
6. System creates lead with source metadata.
7. Admin/sales contacts user and schedules site survey.
8. Team assesses site and prepares quote.
9. Customer accepts or rejects quotation.
10. If accepted, project execution begins and progress is tracked.
11. Final handover completed and review request is triggered.
12. Eligible projects can be published as case studies.

## 3. Estimator Flow
1. User selects property type.
2. User selects service type.
3. User selects quality tier (basic/standard/premium).
4. User enters approximate area.
5. System calculates estimate range + timeline.
6. CTA prompts lead form submission for site visit.
7. Lead is tagged as estimator-originated.

## 4. Admin Operational Flow
1. Admin login.
2. Dashboard review (new leads, pending quotes, conversions).
3. Open leads list and prioritize by status/date/source.
4. Update lead status:
   - new
   - contacted
   - survey_scheduled
   - quoted
   - converted
   - rejected
5. Create or update quotation.
6. Mark quote outcome.
7. On accepted quote, create/manage project entry.
8. Upload before/after media and publish case study.

## 5. Lifecycle States
### Lead Lifecycle
`new -> contacted -> survey_scheduled -> quoted -> converted|rejected`

### Quotation Lifecycle
`draft -> sent -> accepted|rejected`

### Project Lifecycle
`planned -> in_progress -> inspection -> completed`

## 6. UX Funnel Objectives
- Minimize click depth to primary CTA.
- Keep estimator flow under 60 seconds.
- Preserve trust context near every conversion point.
- Provide clear next-step messaging after every submission.

## 7. Failure/Edge Flows
- Invalid form input -> inline error + no submission.
- API failure on lead submit -> retry guidance + fallback contact options.
- Duplicate lead detection -> merge or mark likely duplicate in admin.
- Quote not accepted -> follow-up nurture track.

