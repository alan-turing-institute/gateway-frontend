import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCases from '../reducers';
import * as CaseActions from '../reducers/case.actions';
import { Case } from '../models/case';

@Component({
  selector: 'sim-selected-case-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <sim-case-configure
    [case_]="case$ | async"
    (update)=updateCase($event)>
  </sim-case-configure>
  `
})
export class SelectedCasePageComponent {
  case$: Observable<Case>;

  constructor(private store: Store<fromCases.State>) {
    this.case$ = store.pipe(select(fromCases.getSelectedCase)) as Observable<Case>;
  }

  updateCase(value: string) {
    this.store.dispatch(new CaseActions.Update(value));
  }

}
