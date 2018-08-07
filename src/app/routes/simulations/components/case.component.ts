import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../models/case';

@Component({
  selector: 'sim-case',
  template: `
  <div>
    <input placeholder="{{caseObject?.name}}" (keyup)="updateName($event.target.value)">
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

  updateName(value: string) {
    this.caseObject.name = value;
  }
}
