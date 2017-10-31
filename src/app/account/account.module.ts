import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { ClarityModule } from "clarity-angular";

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [
    AccountRoutingModule,
    ClarityModule.forRoot(),
    NgxChartsModule,
  ],
  declarations: [AccountComponent, ChartComponent]
})
export class AccountModule { }
