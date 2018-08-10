import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Job, JobPatch } from '../models/job';
import { Value } from '../models/value';
import { JobComponent } from '../components/job.component';
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
      Name: {{job?.name}} Description: {{job?.description}}
    </code>
  </div>

  <div>
    <code>
      {{values | json}}
    </code>
  </div>
  `,
})
export class ConfigureSimulationComponent {
  @ViewChild(JobComponent) private jobComponent: JobComponent;
  job: Job;
  values: Value[]; // TODO refactor to dirtyValues

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.values = this.jobComponent.values;
    });
  }

  onSave() {
    // TODO refactor to JobPatch public member

    let jobPatch: JobPatch = {
      name: this.job.name,
      description: this.job.description,
      values: this.values,
    };

    console.log('DEBUG(job)', this.job);

    this.caseService.updateJob(this.job.id, jobPatch).subscribe(response => {
      console.log(response);
    });
  }
}
