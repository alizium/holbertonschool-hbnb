# HBnB – Part 4: Simple Web Client

## Description

Cette partie du projet **HBnB** vise à créer une interface web moderne, interactive et dynamique permettant aux utilisateurs de :

- Se connecter
- Parcourir la liste des logements
- Consulter les détails d’un logement
- Déposer un avis

Le **front-end** interagit en temps réel avec l’API (back-end) développée lors des parties précédentes grâce à **JavaScript ES6** et l’utilisation de l’AJAX via le **Fetch API**.

---

## Objectifs

- Créer une interface utilisateur moderne et ergonomique selon le design fourni
- Interagir avec le back-end via des requêtes AJAX (Fetch API)
- Assurer la sécurité et l’efficacité des échanges de données côté client
- Appliquer les bonnes pratiques **HTML5**, **CSS3** et **JavaScript ES6** dans un projet complet

---

## Compétences développées

- Manipulation avancée de HTML5, CSS3 et JavaScript ES6
- Interaction avec des services back-end (API REST) via AJAX/Fetch
- Gestion de l’authentification par token JWT et des sessions utilisateur côté client
- Amélioration de l’expérience utilisateur par le scripting côté client sans rechargement de page
- Validation des formulaires côté client

---

## Organisation du projet

**Dossier principal :** `part4/`

**Pages principales :**

- `login.html`
- `index.html`
- `place.html`
- `add_review.html`

**Ressources statiques :**

- CSS (`css/`)
- images (`images/`)

**Script principal :**

- `scripts.js` (ou `places.js`, `place.js`, etc.)

**Fichiers fournis :**

- Base HTML/CSS
- Quelques images (`logo.png`, etc.)

---

## Pages à développer

| Page             | Rôle et contenu                                                                                 |
|------------------|------------------------------------------------------------------------------------------------|
| `login.html`     | Formulaire de connexion, envoi des identifiants à l’API, gestion des erreurs, stockage JWT     |
| `index.html`     | Liste de tous les logements, filtrage dynamique (prix), bouton détails, affichage conditionnel  |
| `place.html`     | Vue détaillée d’un logement (infos, host, description, avis, bouton ajouter avis)              |
| `add_review.html`| Formulaire d’ajout d’un avis, accessible uniquement si connecté                                 |

---

## Détails des tâches

### 0. Design général

- Utiliser les fichiers HTML et CSS fournis
- Respecter la structure sémantique (`<header>`, `<main>`, `<footer>`, etc.)
- Header : logo, bouton login/logout
- Footer : copyright
- Personnaliser : palette de couleurs, police, images, favicon (au choix)
- Tous les fichiers doivent être valides W3C

---

### 1. Login

- Utiliser le formulaire fourni dans `login.html`
- À la soumission :
  - Empêcher le comportement par défaut du formulaire
  - Envoyer une requête POST à `/login` de l’API avec email & mot de passe (format JSON)
  - En cas de succès : stocker le token JWT dans un cookie et rediriger vers `index.html`
  - En cas d’échec : afficher un message d’erreur

---

### 2. Index (liste des logements)

- Afficher dynamiquement la liste des logements récupérés depuis l’API (requête GET)
- Filtrer par prix (100, 150, 200, All…) côté client sans rechargement
- Afficher le bouton "Login" uniquement si l’utilisateur n’est pas authentifié (sinon "Logout")
- Utiliser des cartes (`.place-card`) incluant nom, prix, bouton détails
- Redirection automatique vers login si non authentifié

---

### 3. Place details (détail d’un logement)

- Récupérer l’ID du logement dans l’URL (`?id=...`)
- Requête GET `/places/:id` pour afficher les détails
- Afficher : nom, description, prix, hôte, équipements, avis (cartes `.review-card`)
- Si l’utilisateur est connecté, afficher le bouton/formulaire pour ajouter un avis

---

### 4. Add Review (ajout d’un avis)

- Accessible uniquement si connecté (sinon redirection vers `index.html`)
- Extraire l’ID du logement depuis l’URL
- À la soumission :
  - Envoyer une requête POST à l’API pour ajouter un avis (avec JWT dans header)
  - Afficher un message de succès ou d’erreur

---

## Consignes de style

- **Header :**
  - Logo (`logo.png`, classe `logo`)
  - Bouton login/logout (`login-button`)
- **Footer :**
  - Texte "All rights reserved"
- **Cards (logement, avis) :**
  - Margin: 20px
  - Padding: 10px
  - Border: 1px solid #ddd
  - Border-radius: 10px
- **Palette de couleurs et police :** au choix (modifiable)
- **Navigation :** liens vers les pages principales
- **Responsive :** doit s’afficher correctement sur PC et mobile

---

## Tests attendus

- Le login fonctionne (stockage et utilisation du JWT, gestion des erreurs)
- Le filtrage des logements par prix est instantané et sans rechargement de page
- Les détails d’un logement sont affichés correctement selon l’ID
- L’ajout d’avis ne fonctionne que pour un utilisateur connecté, sinon redirection
- Affichage dynamique, feedback utilisateur (messages d’erreur ou de succès)
- Aucun rechargement de page sauf pour login/logout/accès direct à une page

---

## Dépôt GitHub

- **Repository :** `holbertonschool-hbnb`
- **Dossier :** `part4`

---

## Lancement du projet

### 1. Lancer le front-end (client)

Depuis le dossier `part4` :

```bash
python3 -m http.server 5001
Accéder à http://localhost:5001/

2. Lancer le back-end (API Swagger)
Depuis la racine du projet API :

python3 run.py
Accéder à http://localhost:5000/

CORS & Sécurité
Pour que le front-end (localhost:5001) puisse accéder à l’API (localhost:5000), il faut :

Côté Flask :

Utiliser flask_cors et bien autoriser tous les headers nécessaires :

from flask_cors import CORS
CORS(app,
     origins=["http://localhost:5001", "http://127.0.0.1:5001"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"])
Côté JS : toujours envoyer le token JWT dans le header Authorization

Requirements
Front-end

Navigateur récent (supportant ES6 et Fetch API)

Serveur de fichiers statiques (ex: python3 -m http.server)

Back-end

Python 3.7+

Flask

Flask-RESTx

Flask-JWT-Extended

Flask-CORS

Exemple d’installation :

pip install flask flask-restx flask-jwt-extended flask-cors
Structure des requêtes API : voir la documentation de la partie 3 du projet pour les endpoints nécessaires.
