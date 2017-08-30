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
      this.jobs = []
      this.getJobData()
  }


  getJobData() {
    this.dashboardService.data
                          .subscribe(
                            allJobs => {
                              this.jobs = allJobs
                              // console.log(this.jobs)
                               for(var index in this.jobs){
                                  var job = this.jobs[index]
                                // console.log(job)
                                  if(job.status == 'Running'){
                                    this.getProgressInfoData(job)
                              //     //job.progress = this.progress
                                  }else{
                                    job.progress = {'value':100, 'units':'%'}
                                  }
                                  this.jobs[index] = job
                              //   console.log(job)

                                }

                            },
                            error => {
                              this.errorMessage = <any> error
                            });
                          }

getProgressInfoData(job) {
  this.dashboardService.getProgressInfo(job.id)
                        .subscribe(
                          progress => {
                              job.progress = {'value':progress.value, 'units':progress.units}
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
                        }
}
