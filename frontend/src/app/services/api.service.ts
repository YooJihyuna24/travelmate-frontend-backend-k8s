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

  // *** User-Service Endpunkte ***
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.userApiBaseUrl}/users/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.userApiBaseUrl}/users/login`, { username, password });
  }

  getPlaces(username: string): Observable<any> {
    return this.http.get(`${environment.userApiBaseUrl}/users/${username}/places`);
  }

  savePlaces(username: string, places: string[]): Observable<any> {
    return this.http.post(`${environment.userApiBaseUrl}/users/${username}/places`, { places });
  }

  // Recommendation service methods
  getRecommendations(): Observable<any> {
    return this.http.get(`${environment.recommenderApiBaseUrl}/recommendations`);
  }

  postRecommendations(pref: Preference): Observable<Destination[]> {
    return this.http
      .post<{ recommendations: Destination[] }>(
        `${environment.recommenderApiBaseUrl}/recommendations`,
        pref
      )
      .pipe(map(response => response.recommendations));
  }
}

