import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasesComponent } from './cases.component';

const routes: Routes = [
  {
    path: '',
    component: CasesComponent,
    data: {
      title: 'Cases'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule {}
