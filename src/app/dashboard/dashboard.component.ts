import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobInfo } from '../types/jobInfo';
import { ProgressInfo } from '../types/progressInfo';
import { DashboardService } from './dashboard.service';
import { JobSummaryComponent } from './jobSummary.component';

@Component({
  selector: "dashboard",
  providers: [DashboardService],
  templateUrl: 'dashboard.component.html',
  styleUrls:['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  jobs:{info: JobInfo, progress:ProgressInfo} []
  errorMessage: string;
  numCompleteJobs: number;
  numRunningJobs: number;
  numDraftJobs: number;
  jobsStillLoading: boolean;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.numRunningJobs = 0;
    this.numCompleteJobs = 0;
    this.numDraftJobs = 0;
    localStorage.removeItem("job_id")
    localStorage.removeItem("template_id")
    this.jobs = []
    this.jobsStillLoading = true;
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
            case "queued": this.numRunningJobs++; break;
            case "draft": this.numDraftJobs++; break;
            case "complete": this.numCompleteJobs++; break;
          }
          this.jobsStillLoading = false;

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
    this.dashboardService.deleteJob(id).subscribe(
      message => {
        console.log("deleted");
        // find job to be deleted from list
        var deletedJob = this.jobs.filter(item => item.info.id == id);

        // remove job from list
        this.jobs = this.jobs.filter(item => item.info.id !== id);

        // change badge number
        switch (deletedJob[0].info.status.toLowerCase()) {
          case "running": this.numRunningJobs--; break;
          case "queued": this.numRunningJobs--; break;
          case "draft": this.numDraftJobs--; break;
          case "complete": this.numCompleteJobs--; break;
      }},
      error => {this.errorMessage = <any> error}

    )
  }
}
