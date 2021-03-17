import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {InputTextModule as PrimeInputTextModule} from 'primeng/inputtext';
import {ButtonModule as PrimeButtonModule} from 'primeng/button';
import {StepsModule as PrimeStepsModule} from 'primeng/steps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BoModule} from '../dashboard/bo.module';
import { HomeComponent } from './pages/home/home.component';
import {MapModule} from '../map/map.module';
import {RdvTakerComponent} from './components/rdv-taker/rdv-taker.component';
import { HeaderComponent } from './components/header/header.component';
import { TakeRdvComponent } from './pages/take-rdv/take-rdv.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RdvTakerComponent,
    HeaderComponent,
    TakeRdvComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BoModule,
    MapModule,
    PrimeInputTextModule,
    PrimeButtonModule,
    PrimeStepsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
