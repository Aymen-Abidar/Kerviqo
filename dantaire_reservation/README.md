# Kerviqo Dentaire — Site Netlify + Neon

## Ce que contient le projet
- `index.html` : page d’accueil du cabinet
- `services.html` : page de tous les services avec visuels et CTA réservation
- `reservation.html` : formulaire patient + sélection intelligente des créneaux disponibles
- `admin.html` : espace docteur protégé par mot de passe
- `netlify/functions/*` : API serverless pour Neon
- `schema.sql` : structure SQL + données de départ

## Fonctionnalités principales
- Réservation en ligne avec blocage des créneaux déjà pris
- Calcul des disponibilités selon le **service choisi**, sa **durée**, les **heures du docteur** et les **réservations existantes**
- Cabinet ouvert uniquement du **lundi au vendredi**, **10h00 → 18h00**
- Sauvegarde des informations du formulaire patient demandé
- Espace admin pour gérer :
  - services
  - prix
  - galerie
  - avis patients
  - réservations
  - paramètres du cabinet
- Déploiement prêt pour **Netlify + Neon**

## Déploiement rapide
1. Crée une base **Neon**.
2. Ouvre l’éditeur SQL Neon et exécute `schema.sql`.
3. Mets le projet sur GitHub.
4. Connecte le repo à Netlify.
5. Dans **Netlify > Site configuration > Environment variables**, ajoute :
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
6. Déploie.

## Commandes locales
```bash
npm install
npm run dev
```

## Important
- Le projet fonctionne en **HTML / CSS / JS** avec **Netlify Functions** côté backend.
- Les données de départ (services, galerie, avis, paramètres) sont déjà prévues dans `schema.sql`.
- Les images de démonstration sont locales et peuvent être remplacées ensuite par de vraies URLs depuis l’espace admin.
- Si la base Neon n’est pas encore branchée, l’accueil et les services affichent du contenu de démonstration côté front.
- L’espace admin nécessite absolument `ADMIN_PASSWORD` et `JWT_SECRET`.

## Identité visuelle
- Marque : **Kerviqo Dentaire**
- Logo intégré : `assets/images/logo-kerviqo.png`


## Corrections ajoutées
- Choix de l'heure désormais visible et plus simple sur la page de réservation
- Sélection automatique du premier créneau libre pour éviter l'erreur “Choisissez un créneau disponible.”
- Formulaire patient avec intitulés simplifiés
- Ajout d'un import d'image fichier dans l'admin pour les services et la galerie
- Messages d'erreur plus clairs côté admin
- Mode secours local dans le navigateur si l'API ou la base n'est pas disponible temporairement
