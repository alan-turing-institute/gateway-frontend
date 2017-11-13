import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layout/main.component';
import { CasesModule } from './cases/cases.module';
// import { LoginLayoutComponent } from './layouts/login-layout.component';

import { LoginComponent } from './login/login.component';

import { EnsureAuthenticated } from './auth/ensure-authenticated.service';
import { LoginRedirect } from './auth/login-redirect.service';

// import { AppComponent } from './app.component';
// import { AccountModule } from './account/account.module';

// import { ConfigModule } from './config/config.module';


export const routes: Routes = [
    {
      path: '',
      component: MainComponent,
      data: {title: 'Home'},
      canActivate: [ EnsureAuthenticated ],
      children: [
        {
          path: 'account',
          loadChildren: './account/account.module#AccountModule',
          canLoad: [ EnsureAuthenticated ]
        },
        {
          path: 'cases',
          loadChildren: './cases/cases.module#CasesModule',
          canLoad: [ EnsureAuthenticated ]
        },
        {
          path: 'dashboard',
          loadChildren: './dashboard/dashboard.module#DashboardModule',
          canLoad: [ EnsureAuthenticated ]
        },
        {
          path: 'output',
          loadChildren: './output/output.module#OutputModule',
          canLoad: [ EnsureAuthenticated ]
        },
        {
          path: 'config',
          loadChildren: './config/config.module#ConfigModule',
          canLoad: [ EnsureAuthenticated ]
        }
      ]
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: '**', redirectTo: ''
    }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:false})],
  // exports: [ RouterModule ]
})
export class AppRoutingModule { }
