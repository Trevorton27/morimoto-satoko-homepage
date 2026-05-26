import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1000);

// Check footer
const footerCount = await page.locator('footer').count();
const footerInfo = await page.evaluate(() => {
  const el = document.querySelector('footer');
  if (el === null) return 'NO FOOTER ELEMENT';
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  return JSON.stringify({
    text: el.innerText.slice(0, 100),
    display: style.display,
    visibility: style.visibility,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    tagName: el.tagName,
    id: el.id,
    className: el.className.slice(0, 80),
  });
});
console.log('Footer DOM count:', footerCount);
console.log('Footer info:', footerInfo);

// Check for footer-like elements
const footerLike = await page.evaluate(() => {
  // look for any element with footer-like classes or roles
  const candidates = [
    document.querySelector('[role="contentinfo"]'),
    document.querySelector('[class*="footer"]'),
    document.querySelector('[class*="Footer"]'),
    ...document.querySelectorAll('section'),
  ].filter(Boolean);
  return candidates.map(el => `${el.tagName}#${el.id}.${el.className.slice(0,40)}: ${el.innerText.slice(0,50)}`).join('\n');
});
console.log('Footer-like elements:', footerLike);

// Check all section IDs
const sections = await page.evaluate(() => {
  return [...document.querySelectorAll('[id]')].map(el => el.id).join(', ');
});
console.log('All IDs on page:', sections);

// Check message section
const msgSection = await page.evaluate(() => {
  const el = document.querySelector('#message');
  if (el === null) return 'NO #message element found';
  return `found: ${el.tagName} text: ${el.innerText.slice(0, 80)}`;
});
console.log('Message section:', msgSection);

// Viewport vs body scroll
const scrollInfo = await page.evaluate(() => {
  return JSON.stringify({
    scrollY: window.scrollY,
    innerHeight: window.innerHeight,
    bodyHeight: document.body.scrollHeight,
  });
});
console.log('Scroll info:', scrollInfo);

await browser.close();
