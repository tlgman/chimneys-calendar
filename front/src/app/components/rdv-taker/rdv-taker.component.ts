import {Component, OnInit, ViewChild} from '@angular/core';
import {GeocodingService} from '../../services/geocoding.service';
import {SearchedAddress} from '../../models/address';
import {MapComponent} from '../../../map/map.component';

@Component({
  selector: 'app-rdv-taker',
  templateUrl: './rdv-taker.component.html',
  styleUrls: ['./rdv-taker.component.scss']
})
export class RdvTakerComponent {
  availableAddresses: SearchedAddress[];
  @ViewChild('map') map: MapComponent;

  constructor(private geocoder: GeocodingService) { }

  onSearchAddressChange(event: Event) {
    const search = (event.target as HTMLInputElement).value;
    if(search.length > 1) {
      this.geocoder.search$(search).subscribe((result: {features: Array<SearchedAddress>}) => {
        console.log(result.features.length);
        console.log(result.features[0]);
        this.availableAddresses = result.features.map((feature) => feature);
      })
    }
  }

  selectAddress(address: SearchedAddress) {
    this.map.addMarker(address.geometry.coordinates);
  }

}
