import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreferenceFormComponent } from './components/preference-form/preference-form.component';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { DestinationCardComponent } from './components/destination-card/destination-card.component';
import { Preference } from './models/preference';
import { Destination } from './models/destination';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    PreferenceFormComponent,
    DestinationListComponent,
    DestinationCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  destinations: Destination[] = [];

  constructor(private apiService: ApiService) {}

  onPref(pref: Preference) {
    this.apiService.postRecommendations(pref).subscribe({
      next: (data) => {
        this.destinations = data;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Empfehlungen:', err);
      }
    });
  }
}
