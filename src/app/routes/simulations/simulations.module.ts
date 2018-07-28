import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from './simulations-routing.module';

import { ComponentsModule } from './components';

import { CreatePageComponent } from './containers/create-page.component';
import { ViewPageComponent } from './containers/view-page.component';

import { ConfigureCasePageComponent } from './containers/configure-case-page.component';
import { SelectedCasePageComponent } from './containers/selected-case-page.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CaseSummaryEffects } from './state/case-summary.effects';
import { CaseEffects } from './state/case.effects';

import { reducers } from './state';

const PAGECOMPONENTS = [
  CreatePageComponent,
  ViewPageComponent,
  ConfigureCasePageComponent,
  SelectedCasePageComponent,
];

@NgModule({
  imports: [
    SharedModule,
    SimulationsRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('cases', reducers), // TODO check setting
    EffectsModule.forFeature([CaseSummaryEffects, CaseEffects]),
  ],
  declarations: [...PAGECOMPONENTS],
})
export class SimulationsModule {}
