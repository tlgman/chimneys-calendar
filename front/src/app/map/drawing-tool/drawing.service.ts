import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Injectable} from "@angular/core";
import {Feature} from "ol";
import {MapService} from "../map.service";
import {Fill, Stroke, Style} from "ol/style";
import CircleStyle from "ol/style/Circle";
import {Draw, Modify, Snap} from "ol/interaction";
import GeometryType from "ol/geom/GeometryType";
import {DragInteraction} from "./DragInteraction";
import {RemoveInteraction} from "./RemoveInteraction";
import {inspect} from "util";


export enum Mode {NONE, DRAW, DRAG, DELETE}

export interface StyleOptions {
  stroke?: {
    color?: string,
    width?: number
  },
  fillColor?: string
}

const STROKE_WIDTH = 3;

@Injectable()
export class DrawingService {
  drawingLayer: VectorLayer;
  drawingSource: VectorSource;
  draw: Draw;
  modify: Modify;
  snap: Snap;
  drag: any;
  remove: any;
  currentMode: Mode = Mode.NONE;
  style: StyleOptions = {
    stroke: {
      color: '#ffcc00',
      width: STROKE_WIDTH
    },
    fillColor: '#ffcc00'
  };

  constructor(private mapService: MapService) {}

  init(style?: StyleOptions) {
    if(style) {
      // Merge, with defaults value (this.style)
      this.style = {...this.style, ...style};
    }
    this.drawingSource = new VectorSource();
    this.drawingLayer = this.createVectorLayer();
    this.mapService.map.addLayer(this.drawingLayer);
    this.snap = new Snap({source: this.drawingSource});
    this.draw = new Draw({
      source: this.drawingSource,
      type: GeometryType.POLYGON,
      // Same style for current drawn feature and drawn feature
      style: this.drawingLayer.getStyle()
    });
    this.drag = new DragInteraction({layers: [this.drawingLayer]});
    this.remove = new RemoveInteraction({
      source: this.drawingSource,
      layers: [this.drawingLayer]
    });
    this.modify = new Modify({
      source: this.drawingSource,
      style: this.drawingLayer.getStyle()
    });
  }

  changeMode(mode: Mode) {
    if(this.currentMode === mode) {
      return;
    }
    this.resetInteractions();
    if(mode === Mode.DRAG) {
      // console.log((this.map.getLayers().getArray()[2] as VectorLayer).getSource().getFeatures());
      // const features = (this.map.getLayers().getArray()[2] as VectorLayer).getSource().getFeatures();
      // this.snap.addFeature(features[0])
      this.mapService.map.addInteraction(this.drag);
      this.mapService.map.addInteraction(this.modify);
      this.mapService.map.addInteraction(this.snap);
    } else if(mode === Mode.DRAW){
      this.mapService.map.addInteraction(this.modify);
      this.mapService.map.addInteraction(this.draw);
      this.mapService.map.addInteraction(this.snap);
    } else if(mode === Mode.DELETE) {
      this.mapService.map.addInteraction(this.remove);
    } else if(mode === Mode.NONE) {
      this.resetInteractions();
    }
    this.currentMode = mode;
  }

  resetInteractions() {
    this.mapService.map.removeInteraction(this.draw);
    this.mapService.map.removeInteraction(this.snap);
    this.mapService.map.removeInteraction(this.modify);
    this.mapService.map.removeInteraction(this.remove);
    this.mapService.map.removeInteraction(this.drag);
  }

  removeInteractionSanp() {
    this.mapService.map.removeInteraction(this.snap);
  }

  getDrawnFeatures(): Feature[] {
    return this.drawingSource.getFeatures();
  }

  private createVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: this.drawingSource,
      style: new Style({
        fill: new Fill({
          color: this.style.fillColor
        }),
        stroke: new Stroke({
          color: this.style.stroke.color,
          width: STROKE_WIDTH
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: this.style.stroke.color
          })
        })
      })
    });
  }

  changeStrokeColor(color: string) {
    if(this.drawingLayer) {
      const style = (this.drawingLayer.getStyle() as Style);
      style.setStroke(new Stroke({
        color: color,
        width: STROKE_WIDTH
      }));
      // Change drawing cursor style
      style.setImage(new CircleStyle({
        radius: 7,
        fill: new Fill({color})
      }));
      // Set style to notify openlayers
      this.drawingLayer.setStyle(style);
    }
  }
}
