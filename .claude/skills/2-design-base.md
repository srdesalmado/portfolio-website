---
name: 2-design-base
description: Extract design tokens from a visual reference and set up the complete design system foundation. Includes globals.css, shadcn/ui with MCP, styleguide page, and design.md. Use this skill whenever the user mentions "design system", "design base", "design tokens", "setup design", "extract tokens", "styleguide", "design foundation", wants to initialize a project's visual identity from a screenshot/Figma/brand guide, or is starting a new project and needs the visual foundation before building components. This is the visual counterpart to --1-new-project: it sets up architecture, design-base sets up the visual layer. Do NOT use this skill for creating custom components or personalizing existing ones: this skill delivers the token foundation + shadcn defaults only.
---

# Design Base

This skill analyzes a visual reference (screenshot, Figma, brand guide, or any design inspiration) and sets up the complete design system foundation for a project. It extracts tokens, initializes shadcn/ui with MCP, creates a live styleguide, and generates `design.md` as documentation.

The skill delivers the base layer only: tokens and shadcn template components. Custom component creation and personalization belong to `--5-new-component`.

## Skill workflow position

```
  1-new-project     Technical foundation (architecture, CLAUDE.md)
→ YOU ARE HERE
  2-design-base     Visual foundation (globals.css, shadcn, styleguide)
  3-plan            Implementation planning (how to build it)
  4-spec            Product specification (what the app does)
  5-new-component   Add/install components
  6-new-page        Build pages from designs
  7-doc-sync        Keep documentation in sync
```

**Prerequisite:** `--1-new-project` should have run first so `architecture.md` and `CLAUDE.md` exist.

## Source of truth

`app/globals.css` is the **primary source of truth** for all design tokens. Every other file reads from it:

```
globals.css          → PRIMARY (all token values defined here)
  ↓
styleguide/page.tsx  → visual mirror (1:1 of globals.css)
  ↓
design.md       → documentation (generated once, updated only in batch)
```

`design.md` is generated once during this skill's execution and only updated when significant design changes accumulate (new token categories, major palette shifts, etc.). Day-to-day work reads from `globals.css` directly: not from `design.md`.

## What to ask the user

One question before starting:

**"What are you building and do you have a brand, Figma, or visual reference to use as base?"**

The user describes the project (SaaS, portfolio, e-commerce, internal tool, etc.) and shares their reference: a screenshot, Figma link, brand guideline PDF, uploaded image, or a URL to a site they like.

Everything else (font, colors, radius, spacing, dark mode strategy) is inferred from the visual reference. If the user has no reference at all, ask them to find at least one screenshot of inspiration (Dribbble, Behance, a site they admire) before proceeding.

## Workflow

### 1. Analyze the visual reference

Look at the provided image/reference and extract:

**Colors:**
- Primary/brand color → generate full scale (50-900)
- Neutral/grey colors → generate full scale (50-900)
- Semantic colors (success, error, warning, info)
- Background and surface colors
- Border colors

**Typography:**
- Font family: identify from the visual (Google Fonts match preferred)
- Heading sizes and weights
- Body text sizes
- Letter-spacing patterns: tight for headings, normal/wide for labels

**Spacing & Radius:**
- Spacing rhythm (tight, normal, relaxed)
- Border radius style (sharp, rounded, pill)

**Shadows:**
- Shadow style (none, subtle, prominent)

**Dark mode:**
- Decide based on the visual: is it a toggle-based dark mode, structurally dark sections, or light-only? This is your call: don't ask the user.

If colors or details aren't clearly visible in the reference, make reasonable inferences using color theory. Generate harmonious scales. Ensure WCAG 4.5:1 contrast ratio for all text/background pairs. Note what was inferred vs. directly extracted.

### 2. Initialize shadcn/ui

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Neutral (will be overridden by extracted tokens)
- CSS variables: Yes

### 3. Install shadcn MCP

```bash
npx shadcn@latest mcp init --client claude
```

If using pnpm:
```bash
pnpm dlx shadcn@latest mcp init --client claude
```

If the MCP install fails, read the troubleshooting docs before retrying:
https://ui.shadcn.com/docs/mcp

### 4. Generate `app/globals.css`

Replace or create `app/globals.css` with extracted design tokens. Follow this structure:

```css
@import "tailwindcss";

:root {
  /* === BASE === */
  --background: [extracted page background];
  --foreground: [extracted text color];

  /* === CARD === */
  --card: [extracted card/surface background];
  --card-foreground: [extracted card text];

  /* === POPOVER / DROPDOWN / TOOLTIP === */
  --popover: [same as card or white];
  --popover-foreground: [same as card-foreground];

  /* === PRIMARY (main brand color) === */
  --primary: [extracted primary color];
  --primary-foreground: [white or dark based on contrast];

  /* === SECONDARY === */
  --secondary: [light grey or muted version];
  --secondary-foreground: [dark text];

  /* === MUTED === */
  --muted: [light grey background];
  --muted-foreground: [medium grey text];

  /* === ACCENT === */
  --accent: [same as secondary or slight tint];
  --accent-foreground: [dark text];

  /* === DESTRUCTIVE === */
  --destructive: [red/error color];
  --destructive-foreground: [white];

  /* === BORDERS & INPUTS === */
  --border: [extracted border color];
  --input: [slightly darker border for inputs];
  --ring: [primary color for focus rings];

  /* === BORDER RADIUS === */
  --radius: [extracted radius, e.g., 0.5rem];

  /* === CHART COLORS === */
  --chart-1: [primary];
  --chart-2: [complementary];
  --chart-3: [variation];
  --chart-4: [variation];
  --chart-5: [variation];

  /* === SIDEBAR === */
  --sidebar: [sidebar background];
  --sidebar-foreground: [sidebar text];
  --sidebar-primary: [primary];
  --sidebar-primary-foreground: [white];
  --sidebar-accent: [accent];
  --sidebar-accent-foreground: [dark text];
  --sidebar-border: [border color];
  --sidebar-ring: [primary];

  /* === SEMANTIC COLORS === */
  --success: [green];
  --success-foreground: [white];
  --warning: [yellow/orange];
  --warning-foreground: [dark for contrast];
  --info: [blue];
  --info-foreground: [white];
}

.dark {
  /* Inverted values for dark mode: generate all tokens */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: [extracted font], sans-serif;
}
```

If `app/globals.css` already exists with tokens, merge: don't blindly overwrite. Preserve any custom tokens the user may have added.

### 5. Install the font

Add the extracted font to `app/layout.tsx` via Next.js font loader:

```tsx
import { [Font] } from 'next/font/google'

const font = [Font]({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
```

If the font isn't on Google Fonts, use the closest match and note it.

### 6. Create the styleguide

Create the following files:

**`app/styleguide/navigation.ts`**: navigation config

```ts
export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
    ]
  },
  {
    title: "Components",
    items: [
      // Components will be added here by --5-new-component
    ]
  }
]
```

**`app/styleguide/layout.tsx`**: layout with sidebar navigation

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "./navigation"

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-card p-6 flex flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto">
        <div>
          <Link href="/styleguide" className="text-xl font-bold">
            Design System
          </Link>
        </div>
        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 ml-64 overflow-auto">
        {children}
      </main>
    </div>
  )
}
```

**`app/styleguide/page.tsx`**: display ALL design tokens visually

- Color palette: all colors as swatches with CSS variable names
- Primary scale: 50 through 900
- Grey/neutral scale: 50 through 900
- Semantic colors: success, warning, error, info
- Typography: heading and body text samples at each scale step
- Border radius: visual examples of each size
- Shadows: shadow examples
- Spacing: visual spacing scale
- Dark mode toggle: preview both themes (if applicable)

This page is a 1:1 mirror of the tokens in `globals.css`. No component demos: just the raw foundation rendered visually.

### 7. Generate/update `design.md`

Create `design.md` documenting the full design system. Follow this structure:

1. **Visual Theme and Atmosphere**: overall design direction, key characteristics
2. **Color Palette and Roles**: every token with hex value, organized by context (light, dark, semantic, overlays)
3. **Typography Rules**: font family, full type scale table (role, token, size, weight, line-height, tracking), principles
4. **Layout Principles**: container widths, padding, vertical spacing, spacing scale, border radius tokens
5. **Depth and Elevation**: shadows, blur, elevation philosophy
6. **Motion**: animation defaults (ease, duration, stagger, entrance patterns)
7. **Borders**: border tokens and usage
8. **Do's and Don'ts**: clear rules for using the system correctly
9. **Agent Prompt Guide**: quick color reference table + example component prompts using the tokens, so any AI agent can instantly apply the design system

If `design.md` already exists, update it with new tokens while preserving any custom sections the user added. Add a sync timestamp at the top:

```markdown
> Last synced: [date] via 2-design-base
```

---

## Sync Rule

`app/globals.css` is the primary source of truth. `app/styleguide/page.tsx` is its visual mirror: they must always be in sync.

**Mandatory flow for any token change:**
1. Define or update the token in `app/globals.css`
2. Update the component consuming the token (Tailwind class or CSS class)
3. Update `app/styleguide/page.tsx` so the visual representation reflects the change

`design.md` does NOT need to be updated on every token change. It's documentation that gets refreshed periodically: when there are significant design shifts or a batch of accumulated changes. Don't slow down the workflow by updating design.md every time a color changes.

---

## Directory structure

```
app/
├── globals.css              # Token definitions (source of truth)
├── layout.tsx               # Font installed here
└── styleguide/
    ├── layout.tsx           # Shared layout with sidebar
    ├── navigation.ts        # Navigation config
    └── page.tsx             # All design tokens rendered visually
design.md                    # Full design system documentation (project root)
```

---

## Design summary

After setup, provide the user with a quick summary:

- **Primary color**: [hex and color name]
- **Font**: [font name]
- **Style**: [e.g., "Modern minimal", "Bold colorful", "Soft friendly"]
- **Border radius**: [e.g., "Rounded 8px", "Sharp", "Pill"]
- **Overall feel**: [brief description]
- **What was inferred**: [list anything that wasn't directly visible in the reference]

---

## Next step

After completing the design base, tell the user:

**"Design system is ready: tokens in `globals.css`, styleguide at `/styleguide`, docs in `design.md`. Next step: run `--3-plan` to plan the implementation before building it."**

If the project is simple or the user already knows what to build, they can skip to `--5-new-component` or `--6-new-page` directly.

---

## Notes

- If colors aren't clearly visible, make reasonable inferences and document them
- Generate harmonious color scales using color theory
- Ensure sufficient contrast for accessibility (WCAG 4.5:1 for text)
- Chart colors should be visually distinct from each other
- When in doubt, use shadcn defaults as fallback
- This skill does NOT create custom components: it delivers the foundation only
