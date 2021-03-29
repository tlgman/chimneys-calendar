import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import {fromLonLat, transform} from 'ol/proj';
import {Fill, Stroke, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {ColorUtilsService} from '../utils/color-utils.service';
import {Zone} from '../bo/pages/zone.model';
import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Feature} from 'ol';
import Point from 'ol/geom/Point';

@Injectable()
export class MapService implements OnDestroy {
  map: Map;
  drawingLayer: VectorLayer = null;
  id: number;
  constructor() {
    this.id = Math.random();
    console.log('map created: ', this.id);
  }

  initMap(): Map {
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
    return this.map;
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

  addMarker(position: [number, number]) {

    // TODO !! Refaire !!!!
    if (!this.drawingLayer) {
      this.addDrawingLayer(new VectorLayer({
        source: new VectorSource()
      }));
    }
    this.map.getView().setCenter(transform(position, 'EPSG:4326', 'EPSG:3857'));
    console.log(position);
    this.drawingLayer.getSource().addFeature(
      new Feature({
        geometry: new Point(fromLonLat(position))
      })
    );
  }

  ngOnDestroy() {
    this.map.setTarget(null);
  }
}
