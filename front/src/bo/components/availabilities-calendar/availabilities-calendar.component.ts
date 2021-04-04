import {CalendarEvent, CalendarView} from 'angular-calendar';
import {Component, Output, ViewChild, EventEmitter, Input} from '@angular/core';
import {CalendarComponent, HourClickEvent} from '../../../app/calendar/calendar.component';
import {addHours} from 'date-fns';

const DEFAULT_EVENT_PRIMARY_COLOR = '#FFFFFF';
const DEFAULT_EVENT_SEONDARY_COLOR = '#000000';

@Component({
  selector: 'bo-availabilities-calendar',
  templateUrl: './availabilities-calendar.component.html',
  styleUrls: ['./availabilities-calendar.component.scss']
})
export class AvailabilitiesCalendarComponent {
  readonly calendarView = CalendarView.Week;
  @ViewChild('calendar', {static: true}) calendar: CalendarComponent;
  events: CalendarEvent[] = [];
  @Output('onCreateEvent') createEventEmitter = new EventEmitter<CalendarEvent>();
  @Input() selectedEvent;

  constructor() { }

  addCalendarEvent({date}: HourClickEvent) {
    this.selectedEvent = this.calendar.addEvent(
      {
        title: 'Zone # de hh à hh',
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
    this.createEventEmitter.emit(this.selectedEvent);
  }
}
