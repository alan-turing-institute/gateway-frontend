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
 
  <nz-card>
    <sim-job-output [job]="job"></sim-job-output>
  </nz-card>
  
  `,
})
export class ViewSimulationComponent {
  job: Job;

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
        this.simulationService.activateJob(jobObject);
      });
  }
}
