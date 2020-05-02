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

  constructor(private cdr: ChangeDetectorRef) { }

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

  private generateUniqId() {
    const n = Math.floor(Math.random() * 11);
    this.uniqid = String.fromCharCode(n);
  }

  onCtrlKeyDown() {
    console.log('ctrl');
  }

}
