# Audit SEO/GEO — Chill (chill.app)

**Date de l'audit :** 14 février 2026
**Environnement :** localhost:4321 (pré-déploiement)
**Outils utilisés :** Playwright, Brave Search, analyse de code source

---

## Étape 1 — Fondations techniques

**Statut : TERMINÉ**

---

### 1.1 Performance (temps de chargement)

> Seuils de référence (guide 2026) : FCP < 1,8s | LCP < 2,5s | Page load < 3s

| Page | Status | Load time | FCP | DOM Loaded | Taille | Verdict |
|------|--------|-----------|-----|------------|--------|---------|
| Homepage EN | 200 | 686ms | 248ms | 48ms | 101KB | OK |
| Homepage FR | 200 | 678ms | 232ms | 79ms | 102KB | OK |
| Securite | 200 | 738ms | 376ms | 149ms | 133KB | OK |
| FAQ | 200 | 734ms | 280ms | 123ms | 108KB | OK |
| Updates | 200 | 644ms | 216ms | 46ms | 85KB | OK |
| Tuto Config OS | 200 | 738ms | 320ms | 107ms | 93KB | OK |
| Tuto SSH | 200 | 689ms | 248ms | 52ms | 86KB | OK |
| Tuto Tailscale | 200 | 925ms | 276ms | 81ms | 91KB | OK |
| Tuto BIOS | 200 | 654ms | 216ms | 55ms | 83KB | OK |
| Tuto WOL | 200 | 806ms | 224ms | 70ms | 88KB | OK |
| Tuto Agents CLI | 200 | 660ms | 240ms | 103ms | 106KB | OK |
| Mentions Legales | 200 | 638ms | 216ms | 43ms | 80KB | OK |
| CGU | 200 | 648ms | 212ms | 42ms | 83KB | OK |
| Politique Conf. | 200 | 632ms | 212ms | 56ms | 89KB | OK |

**Verdict global : EXCELLENT**
- Toutes les pages chargent en moins de 1 seconde
- FCP entre 212-376ms (largement sous le seuil de 1,8s)
- Pages très légères (80-133 KB)
- Site statique Astro = performances optimales pour le SEO

> Note : mesures en localhost, les temps réels dépendront de l'hébergement et du CDN.

---

### 1.2 Robots.txt

**Verdict : EXCELLENT**

- Bots de recherche classiques (Googlebot, Bingbot, Yandex, Baidu) : Autorisés
- Bots de recherche IA (OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, etc.) : Autorisés
- Bots de training IA (GPTBot, Google-Extended, CCBot, FacebookBot, etc.) : Bloqués
- Sitemap déclaré : `https://chill.app/sitemap-index.xml`
- Stratégie de gouvernance IA conforme aux recommandations 2026

---

### 1.3 Fichiers llms.txt

**Verdict : EXCELLENT**

| Fichier | Contenu | Verdict |
|---------|---------|---------|
| `llms.txt` | Résumé concis : features, sécurité, pricing, liste de pages | OK |
| `llms-full.txt` | Version détaillée : architecture sécurité, tutos complets, FAQ, toutes les URLs | OK |

Les deux fichiers couvrent bien l'écosystème Chill (desktop + mobile ChillShell).

---

### 1.4 Sitemap XML

**Verdict : OK**

- Généré automatiquement par l'intégration `@astrojs/sitemap`
- URL déclarée dans robots.txt : `https://chill.app/sitemap-index.xml`
- A vérifier après build : s'assurer que toutes les pages EN et FR sont présentes

---

### 1.5 Balises techniques de base

| Vérification | Résultat | Verdict |
|--------------|----------|---------|
| UTF-8 charset | Présent sur toutes les pages | OK |
| Viewport meta | `width=device-width, initial-scale=1.0` partout | OK |
| Attribut `lang` sur `<html>` | `en` sur pages EN, `fr` sur pages FR | OK |
| Hreflang (en, fr, x-default) | Présent et correct sur toutes les pages | OK |
| Canonical tags | Présent sur toutes les pages, pointe vers chill.app | OK |
| HTTPS dans canonical/OG | Toutes les URLs utilisent https://chill.app | OK |

---

### 1.6 Rendu côté serveur (SSR)

**Verdict : BON avec réserve**

- Contenu rendu côté serveur (Astro SSG) : les bots reçoivent le HTML complet
- Contenu textuel bien présent dans le HTML source (1 723 à 11 659 caractères par page)
- Pas de contenu caché derrière du JavaScript pur

**Problème détecté : erreurs d'hydratation React**
- Erreur récurrente sur TOUTES les pages : `"Hydration failed because the server rendered..."`
- Cause probable : un composant React (ThemeToggle, LanguageToggle ou Header) génère un HTML différent côté serveur et côté client
- Impact SEO : faible (le contenu SSR est correct), mais peut causer du CLS (décalage visuel) lors de l'hydratation
- **Recommandation : investiguer et corriger l'hydratation mismatch**

---

### 1.7 Liens externes

**Verdict : À AMÉLIORER**

- Lien Google Play Store sur la homepage : manque `rel="noopener noreferrer"`
- Recommandation : ajouter `rel="noopener noreferrer"` sur tous les liens externes

---

### 1.8 Résumé Étape 1

| Catégorie | Score | Détails |
|-----------|-------|---------|
| Performance | OK | Toutes les pages < 1s, FCP < 400ms |
| Robots.txt | OK | Gouvernance IA exemplaire |
| llms.txt | OK | Deux versions, contenu complet |
| Sitemap | OK | Auto-généré par Astro |
| Balises techniques | OK | charset, viewport, lang, hreflang, canonical |
| Rendu SSR | ATTENTION | Erreurs d'hydratation React récurrentes |
| Liens externes | ATTENTION | Manque rel="noopener noreferrer" |

### Actions prioritaires identifiées (Étape 1)

1. **[MOYEN]** Corriger les erreurs d'hydratation React (mismatch serveur/client)
2. **[FAIBLE]** Ajouter `rel="noopener noreferrer"` aux liens externes
3. **[À VÉRIFIER]** Valider le sitemap après build (`npm run build`)

---

## Étape 2 — SEO On-Page

**Statut : TERMINÉ**

---

### 2.1 Meta descriptions — Audit complet

#### Pages avec descriptions uniques et optimisées

| Page | Title | Description | Verdict |
|------|-------|-------------|---------|
| Homepage EN | ChillShell — Mobile SSH Terminal for iOS & Android | *Spécifique, mots-clés présents* | OK |
| Homepage FR | ChillShell — Terminal SSH Mobile pour iOS & Android | *Traduite, cohérente* | OK |
| Securite EN | Security — How Chill Protects Your Data | *Mots-clés sécurité : AES-CBC, PBKDF2, zero data* | OK |
| Securite FR | Sécurité — Comment Chill Protège vos Données | *Traduite* | OK |
| FAQ EN | FAQ — Chill & ChillShell | Common Questions | *Mots-clés produit* | OK |
| FAQ FR | FAQ — Chill & ChillShell | Questions fréquentes | *Traduite* | OK |
| Updates EN | Updates — ChillShell SSH Terminal Release Notes | *Spécifique* | OK |
| Updates FR | Mises à jour — Notes de Version ChillShell | *Traduite* | OK |
| Mentions Legales | Legal Notice — Chill | *Spécifique* | OK |
| CGU | Terms of Service — Chill | *Spécifique* | OK |
| Politique Conf. | Privacy Policy — Chill | *Zéro collecte, GDPR* | OK |

#### Pages avec descriptions GÉNÉRIQUES (CRITIQUE)

| Page | Description actuelle | Problème |
|------|---------------------|----------|
| Tuto Config OS EN | "Chill — Your desktop terminal. In your pocket." | Générique, aucun mot-clé |
| Tuto Config OS FR | "Chill — Your desktop terminal. In your pocket." | Générique ET en anglais sur page FR |
| Tuto SSH EN | idem | idem |
| Tuto SSH FR | idem | idem |
| Tuto Tailscale EN | idem | idem |
| Tuto Tailscale FR | idem | idem |
| Tuto BIOS EN | idem | idem |
| Tuto BIOS FR | idem | idem |
| Tuto WOL EN | idem | idem |
| Tuto WOL FR | idem | idem |
| Tuto Agents CLI EN | idem | idem |
| Tuto Agents CLI FR | idem | idem |

**12 pages affectées.** C'est le problème SEO le plus critique du site : Google affiche la meta description dans les résultats de recherche. Une description générique = moins de clics.

**Double problème sur les pages FR :** la description par défaut est en anglais ("Your desktop terminal. In your pocket.") sur des pages françaises.

---

### 2.2 Structure des titres (H1 > H2 > H3)

#### Pages avec bonne hiérarchie

| Page | H1 | H2 | H3 | Verdict |
|------|----|----|-----|---------|
| Homepage EN/FR | 1 (ChillShell) | 5 | 4 | OK |
| FAQ EN/FR | 1 (FAQ) | 3 (Général, Mobile, Desktop) | 0 | OK |
| Agents CLI EN/FR | 1 (CLI Agents) | 1 (Compatibility) | 10 (un par agent) | OK |
| Updates EN/FR | 1 | 2 | 1 | OK |
| CGU | 1 | 8 | 0 | OK |
| Politique Conf. | 1 | 10 | 0 | OK |
| Mentions Legales | 1 | 4 | 0 | OK |
| Tuto BIOS EN/FR | 1 | 1 | 0 | Acceptable |
| Tuto WOL EN/FR | 1 | 2 | 0 | Acceptable |

#### Pages avec structure PLATE (problème)

| Page | H1 | H2 | H3 | Problème |
|------|----|----|-----|----------|
| **Securite EN/FR** | 1 | **0** | **0** | 11 659 chars sans aucun sous-titre ! |
| Tuto Config OS EN/FR | 1 | **0** | **0** | Pas de sous-sections visibles |
| Tuto SSH EN/FR | 1 | **0** | **0** | Pas de sous-sections visibles |
| Tuto Tailscale EN/FR | 1 | **0** | **0** | Pas de sous-sections visibles |

**Impact SEO/GEO :** La page Sécurité est la plus affectée — c'est une page riche en contenu (11 659 caractères) mais sans aucune structure de headings. Google et les moteurs IA ne peuvent pas identifier les sections. Le guide 2026 recommande des passages autonomes de 134-167 mots avec des headings clairs pour l'extraction IA.

> Note : les tutos utilisent peut-être des composants interactifs (TabsOS, accordéons) qui masquent les headings au scraping. À vérifier si les H2/H3 sont dans les composants React.

---

### 2.3 Schema JSON-LD

#### Schemas présents et corrects

| Page | Types | Qualité |
|------|-------|---------|
| Homepage | Organization + SoftwareApplication | OK — features, prix, catégorie |
| FAQ EN/FR | FAQPage (14 questions) + BreadcrumbList | Excellent — très complet |
| Tuto Config OS | HowTo (4 étapes) + BreadcrumbList | OK |
| Tuto SSH | HowTo (3 étapes) + BreadcrumbList | OK |
| Tuto Tailscale | HowTo (4 étapes) + BreadcrumbList | OK |
| Tuto BIOS | HowTo (6 étapes) + BreadcrumbList | OK |
| Tuto WOL | HowTo (3 étapes) + BreadcrumbList | OK |

#### Schemas MANQUANTS

| Page | Schemas actuels | Schemas recommandés |
|------|----------------|---------------------|
| **Securite** | Aucun | WebPage ou Article |
| **Updates** | Aucun | Article ou ItemList |
| **Agents CLI** | BreadcrumbList seul | Ajouter HowTo ou ItemList |

#### Problèmes dans les schemas existants

1. **Incohérence Organization** : `name: "ChillShell"` alors que l'écosystème s'appelle **Chill**. ChillShell devrait être `alternateName`.
   - Actuellement : `name: "ChillShell"`, `alternateName: "Chill"`
   - Recommandé : `name: "Chill"`, `alternateName: "ChillShell"`

2. **Incohérence prix** : le schema SoftwareApplication affiche `price: "2.99"` mais la homepage dit "Free — All features. No fees." et la FAQ dit "entièrement gratuits". **Le schema doit être mis à jour** pour refléter la gratuité (`price: "0"`, `priceCurrency: "USD"`).

3. **llms.txt obsolète** : mentionne encore "One-time purchase: $2.99" — **à mettre à jour** si le pricing a changé.

4. **BreadcrumbList tutos** : l'élément "Tutos" pointe vers `/tutos/config-os` au lieu d'une page index `/tutos/`. Pas critique mais pas idéal.

5. **Organization.sameAs** : le tableau est vide `[]`. Idéalement, ajouter les profils sociaux (GitHub, Play Store, etc.) pour renforcer le Knowledge Graph.

---

### 2.4 Images

| Vérification | Résultat | Verdict |
|--------------|----------|---------|
| Alt text présent | 0 images sans alt sur 14 pages | OK |
| Alt text descriptif | Oui (ex: "Terminal SSH view", "PIN and fingerprint lock screen") | OK |

---

### 2.5 OG Tags & Twitter Cards

| Vérification | Résultat | Verdict |
|--------------|----------|---------|
| og:title | Présent sur toutes les pages | OK |
| og:description | Mêmes descriptions que meta (générique sur tutos) | ATTENTION |
| og:image | `https://chill.app/images/og-chillshell.png` partout | OK |
| og:url | Correct, pointe vers chill.app | OK |
| twitter:card | `summary_large_image` partout | OK |
| twitter:title + description | Présent partout | OK |
| twitter:image | Même que og:image | OK |

**Recommandation :** Envisager des images OG spécifiques par page/section pour un meilleur engagement sur les réseaux sociaux.

---

### 2.6 Résumé Étape 2

| Catégorie | Score | Détails |
|-----------|-------|---------|
| Meta descriptions | CRITIQUE | 12 pages de tutos avec description générique (+ en anglais sur pages FR) |
| Structure headings | ATTENTION | Page Sécurité et 3 tutos sans aucun H2/H3 |
| Schema JSON-LD | ATTENTION | 3 pages sans schema + incohérences prix/nom |
| Images alt text | OK | 100% couvert |
| OG / Twitter Cards | OK | Complets mais descriptions génériques sur tutos |

### Actions prioritaires identifiées (Étape 2)

1. **[CRITIQUE]** Écrire des meta descriptions uniques pour les 12 pages de tutos (EN + FR)
2. **[CRITIQUE]** Corriger les descriptions FR qui sont en anglais
3. **[ÉLEVÉ]** Corriger l'incohérence prix dans le schema (2.99$ vs Gratuit)
4. **[ÉLEVÉ]** Ajouter des H2/H3 sur la page Sécurité (structurer le contenu en sections)
5. **[ÉLEVÉ]** Corriger Organization.name : "Chill" au lieu de "ChillShell"
6. **[MOYEN]** Ajouter un schema sur la page Sécurité et Updates
7. **[MOYEN]** Ajouter un schema HowTo/ItemList sur la page Agents CLI
8. **[MOYEN]** Mettre à jour llms.txt si le pricing a changé
9. **[FAIBLE]** Remplir Organization.sameAs avec les profils sociaux
10. **[FAIBLE]** Corriger le BreadcrumbList "Tutos" qui pointe vers config-os

---

## Étape 3 — Contenu & E-E-A-T

**Statut : TERMINÉ**

---

### 3.1 Volume de contenu par page

> Référence guide 2026 : contenu pilier 2 000+ mots, articles satellites 500+ mots. Pages < 300 mots = "thin content" risqué.

| Page | Mots | Paragraphes | Moy. mots/§ | Verdict |
|------|------|-------------|-------------|---------|
| Homepage EN | 278 | 9 | 20 | OK (landing page) |
| **Securite EN** | **1 589** | 30 | 51 | Bon (meilleure page du site) |
| **FAQ EN** | **1 310** | 14 | 41 | Bon |
| Tuto Config OS | 264 | 6 | 26 | THIN |
| Tuto SSH | 121 | 1 | 32 | TRÈS THIN |
| Tuto Tailscale | 209 | 2 | 28 | THIN |
| Tuto BIOS | ~200 | — | — | THIN |
| Tuto WOL | 158 | 3 | 19 | TRÈS THIN |
| Tuto Agents CLI | 115 | 8 | 7 | TRÈS THIN |

**Problème majeur :** La majorité des tutos sont en "thin content" (< 300 mots). Google pénalise les pages avec peu de contenu indexable. Certains tutos utilisent des composants interactifs (TabsOS, accordéons) qui masquent du contenu — mais les bots ne voient que le HTML initial.

**Pages fortes :** Sécurité (1 589 mots) et FAQ (1 310 mots) ont une bonne profondeur.

---

### 3.2 Structure "réponse d'abord" (GEO)

> Référence guide 2026 : placer la réponse dans les 40-60 premiers mots après le H1. +60% de taux de citation IA.

| Page | Premiers mots visibles | Verdict |
|------|----------------------|---------|
| Homepage | "Your desktop terminal. In your pocket." | OK — accroche claire |
| Securite | "SSH keys encrypted via AES-CBC... PIN hashed with PBKDF2-HMAC-SHA256, 100,000 iterations." | EXCELLENT — données concrètes immédiatement |
| FAQ | Questions directes en format Q&A | OK — format natif pour IA |
| Tuto Config OS | "Before connecting with ChillShell, your PC needs to accept SSH connections." | OK |
| Tuto SSH | "Once your OS is configured, connect to your PC from ChillShell via SSH." | OK |
| Tuto Agents CLI | "ChillShell supports all major CLI agents." | OK mais trop bref |

**Verdict global :** La page Sécurité est un excellent exemple de structure "réponse d'abord". Les autres pages sont correctes mais pourraient être enrichies avec des données chiffrées dès le début.

---

### 3.3 Statistiques et données chiffrées

> Référence guide 2026 (Princeton) : les statistiques augmentent la visibilité IA de +37%.

| Page | Stats trouvées | Exemples | Verdict |
|------|---------------|----------|---------|
| **Securite** | **14** | 100 000 iterations, 256 bits, 30 min, 30 sec | EXCELLENT |
| FAQ | 4 | 2 minutes, 5 minutes | Acceptable |
| Homepage | 2 | 12 themes | Faible |
| Tutos (tous) | **0-1** | — | CRITIQUE |

**Les tutos n'ont quasiment aucune donnée chiffrée.** C'est un gros manque pour le GEO. Exemples d'ajouts possibles :
- Config OS : "Setup takes under 5 minutes on Windows, 2 minutes on Linux"
- SSH : "Ed25519 keys use 256-bit encryption"
- Tailscale : "Free for up to 100 devices, encrypted with WireGuard"
- WOL : "Wake your PC in under 10 seconds from anywhere"

---

### 3.4 Citations et références

> Référence guide 2026 (Princeton) : citer des sources augmente la visibilité IA de +40%.

| Page | Citations/réfs | Type | Verdict |
|------|---------------|------|---------|
| **Securite** | **25** | audit, verified, documented, tested | EXCELLENT |
| FAQ | 4 | tested | Acceptable |
| Homepage | 2 | Documented, audit | Faible |
| **Tutos (tous)** | **0** | — | CRITIQUE |

**La page Sécurité est exemplaire** avec ses mentions d'audits internes, de modèle STRIDE, et de vérifications. Les tutos, en revanche, n'ont aucune référence externe ni citation de source.

---

### 3.5 Signaux E-E-A-T

#### Auteur identifié

| Vérification | Résultat | Verdict |
|--------------|----------|---------|
| Bio d'auteur sur les pages | Aucune | CRITIQUE |
| Nom d'auteur visible | Aucun | CRITIQUE |
| Credentials/expertise | Aucune | CRITIQUE |
| Photo d'auteur | Aucune | CRITIQUE |

**C'est le point E-E-A-T le plus faible du site.** Le guide 2026 dit que les bios d'auteurs avec credentials sont "quasi-obligatoires". Il n'y a aucune identification de qui écrit le contenu.

> Exception acceptable : la page About mentionne "Built by a Maker, for Everyone" — c'est un début mais pas suffisant. Il faudrait un vrai profil (nom, rôle, expertise en sécurité/dev).

#### Dates de publication / mise à jour

| Vérification | Résultat | Verdict |
|--------------|----------|---------|
| Dates de publication visibles | Aucune (sauf Updates) | ATTENTION |
| Dates de mise à jour | Aucune | ATTENTION |
| Balises `<time>` | Aucune | ATTENTION |

**Aucune page n'affiche de date de publication ou de dernière mise à jour.** Le guide 2026 indique que le contenu sans date perd rapidement ses citations IA (contenu > 6 mois = -80% de citations). Les moteurs IA ne peuvent pas savoir si le contenu est à jour.

---

### 3.6 Pages de confiance (Trust Pages)

| Page | Status | Contenu | Verdict |
|------|--------|---------|---------|
| **About** (`/about`) | 200 | Mission, valeurs, maker story (267 mots) | OK |
| **Contact** (`/contact`) | 200 | Email support@chill.app, liens stores, délai de réponse | OK |
| **Mentions Legales** | 200 | Éditeur individuel, hébergeur Vercel, LCEN | OK |
| **CGU** | 200 | 8 sections, licence gratuite | OK |
| **Politique Confidentialité** | 200 | 10 sections, zéro collecte, GDPR, email, adresse CNIL | EXCELLENT |

**Verdict : BON.** Toutes les pages de confiance existent et sont accessibles. La politique de confidentialité est particulièrement complète. Le footer du site contient des liens vers toutes ces pages.

---

### 3.7 Maillage interne (liens entre pages)

| Page | Liens internes | Liens externes | Verdict |
|------|---------------|----------------|---------|
| Homepage | 0 | 1 (Play Store) | CRITIQUE |
| Securite | 0 | 0 | CRITIQUE |
| FAQ | 0 | 0 | CRITIQUE |
| Tuto Config OS | 1 | 0 | Faible |
| Tuto SSH | 1 | 0 | Faible |
| Tuto Tailscale | 1 | 1 | Acceptable |
| Tuto WOL | 2 | 0 | Acceptable |
| Tuto Agents CLI | 0 | 0 | CRITIQUE |

**Le maillage interne est quasiment inexistant.** C'est un problème SEO et GEO majeur :
- Le guide 2026 recommande des "clusters de contenu sémantique" avec des liens entre pages liées
- La page Sécurité (1 589 mots, meilleur contenu) n'a aucun lien vers les tutos ni la FAQ
- La FAQ ne renvoie pas vers les tutos pertinents
- Les tutos ne se lient pas entre eux (Config OS → SSH → Tailscale devrait être un parcours naturel)

---

### 3.8 Listes, tableaux et contenu structuré

| Page | Listes `<ul>/<ol>` | Tableaux | Blocs de code | Verdict |
|------|-------------------|----------|---------------|---------|
| Homepage | 0 | 0 | 0 | OK (landing) |
| Securite | 0 | 0 | 0 | ATTENTION (devrait avoir des listes) |
| FAQ | 0 | 0 | 0 | OK (format Q&A) |
| Tuto Config OS | 0 | 0 | 0 | ATTENTION |
| Tuto SSH | 0 | 0 | 2 | Acceptable |
| Tuto Agents CLI | 0 | 1 | 0 | OK |
| Tuto Tailscale | 0 | 0 | 0 | ATTENTION |
| Tuto WOL | 0 | 0 | 0 | ATTENTION |

**Peu de contenu structuré en HTML.** Les composants React (accordéons, tabs) cachent probablement des listes et du contenu, mais les bots ne les voient pas toujours. Des listes en HTML brut (`<ul>`, `<ol>`) sont mieux indexées.

---

### 3.9 Résumé Étape 3

| Catégorie | Score | Détails |
|-----------|-------|---------|
| Volume de contenu | ATTENTION | 5 tutos < 300 mots (thin content) |
| Structure réponse d'abord | OK | Page Sécurité exemplaire |
| Statistiques / données | ATTENTION | Excellentes sur Sécurité, absentes sur les tutos |
| Citations / références | ATTENTION | Excellentes sur Sécurité, absentes sur les tutos |
| Auteur identifié | CRITIQUE | Aucun auteur identifié nulle part |
| Dates publication/MAJ | CRITIQUE | Aucune date visible |
| Pages de confiance | OK | About, Contact, Legal, CGU, Privacy toutes présentes |
| Maillage interne | CRITIQUE | Quasi inexistant entre les pages de contenu |
| Contenu structuré | ATTENTION | Peu de listes/tableaux en HTML brut |

### Actions prioritaires identifiées (Étape 3)

1. **[CRITIQUE]** Ajouter un auteur identifié avec bio/credentials (au moins sur les pages principales)
2. **[CRITIQUE]** Ajouter des dates de publication et de dernière mise à jour sur chaque page
3. **[CRITIQUE]** Créer un maillage interne entre les pages (Security↔FAQ, Tutos entre eux, FAQ→Tutos)
4. **[ÉLEVÉ]** Enrichir les tutos thin (< 300 mots) avec plus de contenu, des stats, des conseils
5. **[ÉLEVÉ]** Ajouter des statistiques et données chiffrées sur les tutos
6. **[ÉLEVÉ]** Ajouter des citations de sources externes sur les tutos (ex: doc Tailscale, Microsoft OpenSSH)
7. **[MOYEN]** Convertir le contenu des composants React en HTML brut visible (listes, étapes)
8. **[MOYEN]** Enrichir la page About avec un profil auteur plus détaillé

---

## Étape 4 — Audit GEO (citabilité IA)

**Statut : TERMINÉ**

---

### 4.1 Analyse des chunks (blocs extractibles par l'IA)

> Référence guide 2026 : les moteurs IA extraient des passages de **134-167 mots**. Chaque passage doit être compréhensible sans contexte.

| Page | Nb chunks | Dans la plage idéale | Trop courts (<50) | Trop longs (>300) | Verdict |
|------|-----------|---------------------|-------------------|-------------------|---------|
| Homepage | 9 | 0 | 9 | 0 | Normal (landing page) |
| **Securite** | **1** | **0** | 0 | **1 (1 521 mots !)** | CRITIQUE |
| **FAQ** | 3 | **2** (172, 165 mots) | 0 | 0 | EXCELLENT |
| Config OS | 1 | **1** (165 mots) | 0 | 0 | OK |
| **Agents CLI** | 11 | **0** | **11** (4-14 mots) | 0 | CRITIQUE |

**Problème majeur — Page Sécurité :** C'est UN SEUL bloc de 1 521 mots sans aucune sous-section (pas de H2/H3). Un moteur IA ne peut pas extraire un passage ciblé de cette masse. Il faut la découper en 8-10 sections thématiques de ~150 mots.

**Problème — Agents CLI :** Chaque agent a seulement 4-14 mots de contenu visible. Pas assez pour être cité.

**Modèle à suivre — FAQ :** Les sections "ChillShell — Mobile" (172 mots) et "Chill — Desktop" (165 mots) sont dans la plage idéale. C'est la page la plus "citable" du site.

---

### 4.2 Contenu caché (accordéons/tabs)

> Les crawlers IA n'ouvrent pas toujours les accordéons. Le contenu caché dans des composants fermés peut ne pas être indexé.

| Page | Éléments cachés | Sections fermées | Impact |
|------|----------------|-----------------|--------|
| **Securite** | **30** | **22** | CRITIQUE — l'essentiel du contenu est dans des accordéons fermés |
| **FAQ** | **14** | **14** | ÉLEVÉ — les réponses sont dans des accordéons fermés |
| Homepage | 5 | 0 | Faible |
| Config OS | 0 | 0 | OK |
| Agents CLI | 0 | 0 | OK |

**C'est le problème GEO le plus important du site.** La page Sécurité a 22 sections fermées et la FAQ en a 14. Si un bot IA ne "clique" pas pour ouvrir les accordéons, il ne voit presque rien du contenu.

**Solutions possibles :**
- Rendre les accordéons ouverts par défaut côté serveur (SSR) et fermables côté client
- Utiliser `<details open>` en HTML natif
- Dupliquer le contenu clé en texte brut visible (résumé TLDR au-dessus des accordéons)

---

### 4.3 Score GEO Princeton — Page Sécurité (référence)

> Évaluation basée sur les 9 méthodes Princeton de GEO appliquées à la meilleure page du site.

| Méthode Princeton | Boost théorique | Score page Sécurité | Verdict |
|-------------------|----------------|---------------------|---------|
| **Citations de sources** | +40% | 40 réfs (audit, STRIDE, PBKDF2, AES...) | EXCELLENT |
| **Statistiques** | +37% | 15 stats (100K iterations, 256 bits...) | BON |
| **Citations d'experts** | +30% | 0 | ABSENT |
| **Ton expert** | +25% | 33 instances (ensures, protects, implements...) | EXCELLENT |
| **Facile à comprendre** | +20% | Moy. 10 mots/phrase | EXCELLENT |
| **Termes techniques** | +18% | 42 termes (AES-CBC, HMAC-SHA256...) | EXCELLENT |
| **Vocabulaire unique** | +15% | 35% de mots uniques (561/1589) | BON |
| **Fluidité** | +15-30% | Phrases courtes et claires | BON |
| ~~Keyword stuffing~~ | **-10%** | Non détecté | OK |

**Score GEO global de la page Sécurité : 7/9 méthodes appliquées.** C'est une très bonne base. Il manque seulement les citations d'experts (ex: "Selon les recommandations NIST...", "D'après l'OWASP Top 10...").

---

### 4.4 Score GEO des autres pages

| Page | Termes techniques | Ton expert | Termes spécifiques (marque) | Verdict GEO |
|------|-------------------|------------|---------------------------|-------------|
| Homepage | 19 | 2 | 33 | Faible (normal pour landing) |
| FAQ | 42 | 6 | **118** | BON — riche en mentions de marque |
| Config OS | 18 | 0 | 8 | Faible |
| Agents CLI | 1 | 1 | 20 | Faible |

La FAQ est la deuxième meilleure page pour le GEO grâce à ses 118 mentions de termes de marque (ChillShell, Chill, Claude Code, Tailscale...). C'est important car le guide 2026 dit que les marques sont **6,5x plus souvent citées via des sources tierces**.

---

### 4.5 Fichiers llms.txt — Cohérence

| Fichier | Mots | Verdict |
|---------|------|---------|
| `llms.txt` | 303 | OK — résumé concis |
| `llms-full.txt` | 1 008 | OK — version détaillée |

**Problème de pricing :**

| Vérification | Résultat |
|--------------|----------|
| Mentions de "$2.99" | **5 occurrences** dans les 2 fichiers |
| Mentions de "free" | 2 occurrences |
| **Verdict** | **CRITIQUE — doit être mis à jour pour refléter la gratuité** |

Les moteurs IA lisent le `llms.txt` pour comprendre le produit. Si le fichier dit "$2.99" mais le site dit "Gratuit", l'IA va citer le mauvais prix.

---

### 4.6 Résumé Étape 4

| Catégorie | Score | Détails |
|-----------|-------|---------|
| Chunks extractibles | CRITIQUE | Page Sécurité = 1 bloc géant, Agents CLI = micro-blocs |
| Contenu caché | CRITIQUE | 22 accordéons fermés (Sécurité) + 14 (FAQ) |
| Princeton GEO (Sécurité) | BON | 7/9 méthodes appliquées |
| Termes de marque | OK | FAQ riche, tutos faibles |
| llms.txt | CRITIQUE | Prix $2.99 obsolète (5 occurrences) |

### Actions prioritaires identifiées (Étape 4)

1. **[CRITIQUE]** Mettre à jour le pricing dans `llms.txt` et `llms-full.txt` (gratuit au lieu de $2.99)
2. **[CRITIQUE]** Rendre le contenu des accordéons visible côté serveur (SSR) — surtout Sécurité et FAQ
3. **[CRITIQUE]** Découper la page Sécurité en 8-10 sections avec H2/H3 (chunks de ~150 mots)
4. **[ÉLEVÉ]** Enrichir les sections Agents CLI (actuellement 4-14 mots par agent)
5. **[MOYEN]** Ajouter des citations d'experts sur la page Sécurité ("Selon NIST/OWASP...")
6. **[MOYEN]** Ajouter un résumé TLDR visible au-dessus des accordéons

---

## Étape 5 — Mots-clés & Concurrence

**Statut : TERMINÉ**

---

### 5.1 Concurrents directs (clients SSH mobiles)

| App | Plateformes | Prix | Points forts | Points faibles |
|-----|------------|------|--------------|----------------|
| **Termius** | Android, iOS, Mac, Win, Linux | Gratuit + Premium 15$/mois | Leader du marché, belle UI, cross-platform, SFTP | Cher en premium, pas de WOL |
| **JuiceSSH** | Android uniquement | Gratuit + Pro ~5$ | Très populaire, communauté fidèle | Quasi abandonné, pas d'iOS, pas de WOL |
| **ConnectBot** | Android uniquement | Gratuit, open source | Fiable, léger, agent forwarding | Ancien, UI basique, pas de WOL |
| **Termux** | Android uniquement | Gratuit, open source | Environnement Linux complet | Pas un client SSH dédié, complexe |
| **Prompt 3** | iOS, macOS | ~20$ | Excellent design, par Panic | Apple only, pas de WOL, cher |
| **Blink Shell** | iOS | ~16$ (App Store) | Open source, mosh support | iOS only, pas de WOL |
| **Mobile Terminal** | Android, iOS | Gratuit + Premium | Nouveau, professionnel | Peu connu |

### 5.2 Concurrents indirects (coding mobile / remote dev)

| App | Concept | Lien avec Chill |
|-----|---------|-----------------|
| **Remote Code** (Vanna.ai) | Mobile vibe coding platform | Concurrent direct sur le cas d'usage "coder depuis son téléphone" |
| **CloudCLI** (Claude Code UI) | Web UI open source pour Claude Code | Alternative web à SSH pour contrôler Claude Code |
| **Happy Coder** | App mobile pour Claude Code/Codex | Concurrent sur "AI agents mobile" |

### 5.3 Avantages concurrentiels uniques de Chill

**Ce que PERSONNE d'autre ne fait :**

1. **SSH + WOL + Tailscale dans une seule app** — les concurrents font SSH uniquement, il faut des apps séparées pour WOL et Tailscale
2. **App desktop compagnon (Chill)** — personne n'a d'app qui configure automatiquement le côté serveur
3. **100% gratuit** — Termius coûte 15$/mois en premium, JuiceSSH Pro est payant
4. **Positionné "AI CLI agents"** — aucun concurrent ne se positionne spécifiquement sur Claude Code/Codex/Cursor mobile
5. **Audit de sécurité public** — transparence unique

---

### 5.4 Mots-clés — Analyse par niveau de concurrence

#### Forte concurrence (dominés par les gros acteurs)

| Mot-clé | Volume estimé | Qui domine | Chance pour Chill |
|---------|--------------|------------|-------------------|
| "SSH client Android" | Élevé | Termius, JuiceSSH, ZDNET | Faible |
| "best SSH app mobile" | Élevé | Articles comparatifs (ZDNET, GeekFlare) | Faible |
| "mobile SSH terminal" | Moyen | Termius, Mobile Terminal | Faible |

> Ces mots-clés sont trustés par des articles de comparaison et les gros acteurs. Difficile de percer sans backlinks et autorité.

#### Concurrence moyenne (zone d'opportunité)

| Mot-clé | Pourquoi c'est une opportunité | Action recommandée |
|---------|-------------------------------|-------------------|
| "run Claude Code from phone" | Tendance émergente 2026, peu de contenu structuré | Créer du contenu ciblé, tuto dédié |
| "vibe coding from phone" / "mobile vibe coding" | Nouveau concept en explosion, beaucoup de discussions Reddit | Se positionner sur cette tendance |
| "SSH Wake-on-LAN app" | Quasi aucun concurrent ne combine les deux | Mettre en avant dans les meta descriptions |
| "Tailscale SSH mobile" | Intégration spécifique, peu de contenu | Enrichir le tuto Tailscale |
| "free SSH terminal Android" | Beaucoup de recherches, peu d'apps vraiment gratuites | Insister sur la gratuité dans les meta |

#### Faible concurrence (mots-clés de niche / long-tail)

| Mot-clé | Potentiel | Action |
|---------|----------|--------|
| "Claude Code mobile SSH terminal" | Niche mais ultra-ciblé | Page agents-cli déjà positionnée |
| "AI coding agent mobile terminal" | Niche émergente | Enrichir la page agents-cli |
| "SSH + WOL + Tailscale mobile app" | Unique à Chill | Homepage et meta descriptions |
| "remote desktop without port forwarding" | Besoin réel, solution = Tailscale | Contenu explicatif sur tuto Tailscale |
| "allumer PC à distance depuis téléphone" (FR) | Recherches francophones, peu de résultats | Tuto WOL en français |
| "terminal SSH mobile gratuit" (FR) | Recherches FR | Meta descriptions FR |
| "coder depuis son téléphone" (FR) | Tendance vibe coding en FR | Contenu dédié |

---

### 5.5 Découverte clé : le "vibe coding mobile" est un marché en explosion

Le blog de **Harper Reed** (janv. 2026) — "Claude Code is better on your phone" — décrit **exactement** le cas d'usage de Chill : SSH + Tailscale + Claude Code depuis un téléphone. Il utilise Blink Shell, mais Chill fait tout ça nativement.

**Plusieurs articles et discussions Reddit confirment la tendance :**
- "How I'm Vibe Coding From My Phone" (Medium)
- "Claude Code from the beach" (rogs.me)
- Multiples threads Reddit sur r/ClaudeAI et r/vibecoding
- Railway propose un template "Deploy Claude Code SSH" pour mobile

**Chill est PARFAITEMENT positionné** pour ce marché mais n'apparaît dans AUCUN de ces résultats. C'est une opportunité SEO/GEO massive.

---

### 5.6 Mots-clés recommandés par page

| Page | Mot-clé principal | Mots-clés secondaires |
|------|------------------|----------------------|
| **Homepage** | "mobile SSH terminal free" | SSH, WOL, Tailscale, AI coding agents, vibe coding |
| **Securite** | "secure SSH mobile app" | encryption, zero data collection, security audit |
| **FAQ** | "Chill ChillShell FAQ" | SSH mobile questions, Wake-on-LAN, Tailscale |
| **Tuto Config OS** | "enable SSH server Windows Linux macOS" | OpenSSH setup, SSH configuration |
| **Tuto SSH** | "SSH connection from phone to PC" | mobile SSH setup, Ed25519 keys |
| **Tuto Tailscale** | "Tailscale SSH mobile remote access" | VPN SSH mobile, access PC from anywhere |
| **Tuto BIOS** | "Wake-on-LAN BIOS setup ASUS" | WOL BIOS configuration, ErP Ready |
| **Tuto WOL** | "Wake-on-LAN from phone" | power on PC remotely, magic packet mobile |
| **Tuto Agents CLI** | "run Claude Code from phone SSH" | Codex CLI mobile, Cursor CLI SSH, vibe coding mobile |

---

### 5.7 Résumé Étape 5

| Catégorie | Constat |
|-----------|---------|
| Position concurrentielle | Chill a des avantages uniques (SSH+WOL+Tailscale+gratuit) mais est INVISIBLE en ligne |
| Marché émergent | "Vibe coding mobile" / "Claude Code from phone" = opportunité majeure en 2026 |
| Mots-clés haute valeur | "run Claude Code from phone", "SSH Wake-on-LAN app", "vibe coding mobile" |
| Mots-clés FR | Très peu de concurrence francophone sur SSH mobile et WOL |
| Risque principal | Pas de backlinks, pas de présence web = difficile de ranker sur les mots-clés compétitifs |

### Actions prioritaires identifiées (Étape 5)

1. **[CRITIQUE]** Mettre à jour les meta descriptions des tutos avec les mots-clés identifiés
2. **[CRITIQUE]** Enrichir la page Agents CLI pour cibler "run Claude Code from phone" / "vibe coding mobile"
3. **[ÉLEVÉ]** Créer du contenu autour du "vibe coding mobile" (article ou section dédiée)
4. **[ÉLEVÉ]** Insister sur la combinaison unique SSH+WOL+Tailscale dans les descriptions et le contenu
5. **[ÉLEVÉ]** Cibler les mots-clés FR peu concurrentiels ("allumer PC à distance", "terminal SSH mobile gratuit")
6. **[MOYEN]** Chercher des backlinks via les communautés Reddit (r/ClaudeAI, r/vibecoding, r/selfhosted)
7. **[MOYEN]** Se positionner dans les articles de comparaison SSH (contacter les auteurs / commenter)

---

## Étape 6 — Rapport final & Plan d'action

**Statut : TERMINÉ**

---

### 6.1 Tableau de bord global

| Étape | Score | Résumé |
|-------|-------|--------|
| 1. Fondations techniques | **8/10** | Performances excellentes, robots.txt exemplaire, llms.txt en place. Erreurs d'hydratation React à corriger. |
| 2. SEO On-Page | **5/10** | 12 pages de tutos sans meta description, schemas manquants, incohérence prix. Homepage et FAQ bien optimisées. |
| 3. Contenu & E-E-A-T | **4/10** | Aucun auteur, aucune date, maillage interne inexistant. Tutos en thin content. Page Sécurité et FAQ solides. |
| 4. GEO (citabilité IA) | **4/10** | Contenu caché dans 36 accordéons, page Sécurité = 1 bloc géant, llms.txt avec prix obsolète. FAQ bien structurée pour l'IA. |
| 5. Mots-clés & Concurrence | **3/10** | Avantages concurrentiels forts mais invisibilité totale. Opportunité "vibe coding mobile" non exploitée. |

**Score global : 4,8 / 10**

Le site a des **fondations techniques excellentes** et un **contenu de qualité** (surtout Sécurité et FAQ), mais souffre de problèmes structurels qui empêchent les moteurs de recherche et les IA de le découvrir et de le citer.

---

### 6.2 Les 5 problèmes les plus impactants

| # | Problème | Impact | Pages touchées |
|---|----------|--------|---------------|
| 1 | **Contenu caché dans les accordéons** | Les bots IA ne voient pas le contenu — la page Sécurité (1 521 mots) et la FAQ (1 310 mots) sont quasi invisibles | Sécurité, FAQ |
| 2 | **12 pages de tutos sans meta description** | Google affiche une description générique dans les résultats, les pages FR ont une description EN | Tous les tutos EN + FR |
| 3 | **Aucun auteur ni date visible** | Signaux E-E-A-T absents, les moteurs IA ignorent le contenu sans date de fraîcheur | Tout le site |
| 4 | **Maillage interne inexistant** | Les pages ne se lient pas entre elles, pas de parcours utilisateur ni de "cluster de contenu" | Tout le site |
| 5 | **Pas de positionnement "vibe coding mobile"** | Le marché explose en 2026, Chill est parfaitement positionné mais invisible | Agents CLI, Homepage |

---

### 6.3 Plan d'action priorisé

#### Phase 1 — Corrections critiques (impact immédiat)

> Ces corrections ne nécessitent pas de nouveau contenu, juste des modifications techniques.

| # | Action | Fichiers concernés | Effort |
|---|--------|-------------------|--------|
| 1.1 | **Supprimer les accordéons** sur Sécurité et FAQ — afficher tout le contenu en dur avec des H2/H3 pour structurer | Composants React Sécurité + FAQ | Moyen |
| 1.2 | **Écrire des meta descriptions uniques** pour les 12 pages de tutos (EN + FR) | `src/pages/tutos/*.astro` + `src/pages/fr/tutos/*.astro` | Faible |
| 1.3 | **Mettre à jour llms.txt et llms-full.txt** — remplacer $2.99 par Gratuit | `public/llms.txt` + `public/llms-full.txt` | Faible |
| 1.4 | **Corriger le schema SoftwareApplication** — prix 0, Organization.name = "Chill" | `src/layouts/BaseLayout.astro` ou composant schema | Faible |
| 1.5 | **Ajouter `rel="noopener noreferrer"`** sur les liens externes | Composants avec liens vers Play Store | Faible |

#### Phase 2 — Structure E-E-A-T (impact élevé)

> Ajouter les signaux de confiance que Google et les moteurs IA recherchent.

| # | Action | Détails | Effort |
|---|--------|---------|--------|
| 2.1 | **Ajouter l'auteur "HUYNH Kevin"** | Bio courte sur les pages de contenu (Sécurité, FAQ, Tutos). Peut être un composant réutilisable en footer de page. | Faible |
| 2.2 | **Ajouter les dates** de publication et de dernière mise à jour | Balise `<time>` visible sur chaque page de contenu + schema `datePublished` / `dateModified` | Faible |
| 2.3 | **Créer le maillage interne** | Ajouter des liens entre les pages liées : Sécurité↔FAQ, Config OS→SSH→Tailscale (parcours), FAQ→Tutos, Homepage→toutes les sections | Moyen |
| 2.4 | **Ajouter des schemas manquants** | WebPage sur Sécurité, Article sur Updates, HowTo sur Agents CLI | Faible |

#### Phase 3 — Enrichissement de contenu (impact élevé, effort moyen)

> Enrichir les pages thin et optimiser pour le GEO.

| # | Action | Détails | Effort |
|---|--------|---------|--------|
| 3.1 | **Restructurer la page Sécurité** en 8-10 sections H2 | Chunker le contenu en blocs de ~150 mots avec headings clairs (ex: "Stockage des clés SSH", "Protection par PIN", "Détection root", "Résultats d'audit STRIDE") | Moyen |
| 3.2 | **Enrichir les tutos thin** | SSH (121 mots), Agents CLI (115 mots), WOL (158 mots) — ajouter du contexte, des stats, des conseils. Objectif : 400+ mots minimum par tuto. | Moyen |
| 3.3 | **Enrichir la page Agents CLI** | Cibler "run Claude Code from phone" et "vibe coding mobile". Ajouter un intro de 150 mots sur le cas d'usage, plus de détails par agent. | Moyen |
| 3.4 | **Ajouter des statistiques** dans les tutos | "Setup takes under 5 minutes", "Ed25519 uses 256-bit encryption", "Tailscale is free for up to 100 devices" | Faible |

#### Phase 4 — Positionnement stratégique (impact long terme)

> Se positionner sur le marché "vibe coding mobile" et construire la visibilité.

| # | Action | Détails | Effort |
|---|--------|---------|--------|
| 4.1 | **Créer une section "Vibe Coding" ou "Code from your phone"** | Contenu dédié ciblant les mots-clés émergents. Expliquer comment utiliser Chill + SSH + Claude Code depuis son téléphone. | Élevé |
| 4.2 | **Cibler les mots-clés FR à faible concurrence** | "allumer PC à distance depuis téléphone", "terminal SSH mobile gratuit", "coder depuis son téléphone" dans les meta FR | Faible |
| 4.3 | **Profil GitHub** | Quand le profil sera prêt, l'ajouter dans Organization.sameAs et la bio auteur | Faible |
| 4.4 | **Présence communautaire** | Poster sur r/ClaudeAI, r/vibecoding, r/selfhosted quand le site sera en ligne | Effort continu |

---

### 6.4 Ordre de mise en oeuvre recommandé

```
Phase 1 (corrections critiques)
├── 1.3 Mettre à jour llms.txt (5 min)
├── 1.4 Corriger schemas prix/nom (15 min)
├── 1.5 Ajouter rel="noopener noreferrer" (5 min)
├── 1.2 Écrire meta descriptions tutos (30-45 min)
└── 1.1 Supprimer accordéons + réorganiser Sécurité/FAQ (1-2h)

Phase 2 (E-E-A-T)
├── 2.1 Ajouter auteur HUYNH Kevin (20 min)
├── 2.2 Ajouter dates publication/MAJ (20 min)
├── 2.4 Ajouter schemas manquants (30 min)
└── 2.3 Créer maillage interne (45 min)

Phase 3 (contenu)
├── 3.4 Ajouter statistiques dans tutos (20 min)
├── 3.1 Restructurer page Sécurité en sections (1h)
├── 3.2 Enrichir tutos thin (1-2h)
└── 3.3 Enrichir page Agents CLI (1h)

Phase 4 (stratégique)
├── 4.2 Mots-clés FR dans meta (15 min)
├── 4.1 Section "Vibe Coding" (2-3h)
├── 4.3 Profil GitHub (quand prêt)
└── 4.4 Présence communautaire (post-déploiement)
```

---

### 6.5 Métriques de succès post-déploiement

| Métrique | Outil | Objectif |
|----------|-------|---------|
| Indexation Google | Google Search Console | 100% des pages indexées sous 2 semaines |
| Indexation Brave | Brave Search `site:chill.app` | Présent dans les résultats |
| Core Web Vitals | PageSpeed Insights / Search Console | Tous les indicateurs au vert |
| Citations IA | Recherche manuelle sur ChatGPT/Perplexity/Claude | Cité pour "SSH mobile", "Claude Code mobile" |
| Position mots-clés | Brave Search / Google | Top 20 pour "run Claude Code from phone" |
| Schema validation | Google Rich Results Test | 0 erreur, rich results éligibles |

---

### 6.6 Ce qui va BIEN et qu'il ne faut PAS toucher

- Performance du site (< 1s, FCP < 400ms) — Astro SSG fait un excellent travail
- Robots.txt avec gouvernance IA — exemplaire
- llms.txt / llms-full.txt — structure bien pensée (juste mettre à jour le prix)
- Schema FAQPage avec 14 questions — excellent pour le GEO
- Schemas HowTo sur les tutos — bien implémentés
- Alt text sur toutes les images — 100%
- Hreflang EN/FR correctement configurés
- Pages légales complètes (Legal, CGU, Privacy, Contact, About)
- Page Sécurité — meilleur contenu du site (7/9 méthodes Princeton GEO)

---

*Audit réalisé le 14 février 2026 avec Playwright, Brave Search et analyse du code source.*
*Prochaine étape : implémenter les corrections Phase 1.*
