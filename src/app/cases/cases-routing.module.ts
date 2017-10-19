import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasesComponent } from './cases.component';

const casesRoutes: Routes = [
  {
    path: '',
    component: CasesComponent,
    data: {
      title: 'Cases'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(casesRoutes)],
  exports: [RouterModule]
})
export class CasesRoutingModule {}
