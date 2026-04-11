---
name: 3-plan
description: Generate a detailed Product Requirements Document (prd.md) that breaks a feature or task into an actionable implementation plan with exact files to create/modify. Use this skill whenever the user mentions "plan", "prd", "planning", "break down", "implementation plan", wants to plan before coding, needs to research the codebase before a task, or wants to know exactly which files to touch for a feature. Also triggers on "how should I implement", "what files do I need", or any request to turn a spec or idea into step-by-step development tasks. Run this after --2-design-base has set up the visual foundation.
---

# Implementation Planner (PRD Generator)

This skill takes a feature description or spec and produces a detailed implementation plan: a PRD that tells the AI (or developer) exactly what to build, where to build it, and how, so there's zero guesswork during execution.

## Skill workflow position

```
  1-new-project     Technical foundation (architecture, CLAUDE.md)
  2-design-base     Visual foundation (globals.css, shadcn, styleguide)
→ YOU ARE HERE
  3-plan            Implementation planning (how to build it)
  4-spec            Product specification (what the app does)
  5-new-component   Add/install components
  6-new-page        Build pages from designs
  7-doc-sync        Keep documentation in sync
```

**Prerequisites:** Ideally a spec exists in `docs/specs/`. If not, the plan can be based on the user's description: but suggest running `--4-spec` first for complex features.

## Why planning before coding matters

When an AI agent receives a vague task like "add authentication", it has to make dozens of decisions: which files to create, which existing files to modify, what patterns to follow, which libraries to use. Each decision is a coin flip that might conflict with the rest of the project. The PRD eliminates this by front-loading all decisions into a research phase.

The most powerful part: when the PRD lists the exact files to create or modify, the AI only touches those files during execution. No rogue changes, no "fix one thing, break another."

## How it works

### Step 1: Understand the task

Ask the user:

1. **What feature or task are you planning?** (brief description)
2. **Is there a spec for this?** Check `docs/specs/` for a relevant spec file, if one exists from a previous --4-spec run. If one exists, read it: it's the primary input for the plan.
3. **Any constraints or preferences?** (specific library, approach, deadline)

If a spec exists (e.g., `docs/specs/spec-auth.md`), the plan should implement exactly what the spec describes. If no spec exists, the plan is based on the user's description: but suggest they run `--4-spec` first for complex features.

### Step 2: Research the codebase

Before writing the plan, do a thorough codebase scan. This is the step that prevents code duplication and ensures consistency:

1. **Read foundational docs**: `CLAUDE.md`, `architecture.md`: understand the project's patterns and conventions
2. **Read `app/globals.css`**: understand the design tokens (primary source of truth for all visual decisions)
3. **Search for related code**: Look for existing components, hooks, actions, types, and utilities that relate to the feature. Use grep/glob to find them
4. **Identify reusable pieces**: Note existing code that can be extended or composed rather than recreated
5. **Check dependencies**: Look at `package.json` (or equivalent) for already-installed libraries relevant to the task
6. **Understand the data model**: Check existing DB schemas, types, or models that the feature will interact with

This research phase is what makes the plan valuable: without it, you're just guessing.

### Step 3: Check for existing plans

Look for `docs/plans/` directory.

- **If no plans directory exists**: create it and generate `docs/plans/prd-<feature-name>.md`
- **If directory exists**: check for a plan with the same feature name
  - **If plan exists**: ask the user: "A plan for this feature already exists. Do you want to update it or start fresh?"
- Always ask for a short feature name if the user hasn't provided one (e.g., "auth", "payments", "dashboard")

### Step 4: Generate the PRD

---

## PRD Document Structure

```markdown
# PRD: [Feature Name]

> Status: draft | approved | in-progress | completed
> Spec: [link to spec file if exists, or "none"]
> Created: [date]
> Last updated: [date]

## 1. Summary

### What
[One paragraph: what is being built]

### Why
[One paragraph: what problem this solves, or what value it adds]

### Dependencies
[External services, libraries, or APIs this feature needs]
- [Dependency 1]: [what it's used for]
- [Dependency 2]: [what it's used for]

---

## 2. Existing Code Analysis

### Reusable code found
[List existing files/components/hooks that this feature should use or extend: with file paths]

| Existing File | What It Does | How to Reuse |
|--------------|--------------|--------------|
| `src/components/ui/button.tsx` | Base button component | Use for all CTAs in this feature |
| `src/hooks/useAuth.ts` | Auth state management | Extend with new permissions |

### Patterns to follow
[Reference existing patterns in the codebase that this feature should be consistent with]
- "Data fetching follows the pattern in `src/hooks/usePosts.ts`: use the same approach"
- "Server actions follow the pattern in `src/actions/posts.ts`"

---

## 3. Database Changes

### New tables
[If the feature requires new DB tables/collections]

| Table | Columns | Purpose |
|-------|---------|---------|
| [table_name] | id, user_id, ... | [what it stores] |

### Modified tables
[If existing tables need new columns or indexes]

### Migrations
[Steps to migrate the database, if applicable]

---

## 4. Implementation Tasks

Break the feature into small, ordered tasks. Each task should be completable in a single AI session without exceeding context limits.

### Task order strategy
1. **Data layer first**: models, types, DB migrations
2. **Server logic second**: actions, API routes, integrations
3. **UI prototypes third**: pages and components (visual only, no functionality) → use `--6-new-page` and `--5-new-component`
4. **Wire it up last**: hooks that connect UI to server logic

This order means each layer can be tested independently, and later layers build on stable foundations.

---

### Task 1: [Task title]

**Description**: [What this task accomplishes: 2-3 sentences]

**Acceptance criteria**:
- [ ] [Specific, testable outcome]
- [ ] [Another outcome]

**Files to create**:
| File | Purpose |
|------|---------|
| `src/path/new-file.ts` | [what this file does] |

**Files to modify**:
| File | Changes |
|------|---------|
| `src/path/existing-file.ts` | [specific changes: add export, update type, etc.] |

**Scenarios**:
- **Happy path**: step-by-step what happens when everything works
- **Error case**: what happens on failure, how it's handled
- **Edge case**: unusual but possible scenarios

---

### Task 2: [Task title]
[Same structure as Task 1]

---

[Continue for all tasks...]

---

## 5. Security Considerations

[Feature-specific security concerns]
- [ ] [e.g., "All payment endpoints require authenticated session"]
- [ ] [e.g., "User can only access their own data: enforce row-level security"]
- [ ] [e.g., "Rate limit login attempts to 5 per minute per IP"]

---

## 6. Testing Strategy

### Unit tests
[What should be unit tested and why]

### Integration tests
[What flows should be tested end-to-end]

### Manual QA checklist
- [ ] [Test scenario 1]
- [ ] [Test scenario 2]
```

---

## Writing guidelines

### The file list is sacred
The "Files to create" and "Files to modify" tables are the most important part of the PRD. Be precise: include full paths relative to project root. If an AI agent follows this plan, it should touch ONLY these files and nothing else.

### Tasks should be small enough to not overwhelm context
A good rule: if a task would require the AI to hold more than 10-15 files in context simultaneously, break it into smaller tasks. Each task should be focused enough that the AI can complete it without forgetting what it's doing.

### Research before prescribing
Don't assume a file needs to be created if one already exists that could be extended. Don't prescribe a library if the project already uses a different one for the same purpose. The research step exists precisely to avoid these mistakes.

### Prototype tasks before functional tasks
Following the workflow pattern: first create all pages/components as visual prototypes (static UI, mock data) via `--6-new-page`, then create functional tasks that wire them to real data and server logic. This separation makes bugs easier to isolate.

---

## Next step

After generating the PRD, ask the user:

**"PRD is ready at `docs/plans/prd-<name>.md`. Do you want to clear the context and start fresh before moving on?"**

If yes, suggest: "Start a new conversation and run `--4-spec` to detail the product specification, or jump straight to Task 1 if you already know what to build."

If no, suggest: "Next step: run `--4-spec` to define the product specification in detail, or start executing Task 1 if the scope is already clear."

If the PRD has many tasks, add: "You have [N] tasks. I recommend tackling them one at a time in order."

After a batch of tasks is complete, suggest: **"Several files changed. Consider running `--7-doc-sync` to keep your documentation up to date."**
