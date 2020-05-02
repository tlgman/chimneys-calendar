import { Component } from '@angular/core';

@Component({
  selector: 'app-page-create-zone',
  templateUrl: './page-create-zone.component.html',
  styleUrls: ['./page-create-zone.component.scss']
})
export class PageCreateZoneComponent {
  colorZone: string = '#000000';
  nameZone: string = '';
  constructor() { }

}
