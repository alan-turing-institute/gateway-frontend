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

  // message = 'test';
  message: object[] = [{ foo: 'bar' }];

  constructor() {
    this.values = [];
  }

  ngOnInit() {}

  updateName(value: string) {
    this.caseObject.name = value;
  }

  updateValue(valueObject: Value) {
    Value.updateValueArray(this.values, valueObject);
  }
}
