import { NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import {CalendarModule as AngularCalendar, DateAdapter} from "angular-calendar";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

registerLocaleData(localeFr);

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    AngularCalendar.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
