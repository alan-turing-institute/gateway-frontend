import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobInfo } from '../types/jobInfo';
import { ProgressInfo } from '../types/progressInfo';
import { DashboardService } from './dashboard.service';
import { JobSummaryComponent } from './jobSummary.component';
// import {} from "../../../node_modules/clarity-ui/src/"

@Component({
  selector: "dashboard",
  providers: [DashboardService],
  templateUrl: 'dashboard.component.html',
  // styles:[require('../../../node_modules/clarity-ui/clarity-ui.min.css').toString(), 
  // require('./dashboard.component.css').toString()]
})

export class DashboardComponent implements OnInit {
  jobs:{info: JobInfo, progress:ProgressInfo} []
  errorMessage: string;
  numCompleteJobs: number;
  numRunningJobs: number;
  numDraftJobs: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.numRunningJobs = 0;
    this.numCompleteJobs = 0;
    this.numDraftJobs = 0;
    localStorage.removeItem("job_id")
    localStorage.removeItem("template_id")
    this.jobs = []
    this.getJobsData()
  }

  

  getJobsData() {
    this.dashboardService.data
      .subscribe(allJobs => {
        allJobs.map(job => {
          if (job.status.toLowerCase() == "running") {
            this.dashboardService.getProgressInfo(job.id)
                            .subscribe(
                              progress => {
                                  this.jobs.push({"info": job, "progress":progress})
                              },
                              error => {
                                this.errorMessage = <any> error
                              });
          }
          else {
            var progressPlaceHolder:ProgressInfo = {"value": 0, "units": "%", "range_min":0, "range_max":100}
            this.jobs.push({"info": job, "progress":progressPlaceHolder})
          }

          switch (job.status.toLowerCase()) {
            case "running": this.numRunningJobs++; break;
            case "draft": this.numDraftJobs++; break;
            case "complete": this.numCompleteJobs++; break;
          }
        })
      }
    )
  }

  cancelJob(id){
    this.dashboardService.cancelJob(id).subscribe(
      message => {console.log("cancelled")},
      error => {this.errorMessage = <any> error}
    )
  }

  deleteJob(id){
    this.jobs = this.jobs.filter(item => item.info.id !== id);
    this.dashboardService.deleteJob(id).subscribe(
      message => {console.log("deleted")},
      error => {this.errorMessage = <any> error}
    )
  }
}
