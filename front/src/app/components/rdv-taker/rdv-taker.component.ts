import {Component, OnInit, ViewChild} from '@angular/core';
import {GeocodingService} from '../../services/geocoding.service';
import {SearchedAddress} from '../../models/address';
import {MapComponent} from '../../../map/map.component';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'app-rdv-taker',
  templateUrl: './rdv-taker.component.html',
  styleUrls: ['./rdv-taker.component.scss']
})
export class RdvTakerComponent {
  availableAddresses: SearchedAddress[];
  chosenAddress: SearchedAddress;
  chosenAddressLabel: string;
  selectedAddress: SearchedAddress;
  selectedCoordinate: Coordinate;

  @ViewChild('map') map: MapComponent;

  constructor(private geocoder: GeocodingService) { }

  onSearchAddressChange(search: string) {
    if(search.length > 1) {
      this.geocoder.search$(search).subscribe((result: {features: Array<SearchedAddress>}) => {
        console.log(result.features.length);
        console.log(result.features[0]);
        this.availableAddresses = result.features;
      })
    }
  }

  selectAddress() {
    this.selectedAddress = this.chosenAddress;
    setTimeout(() => this.map.addMarker(this.chosenAddress.geometry.coordinates));
    this.selectedCoordinate = this.chosenAddress.geometry.coordinates;
  }
}
