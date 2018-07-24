import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CaseSummary } from '../models/case-summary';

@Component({
  selector: 'sim-case-configure',
  templateUrl: './case-configure.component.html'
})
export class CaseConfigureComponent {
  @Input() caseSummary: CaseSummary;
  @Output() update = new EventEmitter<string>();

  value = 1;

  get id() {
    return this.caseSummary.id;
  }

  get name() {
    return this.caseSummary.name;
  }

  get description() {
    return this.caseSummary.description;
  }

  get thumbnail() {
    return this.caseSummary.thumbnail;
  }

}
