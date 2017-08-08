import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';

import { DashboardComponent } from './dashboard.component';
import { JobSummaryComponent } from './jobSummary.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
  ],
  declarations: [
    DashboardComponent,
    JobSummaryComponent
  ],
  providers: [
    DashboardService
  ],
  exports : [JobSummaryComponent]
})
export class DashboardModule { }
