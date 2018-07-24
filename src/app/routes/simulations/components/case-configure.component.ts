import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Case } from '../models/case';

@Component({
  selector: 'sim-case-configure',
  templateUrl: './case-configure.component.html'
})
export class CaseConfigureComponent {
  @Input() case_: Case;
  @Output() update = new EventEmitter<Case>();

  value1 = 1;

  get id() {
    return this.case_.id;
  }

  get name() {
    return this.case_.name;
  }

  get description() {
    return this.case_.description;
  }

  get thumbnail() {
    return this.case_.thumbnail;
  }

}
