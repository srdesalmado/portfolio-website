@AGENTS.md

# carlos.psd — Portfolio Website

Bilingual (EN/PT) portfolio for a senior product designer. Next.js 16 App Router, React 19, Tailwind CSS 4, Framer Motion, Three.js. No CMS, no auth, no external data fetching — all content lives in `lib/` as typed TypeScript constants.

Read `STRUCTURE.md` for the full folder map, conventions, and known issues before making changes.

---

## Styleguide Rule — Two Sources of Truth

There are exactly two sources of truth in this project, and they must always be in sync:

| Source | File | Role |
|--------|------|------|
| **Code** | `app/globals.css` | Token definitions — the authoritative values |
| **Visual** | `app/styleguide/page.tsx` | Live visual representation — 1:1 mirror of the tokens and components |

`app/globals.css` defines what exists. `app/styleguide/page.tsx` shows what it looks like. Neither is more important than the other — a change to one is incomplete without updating the other.

### Mandatory workflow — any style change

1. Define or update the token in `app/globals.css`
2. Update the component consuming the token (Tailwind class or CSS class)
3. **Update `app/styleguide/page.tsx`** so the visual representation reflects the change
4. The page consumes the component

This flow is mandatory. No exceptions. No shortcuts.

### Mandatory workflow — designer-driven visual change

When the designer asks to change something visual (e.g. "make the badge border thinner", "update this button's hover"):

1. Identify which token(s) are involved
2. Update the token in `app/globals.css` first
3. Update the real component in `components/`
4. Update the styleguide demo in `app/styleguide/page.tsx` to match
5. All three files change together — never just one

### Styleguide page rules

- Every component shown in the styleguide must use the same tokens and classes as the real component
- No specimen in the styleguide may use hardcoded values — all visual properties come from `app/globals.css` tokens
- If a token is shown in the styleguide but not in `globals.css`, that is a violation — add the token first
- If a real component changes and the styleguide is not updated, that is a violation — flag immediately

### Hardcoded values are absolutely forbidden — zero tolerance

Never write hardcoded values anywhere in this project, in any file, at any time, for any reason — including as temporary measures, placeholders, or fallbacks. This means:

- No hex colors (`#fff`, `#1a1a1a`, etc.)
- No `rgb()` / `rgba()` values
- No hardcoded pixel values (`text-[14px]`, `gap-[24px]`, `w-[340px]`, etc.)
- No hardcoded font sizes or weights
- No hardcoded border radius values
- No hardcoded shadows, opacities, z-indexes, or transition values

Every visual property must reference a CSS variable defined in `app/globals.css`. If a token does not exist yet, stop and add it first, then use it.

Exception: `hover:text-purple-400` / `hover:text-purple-600` Tailwind shorthands for accent hover states are fine.

### Inline styles are forbidden

Never use `style={{ }}` in JSX. Never use inline styles via JavaScript. All styles must be Tailwind classes that reference CSS variable tokens (e.g. `text-[color:var(--text-primary)]`) or CSS classes defined in a stylesheet that consumes styleguide tokens. If a one-off style is needed, it is not one-off — it belongs in `app/globals.css` as a token and applied via a class.

### Always reuse before creating

Before building any new component, check if one already exists. If it does, use it. If it needs adapting, update `app/globals.css` first, then the component. Only create a new component if nothing existing can serve the purpose — and even then, define all tokens first.

### Audit rule

If any hardcoded value, inline style, or style defined outside `app/globals.css` is detected in any file at any time, flag it immediately before proceeding — indicating the file path, the violation, and the corrective action. Do not silently leave violations in place. Treat every hardcoded value as a blocker.

### When in doubt — ask

If any request is ambiguous (unclear which token applies, whether a new token is needed, which component to use), stop and ask one clear specific question before writing any code. Do not guess. Do not hardcode anything as a fallback.

---

## Critical Rules

### Colors — never hardcode hex values
All colors are CSS custom properties in `app/globals.css`. Always use Tailwind's `text-[color:var(--token)]`, `bg-[color:var(--token)]`, `border-[color:var(--token)]` etc.:
- Light sections: `--bg`, `--text-primary`, `--text-secondary`, `--border-color`, `--surface`, `--accent`
- Dark sections: `--dark-bg`, `--dark-section-bg`, `--dark-surface`, `--dark-border`, `--dark-text-primary`, `--dark-text-secondary`, `--accent-on-dark`

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
All animation values (duration, easing, delay) must be CSS variables in `app/globals.css`.

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
| Change a color or spacing | `app/globals.css` → real component → `app/styleguide/page.tsx` |
| Add a new token | `app/globals.css` → mirror in `lib/tokens.ts` → styleguide demo |
| Add a homepage section | Create `components/NewSection.tsx`, add to `app/page.tsx`, add translations |
| Add a UI primitive | `npx shadcn@latest add <component>` → scaffolds into `components/ui/` |

---

## Known Issues (do not reintroduce)

- **`public/*.svg`** — default Next.js placeholders, not used.
- **`app/work/[slug]/page.tsx`** — has hardcoded section content; should move to `lib/projects.ts` as project count grows.
- **No `not-found.tsx`** — the `[slug]` route calls `notFound()` but no boundary exists.
- **No real images** — `public/` has no portfolio assets. Use `next/image` when adding them to `public/images/`.

---

## Adding a Project

The `branding-klavi` entry in `lib/projects.ts` is the canonical reference. Every new project must follow this pattern exactly — no shortcuts, no placeholder sections.

### The Klavi pattern (mandatory for all new case studies)

```ts
{
  // ─── Identity ───────────────────────────────────────────────
  slug: "project-slug",          // URL: /work/project-slug
  title: "Category — Project Name",
  subtitle: "One sharp sentence: the core design problem or outcome.",
  description: "Same as subtitle — shown in the case study header.",
  tags: ["Tag 1", "Tag 2"],      // 2–3 tags max, shown as badges
  year: "2024",

  // ─── Cover ──────────────────────────────────────────────────
  coverLabel: "Fallback text if no image",
  coverImage: "/image-name.png", // place file in public/

  // ─── Meta table (right column of header) ────────────────────
  role: "Senior Product Designer",
  team: "Name 1, Name 2, Name 3",
  agency: "Agency Name",         // use agency OR timeline, not both
  timeline: "April 2024",

  // ─── Metrics (optional — only include real numbers) ─────────
  metrics: [
    { value: "40% ↑", label: "Task completion" },
    { value: "3x",    label: "Faster onboarding" },
  ],

  // ─── Quote (optional) ───────────────────────────────────────
  quote: "A direct quote from a stakeholder or user, if available.",

  // ─── Sections ───────────────────────────────────────────────
  // Sections WITHOUT links render before the gallery.
  // Sections WITH links render after the gallery (used for highlights/press).
  sections: [
    {
      title: "The Challenge",
      body: "Full paragraph. Explain the business/design problem, the context, and what was at stake.",
      images: [
        { src: "/image.png", label: "Alt text", caption: "Optional caption" },
      ],
    },
    {
      title: "Design Strategy",
      body: "Explain the approach, key decisions, and the reasoning behind them.",
      images: [],  // empty array is valid
    },
    {
      title: "Highlights",  // link-only section — renders after gallery
      body: "",
      images: [],
      links: [
        { label: "Press article or external reference", url: "https://..." },
      ],
    },
  ],

  // ─── Gallery ────────────────────────────────────────────────
  // Strings = full-width. Tuples [a, b] = side-by-side 50/50.
  gallery: [
    "/image-1.png",
    ["/side-left.png", "/side-right.png"],
    "/image-2.png",
  ],
}
```

### Rules
- **Never add a project without real content.** No lorem ipsum, no placeholder sections.
- **All images go in `public/`** and use `next/image` conventions via `LightboxImage`.
- **The `fallbackSections` in `app/work/[slug]/page.tsx` is a safety net only** — it should never be reached for published projects.
- The homepage grid and `/work/[slug]` route update automatically when a new entry is added to `projects`.
- If the project needs bilingual copy, add the keys to `lib/translations.ts` (both `en` and `pt`).

## Git

Development branch convention: `claude/<description>`. Push with:
```
git push -u origin <branch-name>
```
