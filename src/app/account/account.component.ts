import { Component, OnInit } from '@angular/core';

import { CounterData } from '../types/counterData';

import { AuthService } from '../auth/auth.service';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  providers: [ AccountService ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  userData: CounterData;
  organisationData: CounterData;

  dataLoaded: boolean = false;

  errorMessage: string;

  constructor(private accountService: AccountService, private auth: AuthService) { }

  ngOnInit():void {

    this.userData = new CounterData(10.0, 10.0);
    this.organisationData = new CounterData(20.0, 20.0);

    this.getCounterData();

  }

  getCounterData(): void {

    // get JWT token
    const token = localStorage.getItem('token');
    if (token) {
      // console.log("getCounterData()")
      // let test =  this.accountService.getCounterData(token);
      // console.log("test", test)
      this.accountService.getCounterData(token)
          .subscribe(
            res => {
                console.log('res', res);
                console.log('res', res['user']);
                console.log('res', res['organisation']);
                this.userData = res['user'];
                this.organisationData = res['organisation'];
                this.dataLoaded = true;
            },
            error => {
              this.errorMessage = <any> error;
            });
    }


  }

}
