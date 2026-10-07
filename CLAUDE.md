# Carnet de bord — Provence Rugby

## Objectif du projet
Carnet de bord en ligne pour l'analyste de la performance du club Provence Rugby.
Le staff et les joueurs le consultent, surtout sur iPhone (installé sur l'écran d'accueil).
Une seule personne maintient le projet, et elle n'est pas développeuse : privilégier
les solutions simples, expliquer chaque changement en français, procéder par petites étapes.

## Fonctionnalités actuelles (4 onglets)
État constaté dans le code de `main` le 2026-10-07 :
- **Game Plan** : notes + une photo.
- **Lancements** : liste de vidéos (lien YouTube/Vimeo, lecteur intégré ; autres liens
  ouverts dans un nouvel onglet). Le formulaire d'ajout est en haut, les vidéos en dessous
  (les plus récentes en premier).
- **Vidéo de la semaine** : même principe que Lancements.
- **Présentation de l'adversaire** : notes + galerie de plusieurs photos.
- Les notes s'enregistrent quand on quitte le champ (indication « enregistré »).

Écarts avec le comportement voulu (à vérifier sur le site en ligne, puis à corriger) :
- Le plein écran au tap sur les photos (Game Plan et Adversaire) n'existe pas dans le code.
- Le formulaire d'ajout de vidéo devrait être en bas de page, après les vidéos existantes.

## Points d'attention connus
- Une sauvegarde qui échoue (réseau, taille) n'est pas signalée à l'utilisateur.
- Les notes et vidéos sont enregistrées en un seul bloc : si deux personnes modifient
  en même temps, la dernière sauvegarde écrase les ajouts de l'autre.
- Code inutilisé dans `index.html` : fonctions `fichierAddForm` / `fichierListHtml`.
- Le nom du club dans l'en-tête est un champ modifiable par tout le monde.

## Hébergement et déploiement
- Hébergé sur **Netlify** (compte existant), déployé automatiquement à chaque push sur
  la branche `main` du dépôt GitHub `PR13090/Carnet-de-Bord-Provence-Rugby`.
- Copie locale du dépôt : `~/Documents/Carnet-de-Bord-Provence-Rugby`.
- Structure actuelle du dépôt : `CLAUDE.md` et `.gitignore` à la racine, tout le reste
  du projet dans le sous-dossier `netlify-carnet/`.
  Dans Netlify, "Base directory" = `netlify-carnet` et "Publish directory" = `netlify-carnet/public`.
  (Piste d'amélioration : remonter les fichiers à la racine pour supprimer ce réglage.)
- Fichiers principaux :
  - `netlify-carnet/public/index.html` : toute l'application (HTML + CSS + JS dans un seul fichier,
    logo du club intégré en base64 dans l'en-tête).
  - `netlify-carnet/public/manifest.json`, `icon-180.png`, `icon-192.png`, `icon-512.png` :
    installation sur l'écran d'accueil (PWA).
  - `netlify-carnet/netlify/functions/storage.js` : fonction serverless qui lit/écrit les données.
  - `netlify-carnet/netlify.toml`, `package.json` : configuration et dépendance `@netlify/blobs`.

## Stockage des données
- **Netlify Blobs**, store nommé `rugby-carnet`, accessible via `/.netlify/functions/storage`
  (GET `?key=`, POST `{key, value}`, DELETE `?key=`).
- Clés utilisées :
  - `rugby-carnet:data` : notes et listes de vidéos (JSON).
  - `rugby-carnet:gameplan-image` : photo du Game Plan (base64).
  - `rugby-carnet:adversaire-images` : tableau des photos adversaire (base64).
- Les photos sont compressées côté navigateur (max 1400 px, JPEG 0.82) avant stockage.
- Limite d'environ 5 Mo par valeur : surveiller la taille de `adversaire-images`.
- La fonction a besoin des variables d'environnement `BLOBS_SITE_ID` et `NETLIFY_API_TOKEN`,
  déjà configurées dans Netlify (sans elles : erreur `MissingBlobsEnvironmentError`).
  Ne jamais écrire ces valeurs dans le dépôt.

## Identité visuelle
- Fond noir (#0A0A0A), accent olivier (#7C8F5E), or discret (#B08A3C), cartes claires (#F3F0E8).
- Polices : Oswald (titres), Inter (texte), JetBrains Mono (détails).
- Logo Provence Rugby (olivier + ballon) : fichier fourni par le club, ne pas le redessiner.
- Mobile d'abord : barre d'onglets en bas, champs de saisie à 16 px (évite le zoom iOS),
  marges de sécurité iPhone.

## Contraintes à respecter
- Vidéos hébergées sur YouTube en "non répertorié" (choix assumé). Ne pas promettre
  de confidentialité totale.
- Pas de comptes utilisateurs : toute personne ayant le lien peut lire et modifier.
- Ne pas casser les données déjà saisies : toute évolution du format des données doit
  rester compatible avec les clés existantes ou prévoir une migration.
- Tester en local (`netlify dev`) avant de pousser sur `main`, puisque chaque push met le site
  en production devant les joueurs. (Le CLI `netlify` n'est pas encore installé sur le Mac.)
- Ne jamais pousser sur `main` sans l'accord explicite de l'utilisateur.

## Façon de travailler
- Toujours proposer un plan court et attendre l'accord avant de modifier du code.
- Un changement à la fois, expliqué simplement, avec un moyen de vérifier le résultat.
- Répondre en français.

## Chantiers envisagés (par ordre de priorité)
1. Mot de passe d'accès simple (le lien seul donne aujourd'hui tous les droits).
2. Export/sauvegarde des données en un clic.
3. Historique par adversaire et par semaine (au lieu d'écraser le contenu).
4. Stockage des photos une par une dans Netlify Blobs (plus rapide, moins de risque de limite).
5. Recherche dans les vidéos, indicateur "dernière modification", commentaires sous les vidéos.
6. Découper `index.html` en plusieurs fichiers (CSS, JS, images) et simplifier la structure du dépôt.
