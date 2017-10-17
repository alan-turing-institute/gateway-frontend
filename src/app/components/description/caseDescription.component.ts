import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { CaseInfo } from './caseInfo';

@Component({
  selector: 'caseDescription',
  templateUrl: 'caseDescription.component.html',
  styleUrls: ['caseDescription.css']
})

export class CaseDescriptionComponent{
  @Input() info: CaseInfo; 
}