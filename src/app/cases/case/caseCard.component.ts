import { Component, Input} from '@angular/core';
import { CaseInfo } from './caseInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'caseCard',
  template: `
    <div class="card card-case">
        <img class="card-img-top img-job" src="{{info.job_thumbnail}}">
        <div class="card-block">
            <h5 class="card-title"> 
                {{info.job_label}}
            </h5>
            <p class="card-text">{{info.job_short_description}}</p>
            <a routerLinkActive = "active" 
            [routerLink] = "['/cases/changeover']" 
            (click) = "storeCaseType()"
            class="btn btn-primary">More</a>
        </div>
    </div>
    `,
  styleUrls: ['caseCard.css']
})

export class CaseCardComponent {
  @Input() info: CaseInfo;
  
  storeCaseType(): void {
    localStorage.setItem('whatever', 'something');
    console.log(localStorage.getItem('whatever'));
  }
}