import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCaseSummaries from '../reducers';
import * as CaseSummaryActions from '../reducers/case-summary.actions';
import { CaseSummary } from '../models/case-summary';

@Component({
  selector: 'sim-selected-case-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <sim-case-configure
    [caseSummary]="caseSummary$ | async"
    (update)=updateCaseSummary($event)>
  </sim-case-configure>
  `
})
export class SelectedCasePageComponent {

  caseSummary$: Observable<CaseSummary>;

  constructor(private store: Store<fromCaseSummaries.State>) {
    this.caseSummary$ = store.pipe(select(fromCaseSummaries.getSelectedCaseSummary)) as Observable<CaseSummary>;
  }

  updateCaseSummary(value: string) {
    // console.log('DEBUG(selected-case-page.component.ts) value:', value);
    // console.log('DEBUG(selected-case-page.component.ts) fromCaseSummaries.getSelectedCaseSummaryId():', fromCaseSummaries.getSelectedCaseSummaryId());
    console.log(fromCaseSummaries.getSelectedCaseSummaryId());

    this.store.dispatch(new CaseSummaryActions.UpdateOne(fromCaseSummaries.getSelectedCaseSummaryId(), {'value': value}));
  }

}
