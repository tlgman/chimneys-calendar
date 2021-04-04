import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './bo.component.html',
  styleUrls: ['./bo.component.scss']
})
export class BoComponent implements OnInit {

  constructor(private readonly messageService: MessageService) { }

  ngOnInit(): void {
  }

}
