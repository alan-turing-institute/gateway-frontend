import { Component, Input, OnInit} from '@angular/core';
import { CaseInfo } from './caseInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'caseCard',
  template: `
    <div class="card card-case">
        <div class="card-header">
            <span class="badge">
                <i class="icon-puzzle fa-2x badge-puzzle"></i> 
            </span>
            Template
        
        </div>
        <a routerLinkActive = "active" [routerLink] = "['/config/config']">
          <div class="wrapper">
            <img class="card-img-top img-case" src="{{info.thumbnail}}"
              (mouseover)='setCaseHoverHidden()'
              (mouseleave)='setCaseHoverHidden()'>
            <i class="fa fa-sign-in fa-2x" [hidden]=caseHoverHidden></i> 
          </div>
        </a>
        <div class="card-block">
          <h5 class="card-title"> 
            <a routerLinkActive = "active" [routerLink] = "['/config/config']">{{info.label}}</a>
          </h5>
          <p class="card-text break-word">{{getShortDescription()}} 
            <a routerLinkActive = "active" [routerLink] = "['/config/config']"
            (click)="storeCaseType()">(...)</a>
          </p>
        </div>
    </div>
    `,
  styleUrls: ['caseCard.css']
})

export class CaseCardComponent implements OnInit{
  @Input() info: CaseInfo;
  caseHoverHidden: boolean;
  
  storeCaseType(): void {
    localStorage.setItem('template_id', this.info.label);
    console.log(localStorage.getItem('template_id'));
  }

  setCaseHoverHidden(): void {
        this.caseHoverHidden = !this.caseHoverHidden
    }

  getShortDescription(): string {
    return this.info.description.slice(0,100);
  }

  ngOnInit(): void {
        this.caseHoverHidden = true
    }

}