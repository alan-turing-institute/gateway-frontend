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

  constructor() {}

  ngOnInit() {}

  updateName(value: string) {
    this.job.name = value;
  }

  updateValue(valueObject: Value) {
    Value.updateValueArray(this.job.values, valueObject);
  }
}
