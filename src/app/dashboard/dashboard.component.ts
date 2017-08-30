import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobInfo } from './jobInfo';
import { DashboardService } from './dashboard.service';
import { JobSummaryComponent } from './jobSummary.component';


@Component({
  selector: "dashboard",
  providers: [DashboardService],
  templateUrl: 'dashboard.component.html',
  styleUrls:['jobs.css']
})

export class DashboardComponent implements OnInit {

  allJobs: JobInfo [];
  jobs: JobInfo [];
  errorMessage: string;
  progress: {value:number, units:string};

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
      console.log("in dashboard")
      localStorage.removeItem("job_id")
      this.jobs = []
      this.getJobData()
  }

  getJobData() {
    this.dashboardService.data
      .subscribe(allJobs => {
        allJobs.map(job => {
         this.dashboardService.getProgressInfo(job.id)
                        .subscribe(
                          progress => {
                              job.progress =  progress
                              this.jobs.push(job)
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
                        })
      })
  }

getProgressInfoData(id) {
  this.dashboardService.getProgressInfo(id)
                        .subscribe(
                          progress => {
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
                        }
}
