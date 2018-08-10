import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../models/job';
import { Value } from '../models/value';
import { valueFunctionProp } from 'ng-zorro-antd/src/core/util/convert';

@Component({
  selector: 'sim-job',
  templateUrl: './job.component.html',
})
export class JobComponent implements OnInit {
  @Input() job: Job;
  values: Value[];

  constructor() {}

  ngOnInit() {
    this.values = [];
  }

  updateName(value: string) {
    this.job.name = value;
  }

  updateDescription(value: string) {
    this.job.description = value;
  }

  updateValue(valueObject: Value) {
    Value.updateValueArray(this.values, valueObject);
  }
}
