import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';

import { InputTextModule as PrimeInputTextModule } from 'primeng/inputtext';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
import { StepsModule as PrimeStepsModule } from 'primeng/steps';
import { ChipModule as PrimeChipModule } from 'primeng/chip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoModule } from '../bo/bo.module';
import { HomeComponent } from './pages/home/home.component';
import { MapModule } from '../map/map.module';
import { RdvTakerComponent } from './components/rdv-taker/rdv-taker.component';
import { HeaderComponent } from './components/header/header.component';
import { TakeRdvComponent } from './pages/take-rdv/take-rdv.component';
import { ContainerComponent } from './pages/container/container.component';
import { SlotsChooserComponent } from './components/slots-chooser/slots-chooser.component';

import { fr } from 'date-fns/locale';

const frenchDateConfig = new DateFnsConfigurationService();
frenchDateConfig.setLocale(fr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RdvTakerComponent,
    HeaderComponent,
    TakeRdvComponent,
    ContainerComponent,
    SlotsChooserComponent
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
    PrimeStepsModule,
    PrimeChipModule,
    DateFnsModule.forRoot()
  ],
  providers: [
    { provide: DateFnsConfigurationService, useValue: frenchDateConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
