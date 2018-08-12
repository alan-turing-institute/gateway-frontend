import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Field } from '../models/field';
import { Spec } from '../models/spec';
import { Value } from '../models/value';

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

  constructor() {}

  ngOnInit() {
    this.component = this.field.component;
    this.value = this.specValue('default');
    this.min = Number(this.specValue('min'));
    this.max = Number(this.specValue('max'));
    this.step = Number(this.specValue('step')) || 1;
  }

  updateValue(field: Field, value: string) {
    this.value = String(value);

    let prefix = this.specValue('prefix');
    let suffix = this.specValue('suffix');

    // use Array.prototype.join to ignore undefined and null
    let name = [prefix, this.field.name, suffix].join('');
    let valueObject: Value = { name: name, value: this.value };

    this.update.emit(valueObject);
  }

  updateValueFromChild(value: Value) {
    // bubble the child-emitted event up to its parent
    this.update.emit(value);
  }

  specValue(name: string): string {
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
