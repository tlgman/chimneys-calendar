import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailabilitiesApi } from '../api/availabilities.api';
import { Availability } from '../models/availability.model';

@Injectable({
  providedIn: 'root'
})
export class AvailabilitiesFacade {
  constructor(private api: AvailabilitiesApi) {}

  getAll$(): Observable<Availability[]> {
    return this.api.getAll$();
  }

  updateOrCreateWeek$(availabilities: Availability[], start: Date, end: Date) {
    return this.api.postWeek$(availabilities, '' + start.getTime(), '' + end.getTime())
  }
}