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
import {DrawingService} from "./drawing-tool/drawing.service";

@Injectable()
export class MapService {
  map: Map;
  /**
   * Layer to display zones
   */
  zoneLayer: VectorLayer = null;
  zoneSource: VectorSource = null;

  constructor(private colorUtils: ColorUtilsService) {
    console.log('map unidid: ', Math.random().toString(36).substr(2, 9));
  }

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

  addZones(zones: Zone[]) {
    this.addZoneLayer();
    zones.forEach(zone => {
      console.log(this.colorUtils.hexToRgb(zone.color));
      const fillColor = this.colorUtils.hexToRgb(zone.color);
      fillColor[3] = 0.3;
      const zoneStyle = new Style({
        stroke: new Stroke({
          width: 3,
          color: zone.color
        }),
        fill: new Fill({
          color: fillColor
        })
      });
      zone.features.forEach(feature => feature.setStyle(zoneStyle));
      this.zoneSource.addFeatures(zone.features);
    });
  }

  private addZoneLayer() {
    if(this.zoneLayer === null) {
      this.zoneSource = new VectorSource();
      this.zoneLayer = new VectorLayer({
        source: this.zoneSource
      });
    }
    this.map.addLayer(this.zoneLayer)
  }
}
