# carlos.psd — Product Designer Portfolio

A bilingual (EN/PT) portfolio website built to showcase product design work, case studies, and process. This is my first large low-code application — designed and shipped by a product designer using [Claude Code](https://claude.ai/code) as the primary development tool.

## About

Senior product designer with a background in brand, UX, and design systems. This portfolio reflects both the work I do and how I think about building products — with strong opinions on design tokens, component architecture, and visual consistency.

## Architecture Highlights

- **Token-based design system** — `app/globals.css` is the single source of truth for all visual properties. No hardcoded hex values, no arbitrary pixel values anywhere in the codebase.
- **No CMS, no external data fetching** — all content lives in `lib/` as typed TypeScript constants, keeping the project simple and fast.
- **Bilingual i18n** — full EN/PT support via a custom context + localStorage, with all copy centralized in `lib/translations.ts`.
- **Server-first** — layout and page files are React Server Components by default; `"use client"` is only added where strictly necessary.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/srdesalmado/portfolio-website
cd portfolio-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running with Claude Code

This project is set up to work with [Claude Code](https://claude.ai/code). After cloning:

```bash
# Install Claude Code globally if needed
npm install -g @anthropic-ai/claude-code

# Open the project
claude
```

### Preview server setup

The preview server requires a shell script that sets the correct `PATH` for Node.js. Claude Code will recreate it automatically each session, but if you need to set it up manually, run this once:

```bash
cat > /tmp/portfolio-dev.sh << 'EOF'
#!/bin/bash
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
cd "/path/to/portfolio-website"
exec node "./node_modules/next/dist/bin/next" dev --webpack
EOF
chmod +x /tmp/portfolio-dev.sh
```

Replace `/path/to/portfolio-website` with the absolute path to the cloned repo, and verify that `node` is at `/usr/local/bin/node` (run `which node`). Then update `.claude/launch.json` to point to this script.

> The script lives in `/tmp/` and is cleared on reboot. To recreate it, tell Claude Code: "recria o script do servidor".

## Project Structure

```
app/              # Next.js App Router (layout, pages, globals.css)
components/       # React components (Hero, ProjectCard, AboutSection, etc.)
lib/              # Data layer — projects.ts, translations.ts, utils.ts
public/           # Static assets
app/styleguide/   # Internal design system reference (/styleguide)
CLAUDE.md         # Rules and conventions for Claude Code
DESIGN.md         # Full design system documentation
```

## A Note on How This Was Built

I'm a product designer, not a software engineer. This project was my first serious attempt at shipping a full web application — and I did it almost entirely through Claude Code, Anthropic's AI coding tool.

The experience felt like pair programming with a very fast senior engineer: I described what I wanted, reviewed what was generated, pushed back on decisions that felt wrong, and made every visual and architectural call myself. Claude wrote the code; I directed it.

What surprised me most wasn't how much code I could ship — it was how much I learned about engineering tradeoffs by being forced to articulate design decisions in technical terms.

## Author

**Carlos Salmado**, Product Designer

[LinkedIn](https://www.linkedin.com/in/carlospsd/)
