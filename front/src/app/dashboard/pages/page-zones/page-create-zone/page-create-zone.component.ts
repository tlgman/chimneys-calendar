import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Zone} from '../zone.model';
import {DrawingService} from "../../../../map/drawing-tool/drawing.service";
import {GeoJSON} from 'ol/format';
import {ZoneService} from "../zone.service";
import {MapComponent} from "../../../../map/map.component";


@Component({
  selector: 'app-page-create-zone',
  templateUrl: './page-create-zone.component.html',
  styleUrls: ['./page-create-zone.component.scss']
})
export class PageCreateZoneComponent implements OnInit {
  @ViewChild('createZoneForm') zoneForm: NgForm;
  @ViewChild('map') map: MapComponent;
  colorZone: string = '#000000';
  nameZone: string = '';
  constructor(
    private drawingService: DrawingService,
    private zoneService: ZoneService
  ) {}

  ngOnInit(): void {
    this.zoneService.fetch()
      .subscribe((zones: Zone[]) => {
        this.map.addZones(zones);
      }, error => {
        console.log('Unable to load zones: ', error);
      });
  }

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
