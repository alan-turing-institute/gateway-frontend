import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VtkComponent } from './vtk.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    VtkComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
