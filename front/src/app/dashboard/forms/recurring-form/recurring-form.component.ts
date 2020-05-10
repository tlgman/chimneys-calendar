import { Component, OnInit } from '@angular/core';

type Day = {value: string, locale: string, selected: boolean};

@Component({
  selector: 'app-recurring-form',
  templateUrl: './recurring-form.component.html',
  styleUrls: ['./recurring-form.component.scss']
})

export class RecurringFormComponent implements OnInit {
  days: Day[] = [
    {value: 'monday', locale: 'Lun', selected: false},
    {value: 'tuesday', locale: 'Mar', selected: false},
    {value: 'wednesday', locale: 'Mer', selected: false},
    {value: 'thursday', locale: 'Jeu', selected: false},
    {value: 'friday', locale: 'Ven', selected: false},
    {value: 'saturday', locale: 'Sam', selected: false},
    {value: 'sunday', locale: 'Dim', selected: false},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  chooseDay(day: Day) {
    day.selected = !day.selected;
  }

}
