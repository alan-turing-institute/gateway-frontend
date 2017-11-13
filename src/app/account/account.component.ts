import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent } from './chart/chart.component';

import { AccountInfo } from '../types/accountInfo';

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

  account: AccountInfo;
  userData: CounterData;
  organisationData: CounterData;

  // userCredit: number;
  // userTally: number;
  // organisationCredit: number;
  // organisationTally: number;

  constructor(private accountService: AccountService, private auth: AuthService) { }

  ngOnInit():void {

    this.userData = new CounterData(null, null);
    // this.organisationData = {tally: null, credit: null};

    console.log('BEFORE this.userData', this.userData)

    // this.account = new AccountInfo(10.3, 10.3, 1, 0);
    // this.account = new AccountInfo(10, 10, 10, 10);
    // this.accountService.getAccountData();

    // this.userData = {tally: 20, credit:31};
    // this.organisationData = {tally: 20, credit:31};

    this.checkCounter();


  }

  checkCounter() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("checking credit")
      this.accountService.checkCounter(token)
      .then((response) => {
        let data = response.json();
        console.log('response data', data);
        this.userData = data.user;

        console.log('AFTER this.userData', this.userData)

        // this.account.userCredit = data.user.credit;
        // this.account.organisationTally = data.organisation.tally;
        // this.account.organisationCredit = data.organisation.credit;
        // console.log(this.account);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  // runSimulation() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     console.log("checking token");
  //     console.log(token);
  //
  //     console.log("counting simulation")
  //     this.auth.countSimulation(token)
  //     .then((response) => {
  //       console.log(response.json());
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // }

}
