import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Zone} from '../zone.model';
import {DrawingService} from "../../../../map/drawing-tool/drawing.service";
import {GeoJSON} from 'ol/format';
import {ZoneService} from "../zone.service";


@Component({
  selector: 'app-page-create-zone',
  templateUrl: './page-create-zone.component.html',
  styleUrls: ['./page-create-zone.component.scss']
})
export class PageCreateZoneComponent {
  @ViewChild('createZoneForm') zoneForm: NgForm;
  colorZone: string = '#000000';
  nameZone: string = '';
  constructor(
    private drawingService: DrawingService,
    private zoneService: ZoneService
  ) { }

  onSubmit() {
    const features = this.drawingService.getDrawnFeatures();
    if(!features.length) {
      // TODO ------------------------> Afficher l'erreur
      return;
    }

    const zone: Zone = {
      id: 0,
      color: this.zoneForm.value.color,
      name: this.zoneForm.value.name,
      features
    };

    this.zoneService.create(zone).subscribe(() => {
      console.log('done');
    }, (error) => {
      // TODO ------------------------> Afficher l'erreur
      console.log('error: ', error);
    })
  }

}
