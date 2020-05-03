# TODO


* Passer en http2: https://webapplog.com/http2-node/
  * Tester le http2 => curl "http://localhost:3000/user" --http2

## Global
* Configurer le logger pour avoir le context (fichier utilisé ou composant...)
* Mieux organiser la connexion à la bdd
* Mieux gérer les erreurs critique, ex: envoyer un mail
    * Utiliser nodemailer (ou autre) pour l'erreur si critique (ex: bdd tombée)
* Gérer les base de développement en ligne de commande avec sequelize:
    * https://medium.com/@smallbee/how-to-use-sequelize-sync-without-difficulties-4645a8d96841
  
## Features
* Prendre un rendez-vous à une horaire
* Envoyer un mail de confirmation
    * Enregistre ip pour le rdv (faire attention aux faux comptes)
    * Demander son numéro
* Pouvoir modifier son rendez-vous avec le mail (modifier/supprimer)
* Admin: Valider un rendez-vous

## Zones
* Convertir les polygones en mutlipolygones



# Front
* Ajouter fa icones
* Mettre en place un composant de notification
* Mettre en place un système pour chager des configs au démarrage
 * Utiliser pour les url des requêtes


## Créer zone
* Création, demander à l'utilisateur s'il veut quitter
    * Utiliser les props de ngForm pour voir si le fomulaire a été modifé

## Calendrier
* Pouvoir consulter par semaine/jour/mois/année
* Séletionner un jours
* Afficher des heures supplémentaires si un rdv est pris (ex: rdv à 20h)
* Afficher les weekends seulement si rdv
* Sélectionner automatiquement le jour le prochain jour le plus près affichable : 
    * ex : si on est le weekend, on met selectionne le lundi

##Map
* Trouver un moyen pour garder la même instance de la map (le même composant), tout le backend
* Afficher le titre de la zone sur la carte
* Outils de modification / création des formes sur le coté => postions des points....
* Fixer controle pour ne pas supprimer à chaque fois le snap
* Style du dessin (voir le point quand on dessine)
* Ajouter les autres zone dans le Snap
* Ajouter un bouton pour afficher la carte en fullscreen
* Ajouter un retour arrière aux outils de dessin
* Pouvoir supprimer des points d'une forme


# API

## intervation_types
* Faire les vérifications des données d'entrée avec 'jai'
* consulter liste
* consulter détail
* créer
* editer
* desactiver
* supprimer => Voir comment la faire

## Client
* consulter liste (avec dernières adresses)
* consulter client
