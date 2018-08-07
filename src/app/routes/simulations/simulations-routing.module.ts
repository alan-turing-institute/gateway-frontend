import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePageComponent } from './pages/create-page.component';
import { ViewPageComponent } from './pages/view-page.component';

import { CreateSimulationPageComponent } from './pages/create-simulation-page.component';
import { ConfigureSimulationPageComponent } from './pages/configure-simulation-page.component';

const routes: Routes = [
  { path: 'create', component: CreatePageComponent },
  { path: 'view', component: ViewPageComponent },
  {
    path: 'create/:id',
    component: CreateSimulationPageComponent,
    data: { title: 'Create' },
  },
  {
    path: 'configure/:id',
    component: ConfigureSimulationPageComponent,
    data: { title: 'Configure' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulationsRoutingModule {}
