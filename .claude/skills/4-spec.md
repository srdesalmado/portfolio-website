---
name: 4-spec
description: Generate a structured product specification document (spec.md) that describes everything the application needs to do before any code is written. Use this skill whenever the user mentions "spec", "specification", "product spec", wants to document what an app should do, needs to define pages/screens/components/behaviors, or is planning a new feature or full application. Also use when the user says "describe the app", "what should it do", "define the product", or any variation of mapping out functionality before implementation. Run this after --3-plan has generated the PRD, to detail the full product specification.
---

# Product Specification Generator

This skill creates a structured specification document that maps out everything the application (or feature) needs to do. The spec is the single source of truth for what gets built: it feeds directly into the implementation tasks from `--3-plan`.

## Skill workflow position

```
  1-new-project     Technical foundation (architecture, CLAUDE.md)
  2-design-base     Visual foundation (globals.css, shadcn, styleguide)
  3-plan            Implementation planning (how to build it)
→ YOU ARE HERE
  4-spec            Product specification (what the app does)
  5-new-component   Add/install components
  6-new-page        Build pages from designs
  7-doc-sync        Keep documentation in sync
```

**Prerequisites:** Ideally --1-new-project, --2-design-base, and --3-plan have run, so the project has architecture, design tokens, and a PRD. If --3-plan hasn't run, the spec can still be created standalone.

## Why specs matter

Without a spec, AI agents receive vague instructions and fill in the gaps with assumptions. Those assumptions compound across pages and features, resulting in inconsistent behavior, missing edge cases, and rework. A good spec eliminates ambiguity before code exists.

## How it works

### Step 1: Understand scope

Ask the user:

1. **What are you speccing?** The full application, or a specific feature/module?
2. **Brief description**: what does it do, who is it for?
3. **Do you have existing docs?** Check for `architecture.md`, `design.md`, or prior specs in `docs/specs/`. If they exist, read them; they inform the spec.

If the user gives a broad description ("it's a task management app"), ask follow-up questions to uncover the core flows before writing. Don't guess: clarify.

### Step 2: Check for existing specs

Look for `docs/specs/` directory and any existing spec files.

- **If no specs exist**: create `docs/specs/spec.md` as the main spec.
- **If `spec.md` already exists**: ask the user: "A main spec already exists. Do you want to:
  - **Update it** (I'll merge new content into the existing spec)
  - **Create a new feature spec** (I'll create `docs/specs/spec-<feature-name>.md`)"
- **If creating a feature spec**: always ask for a short name (e.g., "auth", "payments", "onboarding") to use in the filename.

Also maintain `docs/specs/index.md`: a registry of all specs with their status.

### Step 3: Generate the spec

The spec follows a strict four-layer hierarchy: Overview → Pages → Components → Behaviors.

---

## Spec Document Structure

```markdown
# Spec: [Project Name or Feature Name]

> Status: draft | review | approved | implemented
> Created: [date]
> Last updated: [date]

## 1. Overview

### What is this?
[2-3 sentences describing the product/feature and its purpose]

### Target user
[Who uses this and what problem it solves for them]

### Core flows
[List the 3-5 most important things a user does in this app/feature, in order of priority]

1. [Primary flow: e.g. "User signs up and creates their first project"]
2. [Secondary flow: e.g. "User invites team members"]
3. ...

### Out of scope
[What this spec explicitly does NOT cover: prevents scope creep]

---

## 2. Pages

Each page/screen in the application, listed in logical navigation order.

### Page: [Page Name]
- **Route**: `/path`
- **Access**: public | authenticated | admin
- **Purpose**: What this page exists to do (one sentence)
- **Layout**: Brief description of the page layout (sidebar + main content, full-width, centered card, etc.)

---

## 3. Components

For each page, list every visible component the user interacts with.

### Page: [Page Name]

#### Component: [Component Name]
- **Type**: form | list | card | modal | navigation | data-display | action
- **Location**: Where on the page this component sits
- **Props/Data**: What data it needs to render
- **States**:
  - Default: [what it looks like normally]
  - Loading: [what it looks like while fetching data]
  - Empty: [what it looks like with no data]
  - Error: [what it looks like when something fails]

---

## 4. Behaviors

For each component that accepts user interaction, describe every action and its consequences.

### Page: [Page Name] / Component: [Component Name]

#### Behavior: [Action description: e.g. "User submits signup form"]
- **Trigger**: What the user does (click, submit, type, scroll, etc.)
- **Happy path**:
  1. [Step-by-step what happens when everything works]
  2. [Including server-side effects: DB writes, API calls, emails sent]
  3. [What the user sees as confirmation]
- **Validation**:
  - [Field-level validation rules]
  - [Form-level validation rules]
- **Error cases**:
  - [What happens if X fails → what the user sees]
  - [What happens if Y fails → what the user sees]
- **Edge cases**:
  - [Duplicate submission, slow network, expired session, etc.]
```

---

## Writing guidelines

### Be specific, not generic
Bad: "User can manage their profile"
Good: "User can update their display name (max 50 chars), email (requires re-verification), and avatar (upload JPG/PNG, max 2MB, cropped to square)"

### Every behavior needs error cases
If a behavior involves a server call, it can fail. Always describe what the user sees when it does. This is what separates a professional spec from a wishlist.

### Think in user journeys, not features
Order pages and behaviors by how a new user would encounter them. Start with onboarding, then core functionality, then settings/admin.

### Don't design the UI in the spec
The spec describes what exists and what it does, not how it looks. Visual decisions belong in `app/globals.css` and `design.md`. The spec says "a form with email and password fields": not "a centered card with rounded corners and a blue submit button."

---

## Specs Index (`docs/specs/index.md`)

Maintain this file whenever a spec is created or updated:

```markdown
# Specs Index

| Spec | File | Status | Created | Last Updated |
|------|------|--------|---------|--------------|
| Main Application | [spec.md](./spec.md) | draft | 2025-04-10 | 2025-04-10 |
| Authentication | [spec-auth.md](./spec-auth.md) | approved | 2025-04-11 | 2025-04-12 |
| Payments | [spec-payments.md](./spec-payments.md) | draft | 2025-04-13 | 2025-04-13 |
```

---

## Next step

After generating the spec, ask the user:

**"Spec is ready. Do you want to start implementing? I can begin executing the tasks from your PRD (`docs/plans/prd-<name>.md`)."**

If yes, suggest: "Let's start with Task 1. If it's a UI task, I'll use `--5-new-component` or `--6-new-page`. If it's data/logic, I'll implement directly."

If no PRD exists, suggest: "No PRD found. Run `--3-plan` to break this spec into implementable tasks with exact files to create and modify."

If the spec is large (many pages/features), suggest: "This spec has [N] pages. You might want to implement one feature at a time rather than all at once."
