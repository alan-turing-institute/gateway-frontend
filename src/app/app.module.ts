import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ParametersComponent } from './parameters/parameters.component';
import { AssembleComponent } from './assemble/assemble.component';
import { BannerComponent } from './banner/banner.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { JobDataService } from './assemble/jobData.service';



import { FormsModule } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";

@NgModule({
  declarations: [
    AppComponent,
    ParametersComponent,
    AssembleComponent,
    BannerComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    IonRangeSliderModule    
  ],
  providers: [JobDataService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]

})
export class AppModule { }
