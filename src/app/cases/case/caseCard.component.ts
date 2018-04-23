import { Component, Input, OnInit} from '@angular/core';
import { CaseInfo } from '../../types/caseInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'caseCard',
  templateUrl: 'caseCard.component.html',
  styleUrls: ['caseCard.css']
})

export class CaseCardComponent implements OnInit{
  @Input() info: CaseInfo;
  caseHoverHidden: boolean;
  shortDescription: string;
  
  storeCaseType(): void {
    localStorage.setItem('action_type', "Template");
    localStorage.setItem('template_id', this.info.links.self);
  }

  setCaseHoverHidden(): void {
        this.caseHoverHidden = !this.caseHoverHidden
    }

  setShortDescription(): void {
    if ((this.info.description !== undefined) && (this.info.description !== null))
      this.shortDescription = this.info.description.slice(0,200);
    else 
      this.shortDescription = "No description provided";
  }

  ngOnInit(): void {
        this.caseHoverHidden = true
        this.setShortDescription();
    }

}