import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Zone} from '../zone.model';
import {CalendarEvent} from 'angular-calendar';
import {ZoneService} from "../zone.service";
import {MapComponent} from "../../../../map/map.component";
import {startOfWeek, addDays, startOfDay, setHours, setMinutes, getDay, getISODay} from 'date-fns';
import {DayValue, RecurringFormComponent} from "../../../forms/recurring-form/recurring-form.component";
import {CalendarComponent} from "../../../../calendar/calendar.component";


@Component({
  selector: 'app-page-create-zone',
  templateUrl: './page-create-zone.component.html',
  styleUrls: ['./page-create-zone.component.scss']
})
export class PageCreateZoneComponent implements OnInit {
  @ViewChild('createZoneForm') zoneForm: NgForm;
  @ViewChild('map') map: MapComponent;
  @ViewChild('calendar') calendar: CalendarComponent;
  @ViewChild('recurringForm') recurringForm: RecurringFormComponent;
  colorZone: string = '#000000';
  nameZone: string = '';
  days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  displayDays: number = 5;
  dayEventsMap: Map<DayValue, CalendarEvent> = new Map();

  constructor(private zoneService: ZoneService) {}

  ngOnInit(): void {
    this.zoneService.fetch()
      .subscribe((zones: Zone[]) => {
        this.map.addZones(zones);
      }, error => {
        console.log('Unable to load zones: ', error);
      });
  }

  /**
   * To find corresponding date of the given day
   * @param dayValue
   */
  onSelectDay(dayValue: DayValue): void {
    const dateDaySelected = addDays(startOfWeek(startOfDay(new Date()), {weekStartsOn: 1}), dayValue);
    const startEvent = setMinutes(setHours(dateDaySelected, 8), 0);
    const endEvent = setMinutes(setHours(dateDaySelected, 8), 30);
    const event = this.calendar.addEvent(
      {
        title: 'New event',
        start: startEvent,
        end: endEvent,
        // color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
      },
    );
    this.dayEventsMap.set(dayValue, event);

    console.log('day selected:', dayValue);
  }

  onUnselectDay(dayValue) {
    const eventToDelete = this.dayEventsMap.get(dayValue);
    if(eventToDelete) {
      this.dayEventsMap.delete(dayValue);
      this.calendar.deleteEvent(eventToDelete);
    }
  }

  onCalendarEventChange(states: {oldEvent: CalendarEvent, newEvent: CalendarEvent}) {
    const {oldEvent, newEvent} = states;
    const dayValueOldEvent = getISODay(oldEvent.start) - 1;

    const event = this.dayEventsMap.get(dayValueOldEvent);
    if(!event) {
      return;
    }
    const dayValueNewEvent = getISODay(newEvent.start) - 1;
    if(dayValueNewEvent === dayValueOldEvent) {
      // Change event if old event is in map
      this.dayEventsMap.set(dayValueOldEvent, newEvent);
    } else {
      // In this case event changed of day
      // Change map key of changed event
      this.recurringForm.unselectDay(dayValueOldEvent);
      this.dayEventsMap.delete(dayValueOldEvent);
      this.recurringForm.selectDay(dayValueNewEvent);
      this.dayEventsMap.set(dayValueNewEvent, newEvent);
    }
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
