import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromCaseSummaries from '../reducers';
import * as CaseSummaryActions from '../reducers/case-summary.actions';

@Component({
  selector: 'app-simulations-configure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <sim-selected-case-page></sim-selected-case-page>
  `
})
export class ConfigureCasePageComponent implements OnDestroy {

  actionsSubscription: Subscription;

  constructor(store: Store<fromCaseSummaries.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params  // subsribe to route.params (corresponds to case.id)
      .pipe(map(params => new CaseSummaryActions.Select(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

}
