import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { CaseInfo } from './caseInfo';

@Component({
  selector: 'caseDescription',
  templateUrl: 'description.component.html',
  styleUrls: ['description.css']
})

export class CaseDescriptionComponent{
  @Input() info: CaseInfo; 
}