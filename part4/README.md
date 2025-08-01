# 🏠 HBnB – Part 4: Simple Web Client

---

## 📝 **Description**

Cette partie du projet **HBnB** vise à créer une interface web moderne, interactive et dynamique permettant aux utilisateurs de :

- 🔐 Se connecter
- 🏡 Parcourir la liste des logements
- 🔍 Consulter les détails d’un logement
- ✍️ Déposer un avis

Le **front-end** interagit en temps réel avec l’API (back-end) développée lors des parties précédentes grâce à **JavaScript ES6** et à l’utilisation du **Fetch API**.

---

## 🎯 **Objectifs**

- 🎨 Interface utilisateur moderne et ergonomique
- 🔄 Requêtes AJAX (Fetch API)
- 🔒 Sécurité et efficacité des échanges de données
- 🧩 Bonnes pratiques **HTML5**, **CSS3**, **JavaScript ES6**

---

## 🧑‍💻 **Compétences développées**

- 🔵 Manipulation avancée de **HTML5**, **CSS3** et **JavaScript ES6**
- 🟢 Appels API REST, AJAX/Fetch
- 🟠 Authentification JWT côté client
- 🟣 Expérience utilisateur fluide (sans rechargement)
- 🟡 Validation dynamique des formulaires

---

## 🗂️ **Organisation du projet**

part4/
├── app/
├── instance/
│ └── hbnb.db
├── static/
│ ├── css/
│ │ ├── add_review.css
│ │ ├── all.css
│ │ ├── index.css
│ │ ├── login.css
│ │ └── place.css
│ ├── images/
│ │ └── logo.png
│ └── js/
│ ├── login.js
│ ├── place.js
│ ├── places.js
│ ├── review.js
│ └── scripts.js
├── templates/
├── add_review.html
├── index.html
├── login.html
├── place.html
├── README.md
├── requirements.txt
├── run.py
├── config.py
├── init_admin.py
├── conftest.py
├── .gitignore
└── venv/


---

## 📄 **Pages principales**

| 📄 Page             | ✨ Rôle et contenu                                                                                 |
|---------------------|--------------------------------------------------------------------------------------------------|
| `login.html`        | 🔐 Formulaire de connexion, gestion des erreurs, stockage JWT                                    |
| `index.html`        | 🏡 Liste de tous les logements, filtrage dynamique (prix), bouton détails                        |
| `place.html`        | 📝 Vue détaillée d’un logement (infos, host, description, avis, bouton ajouter avis)             |
| `add_review.html`   | ⭐ Formulaire d’ajout d’un avis, accessible uniquement si connecté                                |

---

## 🧩 **Détails des tâches**

<details>
<summary><b>🎨 0. Design général</b></summary>

- Utiliser les fichiers HTML et CSS fournis
- Structure sémantique (`<header>`, `<main>`, `<footer>`, etc.)
- Header : logo, bouton login/logout
- Footer : copyright
- Personnalisation : couleurs, police, images, favicon
- Fichiers valides W3C

</details>

<details>
<summary><b>🔐 1. Login</b></summary>

- Utiliser le formulaire de `login.html`
- À la soumission :
  - Empêcher le comportement par défaut
  - POST `/login` (JSON)
  - Succès : stocker JWT et rediriger vers `index.html`
  - Échec : afficher un message d’erreur

</details>

<details>
<summary><b>🏡 2. Index (liste des logements)</b></summary>

- Affichage dynamique depuis l’API (GET)
- Filtrer par prix sans rechargement
- Affichage conditionnel Login/Logout
- Utiliser `.place-card`
- Redirection vers login si non authentifié

</details>

<details>
<summary><b>🔍 3. Place details (détail d’un logement)</b></summary>

- Récupérer l’ID dans l’URL (`?id=...`)
- GET `/places/:id`
- Afficher : nom, description, prix, hôte, équipements, avis (`.review-card`)
- Si connecté : bouton/formulaire d’avis

</details>

<details>
<summary><b>✍️ 4. Add Review (ajout d’un avis)</b></summary>

- Accessible uniquement si connecté
- Extraire l’ID du logement depuis l’URL
- POST à l’API avec JWT, afficher message succès/erreur

</details>

---

## 💅 **Consignes de style**

- **Header :**
  - Logo (`logo.png`, classe `logo`)
  - Bouton login/logout (`login-button`)
- **Footer :**
  - Texte "All rights reserved"
- **Cards (logement, avis) :**
  - `margin: 20px;`
  - `padding: 10px;`
  - `border: 1px solid #ddd;`
  - `border-radius: 10px;`
- **Palette & police** : personnalisable
- **Navigation** : liens entre pages
- **Responsive** : PC & mobile

---

## ✅ **Tests attendus**

- ✅ Login & JWT fonctionnent
- ✅ Filtrage dynamique des logements
- ✅ Détails logement corrects selon l’ID
- ✅ Ajout d’avis uniquement pour utilisateur connecté
- ✅ Feedback utilisateur (erreur/succès)
- ✅ Pas de rechargement (sauf login/logout/accès direct)

---

## 🧑‍💻 **Dépôt GitHub**

- **Repo :** `holbertonschool-hbnb`
- **Dossier :** `part4`

---

## 🚀 **Lancement du projet**

```bash
# 1. Clonez le projet
git clone https://github.com/alizium/holbertonschool-hbnb.git
cd holbertonschool-hbnb/part4

# 2. (Optionnel) Environnement virtuel
python3 -m venv venv
source venv/bin/activate

# 3. Installez les dépendances backend
pip install flask flask-restx flask-jwt-extended flask-cors

# 4. Lancez le backend
python3 run.py

# 5. Dans un autre terminal, lancez le front-end
python3 -m http.server 5001

Puis, ouvrez http://localhost:5001/login.html dans votre navigateur.

🛡️ CORS & Sécurité
Côté Flask :

from flask_cors import CORS
CORS(app,
     origins=["http://localhost:5001", "http://127.0.0.1:5001"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"])

Côté JS : envoyer le JWT dans le header Authorization à chaque requête.

📦 Requirements
Front-end
Navigateur récent (supportant ES6, Fetch API)

Serveur de fichiers statiques (python3 -m http.server)

Back-end
Python 3.7+

Flask

Flask-RESTx

Flask-JWT-Extended

Flask-CORS

pip install flask flask-restx flask-jwt-extended flask-cors

📚 Ressources utiles
HTML5 MDN

CSS3 MDN

JavaScript ES6

Fetch API

Handling Cookies JS

Form Validation