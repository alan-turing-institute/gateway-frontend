import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { CasesModule } from './cases/cases.module';
import { ConfigModule } from './config/config.module';

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
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'output',
        loadChildren: './output/output.module#OutputModule'
      },
      {
        path: 'cases',
        loadChildren: './cases/cases.module#CasesModule'
      },
      {
        path: 'config',
        loadChildren: './config/config.module#ConfigModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:true})],
  // exports: [ RouterModule ]
})
export class AppRoutingModule { }
