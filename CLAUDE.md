# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication

- **Toujours répondre en français.** L'utilisateur ne parle pas anglais.
- **Expliquer simplement, sans jargon technique.** L'utilisateur n'est pas développeur. Éviter les termes comme "hydration", "island", "build", "runtime", etc. sans les expliquer en mots simples. Privilégier des phrases courtes et concrètes (ex: "ce fichier gère les couleurs du site" plutôt que "ce module exporte les design tokens").

## Project Overview

Chill is a marketing/landing site for **ChillShell**, a mobile SSH terminal app. Built as a static site with Astro 5, Tailwind CSS 4, React 19 islands, and Motion (formerly Framer Motion) for animations. Bilingual EN/FR with dark/light theme support.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Preview production build locally
```

## Architecture

### Tech Stack
- **Astro 5** — Static site generator with file-based routing (`src/pages/`)
- **Tailwind CSS 4** — Configured via `@tailwindcss/vite` plugin (NOT a `tailwind.config.mjs` file — v4 uses CSS-based config in `src/styles/global.css` via `@theme {}` block)
- **React 19** — Interactive islands only (Astro hydration directives: `client:load`, `client:visible`)
- **Motion** — Scroll-triggered animations in React components

### Design Tokens & Theming
Colors, fonts, spacing, and effects are defined in two places that must stay in sync:
1. **`src/config/design-tokens.ts`** — TypeScript constants (used in components)
2. **`src/styles/global.css`** — CSS custom properties under `:root` (light) and `.dark` (dark), plus Tailwind v4 `@theme {}` block mapping to `chill-*` utility classes

Theme toggling uses the `.dark` class on `<html>`. An inline `<script>` in `BaseLayout.astro` detects preference before render to prevent flash.

All Tailwind color utilities use the `chill-*` prefix (e.g., `text-chill-text`, `bg-chill-elevated`, `border-chill-border`).

### Fonts
- **Headings:** Space Mono (monospace, bold)
- **Body:** Plus Jakarta Sans Variable (sans-serif)
- **Code:** JetBrains Mono

### i18n (EN/FR)
- Astro's built-in i18n: EN is default (no prefix), FR under `/fr/`
- Translations: `src/i18n/en.json` and `src/i18n/fr.json`
- Helpers: `getLangFromUrl()`, `t(lang, key)`, `getLocalePath(lang, path)` in `src/i18n/utils.ts`
- Every page in `src/pages/` has a mirrored version in `src/pages/fr/`
- Translation keys support both nested (`nav.tutos`) and flat (`nav.tutos.configOs`) resolution

### Page Structure
- **`src/layouts/BaseLayout.astro`** — Wraps all pages: SEO meta, OG tags, Header, Footer, scroll observer, background effects (dot grid, noise, glow)
- **`src/pages/index.astro`** — Homepage assembling: HeroChillShell, SectionPerspective, SectionFade, Differentiator, Pricing
- **`src/pages/tutos/*.astro`** — Tutorial pages (config-os, ssh, tailscale, bios, wol, agents-cli)
- **`src/pages/securite.astro`**, `faq.astro`, `updates.astro` — Info pages
- **`src/pages/mentions-legales.astro`**, `cgu.astro`, `politique-confidentialite.astro` — Legal pages

### Component Organization
- **`src/components/ui/`** — Reusable: Accordion, CodeBlock, Carousel, TabsOS, MethodTabs, StepImage, ThemeToggle, LanguageToggle
- **`src/components/home/`** — Homepage sections: HeroChillShell, SectionPerspective, SectionFade, Differentiator, Pricing
- **`src/components/layout/`** — Header, Footer, NavDropdown, MobileMenu
- **`src/components/tutos/`** — Tutorial-specific: TutoLayout, AgentCard, CompatTable, per-page content components (SshContent, ConfigOsContent, etc.)
- **`src/components/security/`** — SecuritySimple (Astro), SecurityDetail (React)

### Astro Island Pattern
`.astro` files handle static rendering. React `.tsx` components are used only where interactivity is needed (accordions, carousels, dropdowns, animations). Use `client:load` for above-fold interactive elements, `client:visible` for below-fold.

### Animations
- CSS: `data-animate` attribute + IntersectionObserver in BaseLayout adds `.is-visible` class
- CSS: `.animate-float`, `.animate-fade-in-up`, `.perspective-left/.perspective-right`
- React: Motion library for scroll-triggered reveals (`whileInView`, `variants`)

### Static Assets
- `public/images/logo-chill.png` — App logo
- `public/images/badges/` — Store badges
- `public/images/screenshots/` — App screenshots
- `public/images/tutos/` — Tutorial step images
