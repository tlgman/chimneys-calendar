import {Component, Input, OnInit} from '@angular/core';
import {CalendarComponent} from "../calendar.component";

@Component({
  selector: 'calendar-selected-date',
  templateUrl: './selected-date.component.html',
  styleUrls: ['./selected-date.component.scss']
})
export class SelectedDateComponent implements OnInit {
  @Input('calendar') calendar: CalendarComponent;
  constructor() { }

  ngOnInit(): void {}

}
