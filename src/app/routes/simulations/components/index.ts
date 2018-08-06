import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from '../simulations-routing.module';

import { CaseSummaryListComponent } from './case-summary-list-component';
import { CaseConfigureComponent } from './case-configure.component';

export const COMPONENTS = [CaseSummaryListComponent, CaseConfigureComponent];

@NgModule({
  imports: [SimulationsRoutingModule, SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
