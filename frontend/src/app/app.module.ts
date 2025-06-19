// src/app/app.module.ts
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }      from '@angular/forms';

// Stand-alone Components importieren
import { AppComponent }                from './app.component';
import { PreferenceFormComponent }     from './components/preference-form/preference-form.component';
import { DestinationCardComponent }    from './components/destination-card/destination-card.component';
import { DestinationListComponent }    from './components/destination-list/destination-list.component';

@NgModule({
  // Deklarationen leer lassen, wir importieren alles
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    // hier rein statt in `declarations`
    AppComponent,
    PreferenceFormComponent,
    DestinationCardComponent,
    DestinationListComponent,
  ],
  // Stand-alone root component muss hier zum Bootstrap rein
  bootstrap: [AppComponent]
})
export class AppModule { }
