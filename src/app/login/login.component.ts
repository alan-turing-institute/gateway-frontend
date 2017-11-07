import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    console.log("ngOnInit() called");
  }

  onLogin(): void {
    console.log("Form submitted");
    console.log(this.user)

    this.auth.login(this.user)
    .then((user) => {
      localStorage.setItem('token', user.json().auth_token);
      this.router.navigateByUrl('/dashboard');
    })
    .catch((err) => {
      console.log(err);
    });
  }

}
