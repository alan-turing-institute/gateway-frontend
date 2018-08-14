import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Field } from '../models/field';
import { Spec } from '../models/spec';
import { Value } from '../models/value';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'sim-field',
  templateUrl: './field.component.html',
})
export class FieldComponent implements OnInit {
  @Input() field: Field;
  @Output() update = new EventEmitter<Value>();

  private component: string;
  private value: string; // current field value (for sliders, textboxes)
  private min: number;
  private max: number;
  private step: number;

  constructor(private simulationService: SimulationService) {}

  ngOnInit() {
    this.component = this.field.component;
    this.min = Number(this.specValue('min'));
    this.max = Number(this.specValue('max'));
    this.step = Number(this.specValue('step')) || 1;
    this.initialiseValue();
  }

  private initialiseValue() {
    let defaultValue = this.specValue('default'); // value from Case.fields OR Job.parent_case
    let initialValue = this.simulationService.getInitialValue(name); // value from Job.values

    // not all fields have values, therefore only store
    // those that have a default value
    let value: string;
    if (initialValue) {
      value = initialValue;
    } else if (defaultValue) {
      value = defaultValue;
    }

    // use service directly so that angular form is not dirty
    if (value) {
      let valueObject = this.applyAffixes(value);
      this.simulationService.upsertValue(valueObject);
    }
  }

  updateValue(value: string) {
    let valueObject = this.applyAffixes(value);
    this.update.emit(valueObject);
  }

  updateValueFromChild(value: Value) {
    // bubble the child-emitted event up to its parent
    this.update.emit(value);
  }

  applyAffixes(value: string): Value {
    // add any prefix and suffix
    this.value = String(value);
    let prefix = this.specValue('prefix');
    let suffix = this.specValue('suffix');
    // use Array.prototype.join to ignore undefined and null
    let name = [prefix, this.field.name, suffix].join('');
    let valueObject: Value = {
      name: name,
      value: this.value,
    };
    return valueObject;
  }

  private specValue(name: string): string {
    let value = null;
    let spec = this.field.specs.find(obj => {
      return obj['name'] === name;
    });
    if (spec) {
      value = spec.value;
    }
    return value;
  }
}
