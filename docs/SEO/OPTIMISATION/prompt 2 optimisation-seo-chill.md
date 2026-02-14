 # Prompt 2 — Optimisation SEO et GEO du site Chill

## Instructions à coller dans Claude Code APRÈS l'audit :

---

Point critique identifié dans l'audit : le site est bilingue EN/FR. Toutes les modifications de contenu (titles, descriptions, FAQ, TLDR, pages About/Contact) doivent être faites dans les DEUX langues. Les balises hreflang doivent être ajoutées sur toutes les pages.

---

Avant de commencer, lis attentivement ces fichiers dans l'ordre :
1. `Claude.md` à la racine du projet — contexte, stack, conventions
2. `/home/huynh-kevin/projects/Chill/docs/SEO/WEB_RESEARCH_SEO_GEO_AI_2026.md` — référentiel SEO/GEO 2026
3. Le rapport d'audit SEO qu'on vient de produire /home/huynh-kevin/projects/Chill/docs/SEO/RAPPORT_AUDIT/RAPPORT AUDIT SEO COMPLET SITE_CHILL.md — les problèmes identifiés et le plan d'action

**Ne commence les modifications qu'après avoir lu et compris ces trois documents.**

---

## Ta mission

Tu es un expert SEO technique et GEO (Generative Engine Optimization) en 2026. En te basant sur le rapport d'audit, tu dois **corriger tous les problèmes identifiés et optimiser le site Chill** pour le SEO classique Google ET pour les moteurs de recherche IA (ChatGPT Search, Perplexity, Google AI Overviews).

Utilise les skills **SEO-GEO**, **marketingskills** et **SEO Audit Expert** tout au long de l'optimisation en mode **AGENT TEAMS** pour déployer une équipe. 

---

## Ordre d'exécution

Suis cet ordre strict. Après chaque étape, résume ce que tu as fait et les fichiers modifiés avant de passer à la suivante.

### Étape 1 — Corrections critiques (SEO Audit Expert + marketingskills)

Corrige d'abord tous les problèmes critiques identifiés dans l'audit :
- Erreurs d'indexation et de crawl
- Meta tags manquants ou incorrects (title, description, canonical)
- Problèmes de structure HTML (hiérarchie headings, HTML sémantique)
- Problèmes de performance dans le code (images, render-blocking resources)
- Problèmes mobile-first
- Mixed content ou erreurs de sécurité

### Étape 2 — robots.txt et sitemap.xml (marketingskills)

**robots.txt — Implémente la gouvernance IA :**
```
# Crawlers traditionnels
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Bots IA de recherche (retrieval) — AUTORISER
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Bots IA de training — BLOQUER
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

# Tous les autres
User-agent: *
Allow: /

Sitemap: [URL_DU_SITEMAP]
```

**sitemap.xml :**
- Inclure uniquement les URLs canoniques retournant un code 200
- Ajouter `<lastmod>` avec la vraie date de dernière modification
- Ne pas inclure `<priority>` ni `<changefreq>` (ignorés par Google)

### Étape 3 — Schema markup JSON-LD (marketingskills)

Implémente les schemas suivants en JSON-LD dans les pages appropriées :

**Sur toutes les pages :**
- `Organization` : nom (Chill/ChillShell), logo, description, profils sociaux, URL officielle

**Sur la homepage / landing page :**
- `SoftwareApplication` : nom, description, système d'exploitation, catégorie, prix, screenshots
- `FAQ` : avec les questions fréquentes sur l'app (minimum 5-10 questions)

**Sur les pages de contenu/blog (si existantes) :**
- `Article` ou `BlogPosting` : titre, auteur, date publication, date modification, description
- `Person` : pour les auteurs avec credentials

**Validation :** vérifie que chaque schema est syntaxiquement correct et correspond au contenu réel de la page.

### Étape 4 — Optimisation GEO du contenu (SEO-GEO)

Pour CHAQUE page du site, applique les 7 piliers GEO :

**1. Réponse d'abord :**
- Réécris les 40-60 premiers mots après chaque H1 pour donner une réponse directe et claire
- Inclus 1-2 données clés en gras
- Le lecteur (et l'IA) doit comprendre de quoi parle la page sans scroller

**2. TLDR / Résumé :**
- Ajoute un résumé concis en haut de chaque page principale (après le H1)
- Format : 40-60 mots + 3-5 points clés
- Ce résumé doit être autonome et compréhensible hors contexte

**3. Passages autonomes :**
- Structure le contenu en sections de 134-167 mots
- Chaque section doit être compréhensible sans lire le reste de la page
- Utilise des sous-titres (H2/H3) descriptifs et contenant les mots-clés

**4. FAQ optimisées :**
- Ajoute une section FAQ sur les pages principales
- 5-10 questions pertinentes avec des réponses directes de 40-60 mots
- Les questions doivent correspondre à ce que les utilisateurs demanderaient à une IA
- Implémente le schema FAQPage JSON-LD correspondant

**5. Sources citables :**
- Quand des statistiques ou faits sont mentionnés, cite-les nommément
- Format : « Selon [Source], [donnée] » plutôt que juste un lien
- Cela augmente la confiance des moteurs IA

**6. Entités et sémantique :**
- Enrichis le contenu avec des entités reconnues (noms de technologies, concepts, marques)
- Objectif : 15+ entités reconnues par 1 000 mots
- Utilise un vocabulaire précis et technique plutôt que générique

**7. Structure sémantique :**
- Assure-toi que chaque page a une seule thématique claire
- Les H2/H3 doivent former un sommaire logique du contenu
- Les liens internes doivent connecter les pages thématiquement liées

### Étape 5 — Optimisation technique performance (marketingskills)

**Images :**
- Convertir en formats modernes (WebP) si ce n'est pas déjà fait
- Ajouter width et height explicites sur toutes les images (pour éviter le CLS)
- Implémenter le lazy loading sur les images below-the-fold
- Ajouter des attributs alt descriptifs et pertinents sur toutes les images

**CSS/JS :**
- Identifier et différer les CSS/JS non critiques
- Inliner le CSS critique (above-the-fold) si applicable
- Ajouter preload sur les ressources critiques (fonts, hero image)

**Fonts :**
- Ajouter `font-display: swap` sur toutes les déclarations de fonts
- Preload les fonts principales

### Étape 6 — Signaux E-E-A-T (SEO-GEO + marketingskills)

**Vérifier et améliorer :**
- Page "À propos" : histoire, équipe, mission, preuves d'expertise
- Page "Contact" : moyens de contact réels et fonctionnels
- Mentions légales / Politique de confidentialité
- Dates de mise à jour visibles sur le contenu
- Screenshots, démos, témoignages comme preuves d'expérience réelle

**Si des pages manquent, crée-les** en respectant le style et la stack du projet.

### Étape 7 — Open Graph et partage social (marketingskills)

Sur chaque page, vérifie et complète :
```html
<meta property="og:title" content="[Titre optimisé]">
<meta property="og:description" content="[Description incitative]">
<meta property="og:image" content="[URL image 1200x630]">
<meta property="og:type" content="website">
<meta property="og:url" content="[URL canonique]">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Titre]">
<meta name="twitter:description" content="[Description]">
<meta name="twitter:image" content="[URL image]">
```

### Étape 8 — Fichier llms.txt (SEO-GEO)

Crée un fichier `llms.txt` à la racine du site avec :
- Description claire de ce qu'est Chill/ChillShell
- Les cas d'utilisation principaux
- Les fonctionnalités clés
- Les informations que les moteurs IA devraient citer
- Format structuré et facilement parsable

### Étape 9 — Accessibilité (impact SEO)

- Vérifier et corriger les attributs alt manquants
- Vérifier les contrastes de couleurs
- Ajouter les attributs ARIA nécessaires
- Vérifier la navigation au clavier
- Ajouter les attributs lang appropriés

---

## Règles à respecter pendant l'optimisation

1. **Préserve le design et le style existants** — tu optimises le SEO, tu ne redesignes pas le site
2. **Préserve le contenu existant** — tu enrichis et restructures, tu ne supprimes pas
3. **Le contenu doit rester naturel** — pas de keyword stuffing, pas de sur-optimisation (c'est pénalisé en 2026)
4. **Tout le contenu ajouté doit être en cohérence** avec le ton et le style du site existant
5. **Commite tes changements** régulièrement avec des messages de commit clairs et descriptifs (ex: "seo: add JSON-LD Organization schema", "seo: optimize hero section for GEO")
6. **Documente tes changements** — à la fin, produis un résumé de toutes les modifications avec les fichiers modifiés

---

## Rapport final attendu

Après toutes les modifications, produis :

### 1. Résumé des modifications
- Nombre de fichiers modifiés/créés
- Liste des modifications par catégorie (technique, contenu, schema, etc.)

### 2. Nouveau score estimé
Ré-estime les scores après optimisation :
- SEO Technique : /100 (avant → après)
- SEO On-page : /100 (avant → après)
- E-E-A-T : /100 (avant → après)
- GEO : /100 (avant → après)
- Accessibilité : /100 (avant → après)
- **Score global : /100 (avant → après)**

### 3. Actions restantes
Ce qui ne pouvait pas être fait dans le code et nécessite une action manuelle :
- Inscription Google Search Console
- Soumission du sitemap
- Création de comptes sociaux
- Acquisition de backlinks
- Monitoring de la visibilité IA
- Etc.

------
