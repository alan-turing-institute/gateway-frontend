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

import { CaseSummaryEffects } from './reducers/case-summary.effects';

import { reducers } from './reducers';

const PAGECOMPONENTS = [
  CreatePageComponent,
  ViewPageComponent,
  ConfigureCasePageComponent,
  SelectedCasePageComponent];

@NgModule({
  imports: [
    SharedModule,
    SimulationsRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('cases', reducers), // TODO check setting
    EffectsModule.forFeature([CaseSummaryEffects]),
  ],
  declarations: [
    ...PAGECOMPONENTS,
  ]
})
export class SimulationsModule { }
