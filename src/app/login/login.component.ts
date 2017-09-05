import { Component } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(private router:Router) { }

    login(){
      console.log('you are logged in')
      this.router.navigate(['../../dashboard/'])
    }
}
