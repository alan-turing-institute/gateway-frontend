import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssembleComponent } from './assemble.component';

const routes: Routes = [
  {
    path: '',
    component: AssembleComponent,
    data: {
      title: 'Assemble'
    },
    //children: [
      // {
      //   path: 'changeover',
      //   component: ChangeoverComponent,
      //   data: {
      //     title: 'Changeover'
      //   }
      // },
    //]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssembleRoutingModule {}