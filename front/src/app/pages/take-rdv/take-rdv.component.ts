import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-take-rdv',
  templateUrl: './take-rdv.component.html',
  styleUrls: ['./take-rdv.component.scss']
})
export class TakeRdvComponent implements OnInit {
  currentStep: number = 0;
  steps: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.steps = [
      {label: 'Lieu'},
      {label: 'Type de prestation'},
      {label: 'Informations'}
    ];
  }

}
