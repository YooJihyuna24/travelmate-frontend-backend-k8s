import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenceFormComponent } from './components/preference-form/preference-form.component';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { Preference } from './models/preference';
import { Destination } from './models/destination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PreferenceFormComponent, DestinationListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  destinations: Destination[] = [];

  onPref(pref: Preference) {
    this.destinations = [
      { name: 'Spain', budget: pref.budget },
      { name: 'Thailand', budget: pref.budget }
    ];
  }
}
