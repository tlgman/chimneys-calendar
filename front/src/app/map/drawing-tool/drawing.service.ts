import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Injectable} from "@angular/core";
import {Feature} from "ol";


@Injectable({providedIn: 'root'})
export class DrawingService {
  drawingLayer: VectorLayer;
  drawingSource: VectorSource;

  init(drawingLayer: VectorLayer, drawingSource: VectorSource) {
    this.drawingLayer = drawingLayer;
    this.drawingSource = drawingSource;
  }

  getDrawnFeatures(): Feature[] {
    return this.drawingSource.getFeatures();
  }

}
