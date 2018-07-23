import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { MiddlewareService } from '@core/services/middleware.service';
import {
  CaseActionTypes,
  Search,
  SearchComplete,
  SearchError,
  Load,
  LoadSuccess,
  LoadError
} from './case.actions';
import { Case } from '../models/case';
import { Scheduler } from 'rxjs/internal/Scheduler';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class CaseEffects {

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(CaseActionTypes.Search),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    map(action => action.payload),
    switchMap(query => {

      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.pipe(
        ofType(CaseActionTypes.Search),
        skip(1)  // skip the first emitted value
      );

      return this.middleware
        .searchCases(query)
        .pipe(
          takeUntil(nextSearch$),
          map((cases: Case[]) => new SearchComplete(cases)),
          catchError(err => of(new SearchError(err)))
        );

    })
  );


  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(CaseActionTypes.Load),
    switchMap(() => {
      return this.middleware
        .getAllCases()
        .pipe(
          map((cases: Case[]) => new LoadSuccess(cases)),
          catchError(err => of(new LoadError(err)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private middleware: MiddlewareService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    /**
     * You inject an optional Scheduler that will be undefined
     * in normal application usage, but its injected here so that you can mock out
     * during testing using the RxJS TestScheduler for simulating passages of time.
     */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
