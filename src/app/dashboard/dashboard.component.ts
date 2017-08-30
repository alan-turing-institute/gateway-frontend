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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
      this.jobs = []
      this.getJobData()
  }


  getJobData() {
    this.dashboardService.data
                          .subscribe(
                            allJobs => {
                              this.allJobs = allJobs
                              for(var key in allJobs){
                                var job = allJobs[key]
                                if(job.status == 'Running'){
                                  this.getProgressInfoData(job)
                                }else{
                                  job.progress = {'value':100, 'units':'%', 'range_min':0, 'range_max':100}
                                }
                                this.jobs = this.jobs.concat(job)
                              }
                              console.log(this.jobs)
                            },
                            error => {
                              this.errorMessage = <any> error
                            });
                          }

getProgressInfoData(job) {
  this.dashboardService.getProgressInfo(job)
                        .subscribe(
                          progress => {
                              job.progress = progress
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
                        }
}
