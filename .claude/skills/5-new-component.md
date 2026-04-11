---
name: 5-new-component
description: Add, install, or customize a component using shadcn/ui and the project's design system. Use this skill whenever the user mentions "new component", "add component", "create component", "install component", wants to add a UI element (button, card, form, modal, table, etc.), or needs to customize a shadcn component with project-specific variants. Also triggers on "component showcase", "add to styleguide", or any request to extend the project's component library. This skill assumes --2-design-base has already run. If globals.css has no tokens, tell the user to run --2-design-base first.
---

# New Component

This skill adds components to the project. Either install from shadcn/ui or build custom ones, following the project's design tokens and updating the styleguide.

## Skill workflow position

```
  1-new-project     Technical foundation (architecture, CLAUDE.md)
  2-design-base     Visual foundation (globals.css, shadcn, styleguide)
  3-plan            Implementation planning (how to build it)
  4-spec            Product specification (what the app does)
→ YOU ARE HERE
  5-new-component   Add/install components
  6-new-page        Build pages from designs
  7-doc-sync        Keep documentation in sync
```

**Prerequisites:** `--2-design-base` must have run so `app/globals.css` has tokens and shadcn is initialized. If not, tell the user to run it first.

## What to ask the user

One question: **"What component do you need and where will it be used?"**

Examples: "a pricing card for the plans page", "a file upload with drag and drop", "a data table for the admin dashboard". The context of use matters because it determines which variants and states the component needs.

## Before starting

1. **Read `app/globals.css`**: this is the primary source of truth for all design tokens. Every color, radius, spacing decision comes from here.
2. **Read `design.md`** if it exists. This provides broader context on design philosophy, typography rules, and do's/don'ts.
3. **Search the codebase** for existing components that do something similar. Check `components/ui/` (shadcn base) and `components/` (custom). If something close already exists, extend it instead of creating a new one.

## Workflow

### 1. Check if the component exists in shadcn

Use shadcn MCP to search the registry:

- **Search**: `search_items_in_registries` with query "[component name]"
- **If found → view details**: `view_items_in_registries` to see structure and dependencies
- **Get usage examples**: `get_item_examples_from_registries` with query "[component]-demo"

**Decision:**
- Component exists in shadcn → Step 2 (Install)
- Component doesn't exist → Step 4 (Build Custom)

**Common shadcn components for reference:**
- **Layout**: Card, Separator, Tabs, Accordion, Collapsible
- **Forms**: Button, Input, Select, Checkbox, Radio, Switch, Textarea, Label, Form
- **Feedback**: Alert, Toast, Progress, Skeleton, Badge
- **Overlay**: Dialog, Drawer, Popover, Tooltip, Dropdown Menu, Context Menu, Alert Dialog
- **Navigation**: Navigation Menu, Breadcrumb, Pagination, Command
- **Data**: Table, Data Table, Calendar, Chart

### 2. Install shadcn component

Get the install command via shadcn MCP:
- `get_add_command_for_items` for the component

```bash
npx shadcn@latest add [component-name]
```

This adds the component to `components/ui/`. It automatically uses CSS variables from `globals.css`.

Review the installed component to understand:
- Available variants (size, style, etc.)
- Props interface
- How it references CSS variables

### 3. Customize component (if needed)

If the base component needs additional variants or behavior for the project, create a wrapped version in `components/[ComponentName].tsx`:

```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  intent?: 'default' | 'success' | 'warning' | 'info'
}

export function CustomButton({
  intent = 'default',
  className,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn(
        intent === 'success' && 'bg-success text-success-foreground hover:bg-success/90',
        intent === 'warning' && 'bg-warning text-warning-foreground hover:bg-warning/90',
        intent === 'info' && 'bg-info text-info-foreground hover:bg-info/90',
        className
      )}
      {...props}
    />
  )
}
```

**Customization patterns:**
- Add color variants using CSS variables from `globals.css` (`bg-success`, `text-warning`, etc.)
- Add size variants
- Compose multiple shadcn components together
- Add loading states, icons, or other features
- Never hardcode hex values, rgb, or pixel values: always reference tokens from `globals.css`

### 4. Build custom component (if not in shadcn)

If shadcn doesn't have this component, build it using:
- shadcn primitives as building blocks
- CSS variables from `globals.css` via Tailwind classes
- shadcn's patterns for consistency (cn utility, className prop, variant pattern)

```tsx
import { cn } from "@/lib/utils"

interface CustomWidgetProps {
  variant?: 'default' | 'primary' | 'muted'
  children: React.ReactNode
  className?: string
}

export function CustomWidget({
  variant = 'default',
  children,
  className
}: CustomWidgetProps) {
  return (
    <div className={cn(
      "rounded-lg border p-4",
      variant === 'default' && 'bg-card text-card-foreground border-border',
      variant === 'primary' && 'bg-primary text-primary-foreground border-primary',
      variant === 'muted' && 'bg-muted text-muted-foreground border-border',
      className
    )}>
      {children}
    </div>
  )
}
```

### 5. Create component showcase

Add to `app/styleguide/components/[component-name]/page.tsx`:

- All variants side by side (sizes, colors, styles)
- All states (default, hover, focus, disabled, loading)
- Dark mode preview (if applicable)
- Code examples for common use cases

Use examples from shadcn MCP (`get_item_examples_from_registries`) as reference.

### 6. Update styleguide navigation

Add the new component to `app/styleguide/navigation.ts`:

```ts
{
  title: "Components",
  items: [
    // ... existing components
    { name: "[Component Name]", href: "/styleguide/components/[component-name]" },
  ]
}
```

### 7. Sync styleguide page

Update `app/styleguide/page.tsx` to reflect any new tokens or component patterns introduced. This page must remain a 1:1 mirror of what exists in `globals.css`.

## Source of truth hierarchy

```
globals.css          → primary truth (all token values live here)
  ↓
component code       → consumes tokens via Tailwind classes
  ↓
styleguide/page.tsx  → visual mirror of globals.css tokens
  ↓
design.md       → documentation (updated periodically, not on every component)
```

`design.md` does NOT need to be updated for every single component addition. It gets updated when there are significant changes: new token categories, major design pattern shifts, or a batch of components that change the system meaningfully. For day-to-day component additions, `globals.css` + `styleguide/page.tsx` is enough.

## Directory structure

```
components/
├── ui/                    # Base shadcn components (auto-generated)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
└── [CustomComponent].tsx  # Customized/new components

app/
└── styleguide/
    ├── navigation.ts      # Updated with new component
    ├── page.tsx           # Tokens visual mirror (synced)
    └── components/        # Component showcases (one folder per component)
```

## Output

- Component installed/created in `components/`
- Showcase page in `app/styleguide/components/[name]/`
- Navigation updated in `app/styleguide/navigation.ts`
- `styleguide/page.tsx` synced if new tokens were introduced
- Component visible and navigable in the styleguide

## Next step

After creating the component, tell the user:

**"Component is ready and visible in the styleguide. Need to use it in a page? Run `--6-new-page` with your design reference."**

If the user is working through a PRD from `--3-plan`, remind them: "Check your PRD for the next task in the list."

If many components have been added in a batch, suggest: **"Several components were added: consider running `--7-doc-sync` to keep docs up to date."**

## Notes

- **Use shadcn MCP** to search, view, and get examples before building anything
- **`globals.css` is the primary source of truth**: always read it first, always reference its tokens
- **Extend, don't rebuild**: customize shadcn components rather than building from scratch
- **Search before creating**: check the codebase for existing components that can be reused or composed
