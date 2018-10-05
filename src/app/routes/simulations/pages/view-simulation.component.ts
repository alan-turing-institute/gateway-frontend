import {
  Component,
  Input,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import { View, Parse, parse, Spec } from 'vega';
declare var vega: any;

import { Job } from '../models/job';
import { Output } from '../models/output';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-view-simulation',
  template: `
  <nz-card *ngIf="outputs">
    <sim-downloads [outputs]="outputs"></sim-downloads>
  </nz-card>

  <nz-card *ngIf="metrics">
    <sim-metrics [metrics]="metrics"></sim-metrics>
  </nz-card>

  <nz-card *ngIf="graphic">
    <sim-vega [graphic]="graphic"></sim-vega>
  </nz-card>

  <nz-card *ngIf="job">
    <sim-parameters [job]="job"></sim-parameters>
  </nz-card>
  `,
})
export class ViewSimulationComponent implements OnInit, OnChanges {
  @Input()
  job: Job;
  metrics: object;
  graphic: object;
  outputs: Output[];

  constructor(
    private simulationService: SimulationService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initialiseState();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['job']) {
      this.initialiseState();
    }
  }

  initialiseState() {
    this.getOutputs();
  }

  getOutputs() {
    this.simulationService.getOutputs(this.job.id).subscribe(outputs => {
      this.outputs = outputs;

      const metricsOutput: Output = outputs.find(
        output => output.type === 'metrics',
      );
      if (metricsOutput) {
        this.getMetrics(metricsOutput);
      }

      const graphic: Output = outputs.find(output => output.type === 'vega');
      if (graphic) {
        this.graphic = graphic;
        // this.getVega(vegaOutput);
      }
    });
  }

  getMetrics(output: Output) {
    this.simulationService.getMetrics(output).subscribe(metrics => {
      this.metrics = metrics;
    });
  }

  // getGraphic(output: Output) {
  //   this.simulationService.getVega(output).subscribe(vis => {
  //     this.vis = vis;
  //   });
  // }
}
