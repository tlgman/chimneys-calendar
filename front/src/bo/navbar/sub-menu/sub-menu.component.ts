import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  @Input('link') link: string = '';
  @Input('activeLinkOptionExact') activeLinkOptionExact: boolean = false;
  @Input() childs: Array<{title: string, link: string}> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
