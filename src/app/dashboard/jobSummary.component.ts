import { Component, Input, OnInit} from '@angular/core';
import { JobInfo } from './jobInfo';

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

    storeJobId(): void {
      localStorage.setItem('job_id', this.summary.id);
    }

    getBadgeClass() : string {
        return "badge-"+this.summary.status.toLowerCase();
    }

    getHeaderClass() : string {
        //   console.log("card-outline-"+this.summary.status.toLowerCase());
        return "card-header-"+this.summary.status.toLowerCase();

    }

    getShortDescription(): string {
    return this.summary.description.slice(0,200);
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
        if (this.summary.status == "Running")
            text = "View"
        if (this.summary.status == "Complete")
            text ="View"
        if (this.summary.status == "Error")
            text ="Logs"
        if (this.summary.status == "Draft")
            text ="Edit"
        if (this.summary.status == "Queued")
            text ="View"
        return text
    }
}
