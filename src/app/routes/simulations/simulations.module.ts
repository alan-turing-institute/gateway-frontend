import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from './simulations-routing.module';

import { ComponentsModule } from './components';

import { CreatePageComponent } from './pages/create-page.component';
import { ViewPageComponent } from './pages/view-page.component';
import { ConfigureCasePageComponent } from './pages/configure-case-page.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CaseSummaryEffects } from './state/case-summary.effects';
import { CaseEffects } from './state/case.effects';

import { reducers } from './state';

import { CaseService } from './services/case.service';

const PAGECOMPONENTS = [
  CreatePageComponent,
  ViewPageComponent,
  ConfigureCasePageComponent,
];

@NgModule({
  imports: [
    SharedModule,
    SimulationsRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('cases', reducers), // TODO check setting
    EffectsModule.forFeature([CaseSummaryEffects, CaseEffects]),
  ],
  providers: [CaseService],
  declarations: [...PAGECOMPONENTS],
})
export class SimulationsModule {}
