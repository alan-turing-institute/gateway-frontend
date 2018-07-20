import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './layout/main.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { EnsureAuthenticated } from './auth/ensure-authenticated.service';
import { LoginRedirect } from './auth/login-redirect.service';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
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
    LoginRedirect,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
