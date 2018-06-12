import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class EnsureAuthenticated implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}


  canLoad(): boolean {

    // TODO refactor to shared token fetching function/service

    console.log("checking with canLoad");

    if (localStorage.getItem('token')) {
      console.log('Found token: \n'+localStorage.getItem('token'));
      return true;
    }
    else {
      console.log('Could not find token');
      console.log("Not permitted, redirecting...");
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  canActivate(): boolean {

    console.log("checking with canActivate");

    if (localStorage.getItem('token')) {
      console.log('Found token: \n'+localStorage.getItem('token'));
      return true;
    }
    else {
      console.log('Could not find token');
      console.log("Not permitted, redirecting...");
      this.router.navigateByUrl('/login');
      return false;
    }
  }



}
