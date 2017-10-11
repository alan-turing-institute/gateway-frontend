import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./layout.css']
})
export class FullLayoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  onLogout(){
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
