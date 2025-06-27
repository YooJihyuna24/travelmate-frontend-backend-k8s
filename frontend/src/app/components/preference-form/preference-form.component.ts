import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Preference } from '../../models/preference';

@Component({
  selector: 'app-preference-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preference-form.component.html'
})
export class PreferenceFormComponent {
  preference: Preference = {
    temperature: 'warm',
    duration: 7,
    budget: 'medium'
  };

  @Output() preferenceSubmitted = new EventEmitter<Preference>();

  submitForm() {
    this.preferenceSubmitted.emit(this.preference);
  }
}
