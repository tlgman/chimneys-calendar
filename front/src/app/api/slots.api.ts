import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JsonSlot } from '../models/slot';

@Injectable({
  providedIn: 'root'
})
export default class SlotsApi {
  protected api = environment.serverUrl + environment.api.availabilities.availablesSlots;

  constructor(private http: HttpClient) { }

  getAvailableSlots(coordinate: Coordinate, start: string, end: string): Observable<JsonSlot[]> {
    const params = new HttpParams()
      .append('lon', '' + coordinate[0])
      .append('lat', '' + coordinate[1])
      .append('start', start)
      .append('end', end);
    return this.http.get<JsonSlot[]>(this.api, { params });
  }
}
