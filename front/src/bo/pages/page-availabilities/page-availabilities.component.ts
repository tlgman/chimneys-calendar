import {Component, OnInit} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';

@Component({
  selector: 'app-page-availabilities',
  templateUrl: './page-availabilities.component.html',
  styleUrls: ['./page-availabilities.component.scss']
})
export class PageAvailabilitiesComponent {
  selectedEvent: CalendarEvent;

  constructor() {}

}
