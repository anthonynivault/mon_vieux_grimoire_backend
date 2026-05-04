Mon Vieux Grimoire – Back-end

API développée avec Node.js, Express et MongoDB dans le cadre du projet OpenClassrooms.

INSTALLATION

Cloner le projet
git clone https://github.com/anthonynivault/mon_vieux_grimoire_backend

cd mon_vieux_grimoire_backend
Installer les dépendances
npm install
Configurer les variables d’environnement

Créer un fichier .env à la racine du projet avec :

MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key

Lancer le serveur
npm start

Le serveur démarre sur :
http://localhost:3000

TECHNOLOGIES UTILISÉES

Node.js
Express
MongoDB
Mongoose
JSON Web Token (JWT)
bcrypt
multer
sharp

FONCTIONNALITÉS

Authentification sécurisée (JWT)
Hash des mots de passe (bcrypt)
CRUD des livres
Ajout et gestion des notes
Calcul de la moyenne des notes
Upload et optimisation des images (Sharp, WebP)
Protection des routes

STRUCTURE DU PROJET

controllers
models
routes
middleware
images
app.js
server.js

BONNES PRATIQUES

Architecture MVC
API REST
Séparation des responsabilités
Variables d’environnement (.env)
Optimisation des images (Green Code)

REMARQUE

Le fichier .env n’est pas inclus pour des raisons de sécurité.
Un fichier .env.example est fourni pour indiquer les variables nécessaires.

AUTEUR

Anthony Nivault
Projet réalisé dans le cadre de la formation Développeur Web – OpenClassrooms.