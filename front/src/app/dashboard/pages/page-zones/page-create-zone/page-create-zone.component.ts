import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Zone} from '../zone.model';
import {CalendarEvent, CalendarEventTimesChangedEvent} from 'angular-calendar';
import {ZoneService} from "../zone.service";
import {MapComponent} from "../../../../map/map.component";
import {startOfWeek, addDays, startOfDay, setHours, setMinutes, getDay, getISODay} from 'date-fns';
import {DayValue, RecurringFormComponent} from "../../../forms/recurring-form/recurring-form.component";
import {CalendarComponent, EventCalendarChangeState} from "../../../../calendar/calendar.component";


const DEFAULT_EVENT_PRIMARY_COLOR = '#1e90ff';

@Component({
  selector: 'app-page-create-zone',
  templateUrl: './page-create-zone.component.html',
  styleUrls: ['./page-create-zone.component.scss']
})
export class PageCreateZoneComponent implements OnInit {
  @ViewChild('createZoneForm', {static: false}) zoneForm: NgForm;
  @ViewChild('map', {static: false}) map: MapComponent;
  @ViewChild('calendar', {static: false}) calendar: CalendarComponent;
  @ViewChild('recurringForm', {static: false}) recurringForm: RecurringFormComponent;
  private _colorZone: string = '#d1e8ff';
  selectedEvent: CalendarEvent;
  nameZone: string = '';
  days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  displayDays: number = 5;
  dayEventsMap: Map<DayValue, CalendarEvent> = new Map();
  startEventHour: string = "";
  endEventHour: string;

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
    this.changeEventsColor(value);
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
        title: 'Zone # de hh à hh',
        start: startEvent,
        end: endEvent,
        color: {
          primary: DEFAULT_EVENT_PRIMARY_COLOR,
          secondary: this._colorZone
        },
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
      },
    );
    this.dayEventsMap.set(dayValue, event);
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

  /**
   * Change color for all created events for this zone
   * @param color
   */
  changeEventsColor(color: string) {
    const entries = this.dayEventsMap.entries();
    for(const [, event] of Array.from(entries)) {
      this.calendar.changeEventColor(event, {primary: DEFAULT_EVENT_PRIMARY_COLOR, secondary: color});
    }
  }

  selectedEventChanged(eventChanges: EventCalendarChangeState) {
    if(eventChanges.oldEvent) {
      this.calendar.changeEventColor(eventChanges.oldEvent, {
        primary: DEFAULT_EVENT_PRIMARY_COLOR,
        secondary: (eventChanges.oldEvent as CalendarEvent).color.secondary});
    }
    this.selectedEvent = eventChanges.newEvent;
    console.log('selected event change !!', this.selectedEvent);
    this.recurringForm.setHoursMinutesFromDates(this.selectedEvent.start, this.selectedEvent.end);
    this.calendar.changeEventColor(this.selectedEvent, {primary: 'black', secondary: this.selectedEvent.color.secondary});
  }

  startHourChange(hoursMinutes: string) {
    if(this.selectedEvent) {
      const [hours, minutes] = this.hoursMinutesStringToInt(hoursMinutes);
      const newStart = setMinutes(setHours(this.selectedEvent.start, hours), minutes);
      this.calendar.setEventTime({event: this.selectedEvent, newStart, newEnd: this.selectedEvent.end});
    }
  }

  endHourChange(hoursMinutes: string) {
    if(this.selectedEvent) {
      const [hours, minutes] = this.hoursMinutesStringToInt(hoursMinutes);
      const newEnd = setMinutes(setHours(this.selectedEvent.end, hours), minutes);
      this.calendar.setEventTime({event: this.selectedEvent, newStart: this.selectedEvent.start, newEnd});
    }
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
