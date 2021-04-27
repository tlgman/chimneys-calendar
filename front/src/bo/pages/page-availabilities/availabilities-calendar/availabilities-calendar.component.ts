import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addHours } from 'date-fns';
import { Availability } from 'src/bo/models/availability.model';
import { Zone } from 'src/bo/models/zone.model';
import { CalendarComponent, HourClickEvent } from '../../../../app/calendar/calendar.component';

const DEFAULT_EVENT_PRIMARY_COLOR = '#FFFFFF';
const DEFAULT_EVENT_SEONDARY_COLOR = '#000000';

@Component({
  selector: 'bo-availabilities-calendar',
  templateUrl: './availabilities-calendar.component.html',
  styleUrls: ['./availabilities-calendar.component.scss']
})
export class AvailabilitiesCalendarComponent {
  readonly calendarView = CalendarView.Week;
  events = [];
  @ViewChild('calendar', {static: true}) calendar: CalendarComponent;
  @Output('onCreateEvent') createEventEmitter = new EventEmitter<CalendarEvent>();
  @Output() onEventChanged = new EventEmitter<CalendarEvent>();
  @Output() onEventSelected = new EventEmitter<CalendarEvent>();

  constructor() { }

  /**
   * Init all events in calendar from availabilities
   * All events are erase before initialisation
   * @param availabilites 
   */
  initEventsFromAvailabilities(availabilites: Availability[], zones: Zone[]) {
    this.calendar.events = availabilites.map<CalendarEvent>(availability => {
      const zone = availability.zoneId && zones.find(({id}) => id === availability.zoneId)

      return {
        title: zone?.name || 'Zone ??',
        start: availability.start,
        end: availability.end,
        color: {
          primary: DEFAULT_EVENT_PRIMARY_COLOR,
          secondary: zone ? zone.color : DEFAULT_EVENT_SEONDARY_COLOR
        },
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        meta: {
          zoneId: availability.zoneId
        }
      }
    });
    this.calendar.detectChanges();
  }

  addCalendarEvent({date}: HourClickEvent) {
    const event = this.calendar.addEvent(
      {
        title: 'Zone ??',
        start: date,
        end: addHours(date, 4),
        color: {
          primary: DEFAULT_EVENT_PRIMARY_COLOR,
          secondary: DEFAULT_EVENT_SEONDARY_COLOR
        },
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    );
    this.createEventEmitter.emit(event);
  }

  detectChangeEvents() {
    this.calendar.detectChangeEvents();
  }

  getEvents() {
    return this.calendar.events;
  }

  getViewDate(): Date {
    return this.calendar.viewDate;
  }
}
