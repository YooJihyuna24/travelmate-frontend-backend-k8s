import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Preference } from '../../models/preference';

@Component({
  selector: 'app-preference-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preference-form.component.html'
})

export class PreferenceFormComponent implements OnChanges{
  @Input() username!: string;
  userPlaces: string[] = [];
  placesText = '';
  message = '';
  preference: Preference = {
    temperature: 'warm',
    duration: 7,
    budget: 'medium'
  };

  @Output() preferenceSubmitted = new EventEmitter<Preference>();
  

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    // Wenn Username gesetzt wurde, lade Orte!
    if (changes['username'] && this.username) {
      this.fetchPlaces();
    }
  }

  submitForm() {
    this.preferenceSubmitted.emit(this.preference);
  }

  fetchPlaces() {
    this.apiService.getPlaces(this.username).subscribe({
      next: (res: any) => {
        this.userPlaces = res.places || [];
        this.placesText = this.userPlaces.join(',');
      },
      error: (err: any) => this.message = err.error?.error || 'Fehler beim Laden'
    });
  }

  savePlaces() {
    const placesArr = this.placesText.split(',').map(s => s.trim()).filter(Boolean);
    this.apiService.savePlaces(this.username, placesArr).subscribe({
      next: () => this.fetchPlaces(),
      error: (err: any) => this.message = err.error?.error || 'Fehler beim Speichern'
    });
  }
}