import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BoModule} from "./dashboard/bo.module";
import { HomeComponent } from './home/home.component';
import {MapModule} from "./map/map.module";
import {RdvTakerComponent} from './components/rdv-taker/rdv-taker.component';
import {InputTextModule as PrimeInputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RdvTakerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BoModule,
    MapModule,
    PrimeInputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
