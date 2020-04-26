# TODO


* Comprendre et utiliser async sur les fonctions express

* Passer en http2: https://webapplog.com/http2-node/
  * Tester le http2 => curl "http://localhost:3000/user" --http2
## Global
* Configurer le logger pour avoir le context (fichier utilisé ou composant...)
* Mieux organiser la connexion à la bdd
* Mieux gérer les erreurs critique, ex: envoyer un mail
    * Utiliser nodemailer (ou autre) pour l'erreur si critique (ex: bdd tombée)
  
## Features
* Prendre un rendez-vous à une horaire
* Envoyer un mail de confirmation
    * Enregistre ip pour le rdv (faire attention aux faux comptes)
    * Demander son numéro
* Pouvoir modifier son rendez-vous avec le mail (modifier/supprimer)
* Admin: Valider un rendez-vous
