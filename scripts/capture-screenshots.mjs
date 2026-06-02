import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const baseUrl = process.env.VISUAL_QA_BASE_URL ?? "http://localhost:3000";
const outputRoot = path.join(process.cwd(), "visual-qa", "screenshots");

const viewports = [
  { label: "mobile", width: 375, height: 812 },
  { label: "laptop", width: 1366, height: 768 },
  { label: "laptop-large", width: 1440, height: 900 },
];

const pages = [
  { label: "home", path: "/" },
  { label: "services", path: "/services" },
  { label: "service-interior-painting", path: "/services/interior-painting" },
  { label: "service-exterior-painting", path: "/services/exterior-painting" },
  { label: "service-texture-painting", path: "/services/texture-painting" },
  { label: "gallery", path: "/gallery" },
  { label: "projects", path: "/projects" },
  { label: "project-calm-2bhk-interior-refresh", path: "/projects/calm-2bhk-interior-refresh" },
  { label: "estimator", path: "/estimator" },
  { label: "contact", path: "/contact" },
  { label: "admin-login", path: "/admin/login" },
];

function pageUrl(pagePath) {
  return new URL(pagePath, baseUrl).toString();
}

async function hideDevelopmentOverlays(page) {
  await page.addStyleTag({
    content: `
      nextjs-portal,
      [data-nextjs-toast],
      [data-nextjs-dialog-overlay],
      [data-nextjs-dev-tools-button],
      [aria-label="Open Next.js Dev Tools"],
      [aria-label="Next.js Dev Tools"] {
        display: none !important;
        visibility: hidden !important;
      }
    `,
  });
}

async function main() {
  console.log(`Visual QA screenshot capture`);
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Output: ${outputRoot}`);

  const browser = await chromium.launch();
  const successes = [];
  const failures = [];

  try {
    for (const viewport of viewports) {
      const viewportDir = path.join(outputRoot, viewport.label);
      await mkdir(viewportDir, { recursive: true });

      console.log(`\nViewport: ${viewport.label} (${viewport.width}x${viewport.height})`);

      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();

      for (const target of pages) {
        const url = pageUrl(target.path);
        const filePath = path.join(viewportDir, `${target.label}.png`);

        try {
          console.log(`- Capturing ${target.label}: ${url}`);
          await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

          const status = await page.evaluate(() => document.readyState);
          if (status !== "complete") {
            await page.waitForLoadState("load", { timeout: 10000 });
          }

          await hideDevelopmentOverlays(page);
          await page.screenshot({ path: filePath, fullPage: true });
          successes.push({ viewport: viewport.label, label: target.label, path: filePath });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          failures.push({ viewport: viewport.label, label: target.label, url, message });
          console.log(`  Failed: ${message}`);
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  console.log(`\nScreenshot capture complete.`);
  console.log(`Successful screenshots: ${successes.length}`);
  console.log(`Failed screenshots: ${failures.length}`);

  if (failures.length > 0) {
    console.log(`\nFailures:`);
    for (const failure of failures) {
      console.log(`- ${failure.viewport}/${failure.label} (${failure.url}): ${failure.message}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
