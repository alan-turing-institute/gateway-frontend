import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from '../simulations-routing.module';

import { CaseSummaryListComponent } from './case-summary-list-component';
import { CaseConfigureComponent } from './case-configure.component';

import { CaseComponent } from './case.component';
import { FieldComponent } from './field.component';

export const COMPONENTS = [
  CaseSummaryListComponent,
  CaseConfigureComponent,
  CaseComponent,
  FieldComponent,
];

@NgModule({
  imports: [SimulationsRoutingModule, SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
