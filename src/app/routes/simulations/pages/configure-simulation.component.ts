import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Job, JobPatch } from '../models/job';
import { CaseService } from '../services/case.service';

@Component({
  selector: 'app-simulations-configure',
  template: `

  <code>
    configure-simulation.component.ts
  </code>

  <nz-card>
    <sim-job [job]="job"></sim-job>
    <button type="button" (click)="onSave()">Save</button>
  </nz-card>

  <div>
    <code>
      {{job?.values | json}}
    </code>
  </div>
  `,
})
export class ConfigureSimulationComponent {
  job: Job;

  constructor(
    private caseService: CaseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    route.params.pipe(map(params => params.id)).subscribe(id => {
      this.caseService.getJob(id).subscribe(job => {
        this.job = job;
      });
    });
  }

  onSave() {
    let jobPatch: JobPatch = {
      name: this.job.name,
      // description: this.job.description,
      description: 'test',
      values: this.job.values,
    };

    console.log('DEBUG(job)', this.job);

    // this.caseService.saveJob(this.job.id, jobPatch).subscribe(response => {
    //   console.log(response);
    // });
  }
}
