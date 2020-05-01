import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { BoRoutingModule } from './bo-routing.module';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubMenuComponent } from './navbar/sub-menu/sub-menu.component';
import { PageZonesComponent } from './pages/page-zones/page-zones.component';
import {MapModule} from "../map/map.module";
import { PageCalendarComponent } from './pages/page-calendar/page-calendar.component';
import { CalendarModule } from '../calendar/calendar.module';


// import * as moment from 'moment/moment.js';
//
// export function momentAdapterFactory() {
//   return adapterFactory(moment);
// }


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    SubMenuComponent,
    PageZonesComponent,
    PageCalendarComponent,
  ],
  imports: [
    CommonModule,
    BoRoutingModule,
    MapModule,
    CalendarModule
  ]
})
export class BoModule { }
