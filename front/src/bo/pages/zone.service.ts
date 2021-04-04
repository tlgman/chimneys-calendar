import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Zone, JsonableZone} from '../models/zone.model';
import Feature from "ol/Feature";
import {GeoJSON} from "ol/format";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class ZoneService {
  private geoJson: GeoJSON;

  constructor(private http: HttpClient) {
    this.geoJson = new GeoJSON();
  }

  /**
   * Post new zone
   * @param zone
   */
  create(zone: Zone) {
    const zoneToPost: JsonableZone = {
      id: zone.id,
      name: zone.name,
      color: zone.color,
      geom: null
    };
    zoneToPost.geom = this.writeFeaturesToGeoJSON(zone.features);
    return this.http.post<JsonableZone>('http://localhost:3000/zones', zoneToPost)
  }

  /**
   * Get all zones
   */
  fetch(): Observable<Zone[]> {
    return this.http.get<JsonableZone[]>('http://localhost:3000/zones')
      .pipe(
        map((zones: JsonableZone[]) => {
          return (zones.map(this.convertJsonableZoneToZone.bind(this)) as Zone[]);
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  /**
   * Convert reproject feature to 4326 and format it to geojson string
   * @param features
   */
  private writeFeaturesToGeoJSON(features: Feature[]): object {
    if(!features.length) {
      return null;
    }
    // TODO : Only on feature for the moment => Change to many or multipolygon
    const feature = features[0];
    // Rerpoject geometry in 4326
    const geoJsonGeom = this.geoJson.writeGeometryObject(feature.getGeometry(), {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    }) as any;
    geoJsonGeom.crs = {type: 'name', properties: {name: 'EPSG:4326'}};
    return geoJsonGeom;
  }

  private convertJsonableZoneToZone(jsonableZone: JsonableZone): Zone {
    console.log('jsonablezone: ', jsonableZone);
    const geom = this.geoJson.readGeometry(jsonableZone.geom, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    const feature = new Feature(geom);
    return ({
      id: jsonableZone.id,
      name: jsonableZone.name,
      color: jsonableZone.color,
      features: [feature]
    } as Zone);
  }

}
