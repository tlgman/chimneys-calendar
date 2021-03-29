import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import {InputTextModule as PrimeInputTextModule} from 'primeng/inputtext';
import {ButtonModule as PrimeButtonModule} from 'primeng/button';
import {StepsModule as PrimeStepsModule} from 'primeng/steps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BoModule} from '../bo/bo.module';
import { HomeComponent } from './pages/home/home.component';
import {MapModule} from '../map/map.module';
import {RdvTakerComponent} from './components/rdv-taker/rdv-taker.component';
import { HeaderComponent } from './components/header/header.component';
import { TakeRdvComponent } from './pages/take-rdv/take-rdv.component';
import { ContainerComponent } from './pages/container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RdvTakerComponent,
    HeaderComponent,
    TakeRdvComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BoModule,
    MapModule,
    FormsModule,
    PrimeInputTextModule,
    PrimeButtonModule,
    PrimeStepsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
