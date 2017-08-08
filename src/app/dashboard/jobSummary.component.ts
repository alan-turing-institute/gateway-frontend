import { Component, Input, OnInit} from '@angular/core';
import { JobInfo } from './jobInfoComponent';
import { Router } from '@angular/router';

@Component({
  selector: 'jobSummary',
  template: `
    <div class="card card-job" 
        [ngClass]="getBorderClass()"
        (click)="testMe()">
        <div class="card-header" [ngClass]="getHeaderClass()">
            <span class="badge" [ngClass]="getTitleClass()">
                <i [ngClass]="getSpanIcon()"></i> 
            </span>
            {{summary.status}}
        </div>
        <img class="card-img-top" src="{{summary.output}}">
        <div class="card-block">
            <h4 class="card-title"> 
                {{summary.job_type}}
            </h4>
            <p class="card-text">{{summary.start_date}} - {{summary.end_date}}</p>
            
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>`,
    styleUrls: ['jobSummary.css']
})

export class JobSummaryComponent implements OnInit {
  @Input() summary: JobInfo;

  ngOnInit(): void {
    //   console.log(this.summary)
  }

  testMe(): void {
      console.log(this.summary)
  }

  getBorderClass() : string {
    //   console.log("card-outline-"+this.summary.status.toLowerCase());
      return "card-outline-"+this.summary.status.toLowerCase();
  }

  getTitleClass() : string {
    //   console.log("card-outline-"+this.summary.status.toLowerCase());
      return "badge-"+this.summary.status.toLowerCase();
  }

  getHeaderClass() : string {
    //   console.log("card-outline-"+this.summary.status.toLowerCase());
      return "card-header-"+this.summary.status.toLowerCase();
  }

  getSpanIcon() : string  {
    var icon = ""
    if (this.summary.status == "Running")
        icon = "fa fa-circle-o-notch fa-spin"
    if (this.summary.status == "Complete")
        icon ="fa fa-line-chart"
    if (this.summary.status == "Error") 
        icon ="fa fa-exclamation-triangle"
    return icon    
  }
}