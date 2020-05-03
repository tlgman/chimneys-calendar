import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Zone} from '../dashboard/pages/page-zones/zone.model';
import {Fill, Stroke, Style} from "ol/style";
import {ColorUtilsService} from "../../utils/color-utils.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapComponent implements OnInit, AfterViewInit {
  @Input('drawing-tool') drawingToolEnabled: boolean = false;
  @Input('drawing-tool-options') drawingToolOptions: any = {};

  map: Map = null;
  uniqid: string;
  isMapInitialized: boolean = false;
  zoneLayer: VectorLayer = null;
  zoneSource: VectorSource = null;

  constructor(private cdr: ChangeDetectorRef, private colorUtils: ColorUtilsService) { }

  ngOnInit(): void {
    this.generateUniqId();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.isMapInitialized = true;
    // Set detect changes after map initialisation
    this.cdr.detectChanges();
  }

  initMap() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map-' + this.uniqid,
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

  private generateUniqId() {
    const n = Math.floor(Math.random() * 11);
    this.uniqid = String.fromCharCode(n);
  }

}
