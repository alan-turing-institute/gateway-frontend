import { Component, Input } from '@angular/core';
import { Job } from '../models/job';
import { Value } from '../models/value';
import { Output } from '../models/output';
import { valueFunctionProp } from 'ng-zorro-antd/src/core/util/convert';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'sim-parameters',
  templateUrl: 'parameters.component.html',
})
export class ParametersComponent {
  @Input() job: Job;

  displayData: Value[];

  constructor(private simulationService: SimulationService) {}

  ngOnChanges(changes: any) {
    if (this.job) {
      this.displayData = this.job.values;
    }
  }

  private sortName = null;
  private sortValue = null;

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    // bypass any filtering
    const filterFunc = item => true;
    const data = this.job.values.filter(item => filterFunc(item));
    if (this.sortName) {
      this.displayData = data.sort(
        (a, b) =>
          this.sortValue === 'ascend'
            ? a[this.sortName] > b[this.sortName]
              ? 1
              : -1
            : b[this.sortName] > a[this.sortName]
              ? 1
              : -1,
      );
    } else {
      this.displayData = data;
    }
  }
}
