import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../models/field';

@Component({
  selector: 'sim-field',
  template: `  
    <div>
      <input placeholder="{{field?.name}}: Edit field name" (keyup)="updateName($event.target.value)">
    </div>

    <div *ngFor="let spec of field?.specs">
      <sim-spec [spec]="spec"></sim-spec>
    </div>

    <div *ngFor="let field of field?.fields">
      <sim-field [field]=field></sim-field>
    </div>
  `,
})
export class FieldComponent implements OnInit {
  @Input() field: Field;

  constructor() {}

  ngOnInit() {}

  updateName(value: string) {
    this.field.name = value;
  }
}
