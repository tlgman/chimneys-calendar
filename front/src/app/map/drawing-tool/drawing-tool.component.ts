import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import { Map } from 'ol';
import VectorLayer from "ol/layer/Vector";
import {Fill, Stroke, Style} from "ol/style";
import CircleStyle from "ol/style/Circle";
import VectorSource from "ol/source/Vector";
import {Draw, Modify, Snap} from "ol/interaction";
import GeometryType from "ol/geom/GeometryType";

const STROKE_WIDTH = 3;

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

  constructor() {}

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
            color: this.fillColor
          })
        })
      })
    });

    this.map.addLayer(this.drawingLayer);

    console.log(this.drawingLayer.getStyle());


    // // this.map.getLayers().insertAt(0, this.drawingLayer);
    // console.log(this.map);
    //
    //
    this.modify = new Modify({source: this.drawingSource});
    this.snap = new Snap({source: this.drawingSource});
    this.draw = new Draw({
      source: this.drawingSource,
      type: GeometryType.POLYGON,
      // Same style for current drawn feature and drawn feature
      style: this.drawingLayer.getStyle()
    });
    this.map.addInteraction(this.modify);
  }

  /**
   * Type on control, activate ou desactivate 'snap'
   */
  @HostListener('document:keydown.control')
  handleCtrlDownEvent(): void {
    console.log('key down');
    this.map.removeInteraction(this.snap);
  }

  @HostListener('document:keyup.control', ['$event'])
  handleCtrlUpEvent(): void {
    console.log('key up');
    this.map.addInteraction(this.snap);
  }


  ngOnDestroy(): void {
    this.map.removeInteraction(this.draw);
    this.map.removeInteraction(this.modify);
  }

  startPolygon() {
    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.snap);
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
     // Set style to notify openlayers
     this.drawingLayer.setStyle(style);
   }
  }



}
