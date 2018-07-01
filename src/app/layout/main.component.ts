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
      
      this.auth.logout(token)
      .then((response) => {
        this.router.navigateByUrl('/login');
        console.log("removing token from local storage")
        localStorage.removeItem('token');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

}
