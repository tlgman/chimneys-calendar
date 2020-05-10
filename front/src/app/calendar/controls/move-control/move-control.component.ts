import {Component, Input, OnInit} from '@angular/core';
import {CalendarComponent} from "../../calendar.component";

@Component({
  selector: 'calendar-move-control',
  templateUrl: './move-control.component.html'
})
export class MoveControlComponent implements OnInit {
  @Input('calendar') calendar: CalendarComponent;
  date: Date;

  constructor() { }

  ngOnInit(): void {
    this.date = this.calendar.viewDate;
  }

  dateChange(date: Date) {
    // closeOpenMonthViewDay => To fix day open when month or week change
    this.calendar.closeOpenMonthViewDay();
    this.calendar.changeDate(date);
  }

  setToDay() {
    this.dateChange(new Date());
  }
}
