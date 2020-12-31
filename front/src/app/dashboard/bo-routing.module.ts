import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {PageZonesComponent} from "./pages/page-zones/page-zones.component";
import {PageCalendarComponent} from "./pages/page-calendar/page-calendar.component";
import {PageCreateZoneComponent} from "./pages/page-zones/page-create-zone/page-create-zone.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: 'zones', component: PageZonesComponent},
    {path: 'zones/create', component: PageCreateZoneComponent},
    {path: 'calendar', component: PageCalendarComponent},
  ]},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class BoRoutingModule { }
