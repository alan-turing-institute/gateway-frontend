import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

import { Case } from '../models/case';
import * as fromCase from '../state';
import * as CaseSummaryActions from '../state/case-summary.actions';
import * as CaseActions from '../state/case.actions';

import { CaseActionTypes } from '../state/case.actions';

@Component({
  selector: 'app-simulations-configure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <sim-selected-case-page></sim-selected-case-page>
  `,
})
export class ConfigureCasePageComponent implements OnDestroy {
  load: Subscription;
  cases$: Observable<Case[]>;

  constructor(
    private store: Store<fromCase.State>,
    private route: ActivatedRoute,
  ) {
    this.load = route.params
      .pipe(
        concatMap(params => [
          new CaseSummaryActions.Select(params.id), // TODO temporary
          new CaseActions.SelectCase(params.id),
          new CaseActions.GetCase(params.id),
        ]),
      )
      .subscribe(store);

    this.cases$ = store.pipe(select(fromCase.getAllCases));
  }

  ngOnDestroy() {
    this.load.unsubscribe();
  }
}
