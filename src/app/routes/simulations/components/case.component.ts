import { Component, OnInit, Input, Output } from '@angular/core';
import { Case } from '../models/case';
import { Value } from '../models/value';

@Component({
  selector: 'sim-case',
  templateUrl: './case.component.html',
})
export class CaseComponent implements OnInit {
  @Input() caseObject: Case;
  values: Value[];

  constructor() {
    this.values = [];
  }

  ngOnInit() {}

  updateName(value: string) {
    this.caseObject.name = value;
  }

  updateDescription(value: string) {
    this.caseObject.description = value;
  }

  updateValue(valueObject: Value) {
    Value.updateValueArray(this.values, valueObject);
  }
}
