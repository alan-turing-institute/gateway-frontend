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
    let valueIndex = this.job.values.findIndex(
      obj => obj['name'] === valueObject.name,
    );
    // maintain an array of Value objects in job.values
    if (valueIndex > -1) {
      // replace the value if it exsists
      this.job.values[valueIndex] = valueObject;
    } else {
      // push the value if it doesn't
      this.job.values.push(valueObject);
    }
  }
}
