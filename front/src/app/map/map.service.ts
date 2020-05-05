import Map from 'ol/Map';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import {fromLonLat} from "ol/proj";
import {Fill, Stroke, Style} from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {ColorUtilsService} from "../../utils/color-utils.service";
import {Zone} from '../dashboard/pages/page-zones/zone.model';
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {Feature} from "ol";

const DEFAULT_ZONE_OPACITY = 0.3;
const DEFAULT_ZONE_STROKE_WIDTH = 3;

@Injectable()
export class MapService {
  map: Map;
  /**
   * Layer to display zones
   */
  zoneLayer: VectorLayer = null;
  zoneSource: VectorSource = null;
  drawingLayer: VectorLayer = null;
  private zonesFeatures: ReplaySubject<Feature[]> = new ReplaySubject<Feature[]>();
  zoneFeaturesObs: Observable<Feature[]> = this.zonesFeatures.asObservable();

  constructor(private colorUtils: ColorUtilsService) {}

  initMap() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([5.909958, 45.583356]),
        zoom: 12
      })
    });
  }

  /**
   * Add drawing layer at in fist plan
   * @param drawingLayer
   */
  addDrawingLayer(drawingLayer: VectorLayer) {
    this.drawingLayer = drawingLayer;
    this.drawingLayer.setZIndex(1);
    this.map.addLayer(this.drawingLayer);
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
    this.map.addLayer(this.zoneLayer)
  }

  private addZoneFeatures(features: Feature[]) {
    this.zonesFeatures.next(features);
    this.zoneSource.addFeatures(features);
  }
}
