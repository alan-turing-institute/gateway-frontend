import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobInfo } from './jobInfoComponent';
import { DashboardService } from './dashboard.service';
import { JobSummaryComponent } from './jobSummary.component';


@Component({
  providers: [DashboardService],
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  allJobs: JobInfo [];
  jobs: {} [];
  errorMessage: string;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
      this.jobs = []
      this.getJobData()
  }

  getJobData(){
    this.dashboardService.data
                          .subscribe(
                            allJobs => {
                              this.allJobs = allJobs
                              for(var key in allJobs){
                                this.jobs = this.jobs.concat(allJobs[key])
                              }
                            },
                            error => {
                              this.errorMessage = <any> error
                            });
                          }

}
