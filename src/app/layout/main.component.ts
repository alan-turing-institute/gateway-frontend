import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.css'],
})

export class MainComponent {
  constructor(private router: Router, private auth: AuthService) {}

  logout() {
    console.log("logging out")

    const token = localStorage.getItem('token');
    if (token) {
      console.log("checking token");
      console.log(token);

      console.log("removing token from local storage")
      localStorage.removeItem('token');

      console.log("logging out")
      this.auth.logout(token)
      .then((response) => {
        console.log(response.json());
        console.log("Taking you to /login")
        this.router.navigateByUrl('/login');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

}
