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

  mockData = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
  ];

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
      // console.log('DEBUG(view-simulation) getMetrics()', this.metrics);
    });
  }
}
