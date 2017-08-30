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
  jobs: {} [];
  errorMessage: string;
  progress:{};

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
      this.jobs = []
      this.progress = {}
      this.getJobData()
  }


  getJobData() {
    this.dashboardService.data
                          .subscribe(
                            allJobs => {
                              this.allJobs = allJobs
                              for(var key in allJobs){
                                var job = allJobs[key]
                                this.jobs = this.jobs.concat(job)
                                if(job.status == 'Running'){
                                  this.getProgressInfoData(job.id)
                                }
                              }
                              console.log(this.jobs)
                              console.log(this.progress)
                            },
                            error => {
                              this.errorMessage = <any> error
                            });
                          }

getProgressInfoData(jobId) {
  this.dashboardService.getProgressInfo(jobId)
                        .subscribe(
                          progress => {
                              this.progress[jobId] = progress
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
                        }
}
