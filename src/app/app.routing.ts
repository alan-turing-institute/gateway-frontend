import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { CasesModule } from './cases/cases.module';
// import { AssembleModule } from './cases/assemble/assemble.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
      },
      {
        path: 'cases',
        loadChildren: './cases/cases.module#CasesModule'
      },
      {
        path: 'output',
        loadChildren: './output/output.module#OutputModule'
      }
      // {
      //   path: 'assemble',
      //   loadChildren: './cases/assemble/assemble.module#AssembleModule'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // exports: [ RouterModule ]
})
export class AppRoutingModule { }
