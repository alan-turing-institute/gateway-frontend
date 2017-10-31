import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent } from './chart/chart.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit{
  userID: string;
  sim_ran: string;
  sim_remain: string;
  sim_organization: string;

  ngOnInit():void {
      this.userID="May Y"
      this.sim_ran="5";
      this.sim_remain="10";
      this.sim_organization="800";
  }
}
