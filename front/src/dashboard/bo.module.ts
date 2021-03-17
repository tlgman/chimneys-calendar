import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';

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

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    SubMenuComponent,
    PageZonesComponent,
    PageCalendarComponent,
    PageCreateZoneComponent,
    RecurringFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BoRoutingModule,
    MapModule,
    CalendarModule,
    // To use date-fns in template
    DateFnsModule.forRoot()
  ]
})
export class BoModule { }
