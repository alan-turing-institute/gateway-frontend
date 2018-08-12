import { Component, Input } from '@angular/core';
import { Job } from '../models/job';
import { Value } from '../models/value';
import { valueFunctionProp } from 'ng-zorro-antd/src/core/util/convert';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'sim-job',
  templateUrl: './job.component.html',
})
export class JobComponent {
  @Input() job: Job;

  constructor(private simulationService: SimulationService) {}

  updateName(value: string) {
    this.simulationService.updateName(value);
  }

  updateDescription(value: string) {
    this.simulationService.updateDescription(value);
  }

  updateValue(valueObject: Value) {
    this.simulationService.upsertValue(valueObject);
  }
}
