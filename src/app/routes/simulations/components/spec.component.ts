import { Component, OnInit, Input } from '@angular/core';
import { Spec } from '../models/spec';

@Component({
  selector: 'sim-spec',
  template: `  
    <div>
      <h6>Spec</h6>

      <div>
        <input placeholder="{{spec?.value}}" (keyup)="updateValue(spec, $event.target.value)">
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

  updateValue(spec: Spec, value: string) {
    console.log(spec, value);
    // this.spec.value = value;  // inplace edit
  }
}
