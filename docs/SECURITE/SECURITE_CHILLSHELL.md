# Sécurité — ChillShell (Mobile)

Document officiel interne décrivant l'ensemble des mesures de sécurité implémentées dans ChillShell.
Dernière mise à jour : 13 février 2026.

---

## Méthodologie

La sécurité de ChillShell a été validée par trois audits internes successifs :

1. **Audit white-box** sur la version 1.5.1, ayant conduit à 9 correctifs initiaux.
2. **Analyse de menaces STRIDE**, identifiant 22 menaces, 8 risques validés et 12 mitigations, toutes implémentées.
3. **Audit ultra-granulaire** (protocole Trail of Bits) mené par 4 agents spécialisés en parallèle, couvrant 44 fichiers et environ 7 500 lignes de code critique. Cet audit a produit 62 findings : 4 critiques, 8 élevés, 21 moyens, 21 faibles et 8 confirmations de bonnes pratiques. Aucune vulnérabilité exploitable à distance n'a été identifiée.

Un audit qualité complémentaire a été réalisé sur l'ensemble de la codebase (83 fichiers, environ 24 000 lignes), avec 4 bugs critiques corrigés, du code mort supprimé et des refactorisations appliquées. L'ensemble des 92 tests unitaires passent après corrections.

---

## Stockage des données sensibles

Toutes les données sensibles sont stockées via Flutter Secure Storage, qui utilise le Android Keystore (chiffrement AES-CBC) sur Android et le Keychain sur iOS. Aucun secret n'est jamais stocké en clair.

Les données protégées sont :

- **Clés SSH privées** : chiffrées au repos via AES-CBC (Android) ou le Keychain (iOS).
- **Code PIN** : jamais stocké en clair. Seul le hash est conservé, calculé avec PBKDF2-HMAC-SHA256 (100 000 itérations) et un salt aléatoire unique de 32 octets.
- **Empreintes SSH des serveurs** : stockées dans le stockage sécurisé pour la vérification TOFU.
- **Journal d'audit** : chiffré au repos dans le stockage sécurisé, au format JSON compact.
- **Configurations Wake-on-LAN** : stockées dans le stockage sécurisé.
- **Historique des commandes** : stocké dans le stockage sécurisé après filtrage des secrets.

Aucune clé API, mot de passe ou credential n'est codé en dur dans le code source. Un scan complet de la codebase confirme l'absence totale de secrets hardcodés.

---

## Authentification locale

### Code PIN

Le PIN est le mécanisme principal de verrouillage de l'application. Il comporte un minimum de 8 chiffres, offrant 100 millions de combinaisons possibles.

Le PIN saisi par l'utilisateur est hashé avec PBKDF2-HMAC-SHA256 sur 100 000 itérations, combiné à un salt aléatoire unique. Le PIN en clair n'est jamais stocké ni conservé en mémoire au-delà du temps de traitement.

La comparaison du hash est effectuée en temps constant (XOR bit à bit) pour prévenir les attaques par timing.

Un mécanisme de rate limiting protège contre le brute force : après 5 tentatives échouées, un verrouillage de 30 secondes est appliqué, avec un backoff exponentiel (60 secondes après 10 échecs, 120 après 15, plafonné à 300 secondes). Le compteur de tentatives est persisté et ne se remet à zéro qu'après un PIN correct.

### Biométrie

L'authentification biométrique (empreinte digitale) utilise l'API système native. Les données biométriques ne quittent jamais l'appareil. L'option biométrique est configurée en mode strict : seule la biométrie est acceptée, sans fallback vers le PIN système de l'appareil.

L'authentification biométrique est automatiquement invalidée lorsque l'application passe en arrière-plan. Une ré-authentification est obligatoire au retour.

### Verrouillage automatique

L'application se verrouille automatiquement après une période d'inactivité configurable par l'utilisateur : 5, 10, 15 ou 30 minutes. Le verrouillage se déclenche lorsque l'application reste en arrière-plan au-delà du délai choisi.

Au démarrage, un écran de chargement est affiché jusqu'à ce que l'état du PIN soit entièrement chargé, empêchant tout contournement temporaire du verrouillage.

---

## Connexion SSH

### Vérification TOFU (Trust On First Use)

À la première connexion vers un serveur, l'empreinte SHA-256 du serveur est affichée à l'utilisateur, qui doit la confirmer manuellement avant de poursuivre. L'empreinte est ensuite stockée dans le stockage sécurisé.

Pour les connexions suivantes, l'empreinte est automatiquement vérifiée. Si elle a changé, une alerte rouge est affichée avec une explication du risque d'interception (attaque MITM). La comparaison des empreintes est réalisée en temps constant.

### Protocole et chiffrement

Les connexions utilisent le protocole SSH2 standard via la bibliothèque dartssh2. L'algorithme de clé préféré est Ed25519. Toutes les communications sont chiffrées de bout en bout par le protocole SSH.

### Gestion des clés en mémoire

Les clés privées sont chargées dans un SecureBuffer dédié. Après utilisation, la mémoire est explicitement remplie de zéros pour limiter la fenêtre d'exposition. Le worker SSH ne conserve pas la clé entre les connexions : il la relit depuis le stockage sécurisé à chaque nouvelle connexion.

Les opérations cryptographiques SSH s'exécutent dans un isolate séparé (thread d'arrière-plan), ce qui évite de bloquer l'interface utilisateur et isole le traitement des clés.

### Génération de clés

Les clés Ed25519 sont générées localement sur l'appareil. Les octets de la clé privée sont effacés de la mémoire après stockage dans le stockage sécurisé. La clé publique est séparée de la clé privée dans le modèle de données, et la sérialisation JSON exclut explicitement la clé privée.

---

## Protection contre les fuites de données

### Historique des commandes

Un filtrage automatique par expressions régulières détecte et exclut de l'historique toute commande contenant des secrets : clés AWS, tokens JWT ou Bearer, clés API, mots de passe en ligne de commande, et variables contenant des mots-clés sensibles (SECRET, TOKEN, KEY, PASSWORD).

L'historique est soumis à une expiration automatique : les entrées de plus de 90 jours sont supprimées. L'utilisateur peut également effacer manuellement l'intégralité de l'historique.

### Logs de production

Tous les appels de debug sont conditionnés par le mode debug de Flutter. En production (APK release), aucun log n'est émis. Aucun hostname, adresse IP ou identifiant n'apparaît dans les logs de production. Un audit a confirmé que les 188 occurrences de logs dans le code sont toutes protégées par cette condition.

Les logs du moteur Go (Tailscale) sont également filtrés en production pour éviter toute fuite de tokens OAuth ou d'URLs d'authentification.

### Presse-papiers

Le presse-papiers est automatiquement vidé directement après toute copie de données sensibles (adresses IP, informations de connexion). Il est également vidé silencieusement lorsque l'application passe en arrière-plan, via l'API native Android, pour empêcher les applications malveillantes de lire des données copiées.

---

## Protection d'écran

### Android

Le drapeau FLAG_SECURE est activé par défaut. Il bloque les captures d'écran et l'enregistrement d'écran. L'application n'apparaît pas dans le sélecteur d'applications récentes (écran noir affiché à la place). Cette protection est désactivable dans les réglages de l'application si l'utilisateur le souhaite.

### iOS

Un écran de masquage est automatiquement affiché lorsque l'application passe en arrière-plan, empêchant la capture du contenu dans le sélecteur d'applications. Cette protection est également désactivable via les réglages.

---

## Détection d'appareil compromis

Au démarrage, l'application vérifie si l'appareil est rooté (Android) ou jailbreaké (iOS) en recherchant la présence de chemins et fichiers caractéristiques (su, Superuser.apk, Cydia.app, etc.).

Si un appareil compromis est détecté, une bannière d'avertissement informe l'utilisateur que la sécurité de ses clés SSH pourrait être compromise. Cette mesure est informative et non bloquante : l'utilisateur peut choisir de continuer en toute connaissance de cause.

---

## Journal d'audit

L'application enregistre automatiquement les événements de sécurité suivants :

- Connexion SSH (succès ou échec)
- Déconnexion SSH
- Reconnexion SSH
- Échec d'authentification
- Import ou suppression de clé SSH
- Création ou suppression de PIN
- Changement d'empreinte d'un serveur

Le journal est stocké chiffré dans le stockage sécurisé, au format JSON compact avec horodatage. Il est limité à 500 entrées avec une rotation automatique (les plus anciennes sont supprimées en premier).

---

## Transferts de fichiers (SFTP)

Les transferts de fichiers via SFTP sont limités à 30 Mo par fichier. Le transfert s'effectue par streaming (par morceaux), sans chargement complet en mémoire, pour prévenir les attaques par saturation mémoire.

Une validation des chemins distants est effectuée pour détecter les tentatives de traversée de répertoire.

---

## Import de clés SSH

Les clés SSH importées sont validées en format avant import. Une limite de taille de 16 Ko est appliquée (une clé SSH normale fait moins de 5 Ko). Les fichiers anormalement gros sont bloqués pour prévenir les injections. La clé importée est immédiatement transférée dans le stockage sécurisé.

---

## Intégration Tailscale

L'intégration Tailscale utilise la bibliothèque Go libtailscale, communiquant avec l'application Flutter via un canal natif Kotlin.

Les mesures de sécurité spécifiques incluent :

- **URLs OAuth** : les URLs d'authentification ne sont jamais loguées en clair. Seule leur longueur est enregistrée en mode debug.
- **Clés publiques** : les clés publiques des peers sont tronquées dans les logs (16 premiers caractères seulement).
- **Messages d'erreur** : les erreurs remontées à l'utilisateur sont génériques et ne divulguent pas de détails techniques.
- **Validation d'URL** : les URLs ouvertes dans le navigateur sont validées (schéma HTTPS uniquement).
- **Code mort** : tout le code lié au stockage de tokens Tailscale côté Dart a été supprimé. Aucun token n'est conservé côté Flutter.

---

## Permissions

### Android

L'application demande uniquement les permissions nécessaires à son fonctionnement :

- Accès réseau : requis pour les connexions SSH et le Wake-on-LAN.
- Capteur biométrique : utilisé pour l'authentification biométrique optionnelle.
- Stockage local : utilisé pour stocker les identifiants chiffrés.

La sauvegarde via ADB est explicitement désactivée (allowBackup=false) pour empêcher l'extraction des données. Les services sont marqués comme non exportés. Le service VPN Tailscale est protégé par des permissions système.

### iOS

Les données sensibles sont stockées dans le Keychain iOS, bénéficiant de la protection matérielle de l'appareil. L'écran de confidentialité est automatiquement activé en arrière-plan.

---

## Architecture isolate

Les opérations cryptographiques SSH (authentification, gestion des clés) s'exécutent dans un isolate Dart séparé du thread principal de l'interface. Cette architecture offre deux avantages : l'interface reste réactive pendant les opérations lourdes, et le traitement des clés est isolé du reste de l'application.

Les identifiants de requête utilisent des UUID v4 cryptographiquement aléatoires, empêchant toute prédiction.

---

## Internationalisation

Tous les messages d'erreur et d'interface sont traduits en 5 langues (français, anglais, espagnol, allemand, chinois). Aucune chaîne sensible n'est codée en dur dans le code source. Les messages d'erreur SSH utilisent des codes traduits côté interface.

---

## Limitations connues et documentées

| Limitation | Explication | Impact |
|---|---|---|
| Clé privée en String Dart | Le type String en Dart est immutable. La clé privée peut rester temporairement en mémoire jusqu'au passage du ramasse-miettes. | Faible. Nécessite un appareil rooté avec accès mémoire. Mitigé par la lecture depuis le stockage sécurisé à chaque connexion. |
| SecureBuffer et ramasse-miettes | Le ramasse-miettes Dart peut créer des copies temporaires des données en mémoire. | Faible. Même prérequis que ci-dessus. |
| Détection root contournable | Des outils comme Magisk Hide peuvent masquer le root de l'appareil. | Faible. La mesure est informative, pas préventive. |
| Clé Ed25519 non chiffrée au repos | Les clés générées utilisent cipher=none dans leur format. | Acceptable tant que la clé reste dans le stockage sécurisé (chiffré par AES/Keychain). Si l'export est prévu à l'avenir, un chiffrement AES-256-CTR sera ajouté. |
| SharedPreferences pour le PIN | Le hash et le salt du PIN sont dans SharedPreferences (accessible sans root mais protégés par PBKDF2). | Mitigé. Le brute force offline est rendu impraticable par les 100 000 itérations PBKDF2. |

---

## Résumé des audits

| Audit | Date | Résultat |
|---|---|---|
| Audit white-box V1.5.1 | Février 2026 | Score passé de 6.5 à 8.5/10. 9 correctifs appliqués. |
| Analyse STRIDE | Février 2026 | 22 menaces identifiées, 8 risques validés, 12 mitigations implémentées à 100%. |
| Audit qualité (codebase complète) | Février 2026 | 4 bugs critiques corrigés, code mort supprimé, 92/92 tests. |
| Audit sécurité avancé (Trail of Bits) | Février 2026 | 62 findings, 0 vulnérabilité exploitable à distance. 27 corrigés, 11 mitigés ou documentés. |

**Verdict global** : L'architecture de sécurité est solide pour une application mobile. Aucune vulnérabilité exploitable à distance n'a été identifiée. Les risques résiduels nécessitent un accès physique à un appareil compromis (rooté/jailbreaké).
