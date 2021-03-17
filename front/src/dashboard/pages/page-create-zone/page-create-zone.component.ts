import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Zone} from '../zone.model';
import {CalendarEvent, CalendarEventTimesChangedEvent} from 'angular-calendar';
import {ZoneService} from "../zone.service";
import {MapComponent} from "../../../map/map.component";
import {startOfWeek, addDays, startOfDay, setHours, setMinutes, getDay, getISODay} from 'date-fns';

import {DayValue, RecurringFormComponent} from "../../forms/recurring-form/recurring-form.component";
import {CalendarComponent, EventCalendarChangeState} from "../../../app/calendar/calendar.component";


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

  constructor(private zoneService: ZoneService) {}

  ngOnInit(): void {
    this.zoneService.fetch()
      .subscribe((zones: Zone[]) => {
        this.map.addZones(zones);
      }, error => {
        console.log('Unable to load zones: ', error);
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
