# Site Chill — Plan d'Implementation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construire le site vitrine Chill avec Astro + Tailwind + Motion, presentant ChillShell comme premier produit.

**Architecture:** Site statique Astro avec composants React (islands) pour les parties interactives (carrousels, accordeons, animations). Design tokens centralises, i18n EN/FR, dark/light mode avec detection auto.

**Tech Stack:** Astro 5, Tailwind CSS 4, Motion (ex Framer Motion), React 19, TypeScript, Vercel

**Design Reference:** `docs/plans/2026-02-09-site-chill-design.md` dans le projet VibeTerm

---

## PHASE 1 : Fondations (Projet + Design System + Layout)

### Task 1: Initialiser le projet Astro

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `tailwind.config.mjs`

**Step 1: Creer le projet Astro**

Run:
```bash
cd /home/huynh-kevin/projects/Chill
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```

**Step 2: Ajouter les integrations Astro**

Run:
```bash
npx astro add react tailwind
```

**Step 3: Installer Motion**

Run:
```bash
npm install motion
```

**Step 4: Installer les fonts**

Run:
```bash
npm install @fontsource-variable/inter @fontsource/jetbrains-mono
```

**Step 5: Initialiser git**

Run:
```bash
cd /home/huynh-kevin/projects/Chill
git init
git add .
git commit -m "init: astro project with react, tailwind, motion"
```

---

### Task 2: Creer le fichier de Design Tokens

**Files:**
- Create: `src/config/design-tokens.ts`

**Step 1: Ecrire les design tokens**

```typescript
// src/config/design-tokens.ts

export const colors = {
  dark: {
    bgPrimary: '#08090a',
    bgElevated: '#111214',
    border: '#1e2025',
    textPrimary: '#f7f8f8',
    textSecondary: '#8a8f98',
    accent: '#10B981',
    blue: '#4ea7fc',
    red: '#eb5757',
    green: '#4cb782',
    orange: '#fc7840',
  },
  light: {
    bgPrimary: '#fafafa',
    bgElevated: '#ffffff',
    border: '#e5e7eb',
    textPrimary: '#111214',
    textSecondary: '#6b7280',
    accent: '#059669',
    blue: '#2563eb',
    red: '#dc2626',
    green: '#16a34a',
    orange: '#ea580c',
  },
} as const;

export const typography = {
  fonts: {
    sans: '"Inter Variable", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
  },
  sizes: {
    heroH1: '4rem',       // 64px
    h2: '2.5rem',         // 40px
    h3: '1.5rem',         // 24px
    body: '1.0625rem',    // 17px
    bodySmall: '0.9375rem', // 15px
    code: '0.875rem',     // 14px
    micro: '0.8125rem',   // 13px
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '510',
  },
  letterSpacing: {
    heroH1: '-1.4px',
    h2: '-1px',
    h3: '-0.5px',
    body: '0',
    bodySmall: '-0.011em',
  },
} as const;

export const spacing = {
  headerHeight: '64px',
  pagePaddingInline: '24px',
  pageMaxWidth: '1024px',
  sectionGap: '120px',
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
  },
} as const;
```

**Step 2: Commit**

```bash
git add src/config/design-tokens.ts
git commit -m "feat: add centralized design tokens"
```

---

### Task 3: Configurer Tailwind avec les design tokens

**Files:**
- Modify: `tailwind.config.mjs`
- Create: `src/styles/global.css`

**Step 1: Configurer tailwind.config.mjs**

```javascript
// tailwind.config.mjs
import { colors, typography, spacing } from './src/config/design-tokens.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chill: {
          bg: 'var(--color-bg-primary)',
          elevated: 'var(--color-bg-elevated)',
          border: 'var(--color-border)',
          text: 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          accent: 'var(--color-accent)',
          blue: 'var(--color-blue)',
          red: 'var(--color-red)',
          green: 'var(--color-green)',
          orange: 'var(--color-orange)',
        },
      },
      fontFamily: {
        sans: [typography.fonts.sans],
        mono: [typography.fonts.mono],
      },
      fontSize: {
        'hero-h1': [typography.sizes.heroH1, { lineHeight: '1.06', letterSpacing: typography.letterSpacing.heroH1, fontWeight: typography.weights.semibold }],
        'h2': [typography.sizes.h2, { lineHeight: '1.1', letterSpacing: typography.letterSpacing.h2, fontWeight: typography.weights.semibold }],
        'h3': [typography.sizes.h3, { lineHeight: '1.3', letterSpacing: typography.letterSpacing.h3, fontWeight: typography.weights.medium }],
        'body': [typography.sizes.body, { lineHeight: '1.6' }],
        'body-sm': [typography.sizes.bodySmall, { lineHeight: '1.6', letterSpacing: typography.letterSpacing.bodySmall }],
        'code': [typography.sizes.code, { lineHeight: '1.5' }],
      },
      maxWidth: {
        page: spacing.pageMaxWidth,
      },
      borderRadius: {
        chill: spacing.radius.lg,
      },
    },
  },
  plugins: [],
};
```

**Step 2: Creer global.css avec les variables CSS**

```css
/* src/styles/global.css */
@import '@fontsource-variable/inter';
@import '@fontsource/jetbrains-mono';
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-bg-primary: #fafafa;
    --color-bg-elevated: #ffffff;
    --color-border: #e5e7eb;
    --color-text-primary: #111214;
    --color-text-secondary: #6b7280;
    --color-accent: #059669;
    --color-blue: #2563eb;
    --color-red: #dc2626;
    --color-green: #16a34a;
    --color-orange: #ea580c;
  }

  .dark {
    --color-bg-primary: #08090a;
    --color-bg-elevated: #111214;
    --color-border: #1e2025;
    --color-text-primary: #f7f8f8;
    --color-text-secondary: #8a8f98;
    --color-accent: #10B981;
    --color-blue: #4ea7fc;
    --color-red: #eb5757;
    --color-green: #4cb782;
    --color-orange: #fc7840;
  }

  body {
    @apply bg-chill-bg text-chill-text font-sans;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

**Step 3: Verifier que le build fonctionne**

Run: `cd /home/huynh-kevin/projects/Chill && npm run build`
Expected: Build OK sans erreurs

**Step 4: Commit**

```bash
git add tailwind.config.mjs src/styles/global.css
git commit -m "feat: configure tailwind with design tokens and CSS variables"
```

---

### Task 4: Configurer l'i18n (EN/FR)

**Files:**
- Create: `src/i18n/ui.ts`
- Create: `src/i18n/en.json`
- Create: `src/i18n/fr.json`
- Create: `src/i18n/utils.ts`
- Modify: `astro.config.mjs`

**Step 1: Configurer Astro i18n dans astro.config.mjs**

Ajouter au config existant :
```javascript
i18n: {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  routing: {
    prefixDefaultLocale: false,
  },
},
```

**Step 2: Creer le fichier ui.ts**

```typescript
// src/i18n/ui.ts
export const languages = {
  en: 'EN',
  fr: 'FR',
} as const;

export const defaultLang = 'en' as const;
export type Lang = keyof typeof languages;
```

**Step 3: Creer en.json (structure de base)**

```json
{
  "nav": {
    "tutos": "Tutos",
    "security": "Security",
    "updates": "Updates",
    "faq": "FAQ"
  },
  "nav.tutos.configOs": "OS Setup",
  "nav.tutos.ssh": "SSH",
  "nav.tutos.tailscale": "Tailscale",
  "nav.tutos.bios": "BIOS",
  "nav.tutos.wol": "Wake-on-LAN",
  "nav.tutos.agentsCli": "CLI Agents",
  "hero.tagline": "Your desktop terminal. In your pocket.",
  "hero.subtitle": "The SSH app built for vibe coding",
  "hero.playStore": "Play Store",
  "hero.appStore": "App Store",
  "footer.legal": "Legal",
  "footer.terms": "Terms",
  "footer.privacy": "Privacy"
}
```

**Step 4: Creer fr.json**

```json
{
  "nav": {
    "tutos": "Tutos",
    "security": "Securite",
    "updates": "Mises a jour",
    "faq": "FAQ"
  },
  "nav.tutos.configOs": "Config OS",
  "nav.tutos.ssh": "SSH",
  "nav.tutos.tailscale": "Tailscale",
  "nav.tutos.bios": "BIOS",
  "nav.tutos.wol": "Wake-on-LAN",
  "nav.tutos.agentsCli": "Agents CLI",
  "hero.tagline": "Ton terminal desktop. Dans ta poche.",
  "hero.subtitle": "L'app SSH pensee pour le vibe coding",
  "hero.playStore": "Play Store",
  "hero.appStore": "App Store",
  "footer.legal": "Mentions legales",
  "footer.terms": "CGU",
  "footer.privacy": "Confidentialite"
}
```

**Step 5: Creer utils.ts**

```typescript
// src/i18n/utils.ts
import { defaultLang, type Lang } from './ui';
import en from './en.json';
import fr from './fr.json';

const translations = { en, fr } as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'fr') return 'fr';
  return defaultLang;
}

export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return (value as string) ?? key;
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}
```

**Step 6: Commit**

```bash
git add astro.config.mjs src/i18n/
git commit -m "feat: add i18n support EN/FR"
```

---

### Task 5: Creer le BaseLayout avec Header et Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/ui/ThemeToggle.tsx`
- Create: `src/components/ui/LanguageToggle.tsx`
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/Footer.astro`
- Create: `src/components/layout/NavDropdown.tsx`

**Step 1: Creer ThemeToggle.tsx**

```tsx
// src/components/ui/ThemeToggle.tsx
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setIsDark(stored === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-chill text-chill-text-secondary hover:text-chill-text transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

**Step 2: Creer LanguageToggle.tsx**

```tsx
// src/components/ui/LanguageToggle.tsx
import { languages, type Lang } from '../../i18n/ui';
import { getLocalePath } from '../../i18n/utils';

interface Props {
  currentLang: Lang;
  currentPath: string;
}

export default function LanguageToggle({ currentLang, currentPath }: Props) {
  const otherLang: Lang = currentLang === 'en' ? 'fr' : 'en';
  const href = getLocalePath(otherLang, currentPath);

  return (
    <a
      href={href}
      className="text-xs font-mono text-chill-text-secondary hover:text-chill-text transition-colors px-2 py-1 border border-chill-border rounded-chill"
    >
      {languages[otherLang]}
    </a>
  );
}
```

**Step 3: Creer NavDropdown.tsx**

```tsx
// src/components/layout/NavDropdown.tsx
import { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  label: string;
  href: string;
}

interface Props {
  label: string;
  items: DropdownItem[];
}

export default function NavDropdown({ label, items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-body-sm text-chill-text-secondary hover:text-chill-text transition-colors flex items-center gap-1"
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 py-2 bg-chill-elevated border border-chill-border rounded-chill shadow-lg min-w-[180px] z-50">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-body-sm text-chill-text-secondary hover:text-chill-text hover:bg-chill-bg transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 4: Creer Header.astro**

```astro
---
// src/components/layout/Header.astro
import NavDropdown from './NavDropdown.tsx';
import ThemeToggle from '../ui/ThemeToggle.tsx';
import LanguageToggle from '../ui/LanguageToggle.tsx';
import { getLangFromUrl, t } from '../../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const currentPath = Astro.url.pathname;

const tutoItems = [
  { label: t(lang, 'nav.tutos.configOs'), href: '/tutos/config-os' },
  { label: t(lang, 'nav.tutos.ssh'), href: '/tutos/ssh' },
  { label: t(lang, 'nav.tutos.tailscale'), href: '/tutos/tailscale' },
  { label: t(lang, 'nav.tutos.bios'), href: '/tutos/bios' },
  { label: t(lang, 'nav.tutos.wol'), href: '/tutos/wol' },
  { label: t(lang, 'nav.tutos.agentsCli'), href: '/tutos/agents-cli' },
];
---

<header class="w-full">
  <!-- Logo Chill centre au-dessus -->
  <div class="flex flex-col items-center pt-8 pb-4">
    <a href="/" class="flex flex-col items-center gap-2">
      <img
        src="/images/logo-chill.png"
        alt="Chill"
        class="w-16 h-16 animate-float"
      />
      <span class="text-h3 font-semibold text-chill-text">Chill</span>
    </a>
  </div>

  <!-- Navbar -->
  <nav class="flex items-center justify-center gap-8 py-4 border-b border-chill-border">
    <NavDropdown label={t(lang, 'nav.tutos')} items={tutoItems} client:load />
    <a href="/securite" class="text-body-sm text-chill-text-secondary hover:text-chill-text transition-colors">
      {t(lang, 'nav.security')}
    </a>
    <a href="/updates" class="text-body-sm text-chill-text-secondary hover:text-chill-text transition-colors">
      {t(lang, 'nav.updates')}
    </a>
    <a href="/faq" class="text-body-sm text-chill-text-secondary hover:text-chill-text transition-colors">
      {t(lang, 'nav.faq')}
    </a>

    <div class="flex items-center gap-2 ml-4">
      <ThemeToggle client:load />
      <LanguageToggle currentLang={lang} currentPath={currentPath} />
    </div>
  </nav>
</header>
```

**Step 5: Creer Footer.astro**

```astro
---
// src/components/layout/Footer.astro
import { getLangFromUrl, t } from '../../i18n/utils';
const lang = getLangFromUrl(Astro.url);
---

<footer class="border-t border-chill-border py-8 mt-24">
  <div class="max-w-page mx-auto px-6 flex flex-wrap items-center justify-center gap-4 text-micro text-chill-text-secondary">
    <span>Chill</span>
    <span>© 2026 Chill</span>
    <a href="/mentions-legales" class="hover:text-chill-text transition-colors">
      {t(lang, 'footer.legal')}
    </a>
    <a href="/cgu" class="hover:text-chill-text transition-colors">
      {t(lang, 'footer.terms')}
    </a>
    <a href="/politique-confidentialite" class="hover:text-chill-text transition-colors">
      {t(lang, 'footer.privacy')}
    </a>
  </div>
</footer>
```

**Step 6: Creer BaseLayout.astro**

```astro
---
// src/layouts/BaseLayout.astro
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Chill — Your desktop terminal. In your pocket." } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <!-- Theme detection script (inline, runs before render) -->
    <script is:inline>
      const theme = (() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      })();
      document.documentElement.classList.toggle('dark', theme === 'dark');
    </script>
  </head>
  <body class="min-h-screen">
    <Header />
    <main class="max-w-page mx-auto px-6">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Step 7: Ajouter l'animation float dans global.css**

Ajouter a la fin de global.css :
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

**Step 8: Creer une page index.astro de test**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Chill — Your desktop terminal. In your pocket.">
  <div class="py-24 text-center">
    <h1 class="text-hero-h1 text-chill-text">Coming soon</h1>
    <p class="text-body text-chill-text-secondary mt-4">Site en construction</p>
  </div>
</BaseLayout>
```

**Step 9: Verifier que le build fonctionne**

Run: `cd /home/huynh-kevin/projects/Chill && npm run build`
Expected: Build OK

**Step 10: Commit**

```bash
git add .
git commit -m "feat: add base layout with header, footer, i18n, theme toggle"
```

---

## PHASE 2 : Composants UI reutilisables

### Task 6: Composant Accordion

**Files:**
- Create: `src/components/ui/Accordion.tsx`

Composant accordeon reutilisable avec animation d'ouverture/fermeture.
Props : `title: string`, `defaultOpen?: boolean`, `children: ReactNode`
Animation : hauteur qui s'anime avec Motion `animate` + `initial`.

**Commit:** `feat: add Accordion component`

---

### Task 7: Composant CodeBlock (style OpenClaw)

**Files:**
- Create: `src/components/ui/CodeBlock.tsx`

Composant bloc de code avec :
- Dots macOS en haut a gauche (rouge, jaune, vert)
- Tabs configurables (ex: Install / Run / Upgrade ou Windows / Mac / Linux)
- Bouton copier en haut a droite (copie dans le clipboard + feedback visuel)
- Fond `bg-elevated`, bordure subtile
- Police JetBrains Mono

**Commit:** `feat: add CodeBlock component (OpenClaw style)`

---

### Task 8: Composant Carousel

**Files:**
- Create: `src/components/ui/Carousel.tsx`

Composant carrousel avec :
- Auto-defilement (intervalle configurable, defaut 4s)
- Swipe manuel (touch events)
- Indicateurs de pagination (dots)
- Pause au hover
- Props : `images: string[]`, `autoPlay?: boolean`, `interval?: number`

**Commit:** `feat: add Carousel component with auto-scroll and swipe`

---

### Task 9: Composant TabsOS

**Files:**
- Create: `src/components/ui/TabsOS.tsx`

Composant tabs Windows / Mac / Linux avec :
- Icones OS
- Contenu conditionnel selon le tab selectionne
- Props : `children` rendus via render props ou slot pattern

**Commit:** `feat: add TabsOS component`

---

## PHASE 3 : Page d'accueil

### Task 10: Hero Chill (logo flottant)

**Files:**
- Create: `src/components/home/HeroChill.astro`
- Modify: `src/pages/index.astro`

Logo ICONE_APPLICATION.png centre avec animation flottante + "Chill" en dessous.
Halo vert subtil derriere le logo (radial-gradient).

**Commit:** `feat: add HeroChill with floating logo`

---

### Task 11: Hero ChillShell (produit)

**Files:**
- Create: `src/components/home/HeroChillShell.tsx`

Nom "ChillShell" + tagline + sous-titre + boutons stores.
Animation streaming mot par mot avec Motion (whileInView, variants par mot).

**Commit:** `feat: add HeroChillShell with streaming text animation`

---

### Task 12: Section Perspective (sections 1 & 2)

**Files:**
- Create: `src/components/home/SectionPerspective.tsx`

Composant reutilisable pour les sections avec image en perspective 3D + texte en trapeze.
Props : `side: 'left' | 'right'`, `images: string[]`, `title`, `description`
CSS : `transform: perspective(1000px) rotateY()` + `shape-outside` pour le texte.
Animation scroll reveal avec Motion.

**Commit:** `feat: add SectionPerspective with 3D image and trapezoid text`

---

### Task 13: Section Fade (section 3)

**Files:**
- Create: `src/components/home/SectionFade.tsx`

Section avec image droite + fondu transparent sur les bords + texte normal a cote.
CSS : mask-image avec linear-gradient pour le fade.
Animation scroll reveal.

**Commit:** `feat: add SectionFade with transparent edge fade`

---

### Task 14: Sections Differenciation + Pricing

**Files:**
- Create: `src/components/home/Differentiator.astro`
- Create: `src/components/home/Pricing.astro`

Differenciation : 4 arguments cles avec icones.
Pricing : essai gratuit + prix unique + boutons stores.

**Commit:** `feat: add Differentiator and Pricing sections`

---

### Task 15: Assembler la page d'accueil complete

**Files:**
- Modify: `src/pages/index.astro`

Assembler toutes les sections dans l'ordre :
1. HeroChill
2. HeroChillShell
3. SectionPerspective (gauche — terminal)
4. SectionPerspective (droite — connexions)
5. SectionFade (personnalisation)
6. Differentiator
7. Pricing

**Commit:** `feat: assemble complete homepage`

---

## PHASE 4 : Pages Tutos

### Task 16: TutoLayout (tabs OS + accordeons)

**Files:**
- Create: `src/components/tutos/TutoLayout.astro`

Layout commun pour toutes les pages tutos : titre + TabsOS + accordeons.
Le contenu des accordeons change selon le tab OS selectionne.

**Commit:** `feat: add TutoLayout with OS tabs and accordions`

---

### Task 17: Pages Config OS, SSH, Tailscale

**Files:**
- Create: `src/pages/tutos/config-os.astro`
- Create: `src/pages/tutos/ssh.astro`
- Create: `src/pages/tutos/tailscale.astro`

Contenu repris des docs existants, adapte au format web.

**Commit:** `feat: add Config OS, SSH, Tailscale tutorial pages`

---

### Task 18: Pages BIOS et WoL

**Files:**
- Create: `src/pages/tutos/bios.astro`
- Create: `src/pages/tutos/wol.astro`

BIOS : pas de tabs OS, accordeons par marque (ASUS ROG d'abord).
WoL : tabs OS + accordeons + avertissement + checklist debug.

**Commit:** `feat: add BIOS and Wake-on-LAN tutorial pages`

---

### Task 19: Page Agents CLI

**Files:**
- Create: `src/components/tutos/CompatTable.tsx`
- Create: `src/components/tutos/AgentCard.tsx`
- Create: `src/pages/tutos/agents-cli.astro`

Tableau compatibilite en haut + cards agents avec accordeons + blocs de code.

**Commit:** `feat: add Agents CLI page with compatibility table`

---

## PHASE 5 : Pages restantes

### Task 20: Page Securite

**Files:**
- Create: `src/pages/securite.astro`
- Create: `src/components/security/SecuritySimple.astro`
- Create: `src/components/security/SecurityDetail.tsx`

Version simple en haut + cards techniques en accordeons avec blocs de code.

**Commit:** `feat: add Security page with simple + detailed views`

---

### Task 21: Page Updates

**Files:**
- Create: `src/pages/updates.astro`

Cards par version avec accordeons + liens telechargement.

**Commit:** `feat: add Updates page with version cards`

---

### Task 22: Page FAQ

**Files:**
- Create: `src/pages/faq.astro`

Accordeons questions/reponses.

**Commit:** `feat: add FAQ page`

---

### Task 23: Pages Legal

**Files:**
- Create: `src/pages/mentions-legales.astro`
- Create: `src/pages/cgu.astro`
- Create: `src/pages/politique-confidentialite.astro`

Contenu legal standard.

**Commit:** `feat: add legal pages`

---

## PHASE 6 : SEO + Polish + Deploy

### Task 24: SEO meta tags et Open Graph

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

Ajouter meta tags SEO, Open Graph, favicon, sitemap.

**Commit:** `feat: add SEO meta tags and Open Graph`

---

### Task 25: Responsive mobile

**Files:**
- Modifier les composants selon besoin

Tester et ajuster tous les composants pour mobile.
Header : hamburger menu en mobile.
Carrousels : swipe tactile.

**Commit:** `feat: make all pages responsive`

---

### Task 26: Deployer sur Vercel

**Step 1:** Creer le repo GitHub

**Step 2:** Push le code

**Step 3:** Connecter a Vercel, deployer

**Commit:** `chore: deploy to Vercel`

---

## RESUME DES PHASES

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-5 | Fondations (projet, tokens, layout, i18n, header/footer) |
| 2 | 6-9 | Composants UI (Accordion, CodeBlock, Carousel, TabsOS) |
| 3 | 10-15 | Page d'accueil complete |
| 4 | 16-19 | Pages Tutos (6 pages) |
| 5 | 20-23 | Pages Securite, Updates, FAQ, Legal |
| 6 | 24-26 | SEO, Responsive, Deploy |
