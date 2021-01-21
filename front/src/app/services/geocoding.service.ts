import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


const LIMIT_SEARCH_RESULTS = 5;

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  readonly url = 'https://api-adresse.data.gouv.fr/search/';

  constructor(private http: HttpClient) {}

  search$(search: string): Observable<Object> {
    const params = new HttpParams()
      .append('q', search)
      .append('limit', ''+LIMIT_SEARCH_RESULTS)
      .append('type', 'housenumber');
    return this.http.get<Object>(`${this.url}?${params.toString()}`);
  }
}
