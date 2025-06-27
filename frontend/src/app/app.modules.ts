import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
// <- importiere hier ggf. weitere Komponenten

@NgModule({
  declarations: [
    AppComponent,
    // hier weitere Komponenten eintragen, z. B. UserComponent, MainComponent, etc.
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // ggf. weitere Module wie AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // <- das ist meist die Hauptkomponente
})
export class AppModule { }