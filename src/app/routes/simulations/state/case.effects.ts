import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  tap,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { MiddlewareService } from '@core/services/middleware.service';
import {
  CaseActionTypes,
  GetOneCase,
  GetOneCaseSuccess,
  GetOneCaseError,
  UpdateManySpec,
} from './case.actions';
import { Case } from '../models/case';
import { Scheduler } from 'rxjs/internal/Scheduler';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler',
);

@Injectable()
export class CaseEffects {
  @Effect()
  loadOne$: Observable<Action> = this.actions$.pipe(
    ofType<GetOneCase>(CaseActionTypes.GetOneCase),
    map(action => action.payload),
    switchMap(caseId => {
      return this.middleware.getCase(caseId).pipe(
        catchError(err => of(new GetOneCaseError(err))),
        concatMap((caseObject: Case) => [
          new GetOneCaseSuccess(caseObject),
          new UpdateManySpec(caseObject.description),
        ]),
      );
    }),
  );

  constructor(
    private actions$: Actions,
    private middleware: MiddlewareService,
  ) {}
}
