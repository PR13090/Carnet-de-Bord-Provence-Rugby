# Carnet de bord — Provence Rugby

Version autonome du carnet, prête à héberger sur Netlify avec votre propre nom de domaine.

## Ce que contient ce projet

- `public/index.html` — le carnet (identique à la version Claude, mais la sauvegarde
  passe maintenant par une fonction Netlify au lieu du stockage propre à Claude).
- `netlify/functions/storage.js` — une fonction serverless qui lit/écrit les données
  via **Netlify Blobs** (stockage clé-valeur intégré à Netlify, gratuit).
- `netlify.toml` — configuration du site pour Netlify.
- `package.json` — dépendance nécessaire (`@netlify/blobs`).

## Déployer (avec Claude Code, recommandé)

Le plus simple est d'ouvrir ce dossier dans **Claude Code** et de demander :
« déploie ce projet sur mon compte Netlify ». Claude Code peut installer le CLI
Netlify, se connecter à votre compte, et lancer le déploiement pour vous.

## Déployer manuellement

1. Installer le CLI Netlify : `npm install -g netlify-cli`
2. Se connecter : `netlify login`
3. Depuis ce dossier : `netlify deploy --prod`
   (première fois : Netlify demande de créer ou choisir un site)
4. Netlify vous donne une URL du type `https://votre-site.netlify.app`

## Ajouter votre nom de domaine perso

Dans le tableau de bord Netlify de votre site :
`Domain settings` → `Add a domain` → suivez les instructions pour pointer
votre nom de domaine (acheté chez OVH, Namecheap, etc.) vers Netlify.

## Important

- Toutes les données (notes, vidéos, photos) sont maintenant stockées sur Netlify,
  plus du tout côté Claude — ce projet est totalement indépendant.
- Les photos étant stockées en base64, gardez-les raisonnablement légères
  (l'app les compresse déjà automatiquement à l'ajout).
