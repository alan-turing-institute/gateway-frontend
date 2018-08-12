import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Job, JobPatch } from '../models/job';
import { Value } from '../models/value';
import { JobComponent } from '../components/job.component';
import { SimulationService } from '../services/simulation.service';

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
  job: Job;
  values: Value[];

  constructor(
    private simulationService: SimulationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    route.params
      .pipe(
        map(params => params.id),
        switchMap(id => this.simulationService.getJob(id)),
      )
      .subscribe(jobObject => {
        this.job = jobObject;
        this.simulationService.activateJob(jobObject.id);
      });
  }

  onSave() {
    this.simulationService.updateJob(this.job.id).subscribe(response => {
      console.log(response);
    });
  }
}
