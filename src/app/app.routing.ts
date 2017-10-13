import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layout/main.component';
import { CasesModule } from './cases/cases.module';
// import { LoginLayoutComponent } from './layouts/login-layout.component';

// import { LoginComponent } from './login/login.component';

// import { AppComponent } from './app.component';
// import { AccountModule } from './account/account.module';

// import { ConfigModule } from './config/config.module';


export const routes: Routes = [
    {
      path: '',
      redirectTo: 'account',
      pathMatch: 'full'
    },
    {
      path: '',
      component: MainComponent,
      data: {
        title: 'Home'
      },
      children: [
        {
          path: 'account',
          loadChildren: './account/account.module#AccountModule'
        },
        {
          path: 'cases',
          loadChildren: './cases/cases.module#CasesModule'
        },
        
        // {
        //   path: 'dashboard',
        //   loadChildren: './dashboard/dashboard.module#DashboardModule'
        // },
        // {
        //   path: 'output',
        //   loadChildren: './output/output.module#OutputModule'
        // },
        {
          path: 'config',
          loadChildren: './config/config.module#ConfigModule'
        }
      ]
    },
    // {
    //   path: '',
    //   component: LoginLayoutComponent,
    //   children: [
    //     {
    //       path: 'login',
    //       component: LoginComponent
    //     }
    //   ]
    // },
    {
      path: '**', redirectTo: ''
    }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:true})],
  // exports: [ RouterModule ]
})
export class AppRoutingModule { }
