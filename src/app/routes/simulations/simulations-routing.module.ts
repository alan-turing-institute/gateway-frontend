import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulationsCreateComponent } from './components/create.component';
import { SimulationsViewComponent } from './components/view.component';
import { SimulationsConfigureComponent } from './components/configure.component';

const routes: Routes = [

  { path: 'create', component: SimulationsCreateComponent },
  { path: 'view', component: SimulationsViewComponent },
  { path: 'configure', component: SimulationsConfigureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationsRoutingModule { }
