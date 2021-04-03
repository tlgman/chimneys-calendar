import {Component, Input, OnInit} from '@angular/core';
import {CalendarComponent} from "../../calendar.component";
import {CalendarView} from "angular-calendar";

@Component({
  selector: 'calendar-mode-control',
  templateUrl: './mode-control.component.html',
  styleUrls: ['./mode-control.component.scss']
})
export class ModeControlComponent {
  @Input('calendar') calendar: CalendarComponent;
  CalendarView = CalendarView;

  constructor() { }

  changeView(view: CalendarView) {
    this.calendar.changeView(view);
  }
}
