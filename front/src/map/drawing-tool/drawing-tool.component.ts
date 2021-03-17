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
import {DrawingService, Mode} from "./drawing.service";
import {MapService} from "../map.service";

@Component({
  selector: 'app-drawing-tool',
  templateUrl: './drawing-tool.component.html',
  styleUrls: ['./drawing-tool.component.scss']
})

export class DrawingToolComponent implements OnInit, OnDestroy {
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
  isSnapActive: boolean = true;

  constructor(private mapService: MapService, private drawingService: DrawingService) {}

  ngOnInit(): void {
    this.drawingService.init({
      stroke: {
        color: this._strokeColor
      },
      fillColor: this.fillColor
    });
    this.startDrawPolygon();
  }

  /**
   * Press control, activate or desactivate 'snap'
   */
  @HostListener('document:keydown.control')
  handleCtrlDownEvent(): void {
    if(this.isSnapActive) {
      this.isSnapActive = false;
      this.drawingService.removeInteractionSanp();
    }
  }

  @HostListener('document:keyup.control', ['$event'])
  handleCtrlUpEvent(): void {
    if(!this.isSnapActive) {
      this.isSnapActive = true;
      this.drawingService.removeInteractionSanp();
    }
  }

  ngOnDestroy(): void {
    this.drawingService.changeMode(Mode.NONE);
  }

  startDrawPolygon() {
    this.drawingService.changeMode(Mode.DRAW);
  }

  startDrag() {
    this.drawingService.changeMode(Mode.DRAG)
  }

  startRemove() {
    this.drawingService.changeMode(Mode.DELETE);
  }

  /**
   * Change stroke style for all drawn features
   */
  changeStrokeStyle() {
    this.drawingService.changeStrokeColor(this._strokeColor);
  }
}
