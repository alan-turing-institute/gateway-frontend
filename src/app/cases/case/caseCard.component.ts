import { Component, Input, OnInit} from '@angular/core';
import { CaseInfo } from './caseInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'caseCard',
  templateUrl: 'caseCard.component.html',
  // template: `
  //   <div class="card card-case">
  //       <div class="card-header case">
  //           <span class="badge">
  //               <i class="icon-puzzle fa-lg badge-puzzle"></i> 
  //           </span>
  //           <strong>{{info.label}}</strong>
  //       </div>
  //       <a routerLinkActive = "active" [routerLink] = "['/config/config']">
  //         <div class="wrapper">
  //           <img class="card-img-top img-case" src="{{info.thumbnail}}"
  //             (mouseover)='setCaseHoverHidden()'
  //             (mouseleave)='setCaseHoverHidden()'>
  //           <i class="fa fa-sign-in fa-2x" [hidden]=caseHoverHidden></i> 
  //         </div>
  //       </a>
  //       <div class="card-block">
  //         <p class="card-text break-word">{{getShortDescription()}} 
  //           <a routerLinkActive = "active" [routerLink] = "['/config/config']"
  //           (click)="storeCaseType()">(...)</a>
  //         </p>
  //         <p><button type="button" class="btn btn-primary">Details</button></p>
  //       </div>
  //   </div>
  //   `,
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
    return this.info.description.slice(0,200);
  }

  ngOnInit(): void {
        this.caseHoverHidden = true
    }

}