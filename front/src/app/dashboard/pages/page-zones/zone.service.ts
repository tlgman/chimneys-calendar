import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Zone} from './zone.model';
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
    const zoneToPost = {...zone};
    zoneToPost.features = this.writeFeaturesToGeoJSON(zone.features as Feature[]);
    return this.http.post<Zone>('http://localhost:3000/zone', zoneToPost)
  }

  /**
   * Convert reproject feature to 4326 and format it to geojson string
   * @param features
   */
  private writeFeaturesToGeoJSON(features: Feature[]): object {
    // Rerpoject all feature in 4326
    const reprojectedFeatures = features.map(feature => {
      const reprojFeature = feature.clone();
      reprojFeature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
      return reprojFeature;
    });
    return this.geoJson.writeFeaturesObject(reprojectedFeatures);
  }

}
