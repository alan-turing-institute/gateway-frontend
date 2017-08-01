import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeoverComponent } from './changeover.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cases'
    },
    children: [
      {
        path: 'changeover',
        component: ChangeoverComponent,
        data: {
          title: 'Changeover'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule {}
