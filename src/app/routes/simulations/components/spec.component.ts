import { Component, OnInit, Input } from '@angular/core';
import { Spec } from '../models/spec';

@Component({
  selector: 'sim-spec',
  template: `  
    <div>

    <div>
      <input placeholder="{{spec?.name}}: Edit spec value" (keyup)="updateValue($event.target.value)">
    </div>

    <div>
      <code>
        spec {{spec.name}}: {{spec | json}}
      </code>
    </div>



    </div>
  `,
})
export class SpecComponent implements OnInit {
  @Input() spec: Spec;

  constructor() {}

  ngOnInit() {}

  updateValue(value: string) {
    this.spec.value = value;
  }
}
