import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Case } from '../models/case';

@Component({
  selector: 'sim-case-configure',
  templateUrl: './case-configure.component.html',
})
export class CaseConfigureComponent {
  @Input() caseObject: Case;
  @Output() update = new EventEmitter<string>();

  value = 1;

  get id() {
    return this.caseObject.id;
  }

  get name() {
    return this.caseObject.name;
  }

  get description() {
    return this.caseObject.description;
  }

  get thumbnail() {
    return this.caseObject.thumbnail;
  }
}
