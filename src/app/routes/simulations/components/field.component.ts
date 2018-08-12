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
    this.setInitialValue(this.field);
  }

  private setInitialValue(field: Field) {
    // return default value, unless a valueObject exists on the service
    let name = this.fullName(field);
    let defaultValue = this.specValue('default'); // default value from job object's parent case
    let initialValue = this.simulationService.getInitialValue(name);
    if (initialValue) {
      this.value = initialValue;
    } else {
      this.value = defaultValue;
    }
  }

  updateValue(field: Field, value: string) {
    this.value = String(value);
    let valueObject: Value = { name: this.fullName(field), value: this.value };
    this.update.emit(valueObject);
  }

  updateValueFromChild(value: Value) {
    // bubble the child-emitted event up to its parent
    this.update.emit(value);
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

  private fullName(field: Field): string {
    let prefix = this.specValue('prefix');
    let suffix = this.specValue('suffix');
    // use Array.prototype.join to ignore undefined and null
    let name = [prefix, this.field.name, suffix].join('');
    return name;
  }
}
