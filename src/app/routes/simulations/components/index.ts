import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from '../simulations-routing.module';

import { CasePreviewListComponent } from './case-preview-list.component';

export const COMPONENTS = [
  CasePreviewListComponent,
];

@NgModule({
  imports: [
    SimulationsRoutingModule,
    SharedModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
