# Design System: carlos.psd

## 1. Visual Theme and Atmosphere

carlos.psd is a bilingual portfolio for a senior product designer. The visual language is minimal and intentional: a near-white light mode background contrasted by deliberate dark sections (hero, about, CTA) that use deep near-black tones. The overall atmosphere is typographically driven, with a tight tracking scale and high-weight headings creating hierarchy without relying on decoration.

The dual-mode palette (light sections vs. dark sections) is not a dark-mode toggle. It is a structural design decision: certain sections are always dark, others always light. A single purple accent (`--accent` / `--accent-on-dark`) provides the only chromatic moment, appearing on hover states and interactive highlights.

The hero section uses a Three.js particle system as the background, with three specific particle colors (`--color-particle-1`, `--color-particle-2`, `--color-particle-3`) that are the sole full-saturation colors in the system. Everything else is near-black, neutral gray, or white.

**Key characteristics:**
- Light-mode base with structurally dark sections (hero, about, contact)
- Single accent color: purple, with separate light and dark context values
- All typography uses tight negative letter-spacing except label/uppercase roles
- Pill-shaped CTA buttons and navigation tabs
- Framer Motion scroll-triggered entrance animations throughout
- Sticky frosted-glass navbar with backdrop blur

---

## 2. Color Palette and Roles

### Light context

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#fafafa` | Page background |
| `--surface` | `#f0f0f0` | Card and surface backgrounds |
| `--border-color` | `#e5e5e5` | All borders in light sections |
| `--text-primary` | `#0f0f0f` | Headings and high-emphasis text |
| `--text-secondary` | `#3d3d3d` | Body text |
| `--text-muted` | `#666666` | Captions, labels, supporting text |

### Dark context (structurally dark sections)

| Token | Value | Role |
|-------|-------|------|
| `--dark-bg` | `#080808` | Hero background |
| `--dark-section-bg` | `#0f0f0f` | About and CTA section background |
| `--dark-surface` | `#1a1a1a` | Elevated surface within dark sections |
| `--dark-border` | `#2a2a2a` | All borders in dark sections |
| `--dark-text-primary` | `#f0f0f0` | Headings on dark |
| `--dark-text-secondary` | `#c4c4c4` | Body text on dark |
| `--dark-text-muted` | `#999999` | Captions and labels on dark |

### Accent

| Token | Value | Role |
|-------|-------|------|
| `--accent` | `#9333ea` | Hover and highlight on light backgrounds (purple-600) |
| `--accent-on-dark` | `#c084fc` | Hover and highlight on dark backgrounds (purple-400) |

### Hero particles

| Token | Value | Role |
|-------|-------|------|
| `--color-particle-1` | `#ff5c7a` | Three.js particle color 1 |
| `--color-particle-2` | `#8a5cff` | Three.js particle color 2 |
| `--color-particle-3` | `#00ffd1` | Three.js particle color 3 |

### Overlays and glass

| Token | Value | Role |
|-------|-------|------|
| `--overlay-backdrop` | `rgba(0,0,0,0.85)` | Lightbox modal backdrop |
| `--overlay-hero` | `rgba(0,0,0,0.55)` | Hero section overlay |
| `--overlay-card-bottom` | `rgba(0,0,0,0.72)` | Project card gradient bottom |
| `--overlay-card-fade` | `rgba(0,0,0,0.18)` | Project card gradient midpoint |
| `--glass-light` | `rgba(255,255,255,0.1)` | Glass light overlay |
| `--glass-medium` | `rgba(255,255,255,0.2)` | Glass medium overlay |

### Navbar backgrounds

| Token | Value | Role |
|-------|-------|------|
| `--navbar-bg` | `rgba(250,250,250,0.95)` | Default navbar (light) |
| `--navbar-bg-dark` | `rgba(8,8,8,0.97)` | Navbar over dark hero |
| `--navbar-bg-light` | `rgba(250,250,250,0.97)` | Navbar scrolled (light page) |
| `--navbar-bg-scroll-light` | `rgba(255,255,255,0.95)` | Navbar scrolled variant |
| `--navbar-bg-scroll-alt` | `rgba(255,255,255,0.9)` | Navbar scrolled alt |

---

## 3. Typography Rules

### Font family

- **Primary (sans)**: resolved from `--font-sans` CSS variable (set via Next.js font loader)
- **Monospace**: resolved from `--font-geist-mono` CSS variable (Geist Mono)

### Type scale

All size tokens live in `@theme` inside `app/globals.css` and map directly to Tailwind utilities.

| Role | Used in | Token | Computed | Line height | Weight | Tracking |
|------|---------|-------|----------|-------------|--------|----------|
| Hero LG | Hero title, desktop | `text-hero-lg` | 5rem / 80px | `leading-hero` 1.04 | 600 | `tracking-tight-3` -0.03em |
| Hero SM | Hero title, mobile | `text-hero-sm` | 2.25rem / 36px | `leading-hero` 1.04 | 600 | `tracking-tight-3` -0.03em |
| Display | CTA section headings | `text-display` | clamp(2rem, 5vw, 3.5rem) | `leading-display` 1.06 | 600 | `tracking-tight-3` -0.03em |
| H1 | About, Process headings | `text-h1` | 2.5rem / 40px | `leading-cta` 1.05 | 600 | `tracking-tight-25` -0.025em |
| H2 | Sub-headings, Featured Work | `text-h2` | 1.75rem / 28px | `leading-heading` 1.1 | 600 | `tracking-tight-2` -0.02em |
| Metric | Project card metrics | `text-metric` | clamp(2rem, 4vw, 3rem) | `leading-hero` 1.04 | 600 | `tracking-tight-3` -0.03em |
| Body | About section paragraphs | `text-base` | 1rem / 16px | `leading-body` 1.75 | 400 | none |
| Body Alt | Dark section copy | `text-base` | 1rem / 16px | `leading-body-alt` 1.7 | 400 | none |
| Badge | Tags, captions, counters | `text-badge` | 0.8125rem / 13px | 1.5 | 400 | none |
| Label | Section category labels | `text-badge` uppercase | 0.8125rem / 13px | 1 | 500 | `tracking-label` 0.18em |
| Nav | Navbar and footer links | `text-badge` | 0.8125rem / 13px | 1 | 500 | 0.01em (global base) |
| Mono | Logo mark, code references | `font-mono` + `text-badge` | 0.8125rem / 13px | 1 | 500 | none |

### Tracking tokens

| Token | Value | Applied to |
|-------|-------|------------|
| `--tracking-label` | `0.18em` | Uppercase section labels |
| `--tracking-tight-2` | `-0.02em` | H2 |
| `--tracking-tight-25` | `-0.025em` | H1 |
| `--tracking-tight-3` | `-0.03em` | Hero, Display, Metric |

### Principles

- All heading roles use font weight 600 (`font-semibold`)
- Body and badge roles use weight 400
- Label and Nav roles use weight 500 (`font-medium`)
- Tracking is negative for all heading sizes, positive only for uppercase labels
- Monospace font is used at weight 500 globally via `.font-mono { font-weight: 500 }`
- Global base letter-spacing on `html` is `0.01em`
- Font smoothing: `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`
- Text rendering: `optimizeLegibility`

---

## 4. Component Stylings

### CTA Button

Used in Navbar and Contact section.

- Shape: pill (`rounded-full`)
- Background: `var(--text-primary)` (#0f0f0f)
- Text color: `var(--bg)` (#fafafa)
- Font: `text-[14px] font-medium`
- Padding: `px-5 py-2`
- Hover: `opacity-80`
- Transition: `200ms ease`

### Text links

Two contexts: light background and dark background.

**Light background:**
- Default: `text-[color:var(--text-primary)]` with `border-b border-[color:var(--border-color)]`
- Muted variant: `text-[color:var(--text-muted)]` without underline
- Hover: `text-[color:var(--accent)]` and `border-[color:var(--accent)]`
- Transition: `200ms`

**Dark background:**
- Default: `text-[color:var(--dark-text-primary)]` with `border-b border-[color:var(--dark-border)]`
- Muted variant: `text-[color:var(--dark-text-muted)]`
- Hover: `text-[color:var(--accent-on-dark)]` and `border-[color:var(--accent-on-dark)]`

### Badge

Used in project card overlays. Always rendered on dark backgrounds.

- Variant: `outline` (shadcn Badge)
- Border: `border-white/20`
- Text: `text-white/80`
- Background: `bg-white/10`
- Effect: `backdrop-blur-sm`

### Navbar

Sticky, with backdrop blur and adaptive background based on scroll position and section context.

- Position: sticky, top-0
- Background: `var(--navbar-bg)` by default, adapts to dark/light context via JS scroll state
- Blur: `backdrop-filter: blur(var(--blur-navbar))` / 12px
- Border: `border-b` with `var(--border-color)` (light) or `var(--dark-border)` (dark)
- Logo: `font-mono text-badge font-medium` with `var(--text-primary)`
- Nav links: `text-badge font-medium px-3 py-1.5 rounded-full`
- Active link: `bg-black/[0.06]` background pill
- Language toggle: `font-mono text-badge`, active lang uses `var(--text-primary)`, inactive uses `var(--text-muted)`
- CTA: CTA Button component (see above)

### Project Card

Used in the Featured Work grid.

- Aspect ratio: `var(--aspect-card)` (4:3)
- Image: full cover with `next/image`
- Overlay scrim: `var(--gradient-card-overlay)` (top-to-bottom gradient)
- Tags: Badge components at bottom-left of card
- Title: `text-h2 font-semibold` in `var(--dark-text-primary)` on hover
- Hover state: slight lift or scale (Framer Motion)

### Lightbox

Used in case study image galleries.

- Backdrop: `var(--overlay-backdrop)` (rgba(0,0,0,0.85))
- Image blur on load: `backdrop-filter: blur(var(--blur-lightbox))` / 6px
- Max size: `var(--max-w-lightbox)` 90vw / `var(--max-h-lightbox)` 90vh
- Close button: circular, `var(--dark-surface)` background, `var(--dark-border)` border
- Image container: `var(--dark-surface)` background, `var(--dark-border)` border, `rounded-lg`

---

## 5. Layout Principles

### Container widths

| Token | Value | Used in |
|-------|-------|---------|
| `--max-width-page` | `68.75rem` / 1100px | All homepage sections |
| `--max-width-case` | `75rem` / 1200px | Case study pages |

Pattern: `max-w-[1100px] mx-auto px-8` (homepage) or `max-w-[1200px] mx-auto px-8` (case study).

### Horizontal padding

| Context | Value | Class |
|---------|-------|-------|
| Desktop | 32px | `px-8` |
| Mobile | 24px | `px-6` |

Responsive: `px-6 md:px-8`

### Vertical section spacing

| Context | Value |
|---------|-------|
| Section py, mobile | 64px |
| Section py, desktop | 80px |

### Spacing scale

Tailwind default 4px base unit. Documented values in the styleguide:

| Step | px |
|------|----|
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 8 | 32px |
| 10 | 40px |
| 12 | 48px |
| 14 | 56px |
| 16 | 64px |
| 20 | 80px |
| 24 | 96px |
| 32 | 128px |

### Semantic spacing tokens

| Token | Value | Role |
|-------|-------|------|
| `--spacing-metrics` | `3rem` / 48px | Metrics row spacing in project cards |
| `--height-hairline` | `1.5px` | Section dividers |
| `--hero-min-height` | `600px` | Hero component minimum height |

### Border radius

Defined via `--radius: 0.45rem` base and computed variants in `@theme inline`:

| Token | Approximate value | Use |
|-------|-------------------|-----|
| `--radius-sm` | ~4px | Small elements |
| `--radius-md` | ~6px | Medium containers |
| `--radius-lg` | ~7px (base) | Default cards |
| `--radius-xl` | ~10px | Larger cards |
| `--radius-2xl` | ~13px | Sections, overlays |
| `--radius-3xl` | ~16px | Large containers |
| `--radius-4xl` | ~19px | Largest containers |
| `rounded-full` | 9999px | Buttons, tags, pill nav |

The styleguide shows these visually as: sm (4px), md (8px), lg (12px), xl (16px), full.

### Gallery layout

Gallery images in case studies follow this pattern:
- Single string = full-width image
- Two-item tuple `[a, b]` = two images side by side at 50% each

---

## 6. Depth and Elevation

### Shadows

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.08)` | Navbar tab active state, subtle lift |
| `--shadow-accent-glow` | `0 0 24px color-mix(in srgb, var(--accent) 20%, transparent)` | Accent highlight glow |

### Blur

| Token | Value | Use |
|-------|-------|-----|
| `--blur-navbar` | `12px` | Navbar frosted-glass effect |
| `--blur-lightbox` | `6px` | Lightbox image loading state |

### Elevation philosophy

Depth is achieved primarily through background contrast between layers, not through shadow stacking. The main depth mechanisms are:

1. Dark sections as visual anchors under light content
2. Backdrop blur on the sticky navbar
3. Gradient card overlay creating perceived depth on project cards
4. `--shadow-xs` reserved for small interactive feedback (tab selection)

---

## 7. Motion

All entrance animations use Framer Motion with `whileInView` + `viewport={{ once: true }}`.

| Property | Value |
|----------|-------|
| Ease | `[0.16, 1, 0.3, 1]` |
| Duration | `700ms to 900ms` |
| Stagger | `delay x 0.08 to 0.12` |
| Entrance | `opacity 0 to 1`, `y +20px to 0` |
| Hover transition | `200ms ease` |
| Link color transition | `200ms ease` (CSS `transition: color`) |
| Marquee animation | `25s linear infinite` (CSS `@keyframes marquee`) |

---

## 8. Borders

| Token | Value | Use |
|-------|-------|-----|
| `--border-1` | `1px solid var(--border-color)` | All borders in light sections |
| `--border-dark-1` | `1px solid var(--dark-border)` | All borders in dark sections |
| `--border-accent` | `2px solid var(--accent)` | Focused or highlighted borders |

---

## 9. Gradients

| Token | Value | Use |
|-------|-------|-----|
| `--gradient-hero-fade` | `linear-gradient(to bottom, transparent, var(--dark-bg))` | Hero section fade-to-dark |
| `--gradient-card-overlay` | `linear-gradient(to top, var(--overlay-card-bottom) 0%, var(--overlay-card-fade) 50%, transparent 100%)` | Project card overlay scrim |

---

## 10. Aspect Ratios

| Token | Value | Use |
|-------|-------|-----|
| `--aspect-card` | `4/3` | Project card images |
| `--aspect-cover` | `16/9` | Case study cover images |

---

## 11. Do's and Don'ts

### Do

- Use `text-[color:var(--token)]`, `bg-[color:var(--token)]`, `border-[color:var(--token)]` for all color references
- Use `var(--text-primary)` as the CTA button background on light surfaces
- Use `var(--accent)` only on hover states and highlights in light context
- Use `var(--accent-on-dark)` for the same purpose in dark sections
- Use `rounded-full` for all button and nav pill shapes
- Use Framer Motion `whileInView` with `viewport={{ once: true }}` for scroll entrance
- Add both `en` and `pt` keys to `lib/translations.ts` simultaneously for every new string
- Use `@phosphor-icons/react` for all new icons

### Don't

- Never use hex values, rgb/rgba, or hardcoded pixel values in JSX or component files
- Never use `style={{ }}` inline styles in JSX components
- Never use Lucide icons for new components (consolidated away from the codebase)
- Never write UI text directly in JSX; all strings live in `lib/translations.ts`
- Never add `"use client"` to layout, page, or work slug files; those remain Server Components
- Never import colors or spacing values from anywhere other than `app/globals.css` tokens
- Never create a new token without adding it to `app/globals.css` first, then the styleguide

---

## 12. Agent Prompt Guide

### Quick color reference

- Page background: `var(--bg)` / #fafafa
- Primary text: `var(--text-primary)` / #0f0f0f
- Secondary text: `var(--text-secondary)` / #3d3d3d
- Muted text: `var(--text-muted)` / #666666
- Surface: `var(--surface)` / #f0f0f0
- Border: `var(--border-color)` / #e5e5e5
- Dark hero bg: `var(--dark-bg)` / #080808
- Dark section bg: `var(--dark-section-bg)` / #0f0f0f
- Dark surface: `var(--dark-surface)` / #1a1a1a
- Accent (light): `var(--accent)` / #9333ea
- Accent (dark): `var(--accent-on-dark)` / #c084fc

### Example component prompts

- "Render a hero heading at `text-hero-lg font-semibold leading-hero tracking-tight-3` with `var(--dark-text-primary)` on `var(--dark-bg)`."
- "Create a CTA button: `text-[14px] font-medium px-5 py-2 rounded-full bg-[color:var(--text-primary)] text-[color:var(--bg)] hover:opacity-80 transition-all duration-200`."
- "Build a section label: `text-badge uppercase font-medium tracking-label` in `var(--text-muted)`."
- "Add a text link on a dark section: `text-[color:var(--dark-text-primary)] border-b border-[color:var(--dark-border)] hover:text-[color:var(--accent-on-dark)] hover:border-[color:var(--accent-on-dark)] transition-colors duration-200`."
- "Add a Framer Motion entrance: `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}`, `viewport={{ once: true }}`."

### Iteration checklist

1. Define or confirm the token exists in `app/globals.css` before using it
2. Use Tailwind classes that reference CSS variables; never hardcode values
3. Verify any new string is in `lib/translations.ts` for both `en` and `pt`
4. Update `app/styleguide/page.tsx` if any visual token or component changes
5. Match the container pattern: `max-w-[1100px] mx-auto px-6 md:px-8` for homepage sections
