import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { Coordinate } from 'ol/coordinate';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import SlotsApi from '../api/slots.api';
import { JsonSlot, Slot } from '../models/slot';


@Injectable({
  providedIn: 'root'
})
/**
 * To manage slots from server
 */
export class SlotsFacade {

  constructor(private api: SlotsApi) { }

  getAvailableSlots(coordinates: Coordinate, start: Date, end: Date): Observable<Slot[]> {
    return this.api.getAvailableSlots(coordinates, format(start, 'dd/MM/yyyy'), format(end, 'dd/MM/yyyy')).pipe(
      map<JsonSlot[], Slot[]>(slots => {
        return slots.map(slot => {
          return {
            start: new Date(slot.start),
            end: new Date(slot.end)
          }
        })
      })
    )
  }
}
