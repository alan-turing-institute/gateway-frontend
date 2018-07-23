import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulationsCreateComponent } from './containers/create-page.component';
import { SimulationsViewComponent } from './containers/view-page.component';
import { SimulationsConfigureComponent } from './containers/configure-page.component';

const routes: Routes = [

  { path: 'create', component: SimulationsCreateComponent },
  { path: 'view', component: SimulationsViewComponent },
  { path: 'configure', component: SimulationsConfigureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationsRoutingModule { }
