import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {PageZonesComponent} from "./pages/page-zones/page-zones.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: 'zones', component: PageZonesComponent}
  ]},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class BoRoutingModule { }
