import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field } from '../models/field';
import { Spec } from '../models/spec';
import { Value } from '../models/value';
import { getInputValues } from '@angularclass/hmr';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'sim-field',
  template: `
    
    <div>
     <strong>Field</strong> <input placeholder="Emit {{value}}" (keyup)="updateValue(field, $event.target.value)"> Value: {{value}}
    </div>
    
    <div *ngFor="let field of field?.fields">
      <sim-field [field]=field (update)="updateValueFromChild($event)"></sim-field>
    </div>

    
  `,
})
export class FieldComponent implements OnInit {
  @Input() field: Field;
  @Output() update = new EventEmitter<object>();

  value: string; // current field value (for sliders, textboxes)

  constructor() {}

  ngOnInit() {
    this.setDefaultValue();
  }

  setDefaultValue() {
    // find "default" spec given by the following example structure:
    // {id: "32", value: "0.00001", name: "default"}

    let defaultSpec = this.field.specs.find(obj => {
      return obj['name'] === 'default';
    });

    // if this field has a "default" spec we set the field component value
    if (defaultSpec) {
      this.value = defaultSpec['value'];
    }
  }

  updateValue(field: Field, value: string) {
    this.value = value;

    let prefix = this.specValue('prefix');
    let suffix = this.specValue('suffix');

    // use Array.prototype.join to ignore undefined and null
    let name = [prefix, this.field.name, suffix].join('');
    let valueObject: Value = { name: name, value: value };
    this.update.emit(valueObject);
  }

  updateValueFromChild(value: object) {
    // bubble the child-emitted event up to its parent
    this.update.emit(value);
  }

  specValue(name: string) {
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
