import { Component, Input, Output } from '@angular/core';
import { Case } from '../models/case';
import { Value } from '../models/value';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'sim-case',
  templateUrl: './case.component.html',
})
export class CaseComponent {
  @Input() caseObject: Case;

  constructor(private simulationService: SimulationService) {}

  ngOnChanges(changes: any) {
    // wait until caseObject is accessible, then set both
    // name and description in the simulation service
    if (!changes['caseObject'].isFirstChange()) {
      this.simulationService.updateName(this.caseObject.name);
      this.simulationService.updateDescription(this.caseObject.description);
    }
  }

  dumpState() {
    console.log('DEBUG(case)', this.caseObject);
  }

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
