AUDIT SEO COMPLET — SITE CHILL (ChillShell)                         
                                                                                
  Version 2 — Basé sur le référentiel SEO/GEO 2026                              
                                                                                
  Date : 10 février 2026                                                        
  Site : chill.app — Site vitrine de ChillShell (app mobile terminal SSH)       
  Stack : Astro 5 (SSG) + React 19 + Tailwind CSS 4 — Bilingue EN/FR            
  Référentiel : WEB_RESEARCH_SEO_GEO_AI_2026.md (lu par chaque agent avant      
  analyse)
  Skills utilisés : seo-audit + seo-geo (méthodologies Princeton GEO, schema
  templates, checklists P0/P1/P2)
  Méthode : Agent Teams — 3 agents spécialisés avec contexte 2026

  ---
  1. Score global
  Catégorie: SEO Technique
  Score: 48/100
  Justification: Canonical OK, SSG optimal, mais hreflang absents, robots.txt
    sans gouvernance IA, image OG 404, pas de preload LCP/fonts,
    images PNG uniquement
  ────────────────────────────────────────
  Catégorie: SEO On-page
  Score: 32/100
  Justification: Zéro schema JSON-LD, H1 absent sur homepage, titles trop
  courts,
     descriptions identiques sur 26 pages, liens cassés href="#",
    contenu placeholder
  ────────────────────────────────────────
  Catégorie: E-E-A-T
  Score: 20/100
  Justification: Pas de page About, pas de Contact, mentions légales
  incomplètes,
     aucun auteur identifié, pas de témoignages, pas de social proof
  ────────────────────────────────────────
  Catégorie: GEO (optimisation IA)
  Score: 12/100
  Justification: Pas de llms.txt, pas de TLDR, FAQ 15 mots au lieu de 40-60,
    aucune source citée, aucune statistique, contenu crucial
    derrière JS client-side
  ────────────────────────────────────────
  Catégorie: Accessibilité
  Score: 55/100
  Justification: Bonne sémantique HTML, alt text présents, lang dynamique, mais
    skip-link absent, contrastes text-muted en échec WCAG AA,
    NavDropdown inaccessible, non-conformité EAA
  ────────────────────────────────────────
  Catégorie: Score global
  Score: 33/100
  Justification: Base technique SSG solide mais lacunes majeures en données
    structurées, signaux de confiance et optimisation IA
  ---
  2. Problèmes critiques (à corriger immédiatement)

  C1. Contenu crucial caché derrière du JavaScript client-side

  - Fichiers : src/components/ui/Accordion.tsx (client:visible),
  src/components/security/SecurityDetail.tsx (client:visible), composants tutos
  (ConfigOsContent.tsx, SshContent.tsx, etc.)
  - Impact GEO : Le référentiel section 8 dit explicitement : "s'assurer que le
  contenu important est rendu côté serveur, pas derrière du JavaScript
  client-side, pas derrière des accordéons". Les réponses FAQ, les détails de
  sécurité et le contenu des tutoriels ne sont pas dans le HTML initial servi
  aux crawlers IA. Perte totale de citation pour ce contenu.
  - Correction : Rendre le contenu FAQ et sécurité en HTML statique Astro.
  Utiliser les accordions uniquement pour le visuel (contenu présent dans le
  HTML, plié/déplié en CSS/JS).

  C2. Zéro schema JSON-LD sur tout le site

  - Fichier : src/layouts/BaseLayout.astro — non implémenté
  - Impact : Référentiel section 6 : "Le schema markup augmente le CTR de 20-40%
   et le contenu avec schema correct a 2,5x plus de chances d'apparaître dans
  les réponses IA." Skill seo-geo : FAQPage = +40% visibilité IA (Princeton).
  - Schemas manquants prioritaires :
    - Organization (global) : nom "Chill", logo, URL, contact
    - SoftwareApplication (homepage) : name, applicationCategory
  "MobileApplication", operatingSystem "Android, iOS", offers
    - FAQPage (faq.astro) : 7 Q&A déjà structurées
    - HowTo (6 tutos) : guides pas-à-pas avec étapes
    - BreadcrumbList (sous-pages)
    - WebPage + SpeakableSpecification : pour extraction IA vocale

  C3. Balises hreflang absentes (site bilingue EN/FR)

  - Fichier : src/layouts/BaseLayout.astro lignes 22-53 — non implémenté
  - Impact : Référentiel section 10 : Google traite les versions EN et FR comme
  contenu dupliqué. Risque de cannibalisation, mauvais ciblage géographique dans
   les SERP.
  - Correction : Ajouter <link rel="alternate" hreflang="en">, hreflang="fr" et
  hreflang="x-default" dynamiquement dans le <head>

  C4. H1 absent sur la homepage

  - Fichier : src/components/home/HeroChillShell.tsx:22 — utilise <h2> au lieu
  de <h1>
  - Impact : La page la plus importante du site n'a pas de H1. Le H1 est le
  signal on-page le plus fort pour l'ancrage sémantique. Les moteurs IA
  l'utilisent comme point d'entrée pour l'extraction.
  - Correction : Changer le <h2> du hero en <h1>

  C5. Page About / À propos inexistante

  - Impact E-E-A-T : Référentiel section 4 : "les pages 'À propos' et 'Contact'
  détaillées sont des signaux essentiels". Impossible d'établir l'expertise,
  l'expérience ou l'autorité du créateur de ChillShell.
  - Correction : Créer about.astro + fr/about.astro avec : présentation
  fondateur, bio avec credentials, historique du projet, mission, photo

  C6. Page Contact inexistante + mentions légales incomplètes

  - Fichiers : src/pages/mentions-legales.astro:23,45 — [To be completed],
  src/pages/politique-confidentialite.astro:99 — [To be completed]
  - Impact : Non-conformité légale française (SIRET/SIREN manquant, directeur de
   publication absent). Signal E-E-A-T négatif. Contenu placeholder = "thin
  content" pénalisé par Google.
  - Correction : Créer page Contact, compléter mentions légales avec
  informations réelles

  C7. Image OG par défaut inexistante (404)

  - Fichier : src/layouts/BaseLayout.astro:15 — pointe vers
  /images/og-default.png
  - Impact : Ce fichier n'existe pas dans public/images/. Toute page sans image
  OG explicite a une meta og:image qui retourne un 404. Partage social cassé sur
   les 26 pages.
  - Correction : Créer public/images/og-default.png (1200x630px)

  C8. robots.txt sans gouvernance des bots IA

  - Fichier : public/robots.txt — 3 lignes seulement
  - Impact : Référentiel section 10 : "le robots.txt sert désormais à
  différencier les bots de training (GPTBot), les bots de retrieval
  (OAI-SearchBot) et les crawlers traditionnels". Actuellement tous les bots IA
  de training ont accès libre.
  - Correction : Bloquer les bots de training (GPTBot, Google-Extended, CCBot,
  anthropic-ai), autoriser les bots de recherche (OAI-SearchBot, PerplexityBot,
  ChatGPT-User, ClaudeBot)

  C9. Skip-to-content link absent (non-conformité EAA)

  - Fichier : src/layouts/BaseLayout.astro:54-58
  - Impact : Référentiel section 10 : "L'European Accessibility Act (EAA) est
  entré en application en juin 2025, rendant l'accessibilité numérique
  obligatoire dans l'UE." Le <main> n'a pas d'id non plus.
  - Correction : Ajouter <a href="#main-content" class="sr-only
  focus:not-sr-only">Skip to content</a> + id="main-content" sur <main>

  ---
  3. Problèmes importants (à corriger rapidement)

  I1. Titles trop courts et sans mots-clés ciblés

  - Fichiers : src/i18n/en.json, fr.json, pages .astro
  - Exemples : "FAQ" (3 car.), "Updates" (7 car.), "Security — Chill" (16 car.)
  - Référentiel section 10 : "title unique, < 60 caractères". La plupart
  gaspillent 40+ caractères d'espace SERP et n'incluent pas "SSH", "mobile app",
   "terminal".

  I2. Meta descriptions identiques sur les 26 pages

  - Fichier : src/layouts/BaseLayout.astro:15 — fallback "Chill — Your desktop
  terminal. In your pocket." (49 car.)
  - Aucune page ne passe de prop description au BaseLayout. Référentiel :
  150-160 caractères, unique, incitative au clic.

  I3. Réponses FAQ trop courtes (15-25 mots vs 40-60 requis)

  - Fichier : src/i18n/en.json:204-216
  - Exemple : faq.a1 = "Any OS with an SSH server: Windows (with OpenSSH),
  Linux, macOS. See our OS Setup tutorial." = 17 mots
  - Référentiel section 8 : "5-10 questions par page avec des réponses directes
  de 40-60 mots. Le format Q&A a le taux de citation le plus élevé dans les
  réponses IA."

  I4. Aucune source citée nommément — aucune statistique sourcée

  - Impact Princeton GEO : Cite Sources = +40% visibilité, Statistics = +37%. Le
   site n'utilise aucune des deux méthodes les plus efficaces.
  - Exemples concrets manquants :
    - Page sécurité : cite PBKDF2, Ed25519 mais pas les RFC/NIST correspondants
    - Tutos : ne citent pas la documentation officielle Microsoft/Tailscale
    - Score audit "8.5/10" sans dire qui l'a réalisé

  I5. Pas de résumés TLDR sur aucune page

  - Référentiel section 8 : "résumé TLDR après H1, 40-60 mots + 3-5 bullet
  points = +45% featured snippet"
  - Impact : Les moteurs IA n'ont aucun passage extractible en position
  prioritaire sur aucune page.

  I6. Pas de fichier llms.txt

  - Fichier : public/llms.txt — inexistant
  - Référentiel section 8 : "envisager un fichier llms.txt" pour le GEO
  technique.

  I7. Images non optimisées (PNG/JPG uniquement) + pas de preload LCP

  - Fichiers : public/images/screenshots/ (9 PNG, 78-305 Ko),
  public/images/tutos/ (~20 JPG/PNG)
  - Logo logo-chill.png = 503x496px (107 Ko) affiché à 96x96 = surdimensionné 5x
  - Aucun preload pour l'image LCP, aucun fetchpriority="high"
  - Référentiel section 3 : "Pages avec LCP > 3s ont subi -23% de trafic au Core
   Update déc 2025"

  I8. Pas de preload fonts critiques

  - Fichier : src/layouts/BaseLayout.astro — aucun <link rel="preload"
  as="font">
  - Note positive : Les fonts ont bien font-display: swap (vérifié dans
  @fontsource). Mais sans preload, risque de FOUT impactant le LCP.

  I9. Images sans width/height explicites (risque CLS)

  - Fichiers : Carousel.tsx:110-114, HeroChillShell.tsx:69-73,
  StepImage.tsx:12-14, Pricing.astro:42-44
  - Référentiel section 3 : CLS ≤ 0,1. Les badges ont seulement h-[52px] sans
  largeur.

  I10. Liens cassés href="#"

  - Fichiers : src/pages/updates.astro:66 (Download APK),
  src/components/home/HeroChillShell.tsx:13-14 (store URLs par défaut),
  src/components/home/Pricing.astro:39,46 (liens vers pages d'accueil des stores
   au lieu de la fiche app)

  I11. Aucun auteur identifié + pas de dates sur les tutos

  - Référentiel section 4 : "Les bios d'auteurs détaillées avec credentials sont
   devenues quasi-obligatoires". Aucun auteur, aucune date de publication sur
  les tutoriels.

  I12. Contraste text-muted en échec WCAG AA

  - Fichier : src/styles/global.css:20,40
  - Mode clair : #848a98 sur #eef0f3 = ratio ~2,9:1 (seuil AA = 4,5:1)
  - Mode sombre : #5c6170 sur #08090a = ratio ~3,5:1
  - Usage : Footer, dates, notes — contenu fréquent

  I13. NavDropdown inaccessible au clavier

  - Fichier : src/components/layout/NavDropdown.tsx:29-45
  - Manquent : aria-expanded, aria-haspopup="true", role="menu", gestion clavier
   (Escape, flèches)

  I14. Touch targets < 48px (dots du carousel)

  - Fichier : src/components/ui/Carousel.tsx:126-136 — dots de w-2.5 h-2.5
  (10x10px)
  - Référentiel section 10 : "touch targets minimum 48x48 pixels" (58% des
  recherches = mobile)

  I15. og:locale format incorrect

  - Fichier : src/layouts/BaseLayout.astro:36 — utilise "en"/"fr" au lieu de
  "en_US"/"fr_FR"

  ---
  4. Améliorations recommandées (nice to have)
  #: R1
  Amélioration: Ajouter témoignages / social proof (nombre téléchargements,
    ratings)
  Gain attendu (référentiel): E-E-A-T Experience
  ────────────────────────────────────────
  #: R2
  Amélioration: Créer des OG images par page (pas juste le défaut)
  Gain attendu (référentiel): CTR partage social
  ────────────────────────────────────────
  #: R3
  Amélioration: Enrichir alt text homepage ("ChillShell SSH terminal on Android"

    vs "Terminal SSH view")
  Gain attendu (référentiel): GEO extractibilité
  ────────────────────────────────────────
  #: R4
  Amélioration: Ajouter apple-touch-icon
  Gain attendu (référentiel): Signal technique iOS
  ────────────────────────────────────────
  #: R5
  Amélioration: Ajouter aria-hidden="true" sur SVGs décoratifs (securite.astro,
    Differentiator.astro)
  Gain attendu (référentiel): Accessibilité
  ────────────────────────────────────────
  #: R6
  Amélioration: Ajouter aria-label sur LanguageToggle.tsx et Carousel.tsx
  Gain attendu (référentiel): Accessibilité
  ────────────────────────────────────────
  #: R7
  Amélioration: Ajouter aria-current="page" sur les liens de navigation actifs
  Gain attendu (référentiel): Accessibilité
  ────────────────────────────────────────
  #: R8
  Amélioration: Configurer lastmod dans le plugin sitemap Astro
  Gain attendu (référentiel): Crawl budget (référentiel section 10)
  ────────────────────────────────────────
  #: R9
  Amélioration: Structurer le contenu en passages de 134-167 mots autonomes
  Gain attendu (référentiel): Référentiel section 9 : 4,2x chances AI Overview
  ────────────────────────────────────────
  #: R10
  Amélioration: Ajouter démo vidéo de l'app
  Gain attendu (référentiel): Référentiel section 9 : contenu multimodal = +317%

    taux sélection
  ---
  5. Points positifs
  Aspect: Architecture SSG (Astro 5)
  Détail: HTML statique pré-généré
  Référence: Référentiel : "+73% performances vs dynamique, temps < 200ms"
  ────────────────────────────────────────
  Aspect: Canonical URLs
  Détail: Correctement implémentées dynamiquement (BaseLayout.astro:17,28)
  Référence: Checklist P1
  ────────────────────────────────────────
  Aspect: Lang dynamique
  Détail: <html lang={lang}> correct EN/FR (BaseLayout.astro:21)
  Référence: Checklist P0
  ────────────────────────────────────────
  Aspect: OG + Twitter Cards
  Détail: Complets : og:type, og:title, og:description, og:image, og:url +
    twitter:card
  Référence: Checklist P2
  ────────────────────────────────────────
  Aspect: Fonts self-hosted + font-display: swap
  Détail: @fontsource au lieu de Google Fonts, swap vérifié
  Référence: Performance + RGPD
  ────────────────────────────────────────
  Aspect: HTML sémantique
  Détail: <header>, <nav>, <main>, <footer>, <section> correctement utilisés
  Référence: Checklist P1
  ────────────────────────────────────────
  Aspect: H1 unique sur toutes les pages intérieures
  Détail: FAQ, sécurité, tutos, légales — seule homepage manque
  Référence: Checklist P0
  ────────────────────────────────────────
  Aspect: Alt text sur les images
  Détail: ~90% couverture, descriptifs et présents
  Référence: Checklist P1
  ────────────────────────────────────────
  Aspect: Lazy loading
  Détail: loading="lazy" sur Carousel (sauf 1ère image) et StepImage
  Référence: Performance
  ────────────────────────────────────────
  Aspect: Architecture plate
  Détail: Toutes les pages à 1-2 clics de la homepage
  Référence: Référentiel section 10
  ────────────────────────────────────────
  Aspect: Island architecture
  Détail: JS uniquement pour composants interactifs via client:visible
  Référence: INP optimal
  ────────────────────────────────────────
  Aspect: Thème sans flash
  Détail: Script inline détecte la préférence avant rendu
  Référence: UX
  ────────────────────────────────────────
  Aspect: Pas de keyword stuffing
  Détail: Contenu naturel, pas de pénalité -10% GEO
  Référence: Princeton GEO
  ────────────────────────────────────────
  Aspect: Contenu easy-to-understand
  Détail: Tutos clairs, étapes numérotées, captures d'écran
  Référence: Princeton GEO : +20%
  ────────────────────────────────────────
  Aspect: Termes techniques appropriés
  Détail: SSH, Ed25519, PBKDF2, TOFU, WoL bien utilisés
  Référence: Princeton GEO : +18%
  ────────────────────────────────────────
  Aspect: HTTPS
  Détail: Configuré sur https://chill.app
  Référence: Checklist P0
  ---
  6. Plan d'action priorisé — Top 10
  #: 1
  Action: Rendre contenu FAQ/sécurité en HTML statique (sortir des accordions
    React client-side)
  Impact: Elevé — visibilité crawlers IA restaurée
  Effort: Moyen
  Fichiers concernés: faq.astro, securite.astro, Accordion.tsx,
    SecurityDetail.tsx
  ────────────────────────────────────────
  #: 2
  Action: Ajouter schemas JSON-LD : Organization (global), SoftwareApplication
    (homepage), FAQPage (FAQ), HowTo (6 tutos), BreadcrumbList
  Impact: Elevé — +20-40% CTR, +2,5x chances IA
  Effort: Moyen
  Fichiers concernés: BaseLayout.astro, faq.astro, TutoLayout.astro
  ────────────────────────────────────────
  #: 3
  Action: Ajouter hreflang EN/FR + x-default sur toutes les pages
  Impact: Elevé — fin cannibalisation bilingue
  Effort: Faible
  Fichiers concernés: BaseLayout.astro
  ────────────────────────────────────────
  #: 4
  Action: Créer page About + Contact + compléter mentions légales
  Impact: Elevé — E-E-A-T Trust, conformité légale
  Effort: Moyen
  Fichiers concernés: Nouvelles pages + mentions-legales.astro,
    politique-confidentialite.astro
  ────────────────────────────────────────
  #: 5
  Action: Réécrire titles (50-60 car. avec mots-clés) + descriptions uniques
    (150-160 car.) par page
  Impact: Elevé — CTR SERP, ancrage sémantique
  Effort: Moyen
  Fichiers concernés: en.json, fr.json, toutes les pages .astro
  ────────────────────────────────────────
  #: 6
  Action: Étoffer FAQ à 40-60 mots/réponse + ajouter TLDR sur pages principales
  +
     citer sources nommément
  Impact: Elevé — Princeton GEO : +40% (sources), +45% (TLDR), +60% (réponse
    d'abord)
  Effort: Moyen
  Fichiers concernés: en.json, fr.json, pages contenu
  ────────────────────────────────────────
  #: 7
  Action: Convertir images en WebP + preload image LCP + fetchpriority="high" +
    width/height sur toutes les images
  Impact: Elevé — LCP, CLS, référentiel : "-23% trafic si LCP > 3s"
  Effort: Moyen
  Fichiers concernés: public/images/, Carousel.tsx, BaseLayout.astro,
    HeroChillShell.tsx
  ────────────────────────────────────────
  #: 8
  Action: Créer llms.txt + enrichir robots.txt gouvernance bots IA
  Impact: Moyen — GEO technique, contrôle training IA
  Effort: Faible
  Fichiers concernés: public/robots.txt, public/llms.txt
  ────────────────────────────────────────
  #: 9
  Action: Ajouter skip-to-content + corriger contrastes text-muted + aria
    NavDropdown
  Impact: Moyen — conformité EAA, +12% trafic (réf. section 10)
  Effort: Faible
  Fichiers concernés: BaseLayout.astro, global.css, NavDropdown.tsx
  ────────────────────────────────────────
  #: 10
  Action: Créer image OG par défaut + corriger liens cassés href="#" + preload
    fonts + ajouter apple-touch-icon
  Impact: Moyen — partage social, UX, LCP
  Effort: Faible
  Fichiers concernés: public/images/, updates.astro, HeroChillShell.tsx,
    Pricing.astro, BaseLayout.astro
  ---
  Résumé : Le site Chill a une base technique solide (Astro SSG, island
  architecture, HTML sémantique). Mais il manque l'essentiel pour 2026 : données
   structurées (zéro schema JSON-LD), signaux E-E-A-T (pas d'About, Contact,
  auteur), et optimisation GEO (contenu caché derrière du JS, pas de TLDR, FAQ
  trop courtes, aucune source citée). Les actions 1 à 6 du plan couvrent ~80% de
   l'impact potentiel. Allocation recommandée par le référentiel : 20-30% des
  efforts sur le GEO en plus du SEO classique.                  
                                                                                
