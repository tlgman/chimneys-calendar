import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoComponent } from './bo.component';

import { CalendarModule as PrimeCalendarModule} from 'primeng/calendar';
import { DropdownModule as PrimeDropdownModule } from 'primeng/dropdown';
import {ToastModule as PrimeToastModule} from 'primeng/toast';
import {ButtonModule as PrimeButtonModule} from 'primeng/button';

import { BoRoutingModule } from './bo-routing.module';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubMenuComponent } from './navbar/sub-menu/sub-menu.component';
import { PageZonesComponent } from './pages/page-zones/page-zones.component';
import {MapModule} from "../map/map.module";
import { PageCalendarComponent } from './pages/page-calendar/page-calendar.component';
import { CalendarModule } from '../app/calendar/calendar.module';
import { PageCreateZoneComponent } from './pages/page-create-zone/page-create-zone.component';
import { RecurringFormComponent } from './forms/recurring-form/recurring-form.component';
import { DateFnsModule } from 'ngx-date-fns';
import {PageAvailabilitiesComponent} from './pages/page-availabilities/page-availabilities.component';
import {AvailabilitiesCalendarComponent} from './pages/page-availabilities/availabilities-calendar/availabilities-calendar.component';
import {AvailabilityFormComponent} from './pages/page-availabilities/availability-form/availability-form.component';
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    BoComponent,
    HeaderComponent,
    NavbarComponent,
    SubMenuComponent,
    PageZonesComponent,
    PageCalendarComponent,
    PageCreateZoneComponent,
    RecurringFormComponent,
    PageAvailabilitiesComponent,
    AvailabilitiesCalendarComponent,
    AvailabilityFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BoRoutingModule,
    MapModule,
    CalendarModule,
    // To use date-fns in template
    DateFnsModule.forRoot(),
    PrimeCalendarModule,
    PrimeDropdownModule,
    PrimeToastModule,
    PrimeButtonModule
  ],
  providers: [
    MessageService
  ]
})
export class BoModule { }
