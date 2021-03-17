import Map from 'ol/Map';
import {Injectable} from '@angular/core';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Feature} from 'ol';
import {Zone} from '../dashboard/pages/zone.model';
import {Fill, Stroke, Style} from 'ol/style';
import {ColorUtilsService} from '../utils/color-utils.service';
import {Observable, ReplaySubject} from 'rxjs';
import {MapService} from './map.service';

const DEFAULT_ZONE_OPACITY = 0.3;
const DEFAULT_ZONE_STROKE_WIDTH = 3;

@Injectable()
export class ZoneService {
  /**
   * Layer to display zones
   */
  private zoneLayer: VectorLayer = null;
  private zoneSource: VectorSource = null;
  private zonesFeatures: ReplaySubject<Feature[]> = new ReplaySubject<Feature[]>();
  /**
   * Observale, change when zone added to map
   */
  zoneFeatures$: Observable<Feature[]> = this.zonesFeatures.asObservable();

  constructor(private colorUtils: ColorUtilsService,
              private mapService: MapService) {
  }

  addZones(zones: Zone[]) {
    this.addZoneLayer();
    const zoneFeatures = [];
    zones.forEach(zone => {
      const fillColor = this.colorUtils.hexToRgb(zone.color);
      fillColor[3] = DEFAULT_ZONE_OPACITY;
      const zoneStyle = new Style({
        stroke: new Stroke({
          width: DEFAULT_ZONE_STROKE_WIDTH,
          color: zone.color
        }),
        fill: new Fill({
          color: fillColor
        })
      });
      zone.features.forEach(feature => {
        feature.setStyle(zoneStyle);
        zoneFeatures.push(feature);
      });
    });
    this.addZoneFeatures(zoneFeatures);
  }

  private addZoneLayer() {
    if(this.zoneLayer === null) {
      this.zoneSource = new VectorSource();
      this.zoneLayer = new VectorLayer({
        source: this.zoneSource
      });
    }
    this.zoneLayer.setZIndex(0);
    this.mapService.map.addLayer(this.zoneLayer);
  }

  private addZoneFeatures(features: Feature[]) {
    this.zonesFeatures.next(features);
    this.zoneSource.addFeatures(features);
  }
}
