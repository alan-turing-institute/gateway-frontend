import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from './simulations-routing.module';

import { ComponentsModule } from './components';
import { CreatePageComponent } from './containers/create-page.component';
import { ViewPageComponent } from './containers/view-page.component';
import { ConfigurePageComponent } from './containers/configure-page.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CaseEffects } from './reducers/case.effects';

import { reducers } from './reducers';

const PAGECOMPONENTS = [
  CreatePageComponent,
  ViewPageComponent,
  ConfigurePageComponent];

@NgModule({
  imports: [
    SharedModule,
    SimulationsRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('cases', reducers),
    EffectsModule.forFeature([CaseEffects]),
  ],
  declarations: [
    ...PAGECOMPONENTS,
  ]
})
export class SimulationsModule { }
