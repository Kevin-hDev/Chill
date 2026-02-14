# Suivi des corrections SEO/GEO — Chill

**Basé sur :** `AUDIT_SEO_GEO_CHILL.md` (14 février 2026)
**Dernière mise à jour :** 14 février 2026

> Les dates `datePublished` dans le code sont temporaires (2026-02-09).
> **A modifier le jour du déploiement** avec la date réelle dans :
> - `src/components/tutos/TutoLayout.astro` (valeurs par défaut)
> - `src/pages/securite.astro` + `src/pages/fr/securite.astro`
> - `src/pages/faq.astro` + `src/pages/fr/faq.astro`
> - `src/pages/updates.astro` + `src/pages/fr/updates.astro`

---

## Phase 1 — Corrections critiques

| # | Action | Statut | Fichiers modifiés |
|---|--------|--------|-------------------|
| 1.1 | Supprimer les accordéons sur tout le site | FAIT | `SshContent.tsx`, `TailscaleContent.tsx`, `ConfigOsContent.tsx`, `AgentCard.tsx`, `WolContent.tsx`, `faq.astro` (EN+FR), `securite.astro` (EN+FR), `bios.astro` (EN+FR), `updates.astro` (EN+FR) |
| 1.2 | Meta descriptions uniques pour les 12 tutos | FAIT | `TutoLayout.astro` (ajout prop description), 6 tutos EN + 6 tutos FR |
| 1.3 | Mettre à jour llms.txt (prix gratuit) | FAIT | `public/llms.txt`, `public/llms-full.txt` |
| 1.4 | Corriger schemas (prix 0, Organization.name = Chill) | FAIT | `SchemaOrganization.astro`, `SchemaSoftwareApp.astro` |
| 1.5 | Ajouter `rel="noopener noreferrer"` aux liens externes | FAIT | `Pricing.astro`, `contact.astro` (EN+FR), `updates.astro` (EN+FR), `politique-confidentialite.astro` (EN+FR), `mentions-legales.astro` (EN+FR) |
| — | Supprimer le code mort (Accordion.tsx, SecurityDetail.tsx) | FAIT | 2 fichiers supprimés |

---

## Phase 2 — Structure E-E-A-T

| # | Action | Statut | Fichiers modifiés |
|---|--------|--------|-------------------|
| 2.1 | Ajouter l'auteur "HUYNH Kevin" | FAIT | Nouveau composant `AuthorDate.astro`, clés i18n (EN+FR), intégré via `TutoLayout.astro` + pages sécurité, FAQ, updates (EN+FR) |
| 2.2 | Ajouter dates publication/mise à jour | FAIT | Balises `<time>` dans `AuthorDate.astro`, props `datePublished`/`dateModified` dans `TutoLayout.astro` |
| 2.3 | Maillage interne entre les pages | FAIT | 12 tutos (EN+FR), 2 FAQ (EN+FR), 2 sécurité (EN+FR) — liens contextuels ajoutés |
| 2.4 | Ajouter schemas manquants | FAIT | Nouveau `SchemaWebPage.astro` → securite (EN+FR), nouveau `SchemaArticle.astro` → updates (EN+FR) |

---

## Phase 3 — Enrichissement de contenu

| # | Action | Statut | Fichiers concernés |
|---|--------|--------|-------------------|
| 3.1 | Restructurer la page Sécurité en sections H2 | FAIT | `securite.astro` (EN+FR) — 4 H2 par onglet (Protection des données, Authentification, Fonctionnalités, Transparence pour ChillShell ; Architecture, Authentification, Configuration, Transparence pour Chill) |
| 3.2 | Enrichir les tutos thin (SSH, WOL) | FAIT | `ssh.astro` (EN+FR) — section "C'est quoi SSH ?", 3 stats (256 bits, < 2 min, 0 donnée), conseils. `wol.astro` (EN+FR) — section "Comment fonctionne le WoL", 3 stats (< 10 sec, 102 octets, Ethernet), bon à savoir |
| 3.3 | Enrichir la page Agents CLI (cibler "vibe coding mobile") | FAIT | `agents-cli.astro` (EN+FR) — intro "Code from your phone", 3 stats (10+ agents, SSH, Gratuit), section "Comment ça marche", cas d'usage concrets |
| 3.4 | Ajouter des statistiques dans les tutos | FAIT | Stats ajoutées dans SSH, WOL et Agents CLI (EN+FR) — cards avec chiffres clés. Config OS, Tailscale et BIOS ont déjà du contenu suffisant |

---

## Phase 4 — Positionnement stratégique

| # | Action | Statut | Fichiers concernés |
|---|--------|--------|-------------------|
| 4.1 | Section "Vibe Coding" / "Code from your phone" | FAIT | Couvert par Phase 3.3 — section dédiée dans `agents-cli.astro` (EN+FR) avec intro "vibe coding mobile", stats et cas d'usage |
| 4.2 | Cibler les mots-clés FR à faible concurrence | FAIT | `fr.json` (home.description), `fr/tutos/ssh.astro`, `fr/tutos/wol.astro`, `fr/tutos/agents-cli.astro` — mots-clés : "terminal SSH mobile gratuit", "allumer PC à distance depuis téléphone", "coder depuis votre téléphone", "vibe coding mobile" |
| 4.3 | Profil GitHub dans Organization.sameAs | FAIT | `SchemaOrganization.astro` — ajouté `https://github.com/Kevin-hDev` |
| 4.4 | Présence communautaire (Reddit, etc.) | EN ATTENTE | Post-déploiement — r/ClaudeAI, r/vibecoding, r/selfhosted |

---

## Autres problèmes identifiés (hors phases)

| Problème | Statut | Notes |
|----------|--------|-------|
| Erreurs d'hydratation React (toutes les pages) | FAIT | `ThemeToggle.tsx` — état initial fixé à `true` (dark) côté serveur, synchronisation via `useEffect` après montage. Plus de conflit serveur/client |
| BreadcrumbList "Tutos" pointe vers config-os au lieu de /tutos/ | FAIT | Créé `tutos/index.astro` (EN+FR) — page hub listant les 6 tutos. Breadcrumbs corrigés dans les 12 pages tutos + `chill.astro` (EN+FR) |
| Organization.sameAs vide `[]` | FAIT | Ajouté `https://github.com/Kevin-hDev` |

---

## Composants créés

| Composant | Rôle |
|-----------|------|
| `src/components/ui/AuthorDate.astro` | Affiche auteur + dates publication/MAJ |
| `src/components/seo/SchemaWebPage.astro` | Schema JSON-LD WebPage (pour pages de contenu) |
| `src/components/seo/SchemaArticle.astro` | Schema JSON-LD Article (pour pages updates) |

## Pages créées

| Page | Rôle |
|------|------|
| `src/pages/tutos/index.astro` | Page hub listant les 6 tutoriels (EN) |
| `src/pages/fr/tutos/index.astro` | Page hub listant les 6 tutoriels (FR) |

## Composants supprimés

| Composant | Raison |
|-----------|--------|
| `src/components/ui/Accordion.tsx` | Plus utilisé après suppression des accordéons |
| `src/components/security/SecurityDetail.tsx` | Code mort, jamais importé |
