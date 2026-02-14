# Prompt 1 — Audit SEO complet du site Chill

## Instructions à coller dans Claude Code :

---

Avant de commencer, lis attentivement ces deux fichiers dans l'ordre :
1. `Claude.md` à la racine du projet — pour comprendre le contexte, la stack technique, la structure du projet et les conventions
2. `/home/huynh-kevin/projects/Chill/docs/SEO/WEB_RESEARCH_SEO_GEO_AI_2026.md` — c'est notre référentiel SEO/GEO 2026, il contient tous les standards, seuils et bonnes pratiques actuels contre lesquels tu vas auditer

**Ne commence l'audit qu'après avoir lu et compris ces deux documents.**

---

## Ta mission

Tu es un expert SEO technique et GEO (Generative Engine Optimization) en 2026. Tu dois réaliser un **audit SEO complet** du site web "Chill" (le site vitrine/landing page de l'application ChillShell).

Utilise les skills **SEO Audit Expert** et **marketingskills** tout au long de l'audit.

Tu dois analyser CHAQUE fichier HTML/page du site web et produire un rapport d'audit structuré avec des scores, des problèmes identifiés et des recommandations actionnables classées par priorité.

---

## Périmètre de l'audit

### A. Audit technique SEO (SEO Audit Expert)

**1. Crawlabilité et indexation :**
- Vérifier le fichier `robots.txt` : est-il présent ? Bloque-t-il des pages importantes ? Différencie-t-il les bots IA (GPTBot, OAI-SearchBot, anthropic-ai, ClaudeBot, PerplexityBot) des crawlers traditionnels (Googlebot) ?
- Vérifier le `sitemap.xml` : est-il présent ? Contient-il toutes les URLs canoniques ? Les URLs retournent-elles un code 200 ? Y a-t-il un `<lastmod>` fiable ?
- Vérifier les balises canonical sur chaque page
- Vérifier qu'il n'y a pas de noindex accidentel sur des pages importantes
- Vérifier que le contenu important n'est pas rendu uniquement côté client (JavaScript)

**2. Core Web Vitals — vérification du code :**
- **LCP (≤ 2,5s)** : identifier les éléments susceptibles de ralentir le LCP (images non optimisées, fonts bloquantes, CSS/JS render-blocking, absence de preload sur les ressources critiques)
- **INP (≤ 200ms)** : identifier le JavaScript lourd qui pourrait bloquer le main thread, les event handlers lourds
- **CLS (≤ 0,1)** : vérifier que les images ont des dimensions explicites (width/height), que les fonts ont font-display: swap, qu'il n'y a pas d'éléments injectés dynamiquement sans espace réservé
- Vérifier l'optimisation des images : formats modernes (WebP/AVIF), lazy loading, srcset/sizes pour le responsive
- Vérifier les ressources render-blocking (CSS/JS non critiques non différés)

**3. Mobile-first :**
- Vérifier la meta viewport
- Vérifier la parité de contenu mobile/desktop
- Vérifier les touch targets (minimum 48x48px)
- Vérifier le design responsive (pas de scroll horizontal, texte lisible sans zoom)

**4. Sécurité et protocole :**
- HTTPS correctement configuré
- Pas de mixed content (HTTP dans une page HTTPS)

**5. Structure HTML et sémantique :**
- Hiérarchie des headings (un seul H1 par page, structure logique H1→H2→H3)
- HTML sémantique (header, main, nav, footer, article, section)
- Balises lang correctes
- Liens internes : architecture plate (pages importantes à 3-4 clics max du homepage)

### B. Audit SEO on-page (marketingskills)

**6. Meta tags par page :**
- Title : présent, unique, < 60 caractères, contient le mot-clé principal
- Meta description : présente, unique, 150-160 caractères, incitative au clic
- Open Graph tags (og:title, og:description, og:image, og:type, og:url)
- Twitter Card tags
- Favicon et apple-touch-icon

**7. Contenu et mots-clés :**
- Densité et placement naturel des mots-clés
- Pas de keyword stuffing
- Contenu unique et utile (pas thin content)
- Texte alt sur toutes les images (descriptif, pas de keyword stuffing)

**8. Schema markup (JSON-LD) :**
- Vérifier la présence de schemas : Organization, Product/SoftwareApplication, FAQ, Person (si auteurs), Article/BlogPosting (si blog)
- Valider la syntaxe JSON-LD
- Vérifier que les schemas correspondent au contenu réel de la page
- Identifier les schemas manquants qui devraient être implémentés selon le type de page

### C. Audit E-E-A-T

**9. Signaux de confiance :**
- Page "À propos" présente et détaillée
- Page "Contact" avec moyens de contact réels
- Politique de confidentialité / Mentions légales
- Preuves d'expérience réelle (screenshots, démos, témoignages)
- Dates de publication/mise à jour visibles

### D. Audit GEO (Generative Engine Optimization)

**10. Optimisation pour les moteurs IA :**
- Les 40-60 premiers mots après chaque H1 contiennent-ils une réponse directe et claire ?
- Le contenu est-il structuré en passages autonomes de 134-167 mots ?
- Y a-t-il des résumés TLDR en haut des pages principales ?
- Y a-t-il des FAQ avec réponses directes de 40-60 mots ?
- Les sources/statistiques sont-elles citées nommément (« Selon [Source], [donnée] ») ?
- Le contenu est-il chunké en blocs facilement extractibles par l'IA ?
- Y a-t-il un fichier `llms.txt` ?

### E. Audit accessibilité (impact SEO)

**11. Accessibilité de base :**
- Attributs alt sur toutes les images
- Contraste de couleurs suffisant
- Navigation au clavier possible
- Attributs ARIA si nécessaires
- Sous-titres sur les vidéos (si applicable)

---

## Format du rapport attendu

Produis un rapport structuré avec :

### 1. Score global
Un score sur 100 pour chaque catégorie :
- SEO Technique : /100
- SEO On-page : /100
- E-E-A-T : /100
- GEO (optimisation IA) : /100
- Accessibilité : /100
- **Score global : /100**

### 2. Problèmes critiques (à corriger immédiatement)
Listés par ordre de priorité avec :
- Le problème exact
- Le fichier/la ligne concernée
- L'impact SEO estimé
- La correction recommandée

### 3. Problèmes importants (à corriger rapidement)
Même format

### 4. Améliorations recommandées (nice to have)
Même format

### 5. Points positifs
Ce qui est déjà bien fait

### 6. Plan d'action priorisé
Les 10 actions les plus impactantes classées par rapport effort/impact :
- Action
- Impact estimé (élevé/moyen/faible)
- Effort estimé (élevé/moyen/faible)
- Fichiers concernés

---

## Rappels importants

- Analyse CHAQUE page/fichier HTML du site, pas juste la homepage
- Base-toi sur les standards 2026 du document WEB_RESEARCH_SEO_GEO_AI_2026.md, pas sur des pratiques obsolètes
- Sois concret : cite les fichiers, les lignes, le code problématique
- Ne fais AUCUNE modification de code pendant l'audit — diagnostic uniquement
- Si tu identifies des pages ou sections manquantes (ex: pas de page À propos, pas de FAQ), note-le comme problème
