import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Case } from '../models/case';

@Component({
  selector: 'sim-case-configure',
  template: `
  DETAIL: {{ name }}
  `
})
export class CaseConfigureComponent {
  @Input() case: Case;

  get id() {
    return this.case.id;
  }

  get name() {
    return this.case.name;
  }

  get description() {
    return this.case.description;
  }

  get thumbnail() {
    return this.case.thumbnail;
  }



}
