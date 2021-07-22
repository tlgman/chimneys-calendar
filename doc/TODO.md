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
* Plusieurs zone sur le même horaire => Superposition de zone 
* Prendre un rendez-vous à une horaire
* Envoyer un mail de confirmation
    * Enregistre ip pour le rdv (faire attention aux faux comptes)
    * Demander son numéro
* Pouvoir modifier son rendez-vous avec le mail (modifier/supprimer)
* Admin: Valider un rendez-vous


# Front


## Prise de rendez-vous (rdv-taker)
* Pouvoir choisir un rendez-vous disponible
* Mettre à jour pour les autres qu'un rendez-vous est en train d'être pris
* Arriver directement sur la première semaine avec des rendez-vous dispo
* Ne pas revenir en arrière après la date du jour
* Travailler un peu le design
 
## Global
* Mettre en place un composant de notification

## Disponibilités
* Pouvoir modifier des disponiblités existantes
* Pouvoir supprimer des disponibilités
* Validator : pas possible d'avoir une date de fin plus petite qu'une date de début...
* A l'enregistrement, mettre à jour les dispo avec les id, sinon au prochain enregistrement il y aura un problème
* Pouvoir supprimer une dispo
* Dupliquer une disponibilité avec un clic droit
* Zone détail dans le formulaire permettant de voir plus d'info.
  Ex: status, la liste des rdv liés à cet évènement
* Enregistrer la semaine, message de warning, si des modifs ont été faites sur la pages et qu'on quitte
* Enregistrer en tant que brouillon la semaine
* Changer l'url quand on change de semaine, => plus simple quand on recharge la page
* Pouvoir modifier en mode jour
* Afficher un petite icone sur chaque évènement, permettant de savoir si celui-ci à été sauvegardé


## Demande de rdv (client)
* Lister les demandes d'adresse client qui sont tombées à coté d'une zone
    * Utile pour faire des vérifs

## Zones
* Optimiser le chargemnet des zones, pas forcément obligé de recharger à chaque fois toutes les zones
* Convertir les polygones en mutlipolygones
* Rendre le nom de zone obligatoire
* Afficher le nom quand on affiche la zone

### Créer zone
* DONE - Fix : Outils de dessin => Erreur si on essaye de supprimer une zone qu'on à pas créé
* Création, demander à l'utilisateur s'il veut quitter
    * Utiliser les props de ngForm pour voir si le fomulaire a été modifé
* Mettre au premier plan les nouvelles feature, devant les couches déjà dessinées
* Colorer la zone au déplacement

## Calendrier
* Pouvoir consulter par semaine/jour/mois/année
* Séletionner un jours
* Afficher des heures supplémentaires si un rdv est pris (ex: rdv à 20h)
* Afficher les weekends seulement si rdv
* Sélectionner automatiquement le jour le prochain jour le plus près affichable : 
    * ex : si on est le weekend, on met selectionne le lundi
* Utiliser la fonctionnalité "group similar events" pour afficher les nombre de rdv chanque jour en afficahge mois 

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
* FIX : Des fois, la carte ne s'affiche pas...
    * Arrive des fois, quand on change de créer à zones 


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

# Design / UX

## Calendrier
* Centrer l'affichage de la date par rapport aux boutons

## Créer une zone
* Déplacer le timepicker en fonction du jour actuellmement sélectionné
* Ajouter un jour dans le calendrier si un ou 2 jours du weekend est sélectionné
* Pouvoir spliter un évènement en 2
* Bug si on agrendit un évènement jusqu'au lendemain 
* Interdire l'évènement de calendriier d'être supperposé avec des event de la **même** zone
* Affichage des jours toujours sur un ligne
* Adapter textes pour jours ("tous les") et ajouter un 's' ou non pour le choix de la métric (semaines, jours)
 
