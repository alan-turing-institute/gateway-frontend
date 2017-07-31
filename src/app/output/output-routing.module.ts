import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutputComponent } from './output.component';

const routes: Routes = [
  {
    path: 'output',
    component: OutputComponent,
    data: {
      title: 'Output'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputRoutingModule {}
