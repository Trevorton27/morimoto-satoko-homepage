# UX Spec Agent Memory

## Project: morimoto-satoko

### Stack & Architecture
- Next.js App Router (greenfield, no code yet as of last spec)
- Tailwind CSS v4 — CSS-based config via `@theme` in `globals.css`; NO `tailwind.config.ts`
- No database — all content is static
- Single-page site: all content lives in `app/page.tsx`
- Root layout: `app/layout.tsx` (handles font loading via next/font/google for Noto Sans JP)
- Static content data lives in `lib/content.ts` (arrays/objects for cards, timeline, facts, etc.)

### Design System
- Color palette: deep navy (#1a3a5c), dark navy (#0f2238), warm white/cream (#faf8f4), light blue-gray (#f0f4f8), gold accent (#c9a84c), light gold (#e8c878)
- Custom colors defined as `@theme` tokens in `globals.css`: `--color-navy`, `--color-navy-dark`, `--color-gold`, `--color-gold-light`, `--color-cream`, `--color-bg-light`
- Typography: Noto Sans JP from Google Fonts via next/font/google (weights 400, 500, 700)
- Font applied as CSS variable on `<body>`; `@theme` references it as `--font-sans: var(--font-noto-sans-jp), "Hiragino Sans", sans-serif`
- Smooth scroll: `className="scroll-smooth"` on `<html>` in `app/layout.tsx`
- Japanese locale: `lang="ja"` on `<html>` in root layout

### Site Structure
- Single page with anchor sections: #hero, #message, #achievements, #profile, #contact
- Sticky nav with anchor links (no routing, just scroll)
- Nav labels (all Japanese): ヒーロー, メッセージ, 実績, プロフィール, お問い合わせ

### Key Decisions
- StickyNav is a Client Component (needs scroll detection via IntersectionObserver for active link highlighting and mobile menu toggle; Escape key closes menu; focus trap inside mobile menu)
- ContactForm is a Client Component (controlled form state + validation + submission states)
- All other sections and components are Server Components (static content)
- Contact form POSTs to `/api/contact` route handler (NOT mailto, NOT Server Action)
- Contact form validates on submit; after first failed submit, re-validates on field blur
- No authentication, no database, no dynamic data

### Contact Form API
- Route: `app/api/contact/route.ts`, export `POST` function
- Body: `{ name, email, phone?, message }`
- Returns: 200 `{ success: true }`, 400 `{ error }` for validation, 500 `{ error }` for exceptions
- Stub actual email sending with console.log + TODO comment

### Content Reference
- Name: 森本さとこ / Morimoto Satoko
- Title: 徳島市議会議員 (2期目 / 副議長経験者)
- Location: 徳島市 (Tokushima City), Japan
- Slogan: 「すべては子どもたちのために」
- Address: 〒770-8064 徳島市城南町3丁目2−20
- TEL: 090-3193-8738
- Email: satokomorimoto55@gmail.com
- Instagram / Facebook: placeholder hrefs

### Patterns Confirmed
- Single-page anchor sites in Next.js App Router: use one `app/page.tsx` with section elements bearing IDs; anchor links use `href="#section-id"`
- For smooth scroll in Next.js App Router: add `className="scroll-smooth"` to `<html>` in `app/layout.tsx`
- Noto Sans JP loaded via `next/font/google` in `app/layout.tsx`, applied as CSS variable to `<body>`
- Tailwind v4: define all custom design tokens in `@theme {}` block inside `globals.css`; no `tailwind.config.ts`
- All static content data (card arrays, timeline, facts) in `lib/content.ts` — keeps JSX clean and content editable without touching components
