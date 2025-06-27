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
  registerUser(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.userApiBaseUrl}/users/register`, { username, password });
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.userApiBaseUrl}/users/login`, { username, password });
  }

  getUserPlaces(username: string): Observable<any> {
    return this.http.get(`${environment.userApiBaseUrl}/users/${username}/places`);
  }

  saveUserPlaces(username: string, places: string[]): Observable<any> {
    return this.http.post(`${environment.userApiBaseUrl}/users/${username}/places`, { places });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${environment.userApiBaseUrl}/users`);
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

