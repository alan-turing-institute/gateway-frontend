import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClarityModule } from "clarity-angular";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';

import { DashboardComponent } from './dashboard.component';
import { JobSummaryComponent } from './jobSummary.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ClarityModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    JobSummaryComponent
  ],
  providers: [
    DashboardService
  ],
  exports : []
})
export class DashboardModule { }
