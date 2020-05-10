import { NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import {CalendarModule as AngularCalendar, DateAdapter} from "angular-calendar";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MoveControlComponent } from './controls/move-control/move-control.component';
import { ModeControlComponent } from './controls/mode-control/mode-control.component';
import { SelectedDateComponent } from './selected-date/selected-date.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    CalendarComponent,
    MoveControlComponent,
    ModeControlComponent,
    SelectedDateComponent
  ],
  imports: [
    CommonModule,
    AngularCalendar.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  exports: [
    CalendarComponent,
    ModeControlComponent,
    MoveControlComponent,
    SelectedDateComponent
  ]
})
export class CalendarModule { }
