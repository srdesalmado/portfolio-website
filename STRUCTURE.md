# Project Structure

## Overview

**carlos.psd** is a bilingual (EN/PT) portfolio site for a senior product designer. Built with Next.js 16 App Router, React 19, Tailwind CSS 4, and Framer Motion. The site is content-light by design — three projects, five homepage sections, and one case study template.

The architecture favors simplicity: no CMS, no external data fetching, no auth. All content lives in `lib/` as typed TypeScript constants.

---

## Folder Map

```
/
├── app/                        # Next.js App Router — routes and layouts
│   ├── layout.tsx              # Root layout: fonts, metadata, LanguageProvider, Navbar
│   ├── page.tsx                # Homepage — composes Hero → FeaturedWork → About → Process → ContactCTA
│   ├── globals.css             # Design tokens (CSS variables), global resets, animations
│   ├── styleguide/
│   │   └── page.tsx            # Design token reference page
│   └── work/
│       └── [slug]/
│           └── page.tsx        # Case study template (dynamic, SSG via generateStaticParams)
│
├── components/                 # React components
│   ├── Hero.tsx                # Hero section — animated 3D background, headline, CTAs
│   ├── Navbar.tsx              # Nav — scroll-aware active state, language toggle, mobile menu
│   ├── FeaturedWork.tsx        # Project grid — maps over lib/projects.ts
│   ├── ProjectCard.tsx         # Individual project card — hover animations, badges
│   ├── AboutSection.tsx        # About section — two-column layout, dark theme
│   ├── ProcessSection.tsx      # Process section — three-step approach, light theme
│   ├── ContactCTA.tsx          # Contact section + site footer — dark theme
│   ├── Testimonials.tsx        # Testimonials — (currently unused on homepage)
│   ├── Footer.tsx              # ⚠️ ORPHAN — never imported, superseded by ContactCTA
│   └── ui/                     # shadcn/ui primitives — do not add business logic here
│       ├── button.tsx          # Button — Base UI primitive + CVA variants
│       ├── badge.tsx           # Badge
│       └── card.tsx            # Card
│
├── context/
│   └── LanguageContext.tsx     # Language state (EN/PT) — persisted to localStorage
│
├── lib/                        # Data and utilities — no React, no side effects
│   ├── projects.ts             # Project data array + Project type definition
│   ├── translations.ts         # i18n strings — all UI copy lives here
│   └── utils.ts                # cn() — clsx + tailwind-merge
│
└── public/                     # Static assets served at /
    └── *.svg                   # Default Next.js SVGs — not used by the site
```

---

## Key Files

| File | Role |
|------|------|
| `app/globals.css` | Single source of truth for design tokens (CSS variables). Edit here first. |
| `lib/projects.ts` | Add/edit projects here. The `Project` type is defined here too. |
| `lib/translations.ts` | All UI copy for both languages. Every string the user sees. |
| `context/LanguageContext.tsx` | Language toggle logic. Rarely needs changes. |
| `app/work/[slug]/page.tsx` | Case study template. Sections and metadata are partially hardcoded — see known issues. |

---

## Design Token System

All visual values are CSS custom properties declared in `app/globals.css`. Components reference them via `style={{ color: "var(--token)" }}` or Tailwind's `[var(--token)]` syntax.

**Token namespaces:**

| Prefix | Context |
|--------|---------|
| `--bg`, `--text-*`, `--border-color`, `--surface`, `--accent` | Light sections (FeaturedWork, Process, case studies) |
| `--dark-bg`, `--dark-section-bg`, `--dark-surface`, `--dark-border`, `--dark-text-*`, `--accent-on-dark` | Dark sections (Hero, About, ContactCTA) |

The site uses **intentional dark sections within a light-mode layout** — there is no system-level dark mode toggle.

---

## Conventions

### Component rendering model
- **Server Components by default** — `app/layout.tsx`, `app/page.tsx`, `app/work/[slug]/page.tsx`
- **Client Components** (`"use client"`) only when needed: animation (Framer Motion), scroll listeners, language context, interactive state
- All `components/*.tsx` are client components. All `components/ui/*.tsx` are client components via shadcn.

### Styling
- Tailwind utility classes for layout, spacing, responsive variants
- CSS variables (`var(--token)`) for color — never hardcode hex values in components
- Exception: purple hover states are expressed as Tailwind's `hover:text-purple-400` / `hover:text-purple-600` (accent color shorthand)
- No CSS Modules, no styled-components

### Animation
- Framer Motion `motion.div` with `whileInView` for scroll-triggered entrance
- Standard easing: `[0.16, 1, 0.3, 1]` (custom cubic-bezier, used consistently)
- Standard duration: `0.6`–`0.8s`
- Stagger pattern: base delay `0.1s`, increment `0.1s` per item

### Icons
- Both `lucide-react` and `@phosphor-icons/react` are installed — prefer **Phosphor** for new icons (already used in Navbar), keep Lucide for any existing usages

### i18n
- All user-facing strings go in `lib/translations.ts` — never inline copy in components
- Access via `const t = translations[lang].sectionName` after `const { lang } = useLang()`
- Two languages: `"en"` | `"pt"`

### Layout width
- Homepage sections: `max-w-[1100px] mx-auto px-8`
- Case study page: `max-w-[1200px] mx-auto px-8`

---

## Guidelines for Adding or Modifying Files

### Adding a project
1. Add an entry to the `projects` array in `lib/projects.ts` following the `Project` type
2. The homepage grid and case study route update automatically
3. Add translations for any new case study copy that should be bilingual

### Adding a homepage section
1. Create `components/NewSection.tsx` as a client component
2. Add its translations to both `en` and `pt` in `lib/translations.ts`
3. Import and place it in `app/page.tsx`
4. Add a nav entry in `lib/translations.ts` under `nav` if it needs a nav link

### Adding a UI primitive
1. Use `npx shadcn@latest add <component>` — it scaffolds into `components/ui/`
2. Do not add business logic or data fetching inside `components/ui/`

### Adding a new route
1. Create the directory under `app/` following Next.js App Router conventions
2. Use Server Components unless the route requires interactivity
3. Check `node_modules/next/dist/docs/` for App Router specifics (this is Next.js 16 — some APIs differ from older versions)

### Modifying styles
1. If it's a color or spacing token — update `app/globals.css`
2. If it's a component-specific layout — use Tailwind classes inline
3. Avoid adding new CSS files; the `globals.css` + Tailwind system covers all cases

---

## Known Issues & Cleanup Opportunities

### Dead code
- **`components/Footer.tsx`** — never imported. The copyright/footer bar is inlined at the bottom of `ContactCTA.tsx`. This file can be deleted.
- **`public/*.svg`** — default Next.js placeholder SVGs. Not used by the site.

### Hardcoded content in case study template
`app/work/[slug]/page.tsx` contains hardcoded text blocks (section titles and bodies, the key insight quote, Role/Timeline metadata). As the project count grows, these should move into `lib/projects.ts` on the `Project` type.

### Redundant icon libraries
Both `lucide-react` and `@phosphor-icons/react` are installed. Consolidate to one (Phosphor is already dominant in components) and remove the other from `package.json`.

### Public assets
`public/` has no portfolio images — all image slots use placeholder `div`s. When adding real images, use `next/image` (`<Image>`) for optimization. Create `public/images/` for portfolio assets.

### Missing App Router error boundaries
No `error.tsx` or `not-found.tsx` in the app directory. Add at minimum a `not-found.tsx` since the `[slug]` route calls `notFound()`.

### Testimonials component
`components/Testimonials.tsx` is defined but not rendered on the homepage. Either add it to `app/page.tsx` or delete it if it's a placeholder.

---

## Tech Stack Reference

| Concern | Tool |
|---------|------|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Primitives | Base UI (`@base-ui/react`) |
| Animations | Framer Motion 12 |
| 3D Background | Three.js |
| Icons | Phosphor Icons (+ Lucide, to consolidate) |
| Fonts | Geist (Vercel), Montserrat (Google) via `next/font` |
| i18n | Custom context + localStorage |
| Type checking | TypeScript 5 (strict) |
| Linting | ESLint 9 |
