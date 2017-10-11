import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './layout/main.component'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
  ],
  declarations: [
    AppComponent,
    MainComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
