---
name: 1-new-project
description: Initialize a new project with foundational documentation: architecture.md, design.md, and CLAUDE.md. Use this skill whenever the user mentions starting a new project, setting up project foundations, initializing project docs, creating project structure, "new project", "project setup", "project init", "kickoff", or any request to create foundational project documentation. This is always the FIRST skill to run on a new project. It sets up the technical foundation before any visual or product work begins.
---

# Project Starter

This skill generates the three foundational documents every project needs before a single line of code is written. These documents serve as the source of truth for both humans and AI agents working on the project.

## Skill workflow position

```
→ YOU ARE HERE
  1-new-project     Technical foundation (architecture, CLAUDE.md)
  2-design-base     Visual foundation (globals.css, shadcn, styleguide)
  3-plan            Implementation planning (how to build it)
  4-spec            Product specification (what the app does)
  5-new-component   Add/install components
  6-new-page        Build pages from designs
  7-doc-sync        Keep documentation in sync
```

## Why this matters

Without these documents, AI agents (and developers) make inconsistent decisions: different naming conventions, duplicated components, mixed architectural patterns, security gaps. The starter creates alignment upfront so every future task follows the same playbook.

## How it works

### Step 1: Gather project context

Before generating anything, ask the user these questions (skip any they've already answered in the conversation):

1. **What are you building?** (brief description of the product/app)
2. **What's the tech stack?** (framework, database, auth, hosting: e.g. "Next.js, Supabase, Tailwind, Vercel")
3. **Who's the target user?** (helps inform design decisions)
4. **Any specific integrations?** (payments, email, analytics, external APIs)
5. **Do you have an existing design reference?** (Figma, screenshot, site you like)

If the user is vague on stack, suggest a sensible default based on what they're building and confirm before proceeding.

### Step 2: Check for existing files

Before writing, check if `architecture.md`, `design.md`, or `CLAUDE.md` already exist in the project root.

- **If none exist**: create all three from scratch.
- **If some exist**: read the existing ones, show the user what you found, and ask: "These files already exist: do you want me to overwrite them or merge new content into the existing ones?" Never silently overwrite.

### Step 3: Generate the three documents

Create all three documents at the project root.

---

## Output 1: `architecture.md`

This document defines the technical skeleton of the project. It should cover:

### Structure

```markdown
# Architecture: [Project Name]

## Overview
Brief description of the project and its core technical decisions.

## Tech Stack
| Layer        | Technology     | Why                              |
|-------------|----------------|----------------------------------|
| Framework   | e.g. Next.js   | SSR, file-based routing, etc.    |
| Database    | e.g. Supabase  | Auth + DB + realtime in one      |
| Styling     | e.g. Tailwind  | Utility-first, consistent design |
| Hosting     | e.g. Vercel    | Zero-config deploys for Next.js  |

## Folder Structure
```
src/
├── app/              # Routes / pages
├── components/       # Reusable UI components
│   ├── ui/           # Base components (Button, Input, Card...)
│   └── features/     # Feature-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions, API clients
├── actions/          # Server actions (if applicable)
├── types/            # TypeScript type definitions
└── styles/           # Global styles, theme tokens
```

## Key Architectural Decisions

### Separation of Concerns
- **UI components** never contain business logic or direct API calls
- **Hooks** bridge UI and server: they handle state, call actions, manage loading/error
- **Actions/API routes** handle all server-side logic, DB queries, external API calls
- **Why**: This prevents the "fix one thing, break another" problem. When logic is isolated, changes don't cascade

### Naming Conventions
- Files: kebab-case (`user-profile.tsx`)
- Components: PascalCase (`UserProfile`)
- Hooks: camelCase with `use` prefix (`useUserProfile`)
- Actions: camelCase with verb prefix (`createUser`, `fetchPosts`)
- Types: PascalCase with descriptive suffix (`UserProfile`, `CreateUserInput`)

### Security Rules
- NEVER put API keys, secrets, or sensitive logic in client-side code
- ALL auth checks happen server-side (middleware or server actions)
- Database queries ONLY happen in server actions or API routes
- User input is ALWAYS validated server-side before processing
- Environment variables: `.env.local` for secrets, NEXT_PUBLIC_ prefix only for truly public values

### State Management
Define the approach: React Context, Zustand, server state via React Query, etc. Explain why.

### Error Handling
Define the pattern: try/catch in actions, error boundaries in UI, toast notifications, etc.

### Authentication Flow
How auth works end-to-end: provider, session management, protected routes, role-based access.
```

Adapt sections to match the actual stack. If using a backend framework like Express or FastAPI instead of Next.js, adjust folder structure and patterns accordingly.

---

## Output 2: `design.md`

This document defines the visual language of the project. It prevents the AI from making inconsistent design choices across pages.

### Structure

```markdown
# Design System: [Project Name]

## Design Philosophy
One paragraph describing the visual direction. E.g.: "Clean, professional, trust-building. Think Stripe meets Linear: generous whitespace, sharp typography, subtle animations."

## Color Palette

### Core Colors
| Token           | Value     | Usage                        |
|----------------|-----------|------------------------------|
| --primary      | #XXXX    | CTAs, active states, links    |
| --primary-hover| #XXXX    | Hover state for primary       |
| --secondary    | #XXXX    | Secondary actions, accents    |
| --background   | #XXXX    | Page background               |
| --surface      | #XXXX    | Cards, modals, elevated areas |
| --text         | #XXXX    | Primary text                  |
| --text-muted   | #XXXX    | Secondary/helper text         |
| --border       | #XXXX    | Borders, dividers             |
| --error        | #XXXX    | Error states                  |
| --success      | #XXXX    | Success states                |
| --warning      | #XXXX    | Warning states                |

### Dark Mode (if applicable)
Same tokens with dark mode values.

## Typography

| Role      | Font            | Size  | Weight | Line Height |
|----------|-----------------|-------|--------|-------------|
| H1       | e.g. Inter      | 2rem  | 700    | 1.2         |
| H2       |                 | 1.5rem| 600    | 1.3         |
| H3       |                 | 1.25rem| 600   | 1.4         |
| Body     |                 | 1rem  | 400    | 1.6         |
| Small    |                 | 0.875rem| 400  | 1.5         |
| Caption  |                 | 0.75rem| 400   | 1.4         |

## Spacing Scale
Define the spacing system: 4px base, or Tailwind's default scale, etc.

## Component Patterns

### Buttons
- Primary: solid background, white text
- Secondary: outlined or ghost
- Sizes: sm, md, lg
- Always include loading and disabled states

### Forms
- Labels always visible (no placeholder-only labels)
- Error messages below the input, in red
- Required fields marked with asterisk

### Cards
- Consistent border-radius, shadow, padding
- Define the standard card pattern used throughout

### Modals/Dialogs
- Overlay with backdrop blur
- Max-width, centered
- Close via X button, Escape key, and backdrop click

### Navigation
- Define the nav pattern: sidebar, top bar, tabs, etc.

## Animation & Transitions
- Default transition: `150ms ease` for hovers, `200ms ease` for entrances
- Page transitions: describe approach
- Loading states: skeleton screens vs spinners vs progress bars

## Responsive Breakpoints
| Name | Width   | Behavior           |
|------|---------|--------------------|
| sm   | 640px   | Mobile             |
| md   | 768px   | Tablet             |
| lg   | 1024px  | Desktop            |
| xl   | 1280px  | Large desktop      |

## Iconography
Define the icon library (Lucide, Heroicons, etc.) and usage guidelines.
```

Customize fully based on the user's preferences, references, and target audience.

---

## Output 3: `CLAUDE.md` (project root)

This is the file Claude Code reads automatically at the start of every task. It's the AI's operating manual for this project.

### Structure

```markdown
# CLAUDE.md: [Project Name]

## Project Overview
One-line description of what this project is.

## Tech Stack
[Brief list: framework, DB, styling, hosting]

## Key Commands
```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # Run linter
npm run test       # Run tests
```

## Project Structure
[Copy the folder structure from architecture.md: keep it in sync]

## Architecture Rules (follow these strictly)

1. **UI components are pure**: no API calls, no business logic, no direct DB access
2. **Hooks handle state**: they call actions, manage loading/error/data states
3. **Actions handle logic**: server-side only, all DB queries and external API calls live here
4. **Never duplicate components**: before creating a new component, search the project for existing ones that do something similar. Extend or compose instead of duplicating
5. **Security first**: no secrets in client code, all auth checks server-side, validate all input server-side

## Naming Conventions
- Files: kebab-case
- Components: PascalCase
- Hooks: useXxx
- Actions: verbNoun (createUser, fetchPosts)

## Design System
Read `app/globals.css` for design tokens (primary source of truth). Read `architecture.md` for architectural decisions (primary source of truth for technical decisions). Read `design.md` for broader design context and guidelines.

## Before Implementing Any Task
1. Read this file
2. Read `architecture.md` for the full architecture context
3. Read `app/globals.css` for design tokens
4. Search the codebase for existing code you can reuse
5. Plan which files to create/modify before writing code

## Common Patterns
[Add patterns specific to the stack: e.g. how to create a new page, how to add a new API route, how to create a protected route, etc.]
```

The CLAUDE.md should be concise and actionable. It's read at the start of every task, so brevity matters: point to the other docs for details rather than duplicating content.

---

## Next step

After generating all three documents, tell the user:

**"Technical foundation is ready. Next step: run `--2-design-base` with your visual reference (screenshot, Figma, or brand guide) to set up the design tokens, shadcn/ui, and the styleguide."**

If the user mentioned a design reference in step 1, remind them to use it: "You mentioned [reference] earlier: use that when you run `--2-design-base`."
