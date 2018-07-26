import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Case } from '../models/case';
import * as fromCase from '../reducers';
import * as CaseSummaryActions from '../reducers/case-summary.actions';
import * as CaseActions from '../reducers/case.actions';

import { CaseActionTypes } from '../reducers/case.actions';

@Component({
  selector: 'app-simulations-configure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <sim-selected-case-page></sim-selected-case-page>
  `,
})
export class ConfigureCasePageComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  cases$: Observable<Case[]>;

  constructor(
    private store: Store<fromCase.State>,
    private route: ActivatedRoute,
  ) {
    this.actionsSubscription = route.params // subsribe to route.params (corresponds to case.id)
      .pipe(map(params => new CaseSummaryActions.Select(params.id)))
      .subscribe(store);

    this.cases$ = store.pipe(select(fromCase.getAllCases));
  }

  ngOnInit() {
    console.log('DEBUG(configure-case-page.component.ts):', this.route.params);
    this.store.dispatch(new CaseActions.LoadOne('test'));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
