import {Component, OnInit, ViewChild} from '@angular/core';
import {addDays, addHours, endOfMonth, startOfDay, subDays} from "date-fns";
import {CalendarComponent} from "../../../app/calendar/calendar.component";
import {CalendarEvent} from "angular-calendar";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  }
};

@Component({
  selector: 'app-page-calendar',
  styleUrls: ['page-calendar.component.scss'],
  templateUrl: 'page-calendar.component.html',
})

export class PageCalendarComponent implements OnInit{
  @ViewChild('calendar', {static: true}) calendar: CalendarComponent;
  events: CalendarEvent[] = [];

  ngOnInit() {
    this.initEvents();
  }

  initEvents() {
    this.events = [
      {
        start: startOfDay(new Date()),
        end: addDays(new Date(), 1),
        title: 'A 3 day event',
        color: colors.red,
        actions: [this.calendar.actions.edit, this.calendar.actions.delete],
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      },
      {
        start: startOfDay(new Date()),
        title: 'An event with no end date',
        color: colors.yellow,
        actions: [this.calendar.actions.edit, this.calendar.actions.delete],
      },
      {
        start: subDays(endOfMonth(new Date()), 3),
        end: addDays(endOfMonth(new Date()), 3),
        title: 'A long event that spans 2 months',
        color: colors.blue,
        allDay: true,
      },
      {
        start: addHours(startOfDay(new Date()), 2),
        end: addHours(new Date(), 2),
        title: 'A draggable and resizable event',
        color: colors.yellow,
        actions: [this.calendar.actions.edit, this.calendar.actions.delete],
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      },
    ]
  }
}
