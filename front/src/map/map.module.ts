import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from './map.component';
import { DrawingToolComponent } from './drawing-tool/drawing-tool.component';

@NgModule({
  declarations: [
    MapComponent,
    DrawingToolComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
