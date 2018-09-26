import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// guard
import { ACLGuard } from '@delon/acl';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// overview pages
import { OverviewComponent } from './overview/overview.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: '/passport/login', pathMatch: 'full' },
      {
        path: 'overview',
        component: OverviewComponent,
        // canActivate: [ACLGuard],
        data: { title: 'Overview', guard: 'user' },
      },
      {
        path: 'simulations',
        loadChildren: './simulations/simulations.module#SimulationsModule',
        // canActivate: [ACLGuard],
        // data: { guard: 'user' },
      },
    ],
    // canActivate: [ACLGuard],
    // canActivateChild: [ACLGuard],
    data: { guard: 'user' },
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: 'Sign in' },
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: 'Register' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: 'Registration result' },
      },
    ],
  },
  { path: 'callback/:type', component: CallbackComponent },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: '/passport/login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
