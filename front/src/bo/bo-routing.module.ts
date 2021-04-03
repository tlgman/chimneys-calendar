import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoComponent} from "./bo.component";
import {PageZonesComponent} from "./pages/page-zones/page-zones.component";
import {PageCalendarComponent} from "./pages/page-calendar/page-calendar.component";
import {PageCreateZoneComponent} from "./pages/page-create-zone/page-create-zone.component";
import {PageAvailabilitiesComponent} from './pages/page-availabilities/page-availabilities.component';

const routes: Routes = [
  {path: '', component: BoComponent, children: [
    {path: 'zones', component: PageZonesComponent},
    {path: 'zones/create', component: PageCreateZoneComponent},
    {path: 'calendar', component: PageCalendarComponent},
    {path: 'availabilities', component: PageAvailabilitiesComponent}
  ]},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class BoRoutingModule { }
