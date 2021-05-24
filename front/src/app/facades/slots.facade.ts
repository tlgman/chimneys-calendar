import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import SlotsApi from '../api/slots.api';
import { JsonSlot, Slot } from '../models/slot';


@Injectable({
  providedIn: 'root'
})
export class SlotsFacade {

  constructor(private api: SlotsApi) {}

  getAvailableSlots(coordinates: Coordinate): Observable<Slot[]> {
    return this.api.getAvailableSlots(coordinates).pipe(
      map<JsonSlot[], Slot[]>(slots => {
        return slots.map(slot =>  {
          return {
            start: new Date(slot.start),
            end: new Date(slot.end)
          }
        })
      })
    )
  }
}