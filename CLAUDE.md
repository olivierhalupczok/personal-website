# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Sources of information
- [LinkedIn](https://www.linkedin.com/in/olivier-halupczok/)
- cv tmp/cv.pdf


## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build static site to dist/
npm run preview  # Preview production build
```

## Critical Constraint

**The initial HTML payload must be under 14kb (gzipped)** to fit within the first TCP round trip. This enables instant rendering without waiting for additional network requests. Verify with:

```bash
npm run build && gzip -c dist/index.html | wc -c
```

You must not mention that I advise the Polish Ministry of Digital Affairs on AI adoption strategy. I

## Architecture

This is a GenAI Engineer portfolio built with **Astro + Preact**, optimized for a <14kb critical rendering path.

### Performance Strategy

- **Critical CSS**: Inlined in `src/layouts/Layout.astro` for first paint
- **Deferred CSS**: `public/styles/deferred.css` loaded async (animations, below-fold styles)
- **Preact Island**: `ContactForm.tsx` uses `client:visible` directive - only loads when scrolled into view
- **Lazy SVG icons**: External files in `public/icons/` with `loading="lazy"`

### Key Files

- `src/layouts/Layout.astro` - Base layout with inlined critical CSS, SEO meta tags, scroll observer
- `src/components/ContactForm.tsx` - Only Preact component (interactive form with Formspree)
- `public/styles/deferred.css` - Animations, glassmorphism effects, section-specific styles

### Design System

- Dark glassmorphism theme with indigo accent (`#2563eb`)
- `.glass` class for frosted glass effect
- `[data-animate]` attributes trigger CSS animations via IntersectionObserver

## Git

All commits must use **conventional commits** format:

```
type(scope): description

feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting (no code change)
refactor: Code restructuring
perf:     Performance improvement
chore:    Maintenance tasks
```
