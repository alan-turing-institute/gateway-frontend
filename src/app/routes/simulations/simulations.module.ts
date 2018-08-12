import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { SimulationsRoutingModule } from './simulations-routing.module';

import { ComponentsModule } from './components';

import { CreateComponent } from './pages/create.component';
import { ViewComponent } from './pages/view.component';
import { CreateSimulationComponent } from './pages/create-simulation.component';
import { ConfigureSimulationComponent } from './pages/configure-simulation.component';

import { SimulationService } from './services/simulation.service';

const PAGECOMPONENTS = [
  CreateComponent,
  ViewComponent,
  CreateSimulationComponent,
  ConfigureSimulationComponent,
];

@NgModule({
  imports: [SharedModule, SimulationsRoutingModule, ComponentsModule],
  providers: [SimulationService],
  declarations: [...PAGECOMPONENTS],
})
export class SimulationsModule {}
