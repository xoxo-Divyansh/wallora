# Visual QA Screenshots

This folder contains documentation and generated output for Wallora visual QA screenshots.

The screenshot images are generated files and are intentionally ignored by Git. Keep this README tracked so the workflow remains documented.

## Purpose

Use this utility to capture full-page screenshots of important public and admin-entry Wallora pages across common viewport sizes. These screenshots are for manual visual review, design QA, regression checks, and handoff documentation.

## Precondition

Start the local app before capturing screenshots:

```bash
npm run dev
```

The capture script expects the app to be available at:

```bash
http://localhost:3000
```

You can override the base URL if needed:

```bash
VISUAL_QA_BASE_URL=http://localhost:3001 npm run screenshots
```

To include a customer-facing quotation preview, provide a real quotation id:

```bash
VISUAL_QA_QUOTE_ID=replace_with_quotation_id npm run screenshots
```

## Run

```bash
npm run screenshots
```

## Viewports

- Mobile Screen View: `375 x 812`
- Laptop Screen View: `1366 x 768`
- Laptop L-Screen View: `1440 x 900`

## Folder Structure

Generated screenshots are saved under:

```text
visual-qa/screenshots/
  mobile/
  laptop/
  laptop-large/
```

Each viewport folder contains clean page names, for example:

```text
visual-qa/screenshots/mobile/home.png
visual-qa/screenshots/mobile/services.png
visual-qa/screenshots/mobile/service-interior-painting.png
visual-qa/screenshots/mobile/gallery.png
visual-qa/screenshots/mobile/projects.png
visual-qa/screenshots/mobile/project-calm-2bhk-interior-refresh.png
visual-qa/screenshots/mobile/estimator.png
visual-qa/screenshots/mobile/contact.png
visual-qa/screenshots/mobile/admin-login.png
```

## Pages Captured

- `/`
- `/services`
- `/services/interior-painting`
- `/services/exterior-painting`
- `/services/texture-painting`
- `/gallery`
- `/projects`
- `/projects/calm-2bhk-interior-refresh`
- `/estimator`
- `/contact`
- `/admin/login`
- `/quote/[id]` when `VISUAL_QA_QUOTE_ID` is provided

Protected admin pages are intentionally not captured by default because they require a valid admin session.

## Manual Review

After running the capture command, open the generated PNG files in `visual-qa/screenshots/` and review each viewport for:

- Broken layout or overflow
- Cropped content
- Unreadable typography
- CTA visibility
- Mobile stacking issues
- Missing visual placeholders
- Unexpected route errors
