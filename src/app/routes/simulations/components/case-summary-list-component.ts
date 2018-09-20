import { Component, Input } from '@angular/core';

import { CaseSummary } from '../models/case';

@Component({
  selector: 'sim-case-summary-list',
  templateUrl: 'case-summary-list.component.html',
  styles: [
    `
      :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 12px;
      }
    `,
  ],
})
export class CaseSummaryListComponent {
  constructor() {}

  @Input()
  caseSummaries: CaseSummary[];
  @Input()
  loading: boolean;
}
