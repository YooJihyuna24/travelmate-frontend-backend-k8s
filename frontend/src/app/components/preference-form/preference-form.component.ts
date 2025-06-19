import { Component, EventEmitter, Output } from '@angular/core';
import { Preference } from '../../models/preference';

@Component({
  selector: 'app-preference-form',
  templateUrl: './preference-form.component.html',
  styleUrls: ['./preference-form.component.scss']
})
export class PreferenceFormComponent {
  pref: Preference = { temperature: 'warm', duration: 1, budget: 'low' };
  @Output() submitted = new EventEmitter<Preference>();
  onSubmit() {
    this.submitted.emit(this.pref);
  }
}
