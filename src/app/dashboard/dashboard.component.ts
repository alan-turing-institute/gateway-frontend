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
  styleUrls:['dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  jobs:{info: JobInfo, progress:ProgressInfo} []
  errorMessage: string;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
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
            // progressPlaceHolder.value = 0
            // progressPlaceHolder.units = "%"
            // progressPlaceHolder.range_min = 0
            // progressPlaceHolder.range_max = 100
            this.jobs.push({"info": job, "progress":progressPlaceHolder})
          }
        })
      })
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
