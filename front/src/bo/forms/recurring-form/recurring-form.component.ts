import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { format } from 'date-fns';

export enum DayValue {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6
}

type Day = { value: DayValue, locale: string, selected: boolean };


/**
 * Component displaying list of days of the week
 * Emit events after selection or deselection of a day
 */
@Component({
  selector: 'app-recurring-form',
  templateUrl: './recurring-form.component.html',
  styleUrls: ['./recurring-form.component.scss']
})

export class RecurringFormComponent implements OnInit {
  @Output('selectedDay') selectedDay: EventEmitter<DayValue> = new EventEmitter<DayValue>();
  @Output('unselectedDay') unselectedDay: EventEmitter<DayValue> = new EventEmitter<DayValue>();
  @Output('startHourChange') startHourChange: EventEmitter<string> = new EventEmitter<string>();
  @Output('endHourChange') endHourChange: EventEmitter<string> = new EventEmitter<string>();
  @Input('startHour') startHour: string;
  @Input('endHour') endHour: string;

  days: Day[] = [
    { value: DayValue.MONDAY, locale: 'Lun', selected: false },
    { value: DayValue.TUESDAY, locale: 'Mar', selected: false },
    { value: DayValue.WEDNESDAY, locale: 'Mer', selected: false },
    { value: DayValue.THURSDAY, locale: 'Jeu', selected: false },
    { value: DayValue.FRIDAY, locale: 'Ven', selected: false },
    { value: DayValue.SATURDAY, locale: 'Sam', selected: false },
    { value: DayValue.SUNDAY, locale: 'Dim', selected: false },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  clickDay(day: Day) {
    day.selected = !day.selected;
    if (day.selected) {
      this.selectedDay.emit(day.value);
    } else {
      this.unselectedDay.emit(day.value);
    }
  }

  selectDay(dayValue: DayValue) {
    this.daySelection(dayValue, true);
  }

  unselectDay(dayValue: DayValue) {
    this.daySelection(dayValue, false);
  }

  onStartHourChange(event: Event) {
    this.startHour = (event.target as HTMLInputElement).value;
    this.startHourChange.emit(this.startHour);
  }

  onEndHourChange(event: Event) {
    this.endHour = (event.target as HTMLInputElement).value;
    this.endHourChange.emit(this.endHour);
  }

  private daySelection(dayValue: DayValue, selection: boolean) {
    const day = this.days.find(day => day.value === dayValue);
    if (day) {
      day.selected = selection;
    }
  }

  setHoursMinutesFromDates(start: Date, end: Date) {
    this.startHour = format(start, 'hh:mm');
    this.endHour = format(end, 'hh:mm');
  }

}
