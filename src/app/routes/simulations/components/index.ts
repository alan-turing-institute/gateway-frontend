import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from '../simulations-routing.module';

import { CaseSummaryListComponent } from './case-summary-list-component';

import { CaseComponent } from './case.component';
import { FieldComponent } from './field.component';
import { SpecComponent } from './spec.component';
import { JobComponent } from './job.component';

export const COMPONENTS = [
  CaseSummaryListComponent,
  CaseComponent,
  FieldComponent,
  SpecComponent,
  JobComponent,
];

@NgModule({
  imports: [SimulationsRoutingModule, SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
