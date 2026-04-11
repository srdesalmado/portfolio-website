---
name: 6-new-page
description: Build a page from a screenshot, Figma, or design reference using the project's existing components and design tokens. Use this skill whenever the user mentions "new page", "create page", "build page", "build screen", wants to turn a design into code, has a screenshot or Figma to implement, or needs to add a new route/view to the application. Also triggers on "implement this design", "code this screen", "turn this into a page", or any request to create a new page from a visual reference. This skill assumes --2-design-base has run and components exist. It assembles pages from what's already in the project.
---

# New Page

This skill takes a visual reference (screenshot, Figma, mockup) and builds a page by assembling existing components and design tokens. It prioritizes reusing what already exists in the project over creating anything new.

## Skill workflow position

```
  1-new-project     Technical foundation (architecture, CLAUDE.md)
  2-design-base     Visual foundation (globals.css, shadcn, styleguide)
  3-plan            Implementation planning (how to build it)
  4-spec            Product specification (what the app does)
  5-new-component   Add/install components
→ YOU ARE HERE
  6-new-page        Build pages from designs
  7-doc-sync        Keep documentation in sync
```

**Prerequisites:** `--2-design-base` must have run so `app/globals.css` has tokens and shadcn is initialized. Components from `--5-new-component` should exist for assembly.

## What to ask the user

One question: **"What page do you want to build and do you have a screenshot or Figma reference?"**

The user describes the page (dashboard, settings, landing, profile, etc.) and shares the visual. If they don't have a visual, ask for at least a rough description of the layout and sections.

## Before starting

1. **Read `app/globals.css`: primary source of truth for all design tokens**
2. **Read `CLAUDE.md`: project rules, architecture patterns, naming conventions**
3. **Read `architecture.md`** if it exists: folder structure, separation of concerns
4. **Check `docs/specs/`: if a spec exists for this page/feature, follow it**. The spec from `--4-spec` defines what the page does; the visual reference defines how it looks
5. **List existing components: scan `components/ui/` and `components/`** to know what's already available. Reuse first, install second, create last

## Workflow

### 1. Analyze the design visually

Look at the image and identify:

**Layout structure:**
- How many main sections/columns?
- Sidebar? Header? Footer?
- Grid structure (1-column, 2-column, 3-column)
- Container widths and spacing patterns

**UI sections:**
- Break down the page into logical sections (top to bottom, left to right)
- Name each section by its purpose (e.g., "Sidebar Navigation", "Task List", "Stats Grid")

**Content hierarchy:**
- Primary headings and their scale
- Main content vs. supporting content
- Call-to-action elements

### 2. Map visual elements to existing components

For each UI element identified, first check what already exists in the project:

1. **Already in `components/`?** Import and use directly
2. **Available in `components/ui/` (shadcn)?** Use directly
3. **Available in shadcn registry but not installed?** Install via MCP
4. **Doesn't exist anywhere?** Note it, but don't build it inline. Suggest running `--5-new-component` for it after the page is done

Use shadcn MCP to verify components exist and get install commands:
- `search_items_in_registries` for each component type
- `get_add_command_for_items` to get install commands

**Mapping table format:**

| Visual Element | Existing Component | Action |
|----------------|-------------------|--------|
| Navigation sidebar | `components/ui/sidebar` | Use as-is |
| Stats cards | `components/StatsCard` | Use as-is |
| Data table | Not installed | `npx shadcn@latest add table` |
| Custom chart | None | Flag for `--5-new-component`. |

### 3. Install missing shadcn components

Based on the mapping, install what's needed:

```bash
npx shadcn@latest add [component1] [component2] [component3] ...
```

### 4. Build the page: prototype first

Create `app/[page-name]/page.tsx` as a **visual prototype**: layout and structure with mock data. No API calls, no server actions, no real data fetching. This is intentional: get the visual right first, wire up functionality later (that's the `--3-plan` workflow).

```tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// ... import existing components

export default function PageName() {
  return (
    <div className="flex min-h-screen">
      {/* Assemble from existing components */}
    </div>
  )
}
```

**Styling rules:**
- All colors from `globals.css` tokens via Tailwind: `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`.
- Never hardcode hex values, rgb, or pixel values in JSX.
- Follow the spacing scale from `globals.css`.
- Follow the typography scale from `globals.css`.
- Follow border radius tokens from `globals.css`.

### 5. Responsive behavior

Define how the layout adapts:

- **Mobile (< 768px):** sidebar collapses, single column, stacked sections
- **Tablet (768px - 1024px):** sidebar as overlay or mini, adjusted grid
- **Desktop (> 1024px):** full layout as designed

```tsx
<div className="flex flex-col md:flex-row">
  <aside className="hidden md:block md:w-64">
    {/* Sidebar - hidden on mobile */}
  </aside>
  <main className="flex-1">
    {/* Main content */}
  </main>
</div>
```

### 6. Page metadata

```tsx
export const metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
}
```

## Source of truth hierarchy

```
globals.css          → primary truth (all token values)
  ↓
existing components  → reuse first, install second, create last
  ↓
page code            → assembles components, references tokens
  ↓
docs/specs/          → defines what the page does (if spec exists)
```

`design.md` is reference documentation: the page reads tokens directly from `globals.css`, not from `design.md`. The design.md is for humans and AI agents to understand the system; `globals.css` is what the code actually consumes.

## Directory structure

```
app/
└── [page-name]/
    └── page.tsx           # The new page (prototype with mock data)

components/
├── ui/                    # shadcn base (may have new installs)
└── [CustomComponent].tsx  # Existing custom components (reused)
```

## Output

- List of identified sections and component mapping
- Missing shadcn components installed
- Page created at `app/[page-name]/page.tsx` as visual prototype
- Responsive layout matching the design
- All styling via `globals.css` tokens
- Flagged components that need `--5-new-component` (if any)

## Next step

After building the page, tell the user based on context:

**If components were flagged:** "Page is built. I flagged [N] elements that need custom components. Run `--5-new-component` for each: [list them]."

**If working through a PRD:** "Page prototype is ready. Check your PRD (`docs/plans/prd-<name>.md`) for the next task. The functional wiring comes next."

**If building standalone:** "Page prototype is done with mock data. When you're ready to add real functionality, run `--3-plan` to plan the implementation."

**After several pages are built:** "Several pages were added. Consider running `--7-doc-sync` to keep documentation up to date."

## Notes

- **Prototype first**: visual layout with mock data only. Functionality comes later via `--3-plan` and execution.
- **Reuse over creation**: always check existing components before creating inline elements. If something needs to be a reusable component, flag it for `--5-new-component` rather than building it inside the page.
- **`globals.css` is the primary source of truth**: read it first, reference its tokens exclusively.
- **Follow the spec**: if `docs/specs/` has a spec for this page, the spec defines what exists and what it does.
- **Use shadcn MCP** to verify and install components.
- **Don't add functionality**: no API calls, no server actions, no real data. This is a visual prototype. Wiring up comes in a separate step.
