import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { JobInfo } from './jobInfo';

import * as moment from 'moment';

@Component({
  selector: 'jobSummary',

  templateUrl: './jobSummary.component.html',
  styleUrls: ['jobSummary.css']
})

export class JobSummaryComponent implements OnInit{
    @Input() summary: JobInfo;
    @Input() type: string;
    @Input() caseInfo:boolean;
    @Input() case:{};
    @Output() jobDeleted: EventEmitter<string> = new EventEmitter();



    jobHoverHidden: boolean;

    dashboard:boolean = true;
    testMe(): void {
        console.log(this.summary);
    }

    ngOnInit(): void {
        this.jobHoverHidden = true
    }

    // setJobHoverHidden(): void {
    //     this.jobHoverHidden = !this.jobHoverHidden
    // }

    storeJobId(type:string): void {
      localStorage.setItem('action_type', type);
      localStorage.setItem('job_id', this.summary.id);
    }


    // getBadgeClass() : string {
    //     return "badge-"+this.summary.status.toLowerCase();
    // }

    getBadgeClass() : string {

      // return class for core-ui badges

      let badgeClass = 'badge-success';

      if (this.summary.status.toLowerCase() == 'complete')
        badgeClass = 'badge-success'
      if (this.summary.status.toLowerCase() == 'running')
        badgeClass = 'badge-success'
      if (this.summary.status.toLowerCase() == 'queued')
        badgeClass = 'badge-warning'
      if (this.summary.status.toLowerCase() == 'draft')
        badgeClass = 'badge-info'
      if (this.summary.status.toLowerCase() == 'error')
        badgeClass = 'badge-danger'

      return badgeClass;
    }

    getHeaderClass() : string {
        //   console.log("card-outline-"+this.summary.status.toLowerCase());
        return "card-header-"+this.summary.status.toLowerCase();

    }

    getShortDescription(): string {
        // return this.summary.description.slice(0,200);
        return this.summary.description;
    }

    getProgressBarHidden(): boolean {
        if (this.summary.status == "Running")
            return false
        else
            return true

    }

    getSpanIcon() : string  {
        var icon = ""
        if (this.summary.status == "Running")
            icon = "fa fa-circle-o-notch fa-spin fa-lg"
        // if (this.summary.status == "Complete")
        //     icon ="fa fa-line-chart fa-lg"
        // if (this.summary.status == "Error")
        //     icon ="fa fa-exclamation-triangle fa-lg"
        // if (this.summary.status == "Draft")
        //     icon ="fa fa-pencil-square fa-lg"
        return icon
    }

    getActionIcon() : string  {
        var icon = ""
        if (this.summary.status == "Running")
            icon = "fa fa-circle-o-notch fa-spin fa-lg"
        if (this.summary.status == "Complete")
            icon ="fa fa-line-chart fa-lg"
        if (this.summary.status == "Error")
            icon ="fa fa-exclamation-triangle fa-lg"
        if (this.summary.status == "Draft")
            icon ="fa fa-pencil-square fa-lg"
        if (this.summary.status == "Queued")
            icon ="fa fa-hourglass-half fa-lg"
        return icon

    }


    getActionText() : string  {
        var text = ""
        if (this.summary.status.toLowerCase() == "running")
            text = "View"
        if (this.summary.status.toLowerCase() == "new")
            text = "Edit"
        if (this.summary.status.toLowerCase() == "complete")
            text ="View"
        if (this.summary.status.toLowerCase() == "error")
            text ="Error"
        if (this.summary.status.toLowerCase() == "draft")
            text ="Edit"
        if (this.summary.status.toLowerCase() == "queued")
            text ="View"
        return text
    }

    routeToInput() : boolean  {
        if (this.summary.status.toLowerCase() == "running")
            return true
        if (this.summary.status.toLowerCase() == "complete")
            return true
        if (this.summary.status.toLowerCase() == "queued")
            return true
        return false
    }

    routeToOutput() : boolean  {
        if (this.summary.status.toLowerCase() == "new")
            return true
        if (this.summary.status.toLowerCase() == "draft")
            return true
        return false
    }

    relativeCreationTime() : string {
      // use moment.js to get relative time
      // for example "40 minutes ago"
      return moment(this.summary.creation_datetime).fromNow()
    }

    getProgressValue(): Object {
        return {'width':this.summary.progress.value.toString()+"%"}
    }

    deleteMe() {
        console.log("Delete a Job")
        this.jobDeleted.emit(this.summary.id)
    }
}
