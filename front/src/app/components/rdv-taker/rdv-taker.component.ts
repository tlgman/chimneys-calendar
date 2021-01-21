import { Component, OnInit } from '@angular/core';
import {GeocodingService} from '../../services/geocoding.service';

@Component({
  selector: 'app-rdv-taker',
  templateUrl: './rdv-taker.component.html',
  styleUrls: ['./rdv-taker.component.scss']
})
export class RdvTakerComponent {

  constructor(private geocoder: GeocodingService) { }

  onSearchAddressChange(event: Event) {
    const search = (event.target as HTMLInputElement).value;
    if(search.length > 1) {
      this.geocoder.search$(search).subscribe((result) => {
        console.log((result as {features: Array<any>}).features.length)
        console.log((result as {features: Array<any>}).features[0]);
      })
    }

  }

}
