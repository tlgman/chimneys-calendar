
-- check, normalement erreur
SELECT postgis_version();

-- En admin
CREATE USER chimney WITH PASSWORD 'chimney';
GRANT ALL PRIVILEGES ON DATABASE chimneys_calendar TO chimney;

-- En tant qu'utilisateur chimney
CREATE EXTENSION postgis;

-- Nouveau check en tant qu'utlisateur chimney
SELECT postgis_version();
