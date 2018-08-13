import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Case } from '../models/case';
import { Job } from '../models/job';
import { Value } from '../models/value';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'sim-simulation',
  templateUrl: './simulation.component.html',
  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }
      button {
        margin-left: 8px;
      }
    `,
  ],
})
export class SimulationComponent {
  @Input() simulation: Case | Job;
  @Output() save: EventEmitter<void> = new EventEmitter();
  @Output() run: EventEmitter<void> = new EventEmitter();

  private showCase: boolean;
  private showJob: boolean;

  constructor(
    private simulationService: SimulationService,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required], [this.nameAsyncValidator]],
    });
  }

  ngOnChanges(changes: any) {
    // wait until caseObject is accessible, then set both
    // name and description in the simulation service
    if (!changes['simulation'].isFirstChange()) {
      this.simulationService.updateName(this.simulation.name);
      this.simulationService.updateDescription(this.simulation.description);
      if (this.isJob(this.simulation)) {
        // we have been given a job
        this.showJob = true;
        this.showCase = false;
      } else {
        // we have been given a case
        this.showJob = false;
        this.showCase = true;
      }
    }
  }

  isJob(simulation: Job | Case): simulation is Job {
    return 'parent_case' in simulation;
  }

  dumpState() {
    console.log('DEBUG(case)', this.simulation);
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

  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  nameAsyncValidator = (control: FormControl) =>
    timer(300).pipe(
      switchMap(() =>
        this.simulationService.searchJobSummaries(control.value).pipe(
          // clear validator, unless we find a job summary that matches the search
          map(
            summaryList =>
              summaryList.length == 0
                ? null
                : { error: true, duplicated: true },
          ),
        ),
      ),
    );
}
