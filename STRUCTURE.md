# Project Structure

## Overview

**carlos.psd** is a bilingual (EN/PT) portfolio site for a senior product designer. Built with Next.js 16 App Router, React 19, Tailwind CSS 4, and Framer Motion. The site is content-light by design — a growing portfolio of case studies, five homepage sections, and one case study template.

The architecture favors simplicity: no CMS, no external data fetching, no auth. All content lives in `lib/` as typed TypeScript constants.

---

## Folder Map

```
/
├── app/                        # Next.js App Router — routes and layouts
│   ├── layout.tsx              # Root layout: fonts, metadata, LanguageProvider, Navbar
│   ├── page.tsx                # Homepage — composes Hero → FeaturedWork → About → Process → ContactCTA
│   ├── globals.css             # Design tokens (CSS variables), global resets, animations
│   ├── template.tsx            # Page transition curtain (re-mounts on navigation)
│   ├── styleguide/
│   │   ├── layout.tsx          # Passthrough layout (ready for future sidebar)
│   │   ├── navigation.ts       # Nav config — updated by --5-new-component
│   │   └── page.tsx            # Design token reference page (/styleguide)
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
│   ├── Lightbox.tsx            # Full-screen image lightbox — used in case studies
│   ├── LightboxImage.tsx       # Image wrapper that opens Lightbox on click
│   ├── RelatedProjects.tsx     # Related projects grid — shown at end of case studies
│   ├── PageTransitionProvider.tsx # Framer Motion page transition context/provider
│   ├── SplitText.tsx           # Animated character-split heading component
│   ├── ColorBends.jsx          # Three.js color bend background effect
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
    ├── brickup1/               # Brickup case study images
    ├── klavi/                  # Klavi case study images
    ├── quintoandar/            # QuintoAndar case study images
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

All visual values are CSS custom properties declared in `app/globals.css`. Components apply them exclusively via Tailwind arbitrary value classes — never via inline styles. Common patterns:

```
text-[color:var(--token)]
bg-[color:var(--token)]
border-[color:var(--token)]
[backdrop-filter:blur(var(--blur-navbar))]
[background-image:var(--gradient-hero-fade)]
```

Inline `style={{}}` is forbidden in all files. If a token is needed and no Tailwind class exists for that CSS property, add an arbitrary value class using the bracket syntax above.

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
- Homepage sections: `max-w-page mx-auto px-8` (token: `--max-width-page` = 1100px)
- Project grid section: `max-w-grid mx-auto` (token: `--max-width-grid` = 1440px) with `--px-grid` (16px) padding
- Case study page: `max-w-case mx-auto px-8` (token: `--max-width-case` = 1200px)
- Responsive: `px-6 md:px-8`

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

### Hardcoded content in case study template
`app/work/[slug]/page.tsx` contains hardcoded text blocks (section titles and bodies, the key insight quote, Role/Timeline metadata). As the project count grows, these should move into `lib/projects.ts` on the `Project` type.

### Redundant icon libraries
Both `lucide-react` and `@phosphor-icons/react` are installed. Consolidate to one (Phosphor is already dominant in components) and remove the other from `package.json`.

### Missing App Router error boundaries
No `error.tsx` or `not-found.tsx` in the app directory. Add at minimum a `not-found.tsx` since the `[slug]` route calls `notFound()`.

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
