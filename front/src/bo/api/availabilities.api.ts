import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parseISO } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Availability, JsonAvailability } from '../models/availability.model';

export type AvaialbilitiesWeekParams = {
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvailabilitiesApi {
  readonly baseUrl = environment.serverUrl + environment.api.availabilities.base;
  readonly weekUrl = this.baseUrl + environment.api.availabilities.week;

  constructor(private readonly http: HttpClient) {}


  getAll$(): Observable<Availability[]> {
    return this.http.get<JsonAvailability[]>(this.baseUrl).pipe(
      // Convert JsonAvailabilities to Availabilities
      map<JsonAvailability[], Availability[]>(jsonAvailabilities => {
        return jsonAvailabilities.map(({id, start, end, zoneId}) => ({
          id,
          start: parseISO(start),
          end: parseISO(end),
          zoneId
        }));
      })
    );
  }
  /**
   * Post all availities for a week
   * @param availabilities
   * @param start of week
   * @param end of week
   * @returns 
   */
  postWeek$(availabilities: Availability[], start: string, end: string) {
    console.log(availabilities);
    return this.http.post(this.weekUrl, {
      start,
      end,
      availabilities
    });
  }
}