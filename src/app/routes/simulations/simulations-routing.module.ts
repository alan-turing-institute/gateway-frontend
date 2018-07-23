import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePageComponent } from './containers/create-page.component';
import { ViewPageComponent } from './containers/view-page.component';
import { ConfigurePageComponent } from './containers/configure-page.component';

const routes: Routes = [

  { path: 'create', component: CreatePageComponent },
  { path: 'view', component: ViewPageComponent },
  { path: 'configure/:id', component: ConfigurePageComponent, data: { title: 'Configure' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationsRoutingModule { }
