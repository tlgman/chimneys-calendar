import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import { Map } from 'ol';
import VectorLayer from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";
import CircleStyle from "ol/style/Circle";
import VectorSource from "ol/source/Vector";
import {Draw, Modify, Snap} from "ol/interaction";
import GeometryType from "ol/geom/GeometryType";
import {DragInteraction} from './DragInteraction';
import {RemoveInteraction} from './RemoveInteraction';
import {DrawingService} from "./drawing.service";

const STROKE_WIDTH = 3;

enum Mode {NONE, DRAW, DRAG, DELETE};

@Component({
  selector: 'app-drawing-tool',
  templateUrl: './drawing-tool.component.html',
  styleUrls: ['./drawing-tool.component.scss']
})

export class DrawingToolComponent implements OnInit, OnDestroy {
  @Input('map') map: Map;
  @Input() fillColor: string = 'rgba(255, 255, 255, 0.4)';
  /**
   * Use setter to notify stroke changement only not for all changes
   * @param color
   */
  @Input() set strokeColor(color: string) {
    this._strokeColor = color;
    this.changeStrokeStyle();
  }
  get strokeColor() { return this._strokeColor; }

  private _strokeColor: string = '#ffcc00';
  drawingLayer: VectorLayer;
  drawingSource: VectorSource;
  draw: Draw;
  modify: Modify;
  snap: Snap;
  drag: any;
  remove: any;
  currentMode: Mode = Mode.NONE;
  isSnapActive: boolean = true;

  constructor(private drawingService: DrawingService) {}

  ngOnInit(): void {
    this.drawingSource = new VectorSource();
    this.drawingLayer = new VectorLayer({
      source: this.drawingSource,
      style: new Style({
        fill: new Fill({
          color: this.fillColor
        }),
        stroke: new Stroke({
          color: this.strokeColor,
          width: STROKE_WIDTH
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: this.strokeColor
          })
        })
      })
    });
    this.drawingService.init(this.drawingLayer, this.drawingSource);

    this.map.addLayer(this.drawingLayer);

    this.modify = new Modify({
      source: this.drawingSource,
      style: this.drawingLayer.getStyle()
    });
    this.snap = new Snap({source: this.drawingSource});
    this.draw = new Draw({
      source: this.drawingSource,
      type: GeometryType.POLYGON,
      // Same style for current drawn feature and drawn feature
      style: this.drawingLayer.getStyle()
    });
    this.drag = new DragInteraction();
    this.remove = new RemoveInteraction({source: this.drawingSource});
    this.startDrawPolygon();
  }

  /**
   * Press control, activate or desactivate 'snap'
   */
  @HostListener('document:keydown.control')
  handleCtrlDownEvent(): void {
    if(this.isSnapActive) {
      this.isSnapActive = false;
      this.map.removeInteraction(this.snap);
    }
  }

  @HostListener('document:keyup.control', ['$event'])
  handleCtrlUpEvent(): void {
    if(!this.isSnapActive) {
      this.isSnapActive = true;
      this.map.addInteraction(this.snap);
    }
  }


  ngOnDestroy(): void {
    this.changeMode(Mode.NONE);
    this.map.removeInteraction(this.modify);
  }

  startDrawPolygon() {
    this.changeMode(Mode.DRAW);
  }

  startDrag() {
    this.changeMode(Mode.DRAG)
  }

  startRemove() {
    this.changeMode(Mode.DELETE);
  }

  changeMode(mode: Mode) {
    if(this.currentMode === mode) {
      return;
    }
    this.resetInteractions();
    if(mode === Mode.DRAG) {
      this.map.addInteraction(this.drag);
      this.map.addInteraction(this.modify);
      this.map.addInteraction(this.snap);
    } else if(mode === Mode.DRAW){
      this.map.addInteraction(this.modify);
      this.map.addInteraction(this.draw);
      this.map.addInteraction(this.snap);
    } else if(mode === Mode.DELETE) {
      this.map.addInteraction(this.remove);
    }
    this.currentMode = mode;
  }

  private resetInteractions() {
    this.map.removeInteraction(this.draw);
    this.map.removeInteraction(this.snap);
    this.map.removeInteraction(this.modify);
    this.map.removeInteraction(this.remove);
    this.map.removeInteraction(this.drag);
  }

  /**
   * Change stroke style for all drawn features
   */
  changeStrokeStyle() {
   if(this.drawingLayer) {
     const style = (this.drawingLayer.getStyle() as Style);
     style.setStroke(new Stroke({
       color: this._strokeColor,
       width: STROKE_WIDTH
     }));
     // Change drawing cursor style
     style.setImage(new CircleStyle({
       radius: 7,
       fill: new Fill({
         color: this.strokeColor
       })
     }));
     // Set style to notify openlayers
     this.drawingLayer.setStyle(style);
   }
  }
}
