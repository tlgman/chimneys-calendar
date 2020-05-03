import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Zone, ZoneJsonable} from './zone.model';
import Feature from "ol/Feature";
import {GeoJSON} from "ol/format";

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
    const zoneToPost: ZoneJsonable = {
      id: zone.id,
      name: zone.name,
      color: zone.color,
      geom: null
    };
    zoneToPost.geom = this.writeFeaturesToGeoJSON(zone.features);
    return this.http.post<ZoneJsonable>('http://localhost:3000/zones', zoneToPost)
  }

  /**
   * Get all zones
   */
  fetch() {
    return this.http.get<ZoneJsonable>('http://localhost:3000/zones');
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
      featureProjection: 'EPSG:3857',
      dataProjection: 'EPSG:4326'
    }) as any;
    geoJsonGeom.crs = {type: 'name', properties: {name: 'EPSG:4326'}};
    return geoJsonGeom;
  }

}
