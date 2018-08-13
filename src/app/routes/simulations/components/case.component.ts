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
import { Value } from '../models/value';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'sim-case',
  templateUrl: './case.component.html',
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
export class CaseComponent {
  @Input() caseObject: Case;
  @Output() save: EventEmitter<void> = new EventEmitter();
  @Output() run: EventEmitter<void> = new EventEmitter();

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
