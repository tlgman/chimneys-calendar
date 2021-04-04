import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Zone} from '../../models/zone.model';
import {ZoneService} from "../zone.service";
import {MapComponent} from "../../../map/map.component";
import {MessageService} from 'primeng/api';

const DEFAULT_EVENT_PRIMARY_COLOR = '#1e90ff';

@Component({
  selector: 'app-page-create-zone',
  templateUrl: './page-create-zone.component.html',
  styleUrls: ['./page-create-zone.component.scss']
})
export class PageCreateZoneComponent implements OnInit {
  @ViewChild('createZoneForm', {static: false}) zoneForm: NgForm;
  @ViewChild('map', {static: false}) map: MapComponent;
  private _colorZone: string = '#d1e8ff';
  nameZone: string = '';

  constructor(private zoneService: ZoneService,
              private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.zoneService.fetch()
      .subscribe((zones: Zone[]) => {
        this.map.addZones(zones);
      }, error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur au chargement des zones',
          detail: 'Impossible de charger la liste des zones.'
        });
        console.error('Unable to load zones: ', error);
      });
  }

  get colorZone() {
    return this._colorZone;
  }

  set colorZone(value: string) {
    this._colorZone = value;
  }

  /**
   * convert '08:11' => [8,11]
   */
  private hoursMinutesStringToInt(hoursMinutes: string) {
    return hoursMinutes.split(':').map(unite => parseInt(unite, 10));
  }

  onSubmit() {
    const features = this.map.drawingService.getDrawnFeatures();
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
