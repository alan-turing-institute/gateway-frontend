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
    @Output() jobDeleted: EventEmitter<string> = new EventEmitter();
    @Output() jobStopped: EventEmitter<string> = new EventEmitter();
    
    jobHoverHidden: boolean;
    actionButtonText: string;
    jobShortDescription:string;
    jobStatusBadgeClass:string;
    jobTemporalDistanceFromCreation:string;
    jobProgess:string;
    routeToConfig:boolean
    routeToOutput:boolean
    stopJobOption:boolean

    getBadgeClass() : string {    
        let badgeClass = 'badge-success';

        if (this.summary.status.toLowerCase() == 'complete')
        badgeClass = 'badge-primary'
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

    getShortDescription(): string {
        // return this.summary.description.slice(0,200);
        return this.summary.description;
    }

    getRelativeCreationTime() : string {
        // use moment.js to get relative time
        // for example "40 minutes ago"
        return moment(this.summary.creation_datetime).fromNow()
    }

    getProgress(): string {
        let formattedProgressValue = "";
        let formattedProgressUnits= "";

        if (typeof this.summary.progress.value == "undefined") 
            formattedProgressValue = "0"
        else 
            formattedProgressValue = this.summary.progress.value.toFixed(2);
            
        if (typeof this.summary.progress.units == "undefined") {
            formattedProgressUnits = "%"
        } else {
            formattedProgressUnits = this.summary.progress.units;
        }
        return formattedProgressValue+formattedProgressUnits
    }

    drawRouteToConfig() : boolean  {
        switch (this.summary.status.toLowerCase()) {
            case "running": return true;
            case "queued": return true;
            case "draft": return true;
            default: return false;
        }
    }

    drawRouteToOutput() : boolean  {
        switch (this.summary.status.toLowerCase()) {
            case "complete": return true;
            default: return false;
        }
    }

    drawPauseOption() : boolean  {
        switch (this.summary.status.toLowerCase()) {
            case "running": return true;
            default: return false;
        }
    }

    ngOnInit(): void {
        this.jobHoverHidden = true
        this.actionButtonText = this.getActionText()
        this.jobShortDescription = this.getShortDescription()
        this.jobStatusBadgeClass = this.getBadgeClass()
        this.jobTemporalDistanceFromCreation = this.getRelativeCreationTime()
        this.jobProgess = this.getProgress()
        this.routeToConfig=this.drawRouteToConfig()
        this.routeToOutput =this.drawRouteToOutput()
        this.stopJobOption = this.drawPauseOption()
    }

    deleteJob() {
      console.log("Child wants to delete a Job")
      this.jobDeleted.emit(this.summary.id)
    }

    stopJob() {
      console.log("Child wants to cancel a Job")
      this.jobStopped.emit(this.summary.id)
    }

    storeJobId(type:string): void {
        localStorage.setItem('action_type', type);
        localStorage.setItem('job_id', this.summary.id);
    }
}
