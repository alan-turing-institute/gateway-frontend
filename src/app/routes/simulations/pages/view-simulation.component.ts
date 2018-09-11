import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Job } from '../models/job';
import { Output } from '../models/output';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulations-view-simulation',
  template: `

  <page-header>
    VIEW SIMULATION
  </page-header>
 
  <nz-card>
    <sim-downloads [outputs]="outputs"></sim-downloads>
  </nz-card>

  <nz-card *ngIf="metrics">
    <sim-metrics [metrics]="metrics"></sim-metrics>
  </nz-card>

  <nz-card>
    <sim-parameters [job]="job"></sim-parameters>
  </nz-card>
  `,
})
export class ViewSimulationComponent {
  job: Job;
  metrics: object;
  outputs: Output[];

  constructor(
    private simulationService: SimulationService,
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
        this.getOutputs();
        this.getMetrics();
      });
  }

  getOutputs() {
    this.simulationService.getOutputs(this.job.id).subscribe(outputs => {
      this.outputs = outputs;
      // console.log('DEBUG(view-simulation) getOutputs()', this.outputs);
    });
  }

  getMetrics() {
    this.simulationService.getMetrics(this.job.id).subscribe(metrics => {
      this.metrics = metrics;
      console.log('DEBUG(view-simulation) getMetrics()', this.metrics);
    });
  }
}
