import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './pages/create.component';
import { ViewComponent } from './pages/view.component';

import { CreateSimulationComponent } from './pages/create-simulation.component';
import { ConfigureSimulationComponent } from './pages/configure-simulation.component';
import { ViewSimulationComponent } from './pages/view-simulation.component';
import { RedirectComponent } from './pages/redirect.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'view', component: ViewComponent },
  {
    path: 'create/:id',
    component: CreateSimulationComponent,
    data: { title: 'Create' },
  },
  {
    path: ':id',
    component: RedirectComponent,
    data: { title: 'Simulation' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulationsRoutingModule {}
