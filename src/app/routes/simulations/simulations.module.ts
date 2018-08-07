import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from './simulations-routing.module';

import { ComponentsModule } from './components';

import { CreatePageComponent } from './pages/create-page.component';
import { ViewPageComponent } from './pages/view-page.component';
import { CreateSimulationPageComponent } from './pages/create-simulation-page.component';
import { ConfigureSimulationPageComponent } from './pages/configure-simulation-page.component';

import { CaseService } from './services/case.service';

const PAGECOMPONENTS = [
  CreatePageComponent,
  ViewPageComponent,
  CreateSimulationPageComponent,
  ConfigureSimulationPageComponent,
];

@NgModule({
  imports: [SharedModule, SimulationsRoutingModule, ComponentsModule],
  providers: [CaseService],
  declarations: [...PAGECOMPONENTS],
})
export class SimulationsModule {}
