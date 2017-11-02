import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { AccountService } from './account.service';
import { AccountInfo } from '../types/accountInfo';


@Component({
  selector: 'app-account',
  providers: [AccountService],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit{
  account: AccountInfo;
  sim_ran: string;
  sim_remain: string;
  sim_organization: string;

  constructor(private accountService: AccountService) { }

  ngOnInit():void {
    this.account = new AccountInfo ("May Yong", "5", "10", "8000")
    this.getAccountData()
  }

  getAccountData():void {
    this.account =  this.accountService.getAccountDataFile();
    // this.sim_ran="";
    // this.sim_remain="";
    // this.sim_organization="";
  }

  runSimulation() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("checking token");
      console.log(token);

      console.log("counting simulation")
      // this.auth.countSimulation(token)
      // .then((response) => {
      //   console.log(response.json());
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    }
  }

}
