import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class EnsureAuthenticated implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}
  canLoad(): boolean {

    console.log("checking with canLoad");

    if (localStorage.getItem('token')) {
      console.log('Found token');
      console.log(localStorage.getItem('token'));
      console.log("canLoad");
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
