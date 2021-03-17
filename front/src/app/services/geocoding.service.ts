import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  readonly url = 'https://api-adresse.data.gouv.fr/search/';

  constructor(private http: HttpClient) {}

  /**
   * Search
   * @param {string} search
   * @returns {Observable<Object>}
   */
  search$(search: string): Observable<any> {
    const params = new HttpParams()
      .append('q', search)
      .append('limit', '' + environment.rdvTaker.limitSearchResult)
      .append('type', 'housenumber')
      .append('lat', '' + environment.rdvTaker.priorityCoordinate.lat)
      .append('lon', '' + environment.rdvTaker.priorityCoordinate.lon);
    return this.http.get<any>(`${this.url}?${params.toString()}`);
  }
}
