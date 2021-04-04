import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {Availability} from '../../models/availability.model';
import {AvailabilitiesCalendarComponent} from './availabilities-calendar/availabilities-calendar.component';

@Component({
  selector: 'app-page-availabilities',
  templateUrl: './page-availabilities.component.html',
  styleUrls: ['./page-availabilities.component.scss']
})
export class PageAvailabilitiesComponent {
  selectedEvent: CalendarEvent<Omit<Availability, 'start' | 'end'>>;
  selectedAvailability: Availability;
  @ViewChild('calendar', {static: true}) calendar: AvailabilitiesCalendarComponent;

  constructor() {}

  createdEvent(calEvent: CalendarEvent) {
    this.selectedAvailability = PageAvailabilitiesComponent.createAvailability({
      start: calEvent.start,
      end: calEvent.end
    });
    calEvent.meta = this.selectedAvailability;
    this.selectedEvent = calEvent;
  }

  changedAvailability() {
    const {start, end} = this.selectedAvailability;
    this.selectedEvent.start = start;
    this.selectedEvent.end = end;
    this.selectedEvent.meta = {zoneId: this.selectedAvailability.zoneId};
    this.calendar.detectChangeEvents();
  }

  onEventChange(event: CalendarEvent<Omit<Availability, 'start' | 'end'>>) {
    this.selectedAvailability = {
      start: event.start,
      end: event.end,
      zoneId: event.meta?.zoneId
    };
    this.selectedEvent = event;
  }

  protected static createAvailability({start, end}: {start: Date, end: Date}): Availability {
    return {
      start,
      end,
      zoneId: null
    };
  }
}
