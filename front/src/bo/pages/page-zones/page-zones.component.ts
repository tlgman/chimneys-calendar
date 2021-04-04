import {Component, OnInit, ViewChild} from '@angular/core';
import {MapComponent} from "../../../map/map.component";
import {ZoneService} from "../zone.service";
import {Zone} from '../../models/zone.model';

@Component({
  selector: 'app-page-zones',
  templateUrl: './page-zones.component.html',
  styleUrls: ['./page-zones.component.scss']
})
export class PageZonesComponent implements OnInit {
  @ViewChild('map') map: MapComponent;

  constructor(private zoneService: ZoneService) { }

  ngOnInit(): void {
    this.zoneService.fetch()
      .subscribe((zones) => {
        this.map.addZones(zones);
      },error => {
        console.log('Unable to fetch zone: ', error);
      });
  }
}
