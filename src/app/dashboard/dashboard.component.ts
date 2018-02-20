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
  cardView: boolean;
  tableView: boolean;
  showConfirmDelete: boolean;
  selectedJobs: {info: JobInfo, progress:ProgressInfo} [];
  searchTerm:string;
  includeCompletedJobs:boolean;
  includeRunningJobs:boolean;
  includeDraftJobs:boolean;
  filteredJobs:{info: JobInfo, progress:ProgressInfo} []

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.numRunningJobs = 0;
    this.numCompleteJobs = 0;
    this.numDraftJobs = 0;
    localStorage.removeItem("job_id")
    localStorage.removeItem("template_id")
    this.jobs = []
    this.filteredJobs = []
    this.jobsStillLoading = true;
    this.cardView = true;
    this.tableView = false;
    this.showConfirmDelete = false
    this.selectedJobs = []
    this.searchTerm = ""
    this.includeCompletedJobs=true;
    this.includeRunningJobs=true;
    this.includeDraftJobs=true;
    this.getJobsData()
  }

  getJobsData() {
    // this.dashboardService.getMockData()
    this.dashboardService.getJobsData()
      .subscribe(allJobs => {
        // console.log(allJobs);
        allJobs.map(job => {
          // if (job.status.toLowerCase() == "running") {
          //   this.dashboardService.getProgressInfo(job.id)
          //                   .subscribe(
          //                     progress => {
          //                         this.jobs.push({"info": job, "progress":progress})
          //                     },
          //                     error => {
          //                       this.errorMessage = <any> error
          //                     });
          // }
          // else {
            switch (job.status) {
              case "Not Started": {
                job.status = "Draft";
                break;
              }  
            }
            job.description="change me"
            job.case = {links: {self:"string"},name: "string",thumbnail: "string",description: "string"}
            var progressPlaceHolder:ProgressInfo = {"value": 0, "units": "%", "range_min":0, "range_max":100}
            this.jobs.push({"info": job, "progress":progressPlaceHolder})
            this.filteredJobs.push({"info": job, "progress":progressPlaceHolder})
        //   }
        //   switch (job.status.toLowerCase()) {
        //     case "running": this.numRunningJobs++; break;
        //     case "queued": this.numRunningJobs++; break;
        //     case "draft": this.numDraftJobs++; break;
        //     case "complete": this.numCompleteJobs++; break;
        //   }
        })
        this.jobsStillLoading = false;
      }
    )
  }

  cancelJob(id){
    this.dashboardService.cancelJob(id).subscribe(
      message => {console.log("cancelled")},
      error => {this.errorMessage = <any> error}
    )
  }

  confirmedDeleteJob(){
    this.showConfirmDelete =false
    this.selectedJobs.map(selectedJob => {
      this.dashboardService.deleteJob(selectedJob.info.id).subscribe(
        message => {
          console.log("deleted");
          // find job to be deleted from list
          var deletedJob = this.jobs.filter(item => item.info.id == selectedJob.info.id);
  
          // remove job from list
          this.jobs = this.jobs.filter(item => item.info.id !== selectedJob.info.id);
          this.filteredJobs = this.jobs.slice();
          // change badge number
          switch (deletedJob[0].info.status.toLowerCase()) {
            case "running": this.numRunningJobs--; break;
            case "queued": this.numRunningJobs--; break;
            case "draft": this.numDraftJobs--; break;
            case "complete": this.numCompleteJobs--; break;
        }},
        error => {this.errorMessage = <any> error}
      )
    })
  }

  clearSelectedJobs() {
    // so that any selected jobs will not be carried over to new view
    this.selectedJobs = []
  }

  toggleView(selectedView) {
    if (selectedView == 'card')
      if (!this.cardView)
        this.changeView();
    if (selectedView == 'table')
      if (!this.tableView)
        this.changeView();

    // so that any selected jobs will not be carried over to new view
     
    // console.log("Card: "+this.cardView)
    // console.log("Table: "+this.tableView)
  }

  changeView() {
    this.clearSelectedJobs()
    this.cardView = !this.cardView  
    this.tableView = !this.tableView 
  }

  cancelDeleteJob() {
    this.showConfirmDelete =false
  }

  deleteJob(selectedJob) {
    this.clearSelectedJobs() 
    this.selectedJobs.push(selectedJob)
    this.showConfirmDelete =true
  }

  deleteJobs() {
    this.showConfirmDelete =true
  }

  toggleStatus(status:string) {
    switch (status) {
      case 'Draft': {
        this.includeDraftJobs = !this.includeDraftJobs
        break;
      }
      case 'Running': {
        this.includeRunningJobs = !this.includeRunningJobs
        break;
      }
      case 'Complete': {
        this.includeCompletedJobs = !this.includeCompletedJobs
        break;
      }
    }
    this.filterJobs();
  }

  filterJobs() {
    this.filteredJobs = []
    // this.jobs.map(job => {
    //   if (job.info.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0) {
    //     this.filteredJobs.push(job)  
    //   }
    // })
    this.jobs.map(job => {
      if (this.includeDraftJobs) {
        if ((job.info.status.toLowerCase().indexOf('draft') >= 0)
            &&(job.info.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0)) {
          this.filteredJobs.push(job)  
        }
      }
      if (this.includeRunningJobs) {
        if (((job.info.status.toLowerCase().indexOf('running') >= 0) ||
        (job.info.status.toLowerCase().indexOf('queued') >= 0))
        &&(job.info.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0))  
        {
          this.filteredJobs.push(job)  
        }
      }
      if (this.includeCompletedJobs) {
        if ((job.info.status.toLowerCase().indexOf('complete') >= 0)
        &&(job.info.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0)) {
          this.filteredJobs.push(job)  
        }
      }
    })  
  }

  storeJobId(job) {
    if (job.status=='Complete') {
      localStorage.setItem('action_type', 'Output');
    }
    else {
      localStorage.setItem('action_type', 'Edit');  
    }
    localStorage.setItem('job_id', job.id);  
  }

}
