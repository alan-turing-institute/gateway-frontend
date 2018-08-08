import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../models/job';

@Component({
  selector: 'sim-job',
  template: `
  <div>
    <input placeholder="{{job?.name}}: Edit job name" (keyup)="updateName($event.target.value)">
  </div>

  <div *ngFor="let field of job?.parent_case?.fields">
    <sim-field 
      [field]=field
      (update)="updateValues($event)">
      </sim-field>
  </div>
  `,
})
export class JobComponent implements OnInit {
  @Input() job: Job;

  constructor() {}

  ngOnInit() {}

  updateName(value: string) {
    this.job.name = value;
  }

  updateValues(value: object) {
    console.log('DEBUG(job.component)(updateValues)', value);
    // this.value = value;
    // this.job.values.push(value);
  }
}

// <div *ngFor="let field of caseObject?.fields">
//   <sim-field [field]=field></sim-field>
// </div>
