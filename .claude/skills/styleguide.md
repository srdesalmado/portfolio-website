# Styleguide — carlos.psd Portfolio

**Invoke this skill whenever the user mentions "styleguide" or asks about tokens, colors, spacing, visual rules, or component appearance.**

## Two sources of truth — always in sync

| Source | File | Role |
|--------|------|------|
| **Code** | `app/globals.css` | Token definitions — the authoritative values (`:root`, `@theme`) |
| **Visual** | `app/styleguide/page.tsx` | Live visual representation — 1:1 mirror of every token and component |

Both are equally authoritative. `globals.css` defines what exists. `app/styleguide/page.tsx` shows what it looks like in practice. A change to one that isn't reflected in the other is an incomplete change.

`lib/tokens.ts` mirrors token values as TypeScript and feeds the styleguide page — keep it in sync with `globals.css` as well.

### Mandatory workflow — token or component change
1. Define or update the token in `app/globals.css`
2. Mirror the value in `lib/tokens.ts` (if it's a named token)
3. Update the real component in `components/` consuming the token
4. **Update `app/styleguide/page.tsx`** so the visual demo reflects the change

### Mandatory workflow — designer-driven visual change
When the designer asks to change something visual ("update this button", "change badge style"):
1. Identify which token(s) are involved — ask if unclear
2. Update `app/globals.css` first
3. Update the real component in `components/`
4. Update the styleguide demo in `app/styleguide/page.tsx`
5. All three change together — never one in isolation

### Styleguide page rules
- Every specimen must use the same tokens and Tailwind classes as the real component
- No hardcoded values in the styleguide page — all visual properties from CSS tokens
- If the real component changes and the styleguide is not updated → violation, flag immediately
- If a value is shown in the styleguide but the token doesn't exist in `globals.css` → add the token first

Never hardcode values in the styleguide page. Never skip `lib/tokens.ts` when changing a token in `globals.css`.

---

## Tailwind 4 — Critical Gotchas

### Solid hex colors → `bg-[var(--token)]` works
```tsx
bg-[var(--bg)]           // #fafafa — OK
bg-[var(--dark-surface)] // #1a1a1a — OK
```

### rgba colors → NEVER `bg-[var(--token)]`, use `[background-color:var(--token)]`
```tsx
// WRONG — Tailwind 4 breaks rgba with bg-[]
bg-[var(--overlay-hero)]

// CORRECT
[background-color:var(--overlay-hero)]
```

### Gradients → NEVER `bg-[var(--token)]`, use `[background-image:var(--token)]`
```tsx
// WRONG — bg- sets background-color, not background-image
bg-[var(--gradient-card-overlay)]

// CORRECT
[background-image:var(--gradient-card-overlay)]

// OR native Tailwind gradient
bg-gradient-to-b from-transparent to-[var(--dark-bg)]
```

### Font sizes → variable must be `--text-*` in @theme (NOT `--font-size-*`)
```css
/* CORRECT — generates text-hero-sm, text-h2, etc. */
@theme { --text-hero-sm: 2.25rem; }

/* WRONG — Tailwind 4 does not recognize --font-size-* */
@theme { --font-size-hero-sm: 2.25rem; }
```

### Aspect ratios → use `aspect-card` / `aspect-cover` (defined in @theme)
```tsx
// WRONG — Tailwind 4 cannot resolve aspect-ratio via var() in []
aspect-[var(--aspect-card)]

// CORRECT — token in @theme, native utility class
aspect-card
aspect-cover
```

---

## Available Tokens — @theme (native Tailwind utilities)

### Layout
| Token | Class | Value |
|-------|-------|-------|
| `--max-width-page` | `max-w-page` | 1100px |
| `--max-width-case` | `max-w-case` | 1200px |

### Font sizes
| Token | Class | Value |
|-------|-------|-------|
| `--text-badge` | `text-badge` | 13px |
| `--text-h2` | `text-h2` | 28px |
| `--text-h1` | `text-h1` | 40px |
| `--text-hero-sm` | `text-hero-sm` | 36px |
| `--text-hero-lg` | `text-hero-lg` | 80px |
| `--text-metric` | `text-metric` | clamp(2rem, 4vw, 3rem) |
| `--text-display` | `text-display` | clamp(2rem, 5vw, 3.5rem) |

### Line heights
| Token | Class | Value |
|-------|-------|-------|
| `--leading-body` | `leading-body` | 1.75 |
| `--leading-body-alt` | `leading-body-alt` | 1.7 |
| `--leading-hero` | `leading-hero` | 1.04 |
| `--leading-heading` | `leading-heading` | 1.1 |
| `--leading-cta` | `leading-cta` | 1.05 |
| `--leading-display` | `leading-display` | 1.06 |

### Letter spacing
| Token | Class | Value |
|-------|-------|-------|
| `--tracking-label` | `tracking-label` | 0.18em |
| `--tracking-tight-2` | `tracking-tight-2` | -0.02em |
| `--tracking-tight-25` | `tracking-tight-25` | -0.025em |
| `--tracking-tight-3` | `tracking-tight-3` | -0.03em |

### Aspect ratios
| Token | Class | Value |
|-------|-------|-------|
| `--aspect-card` | `aspect-card` | 4/3 |
| `--aspect-cover` | `aspect-cover` | 16/9 |

---

## Available Tokens — :root (via `var()`)

### Light palette
```
--bg              #fafafa       bg-[var(--bg)]
--surface         #f0f0f0       bg-[var(--surface)]
--border-color    #e5e5e5       border-[var(--border-color)]
--text-primary    #0f0f0f       text-[color:var(--text-primary)]
--text-secondary  #3d3d3d       text-[color:var(--text-secondary)]
--text-muted      #666666       text-[color:var(--text-muted)]
```

### Dark palette (dark sections)
```
--dark-bg             #080808   bg-[var(--dark-bg)]
--dark-section-bg     #0f0f0f   bg-[var(--dark-section-bg)]
--dark-surface        #1a1a1a   bg-[var(--dark-surface)]
--dark-border         #2a2a2a   border-[var(--dark-border)]
--dark-text-primary   #f0f0f0   text-[color:var(--dark-text-primary)]
--dark-text-secondary #c4c4c4   text-[color:var(--dark-text-secondary)]
--dark-text-muted     #999999   text-[color:var(--dark-text-muted)]
```

### Accent
```
--accent          #9333ea (purple-600)   light context
--accent-on-dark  #c084fc (purple-400)   dark context
```
Hover states: `hover:text-purple-600` (light) / `hover:text-purple-400` (dark) — allowed exceptions.

### Overlays (rgba — use `[background-color:var(--token)]`)
```
--overlay-backdrop    rgba(0,0,0,0.85)   lightbox
--overlay-hero        rgba(0,0,0,0.55)   hero dark overlay
--overlay-card-bottom rgba(0,0,0,0.72)   card scrim base
--overlay-card-fade   rgba(0,0,0,0.18)   card scrim soft
--glass-light         rgba(255,255,255,0.1)
--glass-medium        rgba(255,255,255,0.2)
```

### Gradients (use `[background-image:var(--token)]`)
```
--gradient-hero-fade      linear-gradient(to bottom, transparent, dark-bg)
--gradient-card-overlay   linear-gradient(to top, card-bottom 0%, card-fade 50%, transparent)
```

### Navbar (rgba — use `[background-color:var(--token)]`)
```
--navbar-bg-dark          rgba(8,8,8,0.97)
--navbar-bg-light         rgba(250,250,250,0.97)
--navbar-bg-scroll-light  rgba(255,255,255,0.95)
--navbar-bg-scroll-alt    rgba(255,255,255,0.9)
```

### Misc
```
--blur-navbar       12px    backdrop-blur-[var(--blur-navbar)]
--blur-lightbox     6px     backdrop-blur-[var(--blur-lightbox)]
--spacing-metrics   3rem    pr-[var(--spacing-metrics)] etc.
--hero-min-height   600px   min-h-[var(--hero-min-height)]
--max-w-lightbox    90vw    max-w-[var(--max-w-lightbox)]
--max-h-lightbox    90vh    max-h-[var(--max-h-lightbox)]
--height-hairline   1.5px   h-[var(--height-hairline)]
--shadow-xs         0 1px 2px rgba(0,0,0,0.08)
--shadow-accent-glow 0 0 24px accent/20
```

### Styleguide grid layouts (internal use only)
```
--grid-type-table      grid-cols-[var(--grid-type-table)]
--grid-row-label       grid-cols-[var(--grid-row-label)]
--grid-component-row   grid-cols-[var(--grid-component-row)]
```

---

## Correct Usage Patterns

### Text in light context
```tsx
<h2 className="text-h2 md:text-h1 font-semibold tracking-tight-25 text-[color:var(--text-primary)]">
<p className="text-base leading-body text-[color:var(--text-secondary)]">
<span className="text-sm uppercase tracking-label text-[color:var(--text-muted)]">
```

### Text in dark context
```tsx
<h1 className="text-hero-sm md:text-hero-lg font-semibold leading-hero tracking-tight-3 text-[color:var(--dark-text-primary)]">
<p className="text-base leading-body-alt text-[color:var(--dark-text-secondary)]">
```

### Dark rgba overlay
```tsx
<div className="absolute inset-0 [background-color:var(--overlay-hero)]" />
```

### Bottom fade gradient
```tsx
<div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[var(--dark-bg)]" />
```

### Card with aspect ratio
```tsx
<div className="w-full rounded-xl overflow-hidden aspect-card bg-[var(--dark-surface)]">
```

### Page containers
```tsx
// Homepage sections
<div className="max-w-page mx-auto px-8">

// Case study
<div className="max-w-case mx-auto px-8">
```

### Inline styles — allowed exceptions
Only three component types may use inline `style={{}}`:
1. **ColorChip** — `backgroundColor: \`var(${varName})\`` (dynamic variable name)
2. **RadiusChip** — `borderRadius: px` (dynamic numeric value)
3. **SpacingChip** — `width: px` (dynamic numeric value)
4. **ShadowChip** — `chipStyle` prop (dynamic effects: boxShadow, backdropFilter)

All other inline styles are violations. Flag immediately.

---

## Absolute Rules

- **No hardcoded values** — no hex, rgba, arbitrary px/rem, arbitrary em
- **No inline styles** — never `style={{}}` outside the four demo exceptions above
- **Token doesn't exist?** — add it to `globals.css` first, then use it
- **Unsure which token to use?** — ask before writing any code
- **Violation detected?** — flag it immediately before continuing
