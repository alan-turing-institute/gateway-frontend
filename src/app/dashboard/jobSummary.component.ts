import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { JobInfo } from '../types/jobInfo';
import { ProgressInfo } from '../types/progressInfo';

import * as moment from 'moment';

@Component({
  selector: 'jobSummary',
  templateUrl: './jobSummary.component.html',
  styleUrls: ['jobSummary.css']
})

export class JobSummaryComponent implements OnInit{
    @Input() jobInfo: JobInfo;
    @Input() progressInfo: ProgressInfo;
    @Output() jobDeleted: EventEmitter<{"info":JobInfo,"progress":ProgressInfo}> = new EventEmitter();
    @Output() jobStopped: EventEmitter<string> = new EventEmitter();
    
    jobHoverHidden: boolean;
    actionButtonText: string;
    actionButtonRoute: string;
    jobShortDescription:string;
    jobStatusBadgeClass:string;
    jobTemporalDistanceFromCreation:string;
    jobProgress:string;
    routeToConfig:boolean
    routeToOutput:boolean
    stopJobOption:boolean
    hideOptions:boolean
    showConfirmDelete:boolean

    getBadgeClass() : string {    
        let badgeClass = 'badge-success';

        if (this.jobInfo.status.toLowerCase() == 'complete')
        badgeClass = 'badge-primary'
        if (this.jobInfo.status.toLowerCase() == 'running')
        badgeClass = 'badge-success'
        if (this.jobInfo.status.toLowerCase() == 'queued')
        badgeClass = 'badge-warning'
        if (this.jobInfo.status.toLowerCase() == 'draft')
        badgeClass = 'badge-info'
        if (this.jobInfo.status.toLowerCase() == 'error')
        badgeClass = 'badge-danger'

        return badgeClass;
    }

    getActionText() : string  {
        var text = ""
        if (this.jobInfo.status.toLowerCase() == "running")
            text = "View"
        if (this.jobInfo.status.toLowerCase() == "new")
            text = "Edit"
        if (this.jobInfo.status.toLowerCase() == "complete")
            text ="View"
        if (this.jobInfo.status.toLowerCase() == "error")
            text ="Error"
        if (this.jobInfo.status.toLowerCase() == "draft")
            text ="Edit"
        if (this.jobInfo.status.toLowerCase() == "queued")
            text ="View"
        return text
    }

    getActionRoute() : string  {
        switch (this.jobInfo.status.toLowerCase()) {
            case "complete": return "['/output/output']";
            case "running": return "['/output/output']";
            case "queued": return "['/output/output']";
            case "draft": return "['/config/config']";
            case "new": return "['/config/config']";
            default: return "['/output/output']";
        }
    }

    getShortDescription(): string {
        // return this.jobInfo.description.slice(0,200);
        if (this.jobInfo.description.length >= 40)
            return this.jobInfo.description.slice(0,40)+"..";
        // return this.jobInfo.description
        return "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";
    }

    getRelativeCreationTime() : string {
        // use moment.js to get relative time
        // for example "40 minutes ago"
        return moment(this.jobInfo.creation_datetime).fromNow()
    }

    getProgress(): string {
        let formattedProgressValue = "";
        let formattedProgressUnits= "";

        if (typeof this.progressInfo.value == "undefined") 
            formattedProgressValue = "0"
        else 
            formattedProgressValue = this.progressInfo.value.toFixed(2);
            
        if (typeof this.progressInfo.units == "undefined") {
            formattedProgressUnits = "%"
        } else {
            formattedProgressUnits = this.progressInfo.units;
        }
        return formattedProgressValue+formattedProgressUnits
    }

    drawRouteToConfig() : boolean  {
        switch (this.jobInfo.status.toLowerCase()) {
            case "draft": return true;
            default: return false;
        }
    }

    drawRouteToOutput() : boolean  {
        switch (this.jobInfo.status.toLowerCase()) {
            case "complete": return true;
            case "running": return true;
            case "queued": return true;
            default: return false;
        }
    }

    drawPauseOption() : boolean  {
        switch (this.jobInfo.status.toLowerCase()) {
            case "running": return true;
            default: return false;
        }
    }

    ngOnInit(): void {
        // console.log(this.jobInfo)
        this.jobHoverHidden = true
        this.actionButtonText = this.getActionText()
        this.jobShortDescription = this.getShortDescription()
        this.jobStatusBadgeClass = this.getBadgeClass()
        this.jobTemporalDistanceFromCreation = this.getRelativeCreationTime()
        this.jobProgress = this.getProgress()
        this.routeToConfig=this.drawRouteToConfig()
        this.routeToOutput =this.drawRouteToOutput()
        this.stopJobOption = this.drawPauseOption()
        this.actionButtonRoute = this.getActionRoute()
        this.hideOptions = true
        this.showConfirmDelete = false
    }

    deleteJob() {
    //   console.log("Child wants to delete a Job")
      this.jobDeleted.emit({"info":this.jobInfo, "progress":this.progressInfo})
    }

    

    stopJob() {
      console.log("Child wants to cancel a Job")
      this.jobStopped.emit(this.jobInfo.id)
    }

    storeJobId(type:string): void {
        localStorage.setItem('action_type', type);
        localStorage.setItem('job_id', this.jobInfo.id);
    }

    setOptionsHidden() {
        this.hideOptions = !this.hideOptions  
    }

}
