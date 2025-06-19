import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Preference } from './models/preference';
import { Destination } from './models/destination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent {
  // Hier sammeln wir die Rückgabe des Recommender-Services
  destinations: Destination[] = [];

  // ApiService injizieren
  constructor(private api: ApiService) {}

  // Wird aufgerufen, wenn das Preference-Form seine Daten submitted
  onPref(pref: Preference) {
    // Erst Nutzerdaten speichern (dummy / simuliert)
    this.api.savePreferences(pref).subscribe(() => {
      // Dann Empfehlungen abfragen und in destinations speichern
      this.api.getRecommendations(pref)
        .subscribe(res => this.destinations = res);
    });
  }
}
