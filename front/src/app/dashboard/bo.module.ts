import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

import { BoRoutingModule } from './bo-routing.module';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubMenuComponent } from './navbar/sub-menu/sub-menu.component';
import { PageZonesComponent } from './pages/page-zones/page-zones.component';


@NgModule({
  declarations: [DashboardComponent, HeaderComponent, NavbarComponent, SubMenuComponent, PageZonesComponent],
  imports: [
    BoRoutingModule
  ]
})
export class BoModule { }
