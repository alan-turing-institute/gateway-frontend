import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromCases from '../reducers';
import * as CaseActions from '../reducers/case.actions';

@Component({
  selector: 'app-simulations-configure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <sim-selected-case-page></sim-selected-case-page>
  `
})
export class ConfigureCasePageComponent implements OnDestroy {

  actionsSubscription: Subscription;

  constructor(store: Store<fromCases.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params  // subsribe to route.params (corresponds to case.id)
      .pipe(map(params => new CaseActions.Select(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

}
