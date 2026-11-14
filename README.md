# Alex Zhang — Personal Digital Identity

## Status (read this first)

This is a **partial, unverified scaffold**. It was written in a sandbox where package installation was blocked, so
`npm install`, `npm run dev`, `npm run typecheck` and `npm run build` have **never been run**. Nothing here is tested.
Package versions in `package.json` are unverified ranges.

### Written
- Project config (Next.js App Router, TypeScript, Tailwind, env template)
- Design tokens (palette, serif/sans fonts), global styles with reduced-motion handling
- Global navigation (desktop and mobile) and footer
- Cinematic intro (Framer Motion, session-level flag, skip, "don't show again", reduced-motion skip)
- Homepage hero, shared `Reveal` animation
- Typed placeholder data: `profile.ts`, `timeline.ts`

### Not yet built
About, Journey, Experience/Projects, Journal (Markdown), Photography gallery and lightbox, Travel, My World map,
Reading, Contact form, SEO files (sitemap, robots), and the entire admin CMS (Supabase auth, database, storage, RLS).
No persistent content management exists yet.

## Run

```bash
npm install
npm run dev
```

## Content

Edit files in `src/data/`. Anything marked `[PLACEHOLDER]` or `isPlaceholder: true` is sample data, not fact.
CV: put the PDF at `public/documents/alex-zhang-cv.pdf`, then set `cv.available` to `true` in `src/data/profile.ts`.
Until then the nav shows a disabled "CV unavailable" label.

## Planned CMS configuration

See `.env.example`. The service-role key must stay server-side only. The public site is designed to work with no
Supabase credentials.
