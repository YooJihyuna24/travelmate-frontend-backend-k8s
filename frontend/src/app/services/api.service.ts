import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preference } from '../models/preference';
import { Destination } from '../models/destination';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  savePreferences(pref: Preference): Observable<any> {
    return this.http.post(`${this.base}/users`, pref);
  }
  getRecommendations(pref: Preference): Observable<Destination[]> {
    return this.http.post<Destination[]>(`${this.base}/recommendations`, pref);
  }
}
