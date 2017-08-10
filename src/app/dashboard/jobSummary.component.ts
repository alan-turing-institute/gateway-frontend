import { Component, Input, OnInit} from '@angular/core';
import { JobInfo } from './jobInfo';

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
        <a routerLinkActive = "active" [routerLink] = "['/output/output', {id: summary.id}]">
            <div class="wrapper">
                <img class="card-img-top img-job" src="{{summary.output}}" 
                    (mouseover)='setJobHoverHidden()'
                    (mouseleave)='setJobHoverHidden()'>
                <i class="fa fa-sign-in fa-2x" [hidden]=jobHoverHidden></i> 
            </div>
        </a>
        <div class="card-block">
            <h5 class="card-title"> 
                <a routerLinkActive = "active" [routerLink] = "['/output/output', {id: summary.id}]">{{summary.job_type}}</a>
            </h5>
            <p class="card-text">
            <span class="badge" [ngClass]="getTitleClass()">
                <i [ngClass]="getSpanIcon()"></i> 
            </span>    
            {{summary.start_date}} - {{summary.end_date}}</p>
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>`,
    styleUrls: ['jobSummary.css']
})

export class JobSummaryComponent implements OnInit{
    @Input() summary: JobInfo;
    jobHoverHidden: boolean;

    testMe(): void {
        console.log(this.summary);
    }

    ngOnInit(): void {
        this.jobHoverHidden = true
    }

    setJobHoverHidden(): void {
        this.jobHoverHidden = !this.jobHoverHidden
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
            icon = "fa fa-circle-o-notch fa-spin fa-lg"
        if (this.summary.status == "Complete")
            icon ="fa fa-line-chart fa-lg"
        if (this.summary.status == "Error") 
            icon ="fa fa-exclamation-triangle fa-lg"
        if (this.summary.status == "Draft") 
            icon ="fa fa-pencil-square fa-lg"
        return icon    
    }
}