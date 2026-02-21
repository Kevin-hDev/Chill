# Chill

Site officiel de l'écosystème **Chill** — une suite d'applications open source pour l'accès à distance, la configuration système et la sécurité.

**Site web** : [chill.app](https://chill.app)

---

## L'écosystème Chill

Chill regroupe plusieurs applications conçues pour les créateurs, les vibe coders et tous ceux qui veulent des outils simples et efficaces pour l'accès à distance via SSH et Tailscale.

### Applications actuelles

**ChillShell** — Terminal SSH mobile (Android/iOS)
- Connexion SSH sécurisée via réseau mesh Tailscale (WireGuard)
- Authentification par clés Ed25519
- Wake-on-LAN intégré pour réveiller son PC à distance
- Terminal complet (xterm) avec navigateur de fichiers SFTP
- Sécurité : chiffrement AES-CBC/Keychain, PIN PBKDF2, anti-tampering (freeRASP), 738 tests
- Gratuit, open source (GPL v3)

**Chill** — App desktop (Windows/Linux/macOS)
- Configure SSH, Wake-on-LAN et Tailscale en quelques clics, sans terminal
- Onglet Sécurité OS : toggles de durcissement (8 Windows, 7 Linux, 8 macOS) + checkup 12 points
- Intégration Tailscale native via daemon Go (tsnet)
- Sécurité : architecture centralisée, anti-injection, HMAC-SHA256 sur IPC, 869 tests
- Gratuit, open source (GPL v3)

### Applications futures

D'autres applications sont en préparation, toujours en lien avec SSH, Tailscale et l'accès à distance simplifié.

---

## Ce repository

Ce repo contient le **site web** qui présente l'écosystème Chill : pages de présentation, tutoriels, documentation sécurité, FAQ, mises à jour et pages légales. C'est un site statique bilingue (EN/FR) avec thème sombre/clair.

---

## Stack Technique

- **Astro 5** — Générateur de sites statiques avec routing basé sur les fichiers
- **Tailwind CSS 4** — Configuration CSS-first via `@theme {}` dans `global.css`
- **React 19** — Islands interactives uniquement (accordéons, carousels, animations)
- **Motion** — Animations scroll-triggered (fork de Framer Motion)
- **Bilingue** — EN/FR avec routing Astro i18n (`/` pour EN, `/fr/` pour FR)
- **Dark/Light mode** — Thème toggle avec classe `.dark` sur `<html>`

## Commandes

```bash
npm run dev       # Dev server → localhost:4321
npm run build     # Build production → ./dist/
npm run preview   # Preview du build local
```

## Structure du Projet

```
src/
├── pages/               # Routes Astro (index, tutos, securite, faq, updates, etc.)
│   └── fr/             # Pages FR miroir
├── components/
│   ├── home/           # Sections homepage (Hero, Differentiator, Pricing)
│   ├── layout/         # Header, Footer, Navigation
│   ├── tutos/          # Composants tutoriels (AgentCard, CompatTable)
│   ├── ui/             # Composants réutilisables (Accordion, CodeBlock, Carousel)
│   ├── chill/          # Composants page Chill (ChillContent)
│   └── seo/            # Schemas JSON-LD (Organization, SoftwareApp, Article, etc.)
├── layouts/            # BaseLayout (SEO, Header, Footer, animations)
├── i18n/               # en.json, fr.json + utils de traduction
├── styles/             # global.css (design tokens, Tailwind v4 config)
└── config/             # design-tokens.ts (couleurs, fonts, spacing)
```

## Pages du site

- **Homepage** : Hero, perspective sections, différentiateurs, pricing
- **Chill** : Présentation de l'app desktop avec fonctionnalités et sécurité
- **Tutoriels** : SSH, Wake-on-LAN, Tailscale, config OS, BIOS, agents CLI
- **Sécurité** : Guide sécurité détaillé pour ChillShell et Chill (2 onglets)
- **FAQ** : Questions fréquentes par catégorie
- **Mises à jour** : Release notes des applications
- **Contact** : Formulaire de contact
- **Légal** : Mentions légales, CGU, politique de confidentialité

## SEO & GEO

- **Schema.org** : Organization, SoftwareApplication, Article, FAQPage, BreadcrumbList
- **Open Graph** : Méta tags FB/Twitter avec images optimisées
- **Sitemap** : Généré automatiquement par `@astrojs/sitemap`
- **Breadcrumbs** : Navigation hiérarchique sur toutes les pages

## Design System

- **Tokens centralisés** : `design-tokens.ts` + `global.css` en sync
- **Préfixe `chill-*`** : Toutes les couleurs Tailwind (`text-chill-text`, `bg-chill-elevated`)
- **Polices** : Space Mono (titres), Plus Jakarta Sans (corps), JetBrains Mono (code)
- **Animations CSS** : `.animate-float`, `.animate-fade-in-up`, `.perspective-left/right`
- **Islands React** : Motion pour scroll animations, `client:visible` pour lazy load

## Déploiement

Le site est déployé sur **Vercel** avec :
- En-têtes de sécurité HTTP (CSP, HSTS, X-Frame-Options, etc.) via `vercel.json`
- Build automatique sur push main
- Preview deployments sur les PRs

## Liens

- **Site** : https://chill.app
- **ChillShell (mobile)** : https://github.com/Kevin-hDev/ChillShell
- **Chill (desktop)** : https://github.com/Kevin-hDev/Chill
- **Contact** : Chill_app@outlook.fr
- **Auteur** : HUYNH Kevin
- **Licence** : GPL v3

---

**Note** : Ce projet utilise CLAUDE.md pour guider les assistants IA. Voir `CLAUDE.md` pour les détails d'architecture et conventions de code.
