import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import Map from 'ol/Map';
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Zone} from '../dashboard/pages/page-zones/zone.model';
import {MapService} from "./map.service";
import {DrawingService} from "./drawing-tool/drawing.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: MapService}, {provide: DrawingService}]
})


export class MapComponent implements OnInit, AfterViewInit {
  @Input('drawing-tool') drawingToolEnabled: boolean = false;
  @Input('drawing-tool-options') drawingToolOptions: any = {};

  uniqid: string;
  isMapInitialized: boolean = false;

  constructor(private mapService: MapService, private cdr: ChangeDetectorRef, public drawingService: DrawingService) { }

  ngOnInit(): void {
    this.generateUniqId();
  }

  ngAfterViewInit(): void {
    this.initMap();
    // Set detect changes after map initialisation
    this.cdr.detectChanges();
  }

  initMap() {
    this.mapService.initMap();
    this.mapService.map.setTarget('map-' + this.uniqid);
    this.isMapInitialized = true;
  }

  addZones(zones: Zone[]) {
    this.mapService.addZones(zones);
  }

  private generateUniqId() {
    this.uniqid = Math.random().toString(36).substr(2, 9);
  }

}
