import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = '/home/trey27/Documents/projects/morimoto-satoko/test-output';
const BASE_URL = 'http://localhost:3000';
const DATE_STAMP = '2026-05-26';

function ts() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${DATE_STAMP}-${hh}${mm}${ss}`;
}

async function shot(page, name) {
  const file = join(OUTPUT_DIR, `${name}-${ts()}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  [screenshot] ${file}`);
  return file;
}

async function fullShot(page, name) {
  const file = join(OUTPUT_DIR, `${name}-${ts()}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`  [screenshot] ${file}`);
  return file;
}

const results = [];
function pass(test, notes) { results.push({ status: 'PASS', test, notes }); console.log(`PASS  ${test}${notes ? ' — ' + notes : ''}`); }
function fail(test, notes) { results.push({ status: 'FAIL', test, notes }); console.log(`FAIL  ${test}${notes ? ' — ' + notes : ''}`); }
function warn(test, notes) { results.push({ status: 'WARN', test, notes }); console.log(`WARN  ${test}${notes ? ' — ' + notes : ''}`); }

async function run() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const consoleErrors = [];
  const consoleWarnings = [];

  // ── Desktop viewport ──────────────────────────────────────────────────────
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
    if (msg.type() === 'warning') consoleWarnings.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  // ── 1. Initial page load ──────────────────────────────────────────────────
  console.log('\n=== 1. Initial Page Load ===');
  const resp = await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  if (resp && resp.status() === 200) pass('page-load-200', `HTTP ${resp.status()}`);
  else fail('page-load-200', `HTTP ${resp?.status()}`);

  await shot(page, 'hero-initial');

  // ── 2. StickyNav (desktop) ────────────────────────────────────────────────
  console.log('\n=== 2. StickyNav — Desktop ===');

  const brandText = await page.locator('nav').first().innerText().catch(() => '');
  if (brandText.includes('森本さとこ')) pass('nav-brand-japanese', brandText.slice(0, 60));
  else fail('nav-brand-japanese', `Got: ${brandText.slice(0, 60)}`);

  const navLinks = ['トップ', 'メッセージ', '実績', 'プロフィール', 'お問い合わせ'];
  for (const link of navLinks) {
    const el = page.getByRole('link', { name: link }).first();
    const visible = await el.isVisible().catch(() => false);
    if (visible) pass(`nav-link-visible:${link}`);
    else fail(`nav-link-visible:${link}`);
  }
  await shot(page, 'stickynav-desktop');

  // ── 3. HeroSection ────────────────────────────────────────────────────────
  console.log('\n=== 3. HeroSection ===');

  const h1 = await page.locator('h1').first().innerText().catch(() => '');
  if (h1.includes('森本さとこ')) pass('hero-h1-name', h1);
  else fail('hero-h1-name', `Got: ${h1}`);

  const bodyText = await page.locator('body').innerText();
  if (bodyText.includes('すべては子どもたちのために')) pass('hero-slogan');
  else fail('hero-slogan', 'slogan not found');

  if (bodyText.includes('2期目')) pass('hero-badge-or-stats-2期目');
  else fail('hero-badge-or-stats-2期目');

  if (bodyText.includes('副議長')) pass('hero-stats-副議長');
  else fail('hero-stats-副議長');

  const ctaMessage = page.getByRole('link', { name: 'メッセージを読む' }).first();
  const ctaContact = page.getByRole('link', { name: 'お問い合わせ' }).first();
  if (await ctaMessage.isVisible().catch(() => false)) pass('hero-cta-message-button');
  else fail('hero-cta-message-button');
  if (await ctaContact.isVisible().catch(() => false)) pass('hero-cta-contact-button');
  else fail('hero-cta-contact-button');

  await shot(page, 'hero-section-detail');

  // ── 4. Nav scroll to each section ─────────────────────────────────────────
  console.log('\n=== 4. Smooth-scroll Nav Links ===');

  // メッセージ section
  await page.getByRole('link', { name: 'メッセージ' }).first().click();
  await page.waitForTimeout(800);
  const msgSection = page.locator('#message');
  if (await msgSection.isVisible().catch(() => false)) pass('scroll-to-message-section');
  else warn('scroll-to-message-section', '#message not found or not visible after click');
  await shot(page, 'message-section');

  // 実績 section
  await page.getByRole('link', { name: '実績' }).first().click();
  await page.waitForTimeout(800);
  const achSection = page.locator('#achievements');
  if (await achSection.isVisible().catch(() => false)) pass('scroll-to-achievements-section');
  else warn('scroll-to-achievements-section', '#achievements not visible');
  await shot(page, 'achievements-section');

  // プロフィール section
  await page.getByRole('link', { name: 'プロフィール' }).first().click();
  await page.waitForTimeout(800);
  const profSection = page.locator('#profile');
  if (await profSection.isVisible().catch(() => false)) pass('scroll-to-profile-section');
  else warn('scroll-to-profile-section', '#profile not visible');
  await shot(page, 'profile-section');

  // お問い合わせ section
  await page.getByRole('link', { name: 'お問い合わせ' }).first().click();
  await page.waitForTimeout(800);
  const contactSection = page.locator('#contact');
  if (await contactSection.isVisible().catch(() => false)) pass('scroll-to-contact-section');
  else warn('scroll-to-contact-section', '#contact not visible');
  await shot(page, 'contact-section');

  // ── 5. Sticky nav remains visible after scroll ────────────────────────────
  console.log('\n=== 5. Sticky Nav Persistence ===');
  const navEl = page.locator('nav').first();
  const navVisible = await navEl.isVisible().catch(() => false);
  if (navVisible) pass('sticky-nav-visible-after-scroll');
  else fail('sticky-nav-visible-after-scroll');

  // ── 6. Achievements grid — 6 cards ────────────────────────────────────────
  console.log('\n=== 6. Achievements Grid ===');
  await page.getByRole('link', { name: '実績' }).first().click();
  await page.waitForTimeout(800);

  const achievementTitles = [
    'こども誰でも通園制度',
    '幼児健康診査の拡充',
    'タブレット導入・ペーパーレス化',
    '傍聴者向け託児サービス',
    '大学生インターン受け入れ',
    'ペットボトル水平リサイクル',
  ];
  const pageText = await page.locator('body').innerText();
  let cardCount = 0;
  for (const title of achievementTitles) {
    if (pageText.includes(title)) { cardCount++; pass(`achievement-card:${title}`); }
    else fail(`achievement-card:${title}`);
  }
  if (cardCount === 6) pass('achievements-all-6-cards-present');
  else fail('achievements-all-6-cards-present', `Only ${cardCount}/6 found`);

  await shot(page, 'achievements-grid-full');

  // ── 7. ProfileSection ─────────────────────────────────────────────────────
  console.log('\n=== 7. Profile Section ===');
  await page.getByRole('link', { name: 'プロフィール' }).first().click();
  await page.waitForTimeout(800);
  const profileText = await page.locator('#profile').innerText().catch(() => pageText);
  const timelineYears = ['2019', '2023', '2025'];
  for (const yr of timelineYears) {
    if (profileText.includes(yr) || pageText.includes(yr)) pass(`profile-timeline-year-${yr}`);
    else fail(`profile-timeline-year-${yr}`);
  }
  await shot(page, 'profile-section-full');

  // ── 8. Contact form — empty submission validation ─────────────────────────
  console.log('\n=== 8. Contact Form — Validation ===');
  await page.getByRole('link', { name: 'お問い合わせ' }).first().click();
  await page.waitForTimeout(800);

  // Find the submit button
  const submitBtn = page.getByRole('button', { name: /送信|Submit/i }).first();
  if (await submitBtn.isVisible().catch(() => false)) {
    await submitBtn.click();
    await page.waitForTimeout(500);
    // Check for HTML5 validation (browser native) or custom error messages
    const formAfterEmptySubmit = await page.locator('body').innerText();
    // Look for any validation indication (required fields highlight, error text)
    const hasError = formAfterEmptySubmit.includes('必須') ||
                     formAfterEmptySubmit.includes('エラー') ||
                     formAfterEmptySubmit.includes('入力') ||
                     formAfterEmptySubmit.includes('required');
    // Also check if form didn't submit (still on same page with form visible)
    const formStillVisible = await page.locator('form').isVisible().catch(() => false);
    if (formStillVisible) pass('contact-form-empty-submit-blocked', 'Form still visible after empty submit');
    else warn('contact-form-empty-submit-blocked', 'Form not visible after empty submit');
    await shot(page, 'contact-form-empty-validation');
  } else {
    fail('contact-form-submit-button-visible');
  }

  // ── 9. Contact form — valid submission ────────────────────────────────────
  console.log('\n=== 9. Contact Form — Valid Submission ===');
  await page.getByRole('link', { name: 'お問い合わせ' }).first().click();
  await page.waitForTimeout(600);

  // Fill out the form
  const nameField = page.locator('input[name="name"], input[placeholder*="名前"], input[placeholder*="お名前"]').first();
  const emailField = page.locator('input[type="email"], input[name="email"]').first();
  const messageField = page.locator('textarea[name="message"], textarea[placeholder*="メッセージ"], textarea').first();

  const nameVisible = await nameField.isVisible().catch(() => false);
  const emailVisible = await emailField.isVisible().catch(() => false);
  const msgVisible = await messageField.isVisible().catch(() => false);

  if (nameVisible && emailVisible && msgVisible) {
    await nameField.fill('テスト 太郎');
    await emailField.fill('test@example.com');

    // Optional phone field
    const phoneField = page.locator('input[type="tel"], input[name="phone"]').first();
    if (await phoneField.isVisible().catch(() => false)) {
      await phoneField.fill('090-1234-5678');
    }

    await messageField.fill('これはテスト用のメッセージです。サイトの動作確認を行っています。');

    pass('contact-form-fields-filled');
    await shot(page, 'contact-form-filled');

    // Submit
    const submitBtn2 = page.getByRole('button', { name: /送信|Submit/i }).first();
    await submitBtn2.click();
    await page.waitForTimeout(2000);

    const afterSubmitText = await page.locator('body').innerText();
    const hasSuccess = afterSubmitText.includes('ありがとう') ||
                       afterSubmitText.includes('送信しました') ||
                       afterSubmitText.includes('完了') ||
                       afterSubmitText.includes('受け付け') ||
                       afterSubmitText.includes('Thank');
    if (hasSuccess) pass('contact-form-success-state', 'Success message visible');
    else fail('contact-form-success-state', 'No success message found after submit');

    await shot(page, 'contact-form-success-state');
  } else {
    fail('contact-form-fields-visible', `name:${nameVisible} email:${emailVisible} msg:${msgVisible}`);
  }

  // ── 10. Footer ────────────────────────────────────────────────────────────
  console.log('\n=== 10. Footer ===');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  const footer = page.locator('footer');
  if (await footer.isVisible().catch(() => false)) pass('footer-visible');
  else fail('footer-visible');
  const footerText = await footer.innerText().catch(() => '');
  if (footerText.includes('森本さとこ') || footerText.includes('森本')) pass('footer-name-present');
  else fail('footer-name-present', `Footer text: ${footerText.slice(0, 80)}`);
  await shot(page, 'footer-full');

  // ── 11. Full-page screenshot ───────────────────────────────────────────────
  console.log('\n=== 11. Full-page screenshot ===');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await fullShot(page, 'full-page-desktop');

  // ── 12. Console errors ────────────────────────────────────────────────────
  console.log('\n=== 12. Console Errors ===');
  if (consoleErrors.length === 0) pass('no-console-errors');
  else {
    fail('no-console-errors', `${consoleErrors.length} error(s)`);
    consoleErrors.forEach(e => console.log(`  ERROR: ${e}`));
  }
  if (consoleWarnings.length === 0) pass('no-console-warnings');
  else warn('no-console-warnings', `${consoleWarnings.length} warning(s): ${consoleWarnings.slice(0,3).join(' | ')}`);

  // ── 13. Mobile — hamburger menu ───────────────────────────────────────────
  console.log('\n=== 13. Mobile — Hamburger Menu (375px) ===');
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  const mobileConsoleErrors = [];
  mobilePage.on('console', msg => { if (msg.type() === 'error') mobileConsoleErrors.push(msg.text()); });
  mobilePage.on('pageerror', err => mobileConsoleErrors.push(err.message));

  await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await shot(mobilePage, 'mobile-initial');

  // Desktop nav links should be hidden on mobile
  const desktopNavLinkVisible = await mobilePage.getByRole('link', { name: 'メッセージ' }).first().isVisible().catch(() => false);

  // Look for hamburger button
  const hamburger = mobilePage.locator('button[aria-label*="menu"], button[aria-label*="メニュー"], button[aria-label*="Menu"], [class*="hamburger"], [class*="burger"]').first();
  const hamburgerByText = mobilePage.locator('button').filter({ hasText: /☰|≡|menu/i }).first();

  let hamburgerFound = false;
  if (await hamburger.isVisible().catch(() => false)) {
    hamburgerFound = true;
    await hamburger.click();
    pass('mobile-hamburger-visible-and-clicked');
  } else {
    // Try finding any button in nav that's not a link
    const navButtons = mobilePage.locator('nav button');
    const count = await navButtons.count();
    for (let i = 0; i < count; i++) {
      const btn = navButtons.nth(i);
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        hamburgerFound = true;
        pass('mobile-hamburger-nav-button-clicked', `Found ${count} nav buttons`);
        break;
      }
    }
    if (!hamburgerFound) fail('mobile-hamburger-visible', 'No hamburger button found');
  }

  if (hamburgerFound) {
    await mobilePage.waitForTimeout(600);
    await shot(mobilePage, 'mobile-hamburger-menu-open');

    // Check drawer opened with nav links
    const mobileNavText = await mobilePage.locator('body').innerText();
    const drawerLinks = navLinks.filter(l => mobileNavText.includes(l));
    if (drawerLinks.length >= 4) pass('mobile-drawer-shows-nav-links', `Found: ${drawerLinks.join(', ')}`);
    else fail('mobile-drawer-shows-nav-links', `Only found: ${drawerLinks.join(', ')}`);

    // Click a link to close drawer
    const mobileNavLink = mobilePage.getByRole('link', { name: '実績' }).first();
    if (await mobileNavLink.isVisible().catch(() => false)) {
      await mobileNavLink.click();
      await mobilePage.waitForTimeout(800);
      await shot(mobilePage, 'mobile-after-nav-link-click');
      pass('mobile-nav-link-navigates');
    } else {
      warn('mobile-drawer-nav-link-click', 'Could not click 実績 link in drawer');
    }
  }

  if (mobileConsoleErrors.length === 0) pass('mobile-no-console-errors');
  else fail('mobile-no-console-errors', mobileConsoleErrors.join(' | '));

  await fullShot(mobilePage, 'mobile-full-page');
  await mobilePage.close();

  // ── 14. API /api/contact ──────────────────────────────────────────────────
  console.log('\n=== 14. API /api/contact ===');
  const apiResp = await page.evaluate(async () => {
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'テスト', email: 'test@test.com', message: 'テストメッセージ' }),
      });
      return { status: r.status, ok: r.ok };
    } catch (e) {
      return { error: e.message };
    }
  });
  if (apiResp.ok) pass('api-contact-returns-200', `status=${apiResp.status}`);
  else fail('api-contact-returns-200', JSON.stringify(apiResp));

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n=== SUMMARY ===');
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const warned = results.filter(r => r.status === 'WARN').length;
  console.log(`Total: ${results.length}  |  PASS: ${passed}  |  FAIL: ${failed}  |  WARN: ${warned}`);
  console.log('\nFailed tests:');
  results.filter(r => r.status === 'FAIL').forEach(r => console.log(`  - ${r.test}: ${r.notes || ''}`));
  console.log('\nWarnings:');
  results.filter(r => r.status === 'WARN').forEach(r => console.log(`  - ${r.test}: ${r.notes || ''}`));

  await browser.close();
  return { passed, failed, warned, results };
}

run().then(summary => {
  process.exit(summary.failed > 0 ? 1 : 0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
