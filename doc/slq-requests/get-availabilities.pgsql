SELECT Z.id,ST_AsText(z.geom)
from availabilities A
inner join zones Z on Z.id = A.zone_id
where ST_Contains(Z.geom, ST_GeomFromText('POINT(5.915451 45.572902)', 4326))