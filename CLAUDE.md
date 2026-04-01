@AGENTS.md

# carlos.psd — Portfolio Website

Bilingual (EN/PT) portfolio for a senior product designer. Next.js 16 App Router, React 19, Tailwind CSS 4, Framer Motion, Three.js. No CMS, no auth, no external data fetching — all content lives in `lib/` as typed TypeScript constants.

Read `STRUCTURE.md` for the full folder map, conventions, and known issues before making changes.

---

## Critical Rules

### Colors — never hardcode hex values
All colors are CSS custom properties in `app/globals.css`. Always use `var(--token)` in components:
- Light sections: `--bg`, `--text-primary`, `--text-secondary`, `--border-color`, `--surface`, `--accent`
- Dark sections: `--dark-bg`, `--dark-section-bg`, `--dark-surface`, `--dark-border`, `--dark-text-primary`, `--dark-text-secondary`, `--accent-on-dark`

Exception: `hover:text-purple-400` / `hover:text-purple-600` Tailwind shorthands for accent hover states are fine.

### i18n — never inline copy in components
All user-facing strings go in `lib/translations.ts`. Access via:
```ts
const { lang } = useLang()
const t = translations[lang].sectionName
```
Never write UI text directly in JSX. Both `"en"` and `"pt"` keys must be added simultaneously.

### Icons — prefer Phosphor
`@phosphor-icons/react` is the primary icon library (already used in Navbar). Use it for all new icons. `lucide-react` is installed but should be consolidated away — do not add new Lucide usages.

### Client vs Server Components
- `app/layout.tsx`, `app/page.tsx`, `app/work/[slug]/page.tsx` are Server Components — keep them that way
- Add `"use client"` only for components that use Framer Motion, scroll listeners, language context, or interactive state
- All files in `components/*.tsx` are already client components

### Animations — follow the established pattern
```ts
// Standard easing
ease: [0.16, 1, 0.3, 1]
// Duration range
duration: 0.6–0.8
// Stagger
delay: index * 0.1  // starting from 0.1
```
Use `whileInView` + `viewport={{ once: true }}` for scroll-triggered entrance.

### Layout widths
- Homepage sections: `max-w-[1100px] mx-auto px-8`
- Case study page: `max-w-[1200px] mx-auto px-8`
- Responsive: `px-6 md:px-8`

---

## Where Things Live

| What | Where |
|------|-------|
| Add/edit projects | `lib/projects.ts` — follow the `Project` type |
| Add/edit UI copy | `lib/translations.ts` — always both `en` and `pt` |
| Change a color or spacing | `app/globals.css` CSS variables first |
| Add a homepage section | Create `components/NewSection.tsx`, add to `app/page.tsx`, add translations |
| Add a UI primitive | `npx shadcn@latest add <component>` → scaffolds into `components/ui/` |

---

## Known Issues (do not reintroduce)

- **`components/Footer.tsx`** — orphan file, never imported. Can be deleted.
- **`public/*.svg`** — default Next.js placeholders, not used.
- **`components/Testimonials.tsx`** — defined but not rendered. Either add to `app/page.tsx` or delete.
- **`app/work/[slug]/page.tsx`** — has hardcoded section content; should move to `lib/projects.ts` as project count grows.
- **No `not-found.tsx`** — the `[slug]` route calls `notFound()` but no boundary exists.
- **No real images** — `public/` has no portfolio assets. Use `next/image` when adding them to `public/images/`.

---

## Adding a Project

1. Add entry to `projects` array in `lib/projects.ts` following the `Project` type
2. Homepage grid and `/work/[slug]` route update automatically
3. Add any case study copy to `lib/translations.ts` if it needs to be bilingual

## Git

Development branch convention: `claude/<description>`. Push with:
```
git push -u origin <branch-name>
```
