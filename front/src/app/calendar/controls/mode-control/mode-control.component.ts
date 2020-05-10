import {Component, Input, OnInit} from '@angular/core';
import {CalendarComponent} from "../../calendar.component";
import {CalendarView} from "angular-calendar";

@Component({
  selector: 'calendar-mode-control',
  templateUrl: './mode-control.component.html',
  styleUrls: ['./mode-control.component.scss']
})
export class ModeControlComponent implements OnInit {
  @Input('calendar') calendar: CalendarComponent;
  view: CalendarView;
  CalendarView = CalendarView;

  constructor() { }

  ngOnInit(): void {
    this.view = this.calendar.view;
  }

  changeView(view: CalendarView) {
    this.view = view;
    this.calendar.changeView(view);
  }

}
