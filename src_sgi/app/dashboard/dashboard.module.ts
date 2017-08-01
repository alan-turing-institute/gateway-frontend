import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
