import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';


import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

import { AppRoutingModule } from './app.routing';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { Routes, RouterModule } from '@angular/router';
import { AccountModule } from './account/account.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    HttpModule,
    JsonpModule,
    FormsModule,
    IonRangeSliderModule,
    RouterModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
  ],
  providers: [{
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [ AppComponent ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // exports:[RouterModule]
})
export class AppModule { }
