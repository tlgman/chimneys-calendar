# Installation du projet

## Pour windows
* Istaller Postgres: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
* Installer Postgis: http://download.osgeo.org/postgis/windows/
* Créer la base 'chimneys_calendar'
* Lancer la command sql en root: 
> CREATE EXTENSION postgis;
> create user chimney password 'chimney';
> grant all privileges on database chimneys_calendar to chimney;

## Docker

### Installer une image postgis
Utiliser l'image postgis/postgis du dockerhub : https://hub.docker.com/r/postgis/postgis
> docker run --name postgres-postgis2 -e POSTGRES_PASSWORD=password -d postgis/postgis

Connecter postgresql:
> psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U postgres

Création d'une base:
> createdb -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U postgres chimneys_calendar
