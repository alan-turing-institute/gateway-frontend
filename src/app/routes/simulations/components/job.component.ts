import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../models/job';
import { Value } from '../models/value';
import { valueFunctionProp } from 'ng-zorro-antd/src/core/util/convert';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'sim-job',
  templateUrl: './job.component.html',
})
export class JobComponent implements OnInit {
  @Input() job: Job;

  constructor(private simulationService: SimulationService) {}

  ngOnInit() {}

  updateName(value: string) {
    this.job.name = value;
    this.simulationService.updateName(value);
  }

  updateDescription(value: string) {
    this.job.description = value;
    this.simulationService.updateDescription(value);
  }

  updateValue(valueObject: Value) {
    this.simulationService.upsertValue(valueObject);
  }
}
