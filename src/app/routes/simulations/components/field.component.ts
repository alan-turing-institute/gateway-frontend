import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../models/field';

@Component({
  selector: 'sim-field',
  template: `

    <div>
      {{field | json}}
    </div>

    <div>
      <input placeholder="Edit field" (keyup)="updateName($event.target.value)">
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
