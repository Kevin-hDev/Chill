# SEO

##CE QUI EST EN PLACE

  Élément: Meta description                                                     
  Status: Définie sur chaque page (via props BaseLayout)                        
  ────────────────────────────────────────                                      
  Élément: Canonical URL                                                        
  Status: Automatique sur chaque page
  ────────────────────────────────────────                                      
  Élément: Open Graph (og:title, og:description, og:image, og:url, og:locale)   
  Status: Complet                                                               
  ────────────────────────────────────────
  Élément: Twitter Card (summary_large_image)
  Status: Complet
  ────────────────────────────────────────
  Élément: Sitemap XML
  Status: Généré automatiquement via @astrojs/sitemap — 26 URLs (EN + FR)
  ────────────────────────────────────────
  Élément: robots.txt
  Status: En place, autorise tout, pointe vers le sitemap
  ────────────────────────────────────────
  Élément: Favicon
  Status: .ico + .svg
  ────────────────────────────────────────
  Élément: Balise lang
  Status: Dynamique (en ou fr selon la page)
  ────────────────────────────────────────
  Élément: Balise title
  Status: Unique par page
  Ce qui manque ou à améliorer
  
---

## CE QUI N'EST PAS EN PLACE

  1. Image OG manquante — Le layout référence /images/og-default.png mais ce
  fichier n'existe pas. C'est l'image qui s'affiche quand on partage le lien sur
   les réseaux sociaux / messageries. C'est important, il faudra en créer une
  (1200x630px recommandé).
  2. Description par défaut en anglais uniquement — "Chill — Your desktop
  terminal. In your pocket." même sur les pages FR.
  3. Pas de balises hreflang — Google ne sait pas que /faq et /fr/faq sont la
  même page dans des langues différentes. C'est important pour le référencement
  multilingue.
  4. Pas de données structurées (Schema.org / JSON-LD) — Par exemple
  SoftwareApplication pour apparaître en résultat enrichi sur Google.
  5. Pas de meta keywords — Moins critique (Google les ignore), mais utile pour
  d'autres moteurs.
  6. Le <link rel="icon" type="image/x-icon"> pointe vers .ico — Ajouter aussi
  le SVG avec type="image/svg+xml" pour les navigateurs modernes.
  
---
  
## Skills SEO
  
1. SEO-GEO (ReScienceLab)
2. coreyhaines31/marketingskills
3. SEO Audit Expert 




