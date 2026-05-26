# UI Testing Agent Memory — morimoto-satoko

## Project
- Next.js 16 single-page political brochure site (no auth, no DB)
- Stack: Next.js 16.2.6, React 19, Tailwind CSS v4, TypeScript
- App structure: `app/` (not `src/app/`), components in `components/`
- Sections: #hero, #message, #achievements, #profile, #contact
- API route: POST /api/contact — returns 200 on success
- Dev server: http://localhost:3000

## Playwright Setup
- Playwright is NOT in package.json devDependencies by default
- Install with: `npm install --save-dev playwright` inside the project directory
- Then import from `'playwright'` (not `'@playwright/test'`) in .mjs scripts
- Script must be run from the project root: `node test-output/verify.mjs`
- Global npx cache path does NOT resolve via NODE_PATH for ESM imports

## Known False Positive
- `footer` element has `position: static` and scrolls out of viewport
- Playwright `isVisible()` returns false when element is scrolled above fold
- Workaround: check footer visibility on the form success state page (footer appears there), or use `page.evaluate` to check DOM presence + dimensions

## Test Observations (2026-05-26)
- #message section exists and scrolls correctly — nav active state updates properly
- Warning "scroll-to-message-section" was a test script timing issue (800ms not enough after networkidle)
- Mobile hamburger drawer links render but Playwright couldn't click them due to overlay z-index
- Contact form uses custom JS validation (red borders + Japanese error messages), not HTML5 native
- Form success state replaces form with "送信が完了しました" card — footer becomes visible in same viewport
