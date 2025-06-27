import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Preference } from '../models/preference';
import { Destination } from '../models/destination';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) {}

  getRecommendations(): Observable<any> {
    return this.http.get(`${environment.recommenderApiBaseUrl}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${environment.userApiBaseUrl}`);
  }

  // NEU: Post Recommendations mit User-Preferences
  postRecommendations(pref: Preference): Observable<Destination[]> {
    return this.http.post<{ recommendations: Destination[] }>(
      `${environment.recommenderApiBaseUrl}/recommendations`,
      pref
    ).pipe(map(response => response.recommendations));
  }
}
