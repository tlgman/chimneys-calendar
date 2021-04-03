import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {CalendarComponent, HourClickEvent} from '../../../app/calendar/calendar.component';
import {addHours} from 'date-fns';


const DEFAULT_EVENT_PRIMARY_COLOR = '#FFFFFF';
const DEFAULT_EVENT_SEONDARY_COLOR = '#000000';

@Component({
  selector: 'app-page-availabilities',
  templateUrl: './page-availabilities.component.html',
  styleUrls: ['./page-availabilities.component.scss']
})
export class PageAvailabilitiesComponent implements OnInit {
  readonly calendarView = CalendarView.Week;
  @ViewChild('calendar', {static: true}) calendar: CalendarComponent;
  events: CalendarEvent[] = [];

  constructor() { }

  ngOnInit(): void {}

  addCalendarEvent({date}: HourClickEvent) {
    console.log(date);
    const event = this.calendar.addEvent(
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
  }
}
