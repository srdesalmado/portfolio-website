---
name: 7-doc-sync
description: Review project documentation (architecture.md, CLAUDE.md, readme.md) against the current codebase, report what's outdated, and apply updates only after user confirmation. Use this skill whenever the user mentions "doc-sync", "sync docs", "update docs", "documentation is outdated", "refresh architecture", "update readme", or after significant project changes like adding new features, changing stack, refactoring folder structure, or modifying patterns. Also use when the user says "my docs are stale", "update project docs", or any variation of keeping documentation in sync with reality. This skill should be run periodically, especially after completing a batch of implementation tasks from --3-plan, --5-new-component, or --6-new-page. This skill does NOT touch CSS, design tokens, or code files. It only reads and updates documentation.
---

# Documentation Sync

This skill reads the project's documentation, compares it against the current state of the codebase, reports what's outdated, and updates only after the user confirms. It never changes code, CSS, or design tokens: only documentation files.

## Skill workflow position

```
  1-new-project     Technical foundation (architecture, CLAUDE.md)
  2-design-base     Visual foundation (globals.css, shadcn, styleguide)
  3-plan            Implementation planning (how to build it)
  4-spec            Product specification (what the app does)
  5-new-component   Add/install components
  6-new-page        Build pages from designs
→ YOU ARE HERE
  7-doc-sync        Keep documentation in sync
```

**When to run:** After completing a batch of implementation tasks. Other skills (`--3-plan`, `--5-new-component`, `--6-new-page`) will suggest running `--7-doc-sync` when they detect that significant changes have been made.

## Why doc-sync matters

Projects evolve fast, especially with AI-assisted development. After a few implementation sessions, the architecture doc might reference patterns that were refactored, the CLAUDE.md might list a folder structure that no longer exists, and the README might describe features that have been completely reworked. When an AI reads outdated docs, it makes decisions based on false information.

## Scope: what this skill touches

**Reads and updates (with user confirmation):**
- `architecture.md`
- `CLAUDE.md` (project root)
- `README.md` (project root)

**Reads but does NOT modify:**
- `app/globals.css`: reads to understand current tokens, but never modifies
- `design.md`: reads for context, but design.md updates happen via `--2-design-base`
- Source code files: reads to understand the project state, never modifies

## How it works

### Step 1: Scan the project (read-only)

Read the current state of the codebase to understand reality:

1. **Folder structure**: `ls` / `tree` the project to see what actually exists
2. **Package dependencies**: read `package.json`, `requirements.txt`, `Cargo.toml`, or whatever the project uses
3. **Existing code patterns**: sample key files to understand current naming conventions, architecture patterns, and organizational decisions
4. **Environment & config**: check for `.env.example`, config files, docker compose, CI/CD files
5. **Key commands**: check scripts in `package.json` to verify what commands exist

### Step 2: Read existing documentation

Read each documentation file that exists:

- `architecture.md`
- `CLAUDE.md` (project root)
- `README.md` (project root)

For each file, compare what it says vs. what the codebase actually shows.

### Step 3: Build the report

Identify discrepancies and build a clear report. Common things to check:

**architecture.md**:
- Folder structure matches actual directories?
- Tech stack table matches actual dependencies?
- Naming conventions match what's actually used in code?
- Architectural patterns described match actual code organization?
- Security rules still accurate?
- Any new patterns emerged that aren't documented?

**CLAUDE.md**:
- Project overview still accurate?
- Key commands still work? (cross-reference with package.json scripts)
- Folder structure matches reality?
- Architecture rules still reflect actual patterns?
- Are there new common patterns that should be documented?

**README.md**:
- Project description still accurate?
- Setup instructions still work?
- Feature list matches what's actually built?
- Environment variables documented match `.env.example`?
- Are there new sections needed (API docs, deployment, contributing)?

### Step 4: Present the report to the user: STOP and wait

Present the report clearly. **Do not apply any changes until the user confirms.**

Format:

```
## Doc-Sync Report

### architecture.md
- UPDATE: Folder structure: added `src/integrations/` directory (not in current docs)
- UPDATE: Tech stack: project now uses Resend for email (not documented)
- OK: Naming conventions still match

### CLAUDE.md
- UPDATE: Key commands: `npm run test:e2e` was added to package.json
- UPDATE: Folder structure: needs to match architecture.md changes
- OK: Architecture rules still accurate

### README.md
- UPDATE: Features section: "Payments" feature was implemented but not listed
- UPDATE: Environment variables: RESEND_API_KEY needs to be documented
- CREATE: API documentation section (project now has 12 API routes)

### Files not found
- README.md does not exist: suggest creating one
```

Then ask: **"Here's what I found. Should I apply all changes, let you pick specific ones, or skip for now?"**

Wait for the user to respond. Do not proceed until they confirm.

### Step 5: Apply updates (only after user confirmation)

When the user confirms, apply changes following these rules:

1. **Preserve custom content**: If the user has added custom sections or notes (especially in CLAUDE.md), never remove or overwrite them. Sections that clearly contain hand-written content are sacred.

2. **Add, don't rewrite**: When possible, update specific sections rather than regenerating the entire document. Preserve the user's voice and nuances.

3. **Mark what changed**: At the top of each updated document, add or update the sync timestamp:
   ```markdown
   > Last synced: [date] via 7-doc-sync
   ```

4. **Maintain consistency across docs**: If the folder structure changes in `architecture.md`, the same change must be reflected in `CLAUDE.md`. Keep documents internally consistent.

5. **Missing files**: If a doc doesn't exist and the user wants it created:
   - `architecture.md` / `CLAUDE.md` → generate from scratch based on the codebase (follow templates from `--1-new-project`)
   - `README.md` → generate using the template below

---

## README.md template

If README.md needs to be created or significantly rewritten:

```markdown
# [Project Name]

[One-line description]

## Features
- [Feature 1]: [brief description]
- [Feature 2]: [brief description]

## Tech Stack
[Brief list of core technologies]

## Getting Started

### Prerequisites
[What needs to be installed]

### Installation
```bash
[Step-by-step setup commands]
```

### Environment Variables
Create a `.env.local` file with:
```
VARIABLE_NAME=description
```

### Running the Project
```bash
[Commands to start development]
```

## Project Structure
```
[Current folder structure]
```

## Contributing
[If applicable]

## License
[If applicable]
```

---

## When to suggest running doc-sync

If you notice during any other task that documentation is outdated (e.g., while reading `architecture.md` during a `--3-plan` and seeing it doesn't match the code), mention it: "I noticed `architecture.md` is out of date: you might want to run `--7-doc-sync` after this task."

---

## Next step

After syncing, tell the user based on context:

**If the project is actively being built:** "Docs are synced. Continue with your current task: next PRD task, or `--5-new-component` / `--6-new-page` if you're building UI."

**If this was a periodic sync:** "Documentation is up to date. Everything looks consistent across architecture.md, CLAUDE.md, and README.md."

**If major gaps were found:** "I updated the docs, but some areas need your input: [describe what needs manual review]. Take a look when you have a moment."
