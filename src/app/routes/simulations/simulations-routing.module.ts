import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulationsCreateComponent } from './create/create.component';
import { SimulationsViewComponent } from './view/view.component';
import { SimulationsConfigureComponent } from './configure/configure.component';

const routes: Routes = [

  { path: 'create', component: SimulationsCreateComponent },
  { path: 'view', component: SimulationsViewComponent },
  { path: 'configure', component: SimulationsConfigureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationsRoutingModule { }
