import { Component, Input} from '@angular/core';
import { CaseInfo } from './caseInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'caseCard',
  template: `
    <div class="card card-case">
        <div class="card-header">
            <span class="badge">
                <i class="icon-puzzle"></i> 
            </span>
            {{info.job_label}}
        </div>
        <img class="card-img-top img-case" src="{{info.job_thumbnail}}">
        <div class="card-block">
            <p class="card-text">{{getShortDescription()}}</p>
            <p class="card-text">
            <a routerLinkActive = "active" [routerLink] = "['/config/config']">Template</a>
            </p>
        </div>
    </div>
    `,
  styleUrls: ['caseCard.css']
})

export class CaseCardComponent {
  @Input() info: CaseInfo;
  
  storeCaseType(): void {
    localStorage.setItem('job_label', this.info.job_label);
    console.log(localStorage.getItem('job_label'));
  }

  getShortDescription(): string {
    return this.info.job_long_description.slice(0,20);
  }
}