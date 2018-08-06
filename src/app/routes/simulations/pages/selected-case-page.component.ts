import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCase from '../state';
import * as CaseActions from '../state/case.actions';
import { Case } from '../models/case';

@Component({
  selector: 'sim-selected-case-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <sim-case-configure
    [caseObject]="caseObject$ | async" 
    (update)=updateCase($event)>
  </sim-case-configure>
  `,
})
export class SelectedCasePageComponent {
  caseObject$: Observable<Case>;

  constructor(private store: Store<fromCase.State>) {
    this.caseObject$ = store.pipe(
      select(fromCase.getSelectedCase),
    ) as Observable<Case>;
  }

  updateCase(value: string) {
    this.store.dispatch(new CaseActions.UpdateCase({ value: value }));
  }
}
