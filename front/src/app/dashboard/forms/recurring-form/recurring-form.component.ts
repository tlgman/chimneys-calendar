import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';

export enum DayValue {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6
}

type Day = {value: DayValue, locale: string, selected: boolean};


/**
 * Composant permettant affichant la liste des jours de la semaine.
 * Emet des évènements à la sélection et la déslélection d'un jour
 */
@Component({
  selector: 'app-recurring-form',
  templateUrl: './recurring-form.component.html',
  styleUrls: ['./recurring-form.component.scss']
})

export class RecurringFormComponent implements OnInit {
  @Output('selectedDay') selectedDay: EventEmitter<DayValue> = new EventEmitter<DayValue>();
  @Output('unselectedDay') unselectedDay: EventEmitter<DayValue> = new EventEmitter<DayValue>();

  days: Day[] = [
    {value: DayValue.MONDAY, locale: 'Lun', selected: false},
    {value: DayValue.TUESDAY, locale: 'Mar', selected: false},
    {value: DayValue.WEDNESDAY, locale: 'Mer', selected: false},
    {value: DayValue.THURSDAY, locale: 'Jeu', selected: false},
    {value: DayValue.FRIDAY, locale: 'Ven', selected: false},
    {value: DayValue.SATURDAY, locale: 'Sam', selected: false},
    {value: DayValue.SUNDAY, locale: 'Dim', selected: false},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  clickDay(day: Day) {
    day.selected = !day.selected;
    if(day.selected) {
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

  private daySelection(dayValue: DayValue, selection: boolean) {
    const day = this.days.find(day => day.value === dayValue);
    if(day) {
      day.selected = selection;
    }
  }

}
