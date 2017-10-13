import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { MainComponent } from './layout/main.component'
// import { CasesModule } from './cases/cases.module'

@NgModule({
  imports: [
    BrowserModule, 
    RouterModule,
    HttpModule,
    JsonpModule,
    // CasesModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    MainComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
