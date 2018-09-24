import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { of, timer } from 'rxjs';
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
  @Input()
  simulation: Case | Job;
  @Output()
  save: EventEmitter<void> = new EventEmitter();
  @Output()
  run: EventEmitter<void> = new EventEmitter();

  // set public, otherwise ng build --prod --build-optimizer will break
  public showCase: boolean;
  public showJob: boolean;
  public form;

  constructor(
    private simulationService: SimulationService,
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      name: ['', [Validators.required], [this.nameAsyncValidator]],
      description: ['', null],
    });
  }

  ngOnChanges(changes: any) {
    // wait until caseObject is accessible, then set both
    // name and description in the simulation service
    if (!changes['simulation'].isFirstChange()) {
      this.simulationService.updateName(this.simulation.name);
      this.simulationService.updateDescription(this.simulation.description);

      if (this.simulationService.active === 'job') {
        this.showJob = true;
        this.showCase = false;
        // this.form.controls['name'].setValue(this.simulation.name);  // use to access each form individually
        this.form.setValue({
          name: this.simulation.name,
          description: this.simulation.description,
        });
      } else if (this.simulationService.active === 'case') {
        this.showCase = true;
        this.showJob = false;
      }
    }
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
    this.form.markAsDirty();
    this.simulationService.upsertValue(valueObject);
  }

  onSave() {
    this.save.emit();
    this.form.markAsPristine(); // TODO implement as callback
  }

  onRun() {
    this.run.emit();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.form.reset();
    for (const key in this.form.controls) {
      this.form.controls[key].markAsPristine();
      this.form.controls[key].updateValueAndValidity();
    }
  }

  nameAsyncValidator = (control: FormControl) => {
    // the current job name is valid
    if (this.simulationService.active === 'job') {
      if (control.value === this.simulationService.initialName) {
        return of(null);
      }
    }

    // anything else already in the job summary database is invalid
    return timer(300).pipe(
      switchMap(() =>
        this.simulationService
          .searchJobSummaries(control.value, true) // exact search
          .pipe(
            map(
              summaryList =>
                summaryList.length == 0
                  ? null
                  : { error: true, duplicated: true },
            ),
          ),
      ),
    );
  };
}
