import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeoverComponent } from './changeover.component';

// Components Routing
import { CasesRoutingModule } from './cases-routing.module';

import { FormsModule } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import { ParametersComponent } from './parameters/parameters.component';
import { AssembleComponent } from './assemble/assemble.component';
import { BannerComponent } from './banner/banner.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { JobDataService } from './assemble/jobData.service';

@NgModule({
  imports: [
    CommonModule,
    CasesRoutingModule,
    FormsModule,
    IonRangeSliderModule
  ],
  declarations: [
    ChangeoverComponent,
    ParametersComponent,
    AssembleComponent,
    BannerComponent,
    FeedbackComponent
  ],
  providers: [
    JobDataService
  ]
})
export class CasesModule { }
