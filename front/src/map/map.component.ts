import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import Map from 'ol/Map';
import {Zone} from '../bo/models/zone.model';
import {MapService} from './map.service';
import {DrawingService} from './drawing-tool/drawing.service';
import {ZoneService} from './zone.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MapService }, { provide: DrawingService }, {provide: ZoneService}]
})


export class MapComponent implements OnInit, AfterViewInit {
  @Input('drawing-tool') drawingToolEnabled = false;
  @Input('drawing-tool-options') drawingToolOptions: any = {};

  uniqid: string;
  isMapInitialized = false;
  map: Map;

  constructor(private mapService: MapService,
              private zoneService: ZoneService,
              public drawingService: DrawingService,
              private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.generateUniqId();
  }

  ngAfterViewInit(): void {
    this.initMap();
    // Set detect changes after map initialisation
    this.cdr.detectChanges();
  }

  initMap() {
    this.map = this.mapService.initMap();
    this.map.setTarget('map-' + this.uniqid);
    this.isMapInitialized = true;
  }

  addZones(zones: Zone[]) {
    this.zoneService.addZones(zones);
  }

  private generateUniqId() {
    this.uniqid = Math.random().toString(36).substr(2, 9);
  }

  addMarker(position: [number, number]) {
    this.mapService.addMarker(position);
  }
}
