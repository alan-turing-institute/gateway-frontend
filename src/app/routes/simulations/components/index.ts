import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from '../simulations-routing.module';

import { CaseSummaryListComponent } from './case-summary-list-component';
import { JobSummaryListComponent } from './job-summary-list-component';

import { SimulationComponent } from './simulation.component';
import { JobOutputComponent } from './job-output.component';
import { FieldComponent } from './field.component';
import { SpecComponent } from './spec.component';

export const COMPONENTS = [
  CaseSummaryListComponent,
  JobSummaryListComponent,
  SimulationComponent,
  JobOutputComponent,
  FieldComponent,
  SpecComponent,
];

@NgModule({
  imports: [SimulationsRoutingModule, SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
