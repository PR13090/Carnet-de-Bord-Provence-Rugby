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

Sur la branche `test` (pas encore sur `main`) : plein écran au tap sur les photos, formulaire
d'ajout de vidéo en bas de page, nouvelle charte graphique.

## Points d'attention connus
- Une sauvegarde qui échoue (réseau, taille) n'est pas signalée à l'utilisateur (choix assumé : pas d'alerte voulue).
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
Même charte que la plateforme stats joueurs (`~/Documents/Stats Provence Rugby/stats-joueurs.html`) :
- Fond noir (#000), panneaux anthracite (#1E1E1E) avec bordure grise (#33373D), texte blanc,
  gris secondaire (#9C9C9C), rouge club en accent (#C20029), jaune en repère (#F1D436).
- Polices : Glacial Indifference en capitales pour titres, onglets, étiquettes et boutons
  (fichiers locaux `public/fonts/`, licence OFL) ; Helvetica Neue pour le texte. Coins carrés.
- Logo : le logo blanc des stats (SVG inline dans l'en-tête, couleur = currentColor). Ne pas le redessiner.
  Les icônes d'écran d'accueil (`icon-*.png`) montrent encore l'ancien logo.
- Mobile d'abord : barre d'onglets en bas (onglet actif = trait rouge au-dessus), champs de saisie
  à 16 px (évite le zoom iOS), marges de sécurité iPhone.

## Contraintes à respecter
- Vidéos hébergées sur YouTube en "non répertorié" (choix assumé). Ne pas promettre
  de confidentialité totale.
- Pas de comptes utilisateurs : toute personne ayant le lien peut lire et modifier.
- Ne pas casser les données déjà saisies : toute évolution du format des données doit
  rester compatible avec les clés existantes ou prévoir une migration.
- Tester avant de pousser sur `main`, puisque chaque push met le site en production devant les joueurs :
  pousser d'abord la branche `test`, publiée sur https://test--provencerugby.netlify.app (mêmes données
  que la production : regarder sans modifier). `netlify dev` ne marche pas sur le Mac (fichiers
  supprimés par la sécurité du club, à voir avec l'informatique).
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
