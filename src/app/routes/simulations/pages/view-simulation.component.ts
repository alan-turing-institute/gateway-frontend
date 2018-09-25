import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Job } from '../models/job';
import { Output } from '../models/output';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-view-simulation',
  template: `

  <page-header></page-header>

  <nz-card *ngIf="outputs">
    <sim-downloads [outputs]="outputs"></sim-downloads>
  </nz-card>

  <nz-card *ngIf="metrics">
    <sim-metrics [metrics]="metrics"></sim-metrics>
  </nz-card>

  <nz-card *ngIf="job">
    <sim-parameters [job]="job"></sim-parameters>
  </nz-card>
  `,
})
export class ViewSimulationComponent implements OnInit {
  @Input()
  job: Job;
  metrics: object;
  outputs: Output[];

  constructor(
    private simulationService: SimulationService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getOutputs();
    this.getMetrics();
  }

  getOutputs() {
    this.simulationService.getOutputs(this.job.id).subscribe(outputs => {
      this.outputs = outputs;
    });
  }

  getMetrics() {
    this.simulationService.getMetrics(this.job.id).subscribe(metrics => {
      this.metrics = metrics;
    });
  }
}
