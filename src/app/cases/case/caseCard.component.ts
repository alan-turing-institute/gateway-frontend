import { Component, Input, OnInit} from '@angular/core';
import { CaseInfo } from './caseInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'caseCard',
  templateUrl: 'caseCard.component.html',
  styleUrls: ['caseCard.css']
})

export class CaseCardComponent implements OnInit{
  @Input() info: CaseInfo;
  caseHoverHidden: boolean;
  
  storeCaseType(): void {
    localStorage.setItem('template_id', this.info.id);
  }

  setCaseHoverHidden(): void {
        this.caseHoverHidden = !this.caseHoverHidden
    }

  getShortDescription(): string {
    if (this.info.description !== undefined)
      return this.info.description.slice(0,200);
    else return ""
  }

  ngOnInit(): void {
        this.caseHoverHidden = true
    }

}