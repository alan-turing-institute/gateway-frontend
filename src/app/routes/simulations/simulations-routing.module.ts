import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePageComponent } from './pages/create-page.component';
import { ViewPageComponent } from './pages/view-page.component';

import { ConfigureCasePageComponent } from './pages/configure-case-page.component';

const routes: Routes = [
  { path: 'create', component: CreatePageComponent },
  { path: 'view', component: ViewPageComponent },
  {
    path: 'configure/:id',
    component: ConfigureCasePageComponent,
    data: { title: 'Configure' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulationsRoutingModule {}
