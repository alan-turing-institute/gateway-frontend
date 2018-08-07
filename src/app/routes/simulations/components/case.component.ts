import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../models/case';

@Component({
  selector: 'sim-case',
  template: `
  <div>
    <input placeholder="Edit case description" (keyup)="updateDescription($event.target.value)">
  </div>
  
  <div *ngFor="let field of caseObject?.fields">
    <sim-field [field]=field></sim-field>
  </div>
  
  
  `,
})
export class CaseComponent implements OnInit {
  @Input() caseObject: Case;

  constructor() {}

  ngOnInit() {}

  updateDescription(value: string) {
    console.log(value);
    this.caseObject.description = value;
  }
}

// <h4>case.component.ts</h4>

//   <div *ngFor="let field of caseObject?.fields">
//     <sim-field [field]="field"></sim-field>

//     <div *ngFor="let field of field?.fields">
//       <sim-field [field]="field"></sim-field>
//     </div>

//   </div>
