import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, JsonpModule } from '@angular/http';

import { ClarityModule } from "clarity-angular";

import { MainComponent } from './layout/main.component'
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth/auth.service';
import { FormsModule } from '@angular/forms';

import { EnsureAuthenticated } from './auth/ensure-authenticated.service';
import { LoginRedirect } from './auth/login-redirect.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ClarityModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
    EnsureAuthenticated,
    LoginRedirect
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }