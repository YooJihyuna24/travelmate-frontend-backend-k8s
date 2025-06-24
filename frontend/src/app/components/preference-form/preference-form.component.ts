import { Component, EventEmitter, Output } from '@angular/core';
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
  pref: Preference = { temperature: 'warm', duration: 1, budget: 'low' };
  @Output() submitted = new EventEmitter<Preference>();

  onSubmit() {
    this.submitted.emit(this.pref);
  }
}
